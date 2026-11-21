
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Heart,
  Layers3,
  Sparkles,
} from "lucide-react";
import PageTransition from "../components/PageTransition";

const values = [
  {
    number: "01",
    title: "INDIVIDUALITY",
    description:
      "Your personal style deserves room to stand out. Wear what feels like you.",
    icon: Sparkles,
  },
  {
    number: "02",
    title: "EVERYDAY COMFORT",
    description:
      "Versatile essentials designed around the way you move, live and express yourself.",
    icon: Heart,
  },
  {
    number: "03",
    title: "CREATIVE FREEDOM",
    description:
      "From understated basics to personalized prints, make every piece your own.",
    icon: Layers3,
  },
];

export default function AboutPage() {
  const reduceMotion = useReducedMotion();

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-burgundy px-5 py-24 text-ivory md:px-12 md:py-36">
        <div className="pointer-events-none absolute -right-12 top-0 select-none text-[clamp(12rem,35vw,38rem)] font-black leading-none tracking-[-0.12em] text-white/[0.035]">
          J.
        </div>

        <div className="relative mx-auto max-w-[1280px]">
          <p className="mb-8 text-xs font-bold uppercase tracking-[0.3em]">
            The story behind Jeanyous
          </p>

          <motion.h1
            initial={
              reduceMotion ? false : { opacity: 0, y: 30 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-5xl text-[clamp(3.5rem,9vw,9rem)] font-extrabold leading-[0.98] tracking-[-0.075em]"
          >
            MORE THAN
            <br />
            WHAT YOU
            <br />
            <span className="text-[#E7B8A8]">WEAR.</span>
          </motion.h1>

          <p className="mt-10 max-w-xl text-base leading-8 text-ivory/75">
            Style is personal. We believe everyday clothing
            should give you the confidence to express who
            you are, on your own terms.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-12 md:py-32 lg:grid-cols-2 lg:gap-20 lg:px-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E5D9CC]">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=85"
            alt="Fashion editorial showing contemporary clothing"
            loading="lazy"
            className="h-full w-full object-cover"
          />

          <div className="absolute bottom-5 left-5 bg-ivory px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-burgundy">
            Wear your own story
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
            Our philosophy
          </p>

          <h2 className="text-5xl font-extrabold leading-[1.06] tracking-[-0.07em] md:text-7xl">
            BUILT FOR
            <br />
            THE WAY
            <br />
            YOU LIVE.
          </h2>

          <div className="mt-8 h-1 w-16 bg-burgundy" />

          <p className="mt-8 max-w-lg text-base leading-8 text-neutral-600">
            Jeanyous Official is developing a fresh approach
            to unisex everyday fashion, combining comfort,
            versatility and personal expression.
          </p>

          <p className="mt-5 max-w-lg text-base leading-8 text-neutral-600">
            Our direction is simple: clothing that works with
            your lifestyle, not against it. From relaxed
            essentials to customizable pieces, the goal is
            to make personal style more accessible.
          </p>

          <Link
            to="/collections"
            className="mt-10 inline-flex items-center gap-3 border-b-2 border-burgundy pb-2 text-xs font-bold uppercase tracking-widest text-burgundy"
          >
            Explore Our Collection
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <section className="bg-[#F5EBDD] px-5 py-24 md:px-12 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
            What guides us
          </p>

          <h2 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-[-0.06em] md:text-6xl">
            OUR POINT OF VIEW.
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.number}
                  className="border border-burgundy/15 bg-ivory p-8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between text-burgundy">
                    <span className="text-xs font-bold tracking-widest">
                      {value.number}
                    </span>
                    <Icon size={27} strokeWidth={1.5} />
                  </div>

                  <h3 className="mt-14 text-xl font-extrabold tracking-tight">
                    {value.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-600">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-28 text-center md:px-12 md:py-36">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
          Your style starts here
        </p>

        <h2 className="mx-auto max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-[-0.07em] md:text-8xl">
          EXPRESS YOURSELF.
        </h2>

        <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-neutral-600">
          Explore the collection or create a signature
          piece that feels like you.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/collections"
            className="inline-flex min-h-12 items-center gap-3 bg-burgundy px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
          >
            Shop Collections
            <ArrowUpRight size={18} />
          </Link>

          <Link
            to="/customize"
            className="inline-flex min-h-12 items-center gap-3 border border-burgundy px-7 py-4 text-xs font-bold uppercase tracking-widest text-burgundy"
          >
            Customize Yours
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </PageTransition>
  );
}
