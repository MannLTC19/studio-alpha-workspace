const EMAIL_MAX_LENGTH = 254;
const NAME_MAX_LENGTH = 80;

export function sanitizeTextInput(value = '') {
  return String(value)
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .replace(/[<>"'`]/g, '')
    .trim();
}

export function sanitizeEmail(value = '') {
  return sanitizeTextInput(value).toLowerCase().slice(0, EMAIL_MAX_LENGTH);
}

export function sanitizeFullName(value = '') {
  return sanitizeTextInput(value).slice(0, NAME_MAX_LENGTH);
}

export function isValidEmail(email = '') {
  const normalized = sanitizeEmail(email);
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
}

export function validateAuthInput({ email, password, fullName, isRegister = false }) {
  const normalizedEmail = sanitizeEmail(email);
  const normalizedPassword = String(password || '').slice(0, 128);
  const normalizedFullName = sanitizeFullName(fullName);

  if (!normalizedEmail) {
    return { valid: false, message: 'Email is required.' };
  }

  if (!isValidEmail(normalizedEmail)) {
    return { valid: false, message: 'Please enter a valid email address.' };
  }

  if (!normalizedPassword) {
    return { valid: false, message: 'Password is required.' };
  }

  if (isRegister && normalizedPassword.length < 8) {
    return { valid: false, message: 'Password must be at least 8 characters.' };
  }

  if (isRegister && !normalizedFullName) {
    return { valid: false, message: 'Full name is required.' };
  }

  return {
    valid: true,
    sanitized: {
      email: normalizedEmail,
      password: normalizedPassword,
      fullName: normalizedFullName,
    },
  };
}

export function toSafeAuthErrorMessage(error) {
  const text = sanitizeTextInput(error?.message || error || '');
  const status = Number(error?.status || error?.code || 0);

  if (!text) {
    return 'Authentication failed. Please try again.';
  }

  const lowered = text.toLowerCase();
  if (lowered.includes('email not confirmed') || lowered.includes('confirm your email')) {
    return 'Please verify your email before signing in.';
  }
  if (lowered.includes('invalid login credentials')) {
    return 'Invalid email or password.';
  }
  if (lowered.includes('invalid grant')) {
    return 'Invalid email or password.';
  }
  if (lowered.includes('email rate limit exceeded')) {
    return 'Too many attempts. Please wait and try again.';
  }
  if (lowered.includes('signup is disabled')) {
    return 'Sign up is currently disabled for this project.';
  }
  if (lowered.includes('user already registered')) {
    return 'This email is already registered.';
  }
  if (lowered.includes('password')) {
    return 'Password does not meet requirements.';
  }
  if (status === 400) {
    return 'Sign-in failed. Check your email/password and confirm your email if you just registered.';
  }

  return 'Authentication failed. Please check your details and try again.';
}
