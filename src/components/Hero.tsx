
import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const slides = [
  {
    id: 1,
    eyebrow: "JEANYOUS / THE NEW EDIT",
    title: "JEANYOUS",
    subtitle: "Wear Your Own Story.",
    description:
      "Contemporary essentials designed for individuality, comfort and everyday confidence.",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=85",
    position: "center 40%",
  },
  {
    id: 2,
    eyebrow: "EVERYDAY / REDEFINED",
    title: "YOUR STYLE",
    subtitle: "Your Rules.",
    description:
      "Explore unisex clothing that feels as individual as you are.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=85",
    position: "center 35%",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 7000);

    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  const slide = slides[active];

  function changeSlide(direction: number) {
    setActive(
      (current) =>
        (current + direction + slides.length) % slides.length,
    );
  }

  return (
    <section
      id="home"
      aria-label="Featured collections"
      className="relative isolate min-h-[680px] overflow-hidden bg-noir text-ivory md:min-h-[780px]"
    >
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reducedMotion ? 0 : 1.1,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover"
              style={{
                backgroundImage: `url("${slide.image}")`,
                backgroundPosition: slide.position,
              }}
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-r from-[#090707]/95 via-[#19080d]/80 to-[#25090e]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1440px] flex-col justify-center px-6 pb-28 pt-20 md:min-h-[780px] md:px-12 lg:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{
              duration: reducedMotion ? 0 : 0.7,
              ease: "easeOut",
            }}
            className="max-w-[800px]"
          >
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.35em] text-ivory/80">
              {slide.eyebrow}
            </p>

            <h1 className="font-editorial text-[clamp(4rem,10vw,9rem)] font-normal leading-[0.98] tracking-[-0.065em]">
              {slide.title}
              <span className="ml-1 align-top font-sans text-lg tracking-normal md:text-2xl">
                ®
              </span>
            </h1>

            <p className="font-editorial mt-5 text-[clamp(1.8rem,3.4vw,3.4rem)] italic leading-tight">
              {slide.subtitle}
            </p>

            <p className="mt-7 max-w-sm text-sm leading-7 text-ivory/80 md:text-base">
              {slide.description}
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                to="/collections"
                className="group inline-flex min-h-13 items-center justify-center gap-5 bg-burgundy px-6 py-4 text-[11px] font-bold uppercase tracking-[0.13em] text-white transition hover:bg-[#8b1830]"
              >
                Explore Collections
                <ArrowUpRight
                  size={17}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/customize"
                className="inline-flex min-h-13 items-center justify-center border border-ivory/60 px-6 py-4 text-[11px] font-bold uppercase tracking-[0.13em] text-ivory transition hover:bg-ivory hover:text-noir"
              >
                Customize Now
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-6 z-20 hidden items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-ivory/70 md:left-12 md:flex lg:left-20">
        <ArrowDown size={16} />
        Scroll to explore
      </div>

      <div className="absolute bottom-7 right-6 z-20 flex items-center gap-3 md:right-12 lg:right-20">
        <span className="mr-2 text-xs font-semibold tracking-widest">
          0{active + 1} / 0{slides.length}
        </span>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={() => changeSlide(-1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/50 transition hover:bg-ivory hover:text-noir"
        >
          <ArrowLeft size={18} />
        </button>

        <button
          type="button"
          aria-label="Next slide"
          onClick={() => changeSlide(1)}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/50 transition hover:bg-ivory hover:text-noir"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}
