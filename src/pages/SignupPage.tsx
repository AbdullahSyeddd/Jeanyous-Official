
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage(
      "Account registration will be available when backend services are connected.",
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
            JOIN JEANYOUS.
          </h1>
          <p className="mt-4 text-sm text-neutral-600">
            Create your account and make it yours.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="signup-name" className="mb-2 block text-sm font-semibold">
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              className="min-h-13 w-full border border-burgundy/20 bg-transparent px-4 py-3 focus:border-burgundy"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold">
              Email address
            </label>
            <input
              id="signup-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="min-h-13 w-full border border-burgundy/20 bg-transparent px-4 py-3 focus:border-burgundy"
            />
          </div>

          <div>
            <label htmlFor="signup-password" className="mb-2 block text-sm font-semibold">
              Password
            </label>
            <div className="relative">
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-h-13 w-full border border-burgundy/20 bg-transparent px-4 py-3 pr-14 focus:border-burgundy"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <p className="mt-2 text-xs text-neutral-500">
              Minimum 8 characters.
            </p>
          </div>

          <div>
            <label htmlFor="signup-confirm" className="mb-2 block text-sm font-semibold">
              Confirm password
            </label>
            <input
              id="signup-confirm"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="min-h-13 w-full border border-burgundy/20 bg-transparent px-4 py-3 focus:border-burgundy"
            />
          </div>

          <button
            type="submit"
            className="min-h-13 w-full bg-burgundy px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#5f080f]"
          >
            Create Account
          </button>

          <p role="status" aria-live="polite" className="text-sm text-burgundy">
            {message}
          </p>
        </form>

        <p className="mt-8 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-burgundy hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </section>
  );
}
