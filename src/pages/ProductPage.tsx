
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  formatPrice,
  products,
  type Product,
} from "../data/products";
import ProductCard from "../components/ProductCard";

function ProductContent({ product }: { product: Product }) {
  const { addItem, items } = useCart();

  const [size, setSize] = useState("");
  const [color, setColor] = useState(
    product.colors[0] ?? "",
  );
  const [imageIndex, setImageIndex] = useState(0);
  const [message, setMessage] = useState("");

  const images = [
    ...new Set(
      [product.image, product.secondImage].filter(Boolean),
    ),
  ];

  const soldOut = product.stock <= 0;

  const quantityInCart = items
    .filter((item) => item.productId === product.id)
    .reduce((total, item) => total + item.quantity, 0);

  const stockLimitReached =
    !soldOut && quantityInCart >= product.stock;

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id &&
        item.category === product.category,
    )
    .slice(0, 4);

  useEffect(() => {
    setSize("");
    setColor(product.colors[0] ?? "");
    setImageIndex(0);
    setMessage("");
  }, [product.id, product.colors]);

  useEffect(() => {
    const previousTitle = document.title;
    const description =
      document.querySelector<HTMLMetaElement>(
        'meta[name="description"]',
      );

    const previousDescription =
      description?.getAttribute("content") ?? null;

    const createdDescription = !description;
    const meta =
      description ?? document.createElement("meta");

    if (createdDescription) {
      meta.name = "description";
      document.head.appendChild(meta);
    }

    document.title = `${product.name} | Jeanyous Official`;
    meta.content = product.description;

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        meta.remove();
      } else if (previousDescription !== null) {
        meta.setAttribute("content", previousDescription);
      } else {
        meta.removeAttribute("content");
      }
    };
  }, [product]);

  function handleAddToCart() {
    if (!size) {
      setMessage("Please select your size first.");
      return;
    }

    if (!color) {
      setMessage("Please select a color.");
      return;
    }

    const result = addItem(product, size, color);
    setMessage(result.message);
  }

  return (
    <div className="bg-ivory">
      <div className="mx-auto max-w-[1440px] px-5 pt-8 md:px-12 lg:px-20">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-2 text-xs text-neutral-500"
        >
          <Link
            to="/"
            className="transition hover:text-burgundy"
          >
            Home
          </Link>

          <span aria-hidden="true">/</span>

          <Link
            to="/collections"
            className="transition hover:text-burgundy"
          >
            Collections
          </Link>

          <span aria-hidden="true">/</span>

          <span
            aria-current="page"
            className="font-semibold text-burgundy"
          >
            {product.name}
          </span>
        </nav>
      </div>

      <main className="mx-auto grid max-w-[1440px] gap-10 px-5 pb-20 pt-10 md:px-12 lg:grid-cols-2 lg:gap-16 lg:px-20 lg:pb-28">
        <div className="min-w-0">
          <div className="relative overflow-hidden bg-[#E8DFD4]">
            <img
              src={images[imageIndex]}
              alt={`${product.name}, view ${imageIndex + 1}`}
              className="aspect-[4/5] w-full object-cover"
            />

            {product.isNew && (
              <span className="absolute left-5 top-5 bg-ivory px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-burgundy">
                New Arrival
              </span>
            )}
          </div>

          {images.length > 1 && (
            <div
              className="mt-4 flex gap-3"
              aria-label="Product image gallery"
            >
              {images.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                  aria-pressed={imageIndex === index}
                  className={`h-24 w-20 overflow-hidden border-2 transition ${
                    imageIndex === index
                      ? "border-burgundy"
                      : "border-transparent hover:border-burgundy/40"
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
          )}

          <p className="mt-5 text-xs leading-6 text-neutral-500">
            Product imagery is for demonstration purposes.
          </p>
        </div>

        <div className="min-w-0 lg:pt-5">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
            Jeanyous Official / {product.category}
          </p>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-[-0.06em] md:text-6xl">
            {product.name}
          </h1>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-2xl font-extrabold text-burgundy">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <span className="text-base text-neutral-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-7 max-w-xl text-sm leading-8 text-neutral-600">
            {product.description}
          </p>

          <div className="mt-9 border-t border-burgundy/15 pt-8">
            <fieldset>
              <legend className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">
                01 / Select Size *
              </legend>

              <div className="flex flex-wrap gap-3">
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
                    className={`flex h-12 min-w-14 items-center justify-center border px-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      size === item
                        ? "border-burgundy bg-burgundy text-white"
                        : "border-burgundy/20 hover:border-burgundy"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-9">
              <legend className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">
                02 / Select Color
              </legend>

              <div className="flex flex-wrap gap-3">
                {product.colors.map((item) => (
                  <button
                    key={item}
                    type="button"
                    disabled={soldOut}
                    onClick={() => {
                      setColor(item);
                      setMessage("");
                    }}
                    aria-pressed={color === item}
                    className={`min-h-12 border px-5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                      color === item
                        ? "border-burgundy bg-burgundy text-white"
                        : "border-burgundy/20 hover:border-burgundy"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-9 flex items-center gap-2 text-sm">
            {soldOut ? (
              <span className="font-semibold text-red-700">
                Currently out of stock
              </span>
            ) : stockLimitReached ? (
              <span className="font-semibold text-amber-800">
                Maximum demo stock added to bag
              </span>
            ) : (
              <>
                <Check
                  size={18}
                  className="text-green-700"
                />
                <span>
                  Available (demo inventory)
                </span>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={soldOut || stockLimitReached}
            className="mt-6 flex w-full items-center justify-center gap-3 bg-burgundy px-6 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#5f080f] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag size={19} />

            {soldOut
              ? "Sold Out"
              : stockLimitReached
                ? "Stock Limit Reached"
                : "Add to Bag"}

            {!soldOut && !stockLimitReached && (
              <ArrowRight size={18} />
            )}
          </button>

          <p
            role="status"
            aria-live="polite"
            className="mt-4 min-h-5 text-sm font-medium text-burgundy"
          >
            {message}
          </p>

          <div className="mt-8 border-t border-burgundy/15 pt-7">
            <p className="text-xs font-bold uppercase tracking-[0.15em]">
              Product Information
            </p>

            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">
                  Product Code
                </dt>
                <dd className="font-semibold">
                  {product.id}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">
                  Category
                </dt>
                <dd className="font-semibold">
                  {product.category}
                </dd>
              </div>

              <div className="flex justify-between gap-4">
                <dt className="text-neutral-500">
                  Availability
                </dt>
                <dd className="font-semibold">
                  {soldOut ? "Unavailable" : "In stock (demo)"}
                </dd>
              </div>
            </dl>
          </div>

          <p className="mt-8 text-xs leading-6 text-neutral-500">
            Prices and stock are demo data. Checkout and
            live orders are not enabled yet.
          </p>

          <Link
            to="/collections"
            className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-burgundy hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Collections
          </Link>
        </div>
      </main>

      {relatedProducts.length > 0 && (
        <section className="border-t border-burgundy/10 bg-[#F7F1E8] py-20 md:py-28">
          <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-20">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
                  Complete your edit
                </p>

                <h2 className="text-4xl font-extrabold tracking-[-0.06em] md:text-6xl">
                  YOU MAY ALSO LIKE.
                </h2>
              </div>

              <Link
                to="/collections"
                className="inline-flex items-center gap-2 text-sm font-bold text-burgundy"
              >
                View Collections
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  product={item}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { productId } = useParams();

  const product = products.find(
    (item) => item.id === productId,
  );

  useEffect(() => {
    if (product) return;

    const previousTitle = document.title;
    document.title = "Product Not Found | Jeanyous Official";

    return () => {
      document.title = previousTitle;
    };
  }, [product]);

  if (!product) {
    return (
      <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
          Product unavailable
        </p>

        <h1 className="mt-5 text-4xl font-extrabold tracking-tight md:text-6xl">
          PRODUCT NOT FOUND.
        </h1>

        <p className="mt-5 max-w-md text-sm leading-7 text-neutral-600">
          This product does not exist in our current demo
          collection.
        </p>

        <Link
          to="/collections"
          className="mt-8 bg-burgundy px-8 py-4 text-xs font-bold uppercase tracking-widest text-white"
        >
          Browse Collections
        </Link>
      </main>
    );
  }

  return <ProductContent key={product.id} product={product} />;
}
