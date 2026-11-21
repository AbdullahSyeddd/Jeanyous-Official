
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";
import {
  CUSTOM_TEE_DEMO_LIMIT,
  getCustomPrint,
  getItemUnitPrice,
  useCart,
} from "./CartContext";
import { formatPrice, products } from "../data/products";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeItem,
    cartCount,
    subtotal,
  } = useCart();

  const navigate = useNavigate();
  const reducedMotion = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isCartOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";

    const focusFrame = requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setCartOpen(false);
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const elements = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (elements.length === 0) return;

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
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, [isCartOpen, setCartOpen]);

  function goToCheckout() {
    setCartOpen(false);
    navigate("/checkout");
  }

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-[300]">
          <motion.button
            type="button"
            aria-label="Close shopping bag"
            onClick={() => setCartOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            className="absolute inset-0 h-full w-full bg-black/60"
          />

          <motion.aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              duration: reducedMotion ? 0 : 0.35,
              ease: "easeInOut",
            }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[480px] flex-col bg-ivory shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-burgundy/15 px-6 py-6">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.25em] text-burgundy">
                  Jeanyous Official
                </p>
                <h2
                  id="cart-title"
                  className="text-2xl font-extrabold tracking-tight"
                >
                  YOUR BAG ({cartCount})
                </h2>
              </div>

              <button
                ref={closeRef}
                type="button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
                className="rounded-full p-2 transition hover:bg-burgundy/10"
              >
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <ShoppingBag
                  size={52}
                  strokeWidth={1.1}
                  className="text-burgundy/50"
                />

                <h3 className="mt-6 text-2xl font-bold">
                  Your bag is empty.
                </h3>

                <p className="mt-3 text-sm leading-7 text-neutral-600">
                  Discover your next favorite everyday essential.
                </p>

                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="mt-8 bg-burgundy px-8 py-4 text-xs font-bold uppercase tracking-widest text-white"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-6">
                  {items.map((item) => {
                    const product = products.find(
                      (entry) => entry.id === item.productId,
                    );

                    const isCustom = item.kind === "custom";
                    const print =
                      item.kind === "custom"
                        ? getCustomPrint(item.printId)
                        : null;

                    if (!isCustom && !product) return null;

                    const itemName = isCustom
                      ? "Signature Custom Tee"
                      : product!.name;

                    const totalForProduct = items
                      .filter(
                        (entry) => entry.productId === item.productId,
                      )
                      .reduce(
                        (sum, entry) => sum + entry.quantity,
                        0,
                      );

                    const canIncrease = isCustom
                      ? item.quantity < CUSTOM_TEE_DEMO_LIMIT
                      : totalForProduct < product!.stock;

                    return (
                      <article
                        key={item.key}
                        className="flex gap-4 border-b border-burgundy/10 pb-6"
                      >
                        {isCustom ? (
                          <div className="flex h-32 w-24 shrink-0 items-center justify-center bg-[#E8DFD4]">
                            <div
                              className="flex h-20 w-16 items-center justify-center rounded-t-xl text-xs font-black"
                              style={{
                                backgroundColor: (
                                  {
                                    Ivory: "#F3E9D8",
                                    Black: "#242424",
                                    Burgundy: "#790B13",
                                    Grey: "#A6A5A2",
                                  } as Record<string, string>
                                )[item.color],
                                color:
                                  item.color === "Ivory" ||
                                  item.color === "Grey"
                                    ? "#790B13"
                                    : "#FFF0DC",
                              }}
                            >
                              {item.kind === "custom" &&
                              item.printId !== "none"
                                ? "J."
                                : ""}
                            </div>
                          </div>
                        ) : (
                          <img
                            src={product!.image}
                            alt={product!.name}
                            className="h-32 w-24 shrink-0 bg-neutral-200 object-cover"
                          />
                        )}

                        <div className="flex min-w-0 flex-1 flex-col">
                          <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                            {isCustom
                              ? "Customized T-Shirt"
                              : product!.category}
                          </p>

                          <h3 className="mt-1 text-sm font-bold">
                            {itemName}
                          </h3>

                          <p className="mt-2 text-xs text-neutral-600">
                            Size: {item.size} | Color: {item.color}
                          </p>

                          {isCustom && (
                            <p className="mt-1 text-xs text-neutral-600">
                              Print: {print?.name ?? "Unknown"}
                              <span className="block">
                                Unit:{" "}
                                {formatPrice(getItemUnitPrice(item))}
                              </span>
                            </p>
                          )}

                          <p className="mt-2 text-sm font-bold text-burgundy">
                            {formatPrice(
                              getItemUnitPrice(item) * item.quantity,
                            )}
                          </p>

                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-burgundy/20">
                              <button
                                type="button"
                                aria-label={`Decrease quantity of ${itemName}, size ${item.size}`}
                                onClick={() =>
                                  updateQuantity(
                                    item.key,
                                    item.quantity - 1,
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center hover:bg-burgundy/10"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="min-w-8 text-center text-xs font-semibold">
                                {item.quantity}
                              </span>

                              <button
                                type="button"
                                aria-label={`Increase quantity of ${itemName}, size ${item.size}`}
                                disabled={!canIncrease}
                                onClick={() =>
                                  updateQuantity(
                                    item.key,
                                    item.quantity + 1,
                                  )
                                }
                                className="flex h-9 w-9 items-center justify-center hover:bg-burgundy/10 disabled:opacity-30"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              type="button"
                              aria-label={`Remove ${itemName}, size ${item.size}`}
                              onClick={() => removeItem(item.key)}
                              className="p-2 text-neutral-500 transition hover:text-burgundy"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="border-t border-burgundy/15 bg-ivory px-6 py-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      Subtotal
                    </span>
                    <span className="text-xl font-extrabold text-burgundy">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="mb-5 text-xs leading-6 text-neutral-600">
                    Delivery charges will be confirmed later.
                    All prices and inventory are currently demo data.
                  </p>

                  <button
                    type="button"
                    onClick={goToCheckout}
                    className="flex w-full items-center justify-between bg-burgundy px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#5f080f]"
                  >
                    Proceed to Checkout
                    <ArrowRight size={19} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 w-full py-3 text-xs font-bold uppercase tracking-widest text-burgundy"
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
