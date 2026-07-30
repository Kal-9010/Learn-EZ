import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import FormField from '../components/FormField.jsx';
import { useUser } from '../context/UserContext.jsx';
import { supabase, isSupabaseConfigured } from '../lib/supabase.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NOT_CONNECTED_MESSAGE =
  "That isn't available yet — Supabase isn't connected. You can still continue without an account.";

export default function Auth() {
  const navigate = useNavigate();
  const { user, loading, startAnonymousSession } = useUser();

  // A returning user with a still-valid session shouldn't see the signup
  // form again — send them straight to their progress.
  useEffect(() => {
    if (!loading && user) {
      navigate('/progress', { replace: true });
    }
  }, [loading, user, navigate]);

  const [mode, setMode] = useState('signup'); // 'signup' | 'login'
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null); // { message, showLoginLink }

  const trimmedName = displayName.trim();
  const isSignup = mode === 'signup';

  const nameError =
    touched && isSignup
      ? trimmedName.length === 0
        ? 'Display name is required'
        : trimmedName.length < 2
          ? 'Display name must be at least 2 characters'
          : null
      : null;
  const emailError = touched && !EMAIL_RE.test(email) ? 'Enter a valid email address' : null;
  const passwordError =
    touched && isSignup && password.length < 8 ? 'Password must be at least 8 characters' : null;
  const confirmError =
    touched && isSignup && confirmPassword !== password ? 'Passwords do not match' : null;

  const isValid = isSignup
    ? trimmedName.length >= 2 && EMAIL_RE.test(email) && password.length >= 8 && confirmPassword === password
    : EMAIL_RE.test(email) && password.length > 0;

  function skipSignUp() {
    startAnonymousSession();
    navigate('/onboarding');
  }

  function switchToLogin() {
    setMode('login');
    setFormError(null);
    setTouched(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    setFormError(null);
    if (!isValid) return;

    if (!isSupabaseConfigured) {
      setFormError({ message: NOT_CONNECTED_MESSAGE });
      return;
    }

    setSubmitting(true);

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: trimmedName } },
      });
      setSubmitting(false);

      if (error) {
        if (/already registered|already exists/i.test(error.message)) {
          setFormError({ message: 'An account with this email already exists', showLoginLink: true });
        } else {
          setFormError({ message: error.message });
        }
        return;
      }
      navigate('/onboarding');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setSubmitting(false);

      if (error) {
        setFormError({ message: 'Incorrect email or password' });
        return;
      }
      navigate('/progress');
    }
  }

  if (loading || user) {
    // Either still checking for a session, or one was just found and the
    // redirect effect above is about to navigate away — render nothing
    // rather than flash the signup form in either case.
    return null;
  }

  return (
    <main className="relative flex min-h-full flex-col overflow-auto px-6 pb-8 pt-16">
      <button
        type="button"
        onClick={skipSignUp}
        aria-label="Skip sign up"
        className="absolute right-6 top-16 flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500"
      >
        <X size={18} />
      </button>

      <h1 className="text-[22px] font-extrabold text-slate-900">L EZ</h1>
      <p className="mb-7 text-sm text-slate-500">Learn Easy</p>

      <h2 className="text-2xl font-bold text-slate-900">
        {isSignup ? 'Create your account' : 'Welcome back'}
      </h2>
      <p className="mb-6 text-sm text-slate-500">
        {isSignup ? 'Save your progress and share it with recruiters.' : 'Log in to pick up where you left off.'}
      </p>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
        {isSignup && (
          <FormField
            id="displayName"
            label="Display name"
            placeholder="Jordan Lee"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            error={nameError}
          />
        )}
        <FormField
          id="email"
          label="Email"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          placeholder={isSignup ? 'Min. 8 characters' : 'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError}
        />
        {isSignup && (
          <FormField
            id="confirmPassword"
            label="Confirm password"
            type="password"
            placeholder="Repeat password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmError}
          />
        )}

        {formError && (
          <p className="text-sm text-red-600">
            {formError.message}
            {formError.showLoginLink && (
              <>
                {' '}
                <button type="button" onClick={switchToLogin} className="font-semibold underline">
                  Log In instead
                </button>
              </>
            )}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-1.5 h-[52px] rounded-2xl bg-blue-600 text-base font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {submitting ? 'One moment…' : isSignup ? 'Create Account' : 'Log In'}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(isSignup ? 'login' : 'signup');
          setFormError(null);
          setTouched(false);
        }}
        className="mt-3.5 text-center text-sm font-semibold text-slate-500"
      >
        {isSignup ? 'Already have an account? Log in' : 'New here? Create an account'}
      </button>
    </main>
  );
}
