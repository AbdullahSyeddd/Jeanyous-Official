
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function LoginPage() {
  const [forgot, setForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "This feature will be available when account services are connected.",
    );
  }

  return (
    <section className="flex min-h-[75vh] items-center justify-center px-5 py-20">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-burgundy"
        >
          <ArrowLeft size={17} /> Back to store
        </Link>

        <div className="mb-9">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
            Jeanyous Official
          </p>
          <h1 className="text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">
            {forgot ? "RESET PASSWORD." : "WELCOME BACK."}
          </h1>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            {forgot
              ? "Enter your email to request a password reset."
              : "Sign in to your Jeanyous account."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="login-email"
              className="mb-2 block text-sm font-semibold"
            >
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setMessage("");
              }}
              placeholder="you@example.com"
              className="min-h-13 w-full border border-burgundy/20 bg-transparent px-4 py-3 outline-offset-2 focus:border-burgundy"
            />
          </div>

          {!forgot && (
            <div>
              <label
                htmlFor="login-password"
                className="mb-2 block text-sm font-semibold"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setMessage("");
                  }}
                  className="min-h-13 w-full border border-burgundy/20 bg-transparent px-4 py-3 pr-14 outline-offset-2 focus:border-burgundy"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          )}

          {!forgot && (
            <button
              type="button"
              onClick={() => {
                setForgot(true);
                setMessage("");
              }}
              className="text-sm font-semibold text-burgundy hover:underline"
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            className="flex min-h-13 w-full items-center justify-center gap-2 bg-burgundy px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#5f080f]"
          >
            <LockKeyhole size={18} />
            {forgot ? "Request Reset" : "Sign In"}
          </button>

          <p role="status" aria-live="polite" className="text-sm text-burgundy">
            {message}
          </p>
        </form>

        {forgot ? (
          <button
            type="button"
            onClick={() => {
              setForgot(false);
              setMessage("");
            }}
            className="mt-6 text-sm font-semibold text-burgundy hover:underline"
          >
            Back to Sign In
          </button>
        ) : (
          <p className="mt-8 text-center text-sm text-neutral-600">
            New to Jeanyous?{" "}
            <Link to="/signup" className="font-bold text-burgundy hover:underline">
              Create an account
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}
