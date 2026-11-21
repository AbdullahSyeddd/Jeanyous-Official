
import { Link } from "react-router";
import {
  ArrowRight,
  Check,
  Package,
  ShoppingBag,
} from "lucide-react";

export default function OrderConfirmationPage() {
  return (
    <section className="mx-auto flex min-h-[75vh] max-w-[760px] flex-col items-center justify-center px-5 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
        Jeanyous Official
      </p>

      <div className="mt-9 flex h-24 w-24 items-center justify-center rounded-full border border-burgundy/20 bg-burgundy/5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-burgundy text-white">
          <Check size={32} strokeWidth={1.8} />
        </div>
      </div>

      <h1 className="mt-9 text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">
        ALMOST THERE.
      </h1>

      <p className="mt-5 max-w-lg text-base leading-8 text-neutral-600">
        Your shopping experience is coming together.
        Once our ordering system is connected, you will
        receive your order confirmation here.
      </p>

      <div className="mt-9 w-full border border-burgundy/15 bg-[#F5EBDD] p-7 text-left sm:p-9">
        <div className="flex items-start gap-4">
          <Package
            size={27}
            strokeWidth={1.5}
            className="shrink-0 text-burgundy"
          />

          <div>
            <h2 className="text-base font-bold">
              Order Confirmation Preview
            </h2>

            <p className="mt-2 text-sm leading-7 text-neutral-600">
              This is a frontend preview only. No order has
              been submitted, no payment has been processed,
              and no confirmation email has been sent.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-9 flex w-full flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/collections"
          className="inline-flex items-center justify-center gap-3 bg-burgundy px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-[#5f080f]"
        >
          <ShoppingBag size={17} />
          Continue Shopping
        </Link>

        <Link
          to="/account"
          className="inline-flex items-center justify-center gap-3 border border-burgundy px-8 py-4 text-xs font-bold uppercase tracking-widest text-burgundy transition hover:bg-burgundy/5"
        >
          My Account
          <ArrowRight size={17} />
        </Link>
      </div>
    </section>
  );
}
