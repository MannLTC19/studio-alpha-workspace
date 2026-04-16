# Supabase Setup Guide for Studio Alpha

This guide will help you set up Supabase authentication and database for the Studio Alpha application.

## Step 1: Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up for a free account
2. Click **Create a new project**
3. Enter a project name (e.g., `studio-alpha`)
4. Choose a region close to you
5. Set a strong database password and save it securely
6. Wait for the project to be created (2-5 minutes)

## Step 2: Get Your API Credentials

1. Once your project is created, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **Anon public key** (the public API key)

## Step 3: Set Up Database Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy and paste this SQL to create the `profiles` table:

```sql
-- Create profiles table
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  email text unique not null,
  avatar_url text,
  bio text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policy for users to read their own profile
create policy "Users can view own profile"
  on profiles for select
  using ( auth.uid() = id );

-- Create policy for users to update their own profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Create policy for new user profile insertion
create policy "Users can insert own profile"
  on profiles for insert
  with check ( auth.uid() = id );
```

4. Click **Run** to execute the query

## Step 4: Configure Environment Variables

1. In the `frontend` folder, copy `.env.example` to `.env.local`
2. Open `frontend/.env.local` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 5: Test the Authentication

1. Start your application:
   ```bash
   npm.cmd run dev
   ```

2. The app should open with the Sign In page
3. Click **Register** to create a new account
4. Fill in:
   - Full Name (e.g., "John Doe")
   - Email (use a test email like `test@example.com`)
   - Password (at least 8 characters)
5. Click **Create Account**

## Step 6: Verify in Supabase Dashboard

1. Go to your Supabase dashboard
2. Go to **Authentication** → **Users** to see registered users
3. Go to **Table Editor** and select `profiles` to see user profile data

## Features Implemented

### ✅ User Registration
- Users can create a new account with email, password, and full name
- Password is securely hashed by Supabase
- User profile is automatically created in the database

### ✅ User Login
- Users can log in with email and password
- Session is automatically managed
- User stays logged in on page refresh

### ✅ User Logout
- Click on profile picture in top-right to open profile modal
- Click **Logout** button to sign out

### ✅ Protected Routes
- Dashboard and other pages only accessible when logged in
- Automatically redirects to Sign In page if not authenticated

### ✅ Error Handling
- Clear error messages for invalid credentials
- Duplicate email prevention
- Password validation

## Next Steps (Optional)

### Add Social Sign-In (Google, GitHub, etc.)
1. Go to **Authentication** → **Providers** in Supabase
2. Enable Google, GitHub, or other providers
3. Add provider credentials

### Add Profile Picture Upload
1. Go to **Storage** in Supabase
2. Create a new bucket called `avatars`
3. Add file upload functionality to profile settings

### Add Password Reset
1. Implement "Forgot Password" functionality
2. Use Supabase's `resetPasswordForEmail()` method

### Add Email Verification
1. Configure email verification in **Authentication** → **Email**
2. Users will receive verification email on signup

## Troubleshooting

### "Missing Supabase credentials"
- Make sure `frontend/.env.local` is created
- Check that `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly
- Environment variables should not have quotes

### "Invalid credentials" error
- Verify the email and password are correct
- Check that the user was successfully created (check Users in Supabase)
- Make sure the account hasn't been suspended

### "Duplicate email" error
- The email is already registered in Supabase
- Use a different email or reset the database

### Session not persisting
- Clear browser cookies and localStorage
- Check that Supabase credentials are correct
- Make sure Row Level Security policies are set up correctly

## API Endpoints Available

The backend also has these endpoints available (in addition to auth):
- `GET /api/health` - Check if backend is running
- `GET /api/welcome` - Test backend connection

To test: Visit `http://localhost:5173/api/health` in your browser

## Security Notes

- Never commit `.env.local` to git (it's in `.gitignore`)
- The `VITE_SUPABASE_ANON_KEY` is public and can be exposed (limited permissions)
- Always use HTTPS in production
- Enable Row Level Security (RLS) policies on all tables
- Use strong passwords (Supabase requires min 8 characters)

## Support

For more information about Supabase:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Database Guide](https://supabase.com/docs/guides/database)
