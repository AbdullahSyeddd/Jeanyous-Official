
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  PenLine,
  Sparkles,
} from "lucide-react";

import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const categories = [
  {
    title: "T-Shirts",
    label: "01 / EVERYDAY",
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Hoodies",
    label: "02 / THE LAYER",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Trousers",
    label: "03 / THE FIT",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=85",
  },
];

export default function HomePage() {
  const reducedMotion = useReducedMotion();

  const featured = products
    .filter((product) => product.stock > 0)
    .slice(0, 4);

  const reveal = {
    initial: reducedMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: reducedMotion ? 0 : 0.65 },
  };

  return (
    <>
      <Hero />

      <div className="border-b border-black/10 bg-ivory">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 gap-y-6 px-5 py-7 text-center md:grid-cols-4 md:px-12">
          {[
            ["01", "Everyday Essentials"],
            ["02", "Unisex Style"],
            ["03", "Make It Yours"],
            ["04", "Made for Expression"],
          ].map(([number, title]) => (
            <div
              key={number}
              className="border-r border-black/10 px-3 last:border-r-0"
            >
              <p className="text-[10px] font-bold tracking-widest text-burgundy">
                {number}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <section
        id="collection"
        className="mx-auto max-w-[1440px] scroll-mt-24 px-5 py-20 md:px-12 md:py-28 lg:px-20"
      >
        <motion.div
          {...reveal}
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-burgundy">
              Discover the collection
            </p>
            <h2 className="font-editorial text-5xl font-normal tracking-[-0.05em] md:text-7xl">
              The Essentials
            </h2>
          </div>

          <Link
            to="/collections"
            className="inline-flex items-center gap-2 border-b border-burgundy pb-2 text-xs font-bold uppercase tracking-widest text-burgundy"
          >
            Shop All
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={reducedMotion ? false : { opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: reducedMotion ? 0 : 0.7,
                delay: reducedMotion ? 0 : index * 0.1,
              }}
            >
              <Link
                to="/collections"
                className="group relative block aspect-[4/5] overflow-hidden bg-[#d7cdc1]"
              >
                <img
                  src={category.image}
                  alt={`${category.title} collection`}
                  loading="lazy"
                  className="noir-image h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6 text-white md:p-8">
                  <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
                    {category.label}
                  </p>

                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-editorial text-4xl md:text-5xl">
                      {category.title}
                    </h3>

                    <ArrowUpRight
                      size={25}
                      className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 pb-24 md:px-12 md:pb-32 lg:px-20">
        <motion.div
          {...reveal}
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.25em] text-burgundy">
              Curated for you
            </p>

            <h2 className="font-editorial text-5xl font-normal tracking-[-0.05em] md:text-7xl">
              Fresh Drops
            </h2>
          </div>

          <Link
            to="/new-arrivals"
            className="inline-flex items-center gap-2 border-b border-burgundy pb-2 text-xs font-bold uppercase tracking-widest text-burgundy"
          >
            View New Arrivals
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-8 md:grid-cols-4 md:gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-noir text-ivory">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1800&q=85")',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#100c0c]/95 via-[#21090f]/85 to-[#21090f]/50" />

        <motion.div
          {...reveal}
          className="relative mx-auto max-w-[1440px] px-6 py-24 md:px-12 md:py-32 lg:px-20"
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-ivory/75">
            The latest edit
          </p>

          <h2 className="font-editorial max-w-4xl text-6xl font-normal leading-[1.05] tracking-[-0.05em] md:text-8xl">
            New Season.
            <br />
            <span className="italic text-[#e2c8c3]">
              New Energy.
            </span>
          </h2>

          <p className="mt-7 max-w-md text-sm leading-7 text-ivory/75">
            Discover the latest additions to your everyday wardrobe.
          </p>

          <Link
            to="/new-arrivals"
            className="mt-9 inline-flex items-center gap-4 bg-burgundy px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#8b1830]"
          >
            Explore New Arrivals
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            {...reveal}
            className="relative flex aspect-[5/4] items-center justify-center overflow-hidden bg-[#ded4c9]"
          >
            <div className="absolute left-8 top-8 text-[10px] font-bold uppercase tracking-[0.25em] text-burgundy">
              Jeanyous / Custom Studio
            </div>

            <div className="flex aspect-[3/4] w-[48%] items-center justify-center bg-burgundy shadow-2xl">
              <span className="font-editorial text-8xl italic text-ivory md:text-9xl">
                J.
              </span>
            </div>

            <span className="absolute bottom-7 right-8 font-editorial text-2xl italic text-burgundy">
              Made for you.
            </span>
          </motion.div>

          <motion.div {...reveal}>
            <div className="mb-5 flex items-center gap-2 text-burgundy">
              <PenLine size={17} />
              <span className="text-xs font-bold uppercase tracking-[0.25em]">
                The Custom Studio
              </span>
            </div>

            <h2 className="font-editorial text-6xl font-normal leading-[1.06] tracking-[-0.06em] md:text-8xl">
              Make It
              <br />
              <span className="italic text-burgundy">Yours.</span>
            </h2>

            <p className="mt-7 max-w-md text-sm leading-8 text-neutral-600">
              Choose your fit, color and signature print.
              Create an everyday piece that feels uniquely yours.
            </p>

            <Link
              to="/customize"
              className="mt-9 inline-flex items-center gap-4 bg-burgundy px-7 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#8b1830]"
            >
              Start Customizing
              <ArrowUpRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#ebe3d8]">
        <motion.div
          {...reveal}
          className="mx-auto grid max-w-[1440px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-12 md:py-28 lg:px-20"
        >
          <div className="flex min-h-[280px] items-center justify-center bg-noir px-8 text-center text-ivory md:min-h-[360px]">
            <div>
              <Sparkles
                size={25}
                className="mx-auto mb-6 text-[#c8b9ac]"
              />
              <p className="font-editorial text-5xl tracking-[-0.06em] md:text-7xl">
                JEANYOUS.
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-[0.35em] text-ivory/65">
                Wear Your Own Story
              </p>
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
              Our Story
            </p>

            <h2 className="font-editorial text-5xl tracking-[-0.05em] md:text-6xl">
              More Than
              <br />
              Just Clothing.
            </h2>

            <p className="mt-6 max-w-md text-sm leading-8 text-neutral-600">
              Jeanyous is about personal style, everyday comfort
              and the freedom to express yourself through what you wear.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-3 border-b border-burgundy pb-2 text-xs font-bold uppercase tracking-widest text-burgundy"
            >
              Discover Our Story
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
