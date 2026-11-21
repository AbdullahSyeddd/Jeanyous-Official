
import { useEffect, useRef, useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowUpRight,
  Menu,
  ShoppingBag,
  UserRound,
  X,
} from "lucide-react";
import { useCart } from "../context/CartContext";

const navigation = [
  { label: "Home", path: "/" },
  { label: "Collections", path: "/collections" },
  { label: "New Arrivals", path: "/new-arrivals" },
  { label: "Customize", path: "/customize" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { cartCount, setCartOpen } = useCart();
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => {
      menuRef.current
        ?.querySelector<HTMLButtonElement>(
          'button[aria-label="Close menu"]',
        )
        ?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }

      if (event.key !== "Tab" || !menuRef.current) return;

      const elements = Array.from(
        menuRef.current.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href]',
        ),
      );

      if (!elements.length) return;

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === last
      ) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      menuButtonRef.current?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div className="bg-burgundy px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ivory sm:text-[11px]">
        Wear your own story. / Jeanyous Official
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-white/10 bg-noir text-ivory transition-all duration-300 ${
          scrolled ? "shadow-xl shadow-black/15" : ""
        }`}
      >
        <nav
          aria-label="Main navigation"
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[height] duration-300 md:px-10 lg:px-16 ${
            scrolled ? "h-[68px]" : "h-[82px]"
          }`}
        >
          <div className="flex flex-1 items-center">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="rounded-full p-2 transition hover:bg-white/10 xl:hidden"
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>

            <div className="hidden items-center gap-5 xl:flex">
              {navigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `nav-link whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.11em] transition ${
                      isActive
                        ? "text-[#e9a8b7]"
                        : "text-ivory/75 hover:text-ivory"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          <Link
            to="/"
            aria-label="Jeanyous Official homepage"
            className="shrink-0 font-editorial text-[25px] font-semibold tracking-[-0.065em] text-ivory sm:text-[32px]"
          >
            JEANYOUS<span className="text-[#c45c72]">.</span>
          </Link>

          <div className="flex flex-1 items-center justify-end gap-1 sm:gap-3">
            <Link
              to="/login"
              aria-label="Sign in to your account"
              className="rounded-full p-2 transition hover:bg-white/10"
            >
              <UserRound size={21} strokeWidth={1.5} />
            </Link>

            <button
              type="button"
              aria-label={`Open shopping bag, ${cartCount} items`}
              onClick={() => setCartOpen(true)}
              className="relative rounded-full p-2 transition hover:bg-white/10"
            >
              <ShoppingBag size={22} strokeWidth={1.5} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-burgundy px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.2 }}
          >
            <button
              type="button"
              aria-label="Close navigation overlay"
              className="absolute inset-0 bg-black/70"
              onClick={() => setMenuOpen(false)}
            />

            <motion.aside
              ref={menuRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "tween",
                duration: reducedMotion ? 0 : 0.32,
                ease: "easeInOut",
              }}
              className="absolute inset-y-0 left-0 flex w-[min(85vw,380px)] flex-col overflow-y-auto bg-noir p-7 text-ivory shadow-2xl"
            >
              <div className="mb-12 flex items-center justify-between">
                <Link
                  to="/"
                  onClick={() => setMenuOpen(false)}
                  className="font-editorial text-2xl tracking-[-0.06em]"
                >
                  JEANYOUS<span className="text-[#c45c72]">.</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full p-2 hover:bg-white/10"
                >
                  <X size={23} />
                </button>
              </div>

              <div className="flex flex-col gap-5">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={
                      reducedMotion
                        ? false
                        : { opacity: 0, x: -20 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : index * 0.04,
                    }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between border-b border-white/15 pb-4 font-editorial text-2xl ${
                          isActive
                            ? "text-[#e9a8b7]"
                            : "text-ivory"
                        }`
                      }
                    >
                      {item.label}
                      <ArrowUpRight size={19} />
                    </NavLink>
                  </motion.div>
                ))}

                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-white/15 pb-4 font-editorial text-2xl"
                >
                  Sign In
                  <UserRound size={19} />
                </NavLink>
              </div>

              <div className="mt-auto border-t border-white/15 pt-6 text-[10px] uppercase tracking-[0.2em] text-ivory/50">
                Jeanyous Official
                <p className="mt-2">Wear your own story.</p>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
