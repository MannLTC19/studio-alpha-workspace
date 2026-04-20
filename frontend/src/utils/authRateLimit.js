const RATE_LIMIT_PREFIX = 'studio_alpha_auth_rl';
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 5 * 60 * 1000;

function getStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  return window.localStorage;
}

function makeKey(action, email) {
  return `${RATE_LIMIT_PREFIX}:${action}:${String(email || '').toLowerCase()}`;
}

function readState(key) {
  const storage = getStorage();
  if (!storage) {
    return { failures: [], blockedUntil: 0 };
  }

  try {
    const raw = storage.getItem(key);
    if (!raw) {
      return { failures: [], blockedUntil: 0 };
    }

    const parsed = JSON.parse(raw);
    return {
      failures: Array.isArray(parsed.failures) ? parsed.failures : [],
      blockedUntil: Number(parsed.blockedUntil) || 0,
    };
  } catch {
    return { failures: [], blockedUntil: 0 };
  }
}

function writeState(key, state) {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.setItem(key, JSON.stringify(state));
  } catch {
    // Ignore storage write issues to avoid blocking auth flow.
  }
}

function formatRetryAfter(ms) {
  const totalSeconds = Math.max(1, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

export function getRateLimitState(action, email) {
  const key = makeKey(action, email);
  const now = Date.now();
  const state = readState(key);

  const recentFailures = state.failures.filter((ts) => now - ts <= WINDOW_MS);
  let blockedUntil = state.blockedUntil;

  if (blockedUntil && blockedUntil <= now) {
    blockedUntil = 0;
  }

  if (blockedUntil !== state.blockedUntil || recentFailures.length !== state.failures.length) {
    writeState(key, { failures: recentFailures, blockedUntil });
  }

  if (blockedUntil > now) {
    const retryAfterMs = blockedUntil - now;
    return {
      limited: true,
      retryAfterMs,
      message: `Too many attempts. Try again in ${formatRetryAfter(retryAfterMs)}.`,
    };
  }

  return {
    limited: false,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - recentFailures.length),
  };
}

export function recordRateLimitFailure(action, email) {
  const key = makeKey(action, email);
  const now = Date.now();
  const state = readState(key);
  const failures = state.failures.filter((ts) => now - ts <= WINDOW_MS);
  failures.push(now);

  const shouldBlock = failures.length >= MAX_ATTEMPTS;
  const blockedUntil = shouldBlock ? now + LOCKOUT_MS : 0;

  writeState(key, { failures, blockedUntil });
}

export function clearRateLimit(action, email) {
  const key = makeKey(action, email);
  const storage = getStorage();
  if (!storage) {
    return;
  }

  try {
    storage.removeItem(key);
  } catch {
    // Ignore storage issues.
  }
}
