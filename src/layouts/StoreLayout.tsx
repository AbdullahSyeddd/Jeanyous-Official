
import { useEffect } from "react";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useLocation,
} from "react-router";
import {
  ArrowUpRight,
  Shirt,
  Truck,
  ShieldCheck,
} from "lucide-react";

import Navbar from "../components/Navbar";
import CartDrawer from "../context/CartDrawer";

const shopLinks = [
  { label: "Collections", to: "/collections" },
  { label: "New Arrivals", to: "/new-arrivals" },
  { label: "Customize", to: "/customize" },
];

const companyLinks = [
  { label: "Our Story", to: "/about" },
  { label: "Contact", to: "/contact" },
];

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });

      return () => cancelAnimationFrame(frame);
    }

    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}

export default function StoreLayout() {
  return (
    <div className="min-h-screen bg-ivory">
      <ScrollToTop />
      <Navbar />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[500] focus:bg-ivory focus:px-5 focus:py-3 focus:text-burgundy"
      >
        Skip to main content
      </a>

      <main id="main-content" tabIndex={-1}>
        <Outlet />
      </main>

      <section
        aria-label="Store highlights"
        className="border-y border-black/10 bg-[#ebe3d8] px-5 py-10 md:px-12"
      >
        <div className="mx-auto grid max-w-[1280px] gap-8 sm:grid-cols-3">
          <div className="flex items-center gap-4">
            <Shirt
              size={28}
              strokeWidth={1.3}
              className="shrink-0 text-burgundy"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em]">
                Everyday Essentials
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-600">
                Unisex clothing and personal style
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Truck
              size={28}
              strokeWidth={1.3}
              className="shrink-0 text-burgundy"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em]">
                Pakistan Delivery
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-600">
                Planned for store launch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ShieldCheck
              size={28}
              strokeWidth={1.3}
              className="shrink-0 text-burgundy"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em]">
                Checkout
              </p>
              <p className="mt-1 text-xs leading-5 text-neutral-600">
                Ordering system coming soon
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-noir px-5 pt-20 text-ivory md:px-12 md:pt-24">
        <div className="mx-auto grid max-w-[1440px] gap-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link
              to="/"
              className="font-editorial text-4xl font-semibold tracking-[-0.07em] md:text-5xl"
            >
              JEANYOUS<span className="text-[#c45c72]">.</span>
            </Link>

            <p className="mt-6 max-w-xs text-sm leading-7 text-ivory/65">
              Contemporary essentials for those who choose
              to express their own story.
            </p>

            <p className="font-editorial mt-8 text-xl italic text-[#c8b9ac]">
              Wear Your Own Story.
            </p>
          </div>

          <nav aria-label="Footer shop links">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#e9a8b7]">
              Explore
            </h2>

            <div className="mt-7 flex flex-col gap-4">
              {shopLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="w-fit text-sm text-ivory/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <nav aria-label="Footer company links">
            <h2 className="text-xs font-bold uppercase tracking-[0.25em] text-[#e9a8b7]">
              Jeanyous
            </h2>

            <div className="mt-7 flex flex-col gap-4">
              {companyLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="w-fit text-sm text-ivory/65 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-ivory transition hover:text-[#e9a8b7]"
            >
              Get in Touch
              <ArrowUpRight size={17} />
            </Link>
          </nav>
        </div>

        <div className="mx-auto mt-20 max-w-[1440px] border-t border-white/15 py-7">
          <div className="flex flex-col justify-between gap-4 text-xs text-ivory/50 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} Jeanyous Official.
              All rights reserved.
            </p>
            <p>Pakistan / Fashion & Individuality</p>
          </div>
        </div>
      </footer>

      <CartDrawer />
      <ScrollRestoration />
    </div>
  );
}
