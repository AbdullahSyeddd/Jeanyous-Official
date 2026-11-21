
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import ProductCard from "../components/ProductCard";
import { products, formatPrice } from "../data/products";

export default function NewArrivalsPage() {
  const arrivals = products.filter(
    (product) => product.isNew,
  );

  const featured = arrivals[0];
  const remaining = arrivals.slice(1);

  return (
    <>
      <section className="bg-[#211A18] px-5 py-20 text-ivory md:px-12 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 text-xs font-bold uppercase tracking-[0.35em]"
          >
            New season / New energy
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(3.5rem,10vw,9rem)] font-extrabold leading-[0.95] tracking-[-0.075em]"
          >
            JUST
            <br />
            DROPPED
            <span className="text-[#C77D7D]">.</span>
          </motion.h1>

          <p className="mt-8 max-w-lg text-sm leading-7 text-ivory/70">
            The newest pieces in the Jeanyous lineup.
            Fresh essentials, made for your next chapter.
          </p>
        </div>
      </section>

      {featured && (
        <section className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:px-12 lg:grid-cols-2 lg:items-center lg:px-20">
          <Link
            to={`/products/${encodeURIComponent(featured.id)}`}
            className="group block aspect-[4/5] overflow-hidden bg-neutral-200"
            aria-label={`View ${featured.name}`}
          >
            <img
              src={featured.image}
              alt={featured.name}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </Link>

          <div className="lg:px-10">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
              Spotlight / New Arrival
            </p>

            <h2 className="text-5xl font-extrabold leading-tight tracking-[-0.06em] md:text-7xl">
              {featured.name}
            </h2>

            <p className="mt-5 text-xl font-bold text-burgundy">
              {formatPrice(featured.price)}
            </p>

            <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
              {featured.description}
            </p>

            <Link
              to={`/products/${encodeURIComponent(featured.id)}`}
              className="mt-8 inline-flex items-center gap-4 bg-burgundy px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
            >
              Explore This Piece
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1440px] px-5 pb-28 md:px-12 lg:px-20">
        <div className="mb-10 border-b border-burgundy/15 pb-6">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
            Fresh from Jeanyous
          </p>

          <h2 className="text-4xl font-extrabold tracking-[-0.06em] md:text-6xl">
            THE LATEST EDIT.
          </h2>

          <p className="mt-4 text-sm text-neutral-600">
            {arrivals.length} new pieces in the current
            demo collection.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-10 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {remaining.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/collections"
            className="inline-flex items-center gap-4 border border-burgundy px-8 py-4 text-xs font-bold uppercase tracking-widest text-burgundy transition hover:bg-burgundy hover:text-white"
          >
            Explore All Collections
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
