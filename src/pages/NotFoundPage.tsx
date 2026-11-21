
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
        Page Not Found
      </p>

      <h1 className="mt-5 text-8xl font-extrabold tracking-[-0.08em] text-burgundy md:text-9xl">
        404.
      </h1>

      <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
        Looks like this page isn't part of the collection.
        Let's get you back on track.
      </p>

      <Link
        to="/"
        className="mt-9 inline-flex items-center gap-3 bg-burgundy px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
      >
        Back to Homepage
        <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
