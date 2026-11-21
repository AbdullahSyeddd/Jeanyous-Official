
import { useState, type FormEvent } from "react";
import { Link } from "react-router";
import { ArrowLeft, LockKeyhole, Truck } from "lucide-react";
import {
  getCustomPrint,
  getItemUnitPrice,
  useCart,
} from "../context/CartContext";
import { formatPrice, products } from "../data/products";

const cities = [
  "Lahore",
  "Karachi",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Other",
];

export default function CheckoutPage() {
  const { items, subtotal, cartCount } = useCart();
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(
      "Checkout preview is ready. Real orders will be available after the ordering system is connected.",
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">
          YOUR BAG IS EMPTY.
        </h1>
        <p className="mt-4 text-neutral-600">
          Add something you love before checking out.
        </p>
        <Link
          to="/collections"
          className="mt-8 bg-burgundy px-8 py-4 text-xs font-bold uppercase tracking-widest text-white"
        >
          Explore Collections
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-5 py-12 md:px-10 md:py-20">
      <Link
        to="/collections"
        className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-burgundy"
      >
        <ArrowLeft size={17} /> Continue Shopping
      </Link>

      <div className="mt-10">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
          Jeanyous Official
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">
          CHECKOUT.
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Complete your delivery details.
        </p>
      </div>

      <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_420px]">
        <form
          id="checkout-form"
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          <div>
            <h2 className="mb-6 text-xl font-bold">
              Contact Information
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Full Name"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="Your full name"
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                pattern="(?:\+92|0092|0)3[0-9]{9}"
                title="Enter a Pakistani mobile number, e.g. 03001234567"
                placeholder="03001234567"
              />
            </div>

            <div className="mt-5">
              <Field
                label="Email Address (Optional)"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-xl font-bold">
              Delivery Address
            </h2>

            <div className="space-y-5">
              <div>
                <label
                  htmlFor="checkout-address"
                  className="mb-2 block text-sm font-semibold"
                >
                  Complete Address
                </label>
                <textarea
                  id="checkout-address"
                  name="address"
                  autoComplete="street-address"
                  required
                  minLength={10}
                  maxLength={300}
                  rows={3}
                  placeholder="House number, street, area"
                  className="w-full resize-y border border-burgundy/20 bg-transparent px-4 py-3 outline-offset-2 focus:border-burgundy"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="checkout-city"
                    className="mb-2 block text-sm font-semibold"
                  >
                    City
                  </label>
                  <select
                    id="checkout-city"
                    name="city"
                    required
                    defaultValue=""
                    className="min-h-13 w-full border border-burgundy/20 bg-ivory px-4 py-3 outline-offset-2 focus:border-burgundy"
                  >
                    <option value="" disabled>
                      Select your city
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                <Field
                  label="Postal Code (Optional)"
                  name="postalCode"
                  autoComplete="postal-code"
                  inputMode="numeric"
                  pattern="[0-9]{5}"
                  title="Enter a 5-digit postal code"
                  placeholder="54000"
                />
              </div>

              <Field
                label="Additional Instructions (Optional)"
                name="instructions"
                maxLength={200}
                placeholder="Landmark or delivery instructions"
              />
            </div>
          </div>

          <div>
            <h2 className="mb-5 text-xl font-bold">
              Payment Method
            </h2>
            <div className="flex items-center gap-4 border border-burgundy bg-burgundy/5 p-5">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked
                readOnly
                aria-label="Cash on Delivery"
                className="accent-burgundy"
              />
              <div className="flex-1">
                <p className="text-sm font-bold">
                  Cash on Delivery
                </p>
                <p className="mt-1 text-xs text-neutral-600">
                  Pay when your order arrives.
                </p>
              </div>
              <Truck className="text-burgundy" size={23} />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-3 bg-burgundy px-6 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#5f080f]"
          >
            <LockKeyhole size={17} />
            Preview Place Order
          </button>

          <p
            role="status"
            aria-live="polite"
            className="text-sm leading-6 text-burgundy"
          >
            {message}
          </p>

          <p className="text-xs leading-6 text-neutral-500">
            Demo checkout only. No payment is collected and no order is placed.
          </p>
        </form>

        <aside className="border border-burgundy/15 bg-[#F5EBDD] p-6 sm:p-8 lg:sticky lg:top-28">
          <h2 className="text-xl font-extrabold">
            ORDER SUMMARY
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            {cartCount} {cartCount === 1 ? "item" : "items"}
          </p>

          <div className="mt-7 space-y-5">
            {items.map((item) => {
              const product = products.find(
                (entry) => entry.id === item.productId,
              );
              const isCustom = item.kind === "custom";
              const name = isCustom
                ? "Signature Custom Tee"
                : product?.name ?? "Product";

              return (
                <div
                  key={item.key}
                  className="flex gap-4 border-b border-burgundy/10 pb-5"
                >
                  {product ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-16 shrink-0 object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-16 shrink-0 items-center justify-center bg-burgundy/10 text-xs font-bold text-burgundy">
                      J.
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold">{name}</p>
                    <p className="mt-1 text-xs text-neutral-600">
                      {item.size} / {item.color}
                    </p>
                    {item.kind === "custom" && (
                      <p className="mt-1 text-xs text-neutral-600">
                        {getCustomPrint(item.printId)?.name}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-neutral-600">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="shrink-0 text-sm font-bold text-burgundy">
                    {formatPrice(getItemUnitPrice(item) * item.quantity)}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span className="text-neutral-600">
                To be confirmed
              </span>
            </div>
            <div className="flex justify-between border-t border-burgundy/20 pt-5 text-lg font-extrabold">
              <span>Subtotal</span>
              <span className="text-burgundy">
                {formatPrice(subtotal)}
              </span>
            </div>
          </div>

          <p className="mt-5 text-xs leading-6 text-neutral-500">
            Final total will include delivery charges once configured.
          </p>
        </aside>
      </div>
    </section>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  title?: string;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "numeric";
};

function Field({
  label,
  name,
  type = "text",
  required,
  minLength,
  maxLength,
  pattern,
  title,
  placeholder,
  autoComplete,
  inputMode,
}: FieldProps) {
  const id = `checkout-${name}`;

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold"
      >
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        pattern={pattern}
        title={title}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        className="min-h-13 w-full border border-burgundy/20 bg-transparent px-4 py-3 outline-offset-2 focus:border-burgundy"
      />
    </div>
  );
}
