
import { Link } from "react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Product } from "../data/products";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const reducedMotion = useReducedMotion();
  const soldOut = product.stock <= 0;
  const productUrl = `/products/${encodeURIComponent(product.id)}`;

  return (
    <motion.article
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: reducedMotion ? 0 : 0.55,
        ease: "easeOut",
      }}
      className="group min-w-0"
    >
      <Link
        to={productUrl}
        aria-label={`View ${product.name}`}
        className="relative block aspect-[3/4] w-full overflow-hidden bg-[#ded6ca]"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.055]"
        />

        <img
          src={product.secondImage}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-0 transition-[opacity,transform] duration-700 ease-out group-hover:scale-[1.055] group-hover:opacity-100"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {soldOut ? (
            <span className="bg-noir px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-white">
              Sold Out
            </span>
          ) : product.originalPrice ? (
            <span className="bg-burgundy px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-white">
              Sale
            </span>
          ) : product.isNew ? (
            <span className="bg-ivory px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.13em] text-burgundy">
              New
            </span>
          ) : null}
        </div>

        <span className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-ivory text-burgundy shadow-lg transition-all duration-300 group-hover:-translate-y-1 group-hover:bg-burgundy group-hover:text-white">
          <ArrowUpRight size={20} strokeWidth={1.7} />
        </span>
      </Link>

      <div className="pt-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-burgundy/75">
          {product.category}
        </p>

        <Link
          to={productUrl}
          className="mt-2 block text-sm font-semibold leading-6 text-noir transition-colors hover:text-burgundy sm:text-base"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex flex-wrap items-center gap-3">
          <span className="text-sm font-bold text-burgundy">
            {formatPrice(product.price)}
          </span>

          {product.originalPrice && (
            <span className="text-xs text-neutral-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
