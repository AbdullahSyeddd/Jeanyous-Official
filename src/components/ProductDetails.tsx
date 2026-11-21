
import { useEffect, useRef, useState } from "react";
import { Check, ShoppingBag, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  formatPrice,
  type Product,
} from "../data/products";

type Props = {
  product: Product;
  onClose: () => void;
};

export default function ProductDetails({
  product,
  onClose,
}: Props) {
  const { addItem } = useCart();

  const [size, setSize] = useState("");
  const [color, setColor] = useState(
    product.colors[0] ?? "",
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [message, setMessage] = useState("");

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const images = [product.image, product.secondImage];
  const soldOut = product.stock <= 0;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "Tab" && dialogRef.current) {
        const elements = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );

        if (!elements.length) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (
          event.shiftKey &&
          document.activeElement === first
        ) {
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
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose]);

  function handleAddToCart() {
    if (!size) {
      setMessage("Please select your size first.");
      return;
    }

    const result = addItem(product, size, color);
    setMessage(result.message);

    if (result.success) {
      onClose();
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-dialog-title"
        className="relative grid max-h-[95dvh] w-full max-w-5xl overflow-y-auto bg-ivory md:grid-cols-2"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-10 rounded-full bg-ivory p-3 shadow-md"
        >
          <X size={20} />
        </button>

        <div className="bg-[#e8dfd4]">
          <img
            src={images[imageIndex]}
            alt={product.name}
            className="aspect-square w-full object-cover md:aspect-[3/4]"
          />

          <div className="flex gap-2 p-3">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setImageIndex(index)}
                aria-label={`View product image ${index + 1}`}
                aria-pressed={imageIndex === index}
                className={`h-16 w-14 overflow-hidden border-2 ${
                  imageIndex === index
                    ? "border-burgundy"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
            {product.category}
          </p>

          <h2
            id="product-dialog-title"
            className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl"
          >
            {product.name}
          </h2>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-xl font-bold text-burgundy">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <span className="text-sm text-neutral-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-6 text-sm leading-7 text-neutral-600">
            {product.description}
          </p>

          <fieldset className="mt-8">
            <legend className="mb-3 text-xs font-bold uppercase tracking-widest">
              Select Size *
            </legend>

            <div className="flex flex-wrap gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={soldOut}
                  onClick={() => {
                    setSize(item);
                    setMessage("");
                  }}
                  aria-pressed={size === item}
                  className={`min-h-11 min-w-12 border px-3 text-sm font-semibold transition disabled:opacity-40 ${
                    size === item
                      ? "border-burgundy bg-burgundy text-white"
                      : "border-neutral-300 hover:border-burgundy"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-7">
            <legend className="mb-3 text-xs font-bold uppercase tracking-widest">
              Color
            </legend>

            <div className="flex flex-wrap gap-2">
              {product.colors.map((item) => (
                <button
                  key={item}
                  type="button"
                  disabled={soldOut}
                  onClick={() => setColor(item)}
                  aria-pressed={color === item}
                  className={`border px-4 py-2 text-sm disabled:opacity-40 ${
                    color === item
                      ? "border-burgundy bg-burgundy text-white"
                      : "border-neutral-300"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="mt-7 flex items-center gap-2 text-sm">
            {soldOut ? (
              <span className="font-semibold text-red-700">
                Currently out of stock
              </span>
            ) : (
              <>
                <Check size={17} className="text-green-700" />
                <span>Available (demo inventory)</span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={soldOut}
            className="mt-6 flex w-full items-center justify-center gap-3 bg-burgundy px-6 py-4 text-sm font-bold uppercase tracking-widest text-white transition hover:bg-[#5f080f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag size={19} />
            {soldOut ? "Sold Out" : "Add to Bag"}
          </button>

          <p
            role="status"
            aria-live="polite"
            className="mt-3 min-h-5 text-sm font-medium text-burgundy"
          >
            {message}
          </p>

          <p className="mt-4 text-xs leading-6 text-neutral-500">
            Prices and stock are demo data. Orders and
            checkout are not enabled yet.
          </p>
        </div>
      </div>
    </div>
  );
}
