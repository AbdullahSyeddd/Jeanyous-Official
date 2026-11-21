
import { useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";

type Tab = "profile" | "orders" | "addresses";

const tabs: { id: Tab; label: string; icon: typeof UserRound }[] = [
  { id: "profile", label: "My Profile", icon: UserRound },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "addresses", label: "Saved Addresses", icon: MapPin },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <section className="mx-auto min-h-[65vh] max-w-[1200px] px-5 py-14 md:px-10 md:py-20">
      <p className="text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
        Jeanyous Official
      </p>

      <h1 className="mt-3 text-4xl font-extrabold tracking-[-0.06em] sm:text-5xl">
        MY ACCOUNT.
      </h1>

      <p className="mt-4 text-sm text-neutral-600">
        Your personal space at Jeanyous.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-[250px_1fr]">
        <nav
          aria-label="Account sections"
          className="flex gap-2 overflow-x-auto border-b border-burgundy/15 pb-4 md:flex-col md:border-b-0 md:border-r md:pb-0 md:pr-6"
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              aria-current={activeTab === id ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition ${
                activeTab === id
                  ? "bg-burgundy text-white"
                  : "text-neutral-600 hover:bg-burgundy/5 hover:text-burgundy"
              }`}
            >
              <Icon size={19} strokeWidth={1.7} />
              {label}
            </button>
          ))}
        </nav>

        <div className="min-h-80">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-2xl font-bold">My Profile</h2>
              <p className="mt-3 text-sm leading-7 text-neutral-600">
                Your account information will appear here once you sign in.
              </p>

              <div className="mt-8 border border-burgundy/15 bg-[#F5EBDD] p-7">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                    <UserRound size={26} />
                  </div>
                  <div>
                    <p className="font-bold">Guest Visitor</p>
                    <p className="mt-1 text-xs text-neutral-600">
                      Not signed in
                    </p>
                  </div>
                </div>

                <p className="mt-6 text-sm leading-7 text-neutral-600">
                  Account management will be available after
                  authentication is connected.
                </p>

                <Link
                  to="/login"
                  className="mt-6 inline-flex items-center gap-2 bg-burgundy px-6 py-3 text-xs font-bold uppercase tracking-widest text-white"
                >
                  Sign In
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold">My Orders</h2>

              <div className="mt-8 flex flex-col items-center border border-burgundy/15 px-6 py-14 text-center">
                <Package
                  size={44}
                  strokeWidth={1.3}
                  className="text-burgundy/60"
                />

                <h3 className="mt-5 text-lg font-bold">
                  No orders to display
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600">
                  Your order history will appear here once
                  the ordering system is connected.
                </p>

                <Link
                  to="/collections"
                  className="mt-7 inline-flex items-center gap-2 bg-burgundy px-6 py-3 text-xs font-bold uppercase tracking-widest text-white"
                >
                  Explore Collections
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h2 className="text-2xl font-bold">Saved Addresses</h2>

              <div className="mt-8 flex flex-col items-center border border-burgundy/15 px-6 py-14 text-center">
                <MapPin
                  size={44}
                  strokeWidth={1.3}
                  className="text-burgundy/60"
                />

                <h3 className="mt-5 text-lg font-bold">
                  No saved addresses
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-7 text-neutral-600">
                  You will be able to manage your delivery
                  addresses once accounts are enabled.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
