
import { useState } from "react";
import {
  ChevronDown,
  Clock3,
  Mail,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router";
import PageTransition from "../components/PageTransition";

const faqs = [
  {
    question: "Do you deliver across Pakistan?",
    answer:
      "Pakistan-wide delivery is planned. Available delivery areas and charges will be confirmed before checkout goes live.",
  },
  {
    question: "Can I customize my T-shirt?",
    answer:
      "Yes. Our customization studio currently lets you preview preset designs, colors and sizes. Ordering will be enabled after checkout integration.",
  },
  {
    question: "What payment methods will be available?",
    answer:
      "Cash on Delivery is the planned payment method for launch. Final availability will be confirmed before orders open.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Order tracking and status updates are planned for the full store launch. They are not active in the current preview.",
  },
  {
    question: "Can I exchange or return an item?",
    answer:
      "Our exchange and return policy is being finalized. Please check the published policy before placing an order.",
  },
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <PageTransition>
      <section className="relative overflow-hidden bg-burgundy px-5 py-24 text-ivory md:px-12 md:py-32">
        <div className="pointer-events-none absolute -right-8 top-0 select-none text-[clamp(12rem,30vw,30rem)] font-black leading-none text-white/[0.04]">
          ?
        </div>

        <div className="relative mx-auto max-w-[1280px]">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em]">
            Jeanyous / Customer Care
          </p>

          <h1 className="text-[clamp(4rem,10vw,9rem)] font-extrabold leading-none tracking-[-0.075em]">
            LET'S TALK<span className="text-[#E7B8A8]">.</span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-8 text-ivory/75">
            Have a question about sizing, products or
            customization? Find useful information below.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-12 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-20">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
            Reach out
          </p>

          <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.06em] md:text-6xl">
            WE'RE HERE
            <br />
            TO HELP.
          </h2>

          <p className="mt-6 max-w-md text-sm leading-7 text-neutral-600">
            Our customer support channels are being prepared.
            Verified contact details will be published
            before the official store launch.
          </p>

          <div className="mt-12 space-y-8">
            <div className="flex gap-5 border-b border-burgundy/10 pb-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-burgundy/10 text-burgundy">
                <Mail size={22} />
              </div>

              <div>
                <h3 className="font-bold">Email Support</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Official email awaiting confirmation
                </p>
              </div>
            </div>

            <div className="flex gap-5 border-b border-burgundy/10 pb-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-burgundy/10 text-burgundy">
                <MessageCircle size={22} />
              </div>

              <div>
                <h3 className="font-bold">WhatsApp Support</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Official number awaiting confirmation
                </p>
              </div>
            </div>

            <div className="flex gap-5 border-b border-burgundy/10 pb-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-burgundy/10 text-burgundy">
                <Clock3 size={22} />
              </div>

              <div>
                <h3 className="font-bold">Support Hours</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Schedule to be announced
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border border-burgundy/10 bg-[#F7F1E8] p-6 sm:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-burgundy">
            Contact form preview
          </p>

          <h2 className="text-3xl font-extrabold tracking-tight">
            SEND A MESSAGE.
          </h2>

          <p className="mt-4 text-sm leading-7 text-neutral-600">
            This form is a design preview. Messages cannot
            be submitted until secure backend processing
            and email delivery are configured.
          </p>

          <form
            className="mt-9 space-y-6"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider"
                >
                  Full Name
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your full name"
                  disabled
                  className="w-full border border-burgundy/20 bg-ivory px-4 py-3.5 text-sm disabled:opacity-60"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider"
                >
                  Email Address
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  disabled
                  className="w-full border border-burgundy/20 bg-ivory px-4 py-3.5 text-sm disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-subject"
                className="mb-2 block text-xs font-bold uppercase tracking-wider"
              >
                Subject
              </label>

              <select
                id="contact-subject"
                name="subject"
                disabled
                defaultValue=""
                className="w-full border border-burgundy/20 bg-ivory px-4 py-3.5 text-sm disabled:opacity-60"
              >
                <option value="" disabled>
                  Select a topic
                </option>
                <option value="product">Product Inquiry</option>
                <option value="size">Size & Fit</option>
                <option value="customization">
                  Customization
                </option>
                <option value="order">Order Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-xs font-bold uppercase tracking-wider"
              >
                Your Message
              </label>

              <textarea
                id="contact-message"
                name="message"
                rows={6}
                disabled
                placeholder="Tell us how we can help..."
                className="w-full resize-y border border-burgundy/20 bg-ivory px-4 py-3.5 text-sm disabled:opacity-60"
              />
            </div>

            <button
              type="submit"
              disabled
              className="flex w-full items-center justify-between bg-burgundy px-6 py-4 text-xs font-bold uppercase tracking-widest text-white opacity-60"
            >
              Submission Coming Soon
              <ArrowUpRight size={18} />
            </button>
          </form>
        </div>
      </section>

      <section className="bg-[#F5EBDD] px-5 py-24 md:px-12 md:py-28">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
              Quick answers
            </p>

            <h2 className="text-4xl font-extrabold leading-tight tracking-[-0.06em] md:text-6xl">
              GOOD
              <br />
              QUESTIONS.
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-7 text-neutral-600">
              Here's what you need to know about our
              upcoming shopping experience.
            </p>
          </div>

          <div className="border-t border-burgundy/20">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-burgundy/20"
                >
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`contact-faq-${index}`}
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-5 py-6 text-left text-base font-bold sm:text-lg"
                    >
                      {faq.question}

                      <ChevronDown
                        size={20}
                        className={`shrink-0 text-burgundy transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  <div
                    id={`contact-faq-${index}`}
                    hidden={!isOpen}
                    className="pb-7 pr-8 text-sm leading-7 text-neutral-600"
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 text-center md:px-12">
        <h2 className="text-4xl font-extrabold tracking-[-0.06em] md:text-6xl">
          READY TO EXPLORE?
        </h2>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-neutral-600">
          Find your next everyday essential in the
          Jeanyous collection.
        </p>

        <Link
          to="/collections"
          className="mt-8 inline-flex items-center gap-3 bg-burgundy px-7 py-4 text-xs font-bold uppercase tracking-widest text-white"
        >
          Browse Collections
          <ArrowUpRight size={18} />
        </Link>
      </section>
    </PageTransition>
  );
}
