import { useState } from "react";
import { CUSTOM_TEE_BASE_PRICE, customPrints, useCart } from "../context/CartContext";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Check,
  RotateCcw,
  Sparkles,
} from "lucide-react";

type ShirtColor = {
  id: string;
  label: string;
  fill: string;
  ink: string;
};

type PrintDesign = {
  id: string;
  name: string;
  price: number;
};

const colors: ShirtColor[] = [
  {
    id: "ivory",
    label: "Ivory",
    fill: "#F3E9D8",
    ink: "#790B13",
  },
  {
    id: "black",
    label: "Black",
    fill: "#242424",
    ink: "#FFF0DC",
  },
  {
    id: "burgundy",
    label: "Burgundy",
    fill: "#790B13",
    ink: "#FFF0DC",
  },
  {
    id: "grey",
    label: "Grey",
    fill: "#A6A5A2",
    ink: "#252525",
  },
];

const designs: PrintDesign[] = customPrints.map((print) => ({ ...print }));

const sizes = ["S", "M", "L", "XL"];

const BASE_PRICE = CUSTOM_TEE_BASE_PRICE;

function PrintArtwork({
  design,
  ink,
}: {
  design: string;
  ink: string;
}) {
  if (design === "none") return null;

  if (design === "original") {
    return (
      <g fill={ink} textAnchor="middle">
        <text
          x="200"
          y="222"
          fontSize="24"
          fontWeight="900"
          letterSpacing="-1"
        >
          JEANYOUS
        </text>
        <text
          x="200"
          y="237"
          fontSize="7"
          letterSpacing="3"
        >
          BE ORIGINAL
        </text>
        <path
          d="M147 245 H253"
          stroke={ink}
          strokeWidth="1"
        />
      </g>
    );
  }

  if (design === "freedom") {
    return (
      <g fill={ink} textAnchor="middle">
        <text
          x="200"
          y="211"
          fontSize="12"
          fontWeight="700"
          letterSpacing="3"
        >
          LIVE FREE
        </text>
        <text
          x="200"
          y="237"
          fontSize="30"
          fontWeight="900"
          letterSpacing="-2"
        >
          CREATE.
        </text>
        <text
          x="200"
          y="252"
          fontSize="7"
          letterSpacing="2"
        >
          YOUR OWN PATH
        </text>
      </g>
    );
  }

  if (design === "street") {
    return (
      <g
        fill="none"
        stroke={ink}
        strokeWidth="2"
      >
        <circle cx="200" cy="223" r="37" />
        <circle cx="200" cy="223" r="32" />
        <text
          x="200"
          y="218"
          textAnchor="middle"
          fill={ink}
          stroke="none"
          fontSize="11"
          fontWeight="900"
        >
          STREET
        </text>
        <text
          x="200"
          y="232"
          textAnchor="middle"
          fill={ink}
          stroke="none"
          fontSize="11"
          fontWeight="900"
        >
          CLUB
        </text>
        <path d="M181 240 H219" />
      </g>
    );
  }

  return (
    <g fill={ink} textAnchor="middle">
      <text
        x="200"
        y="217"
        fontSize="32"
        fontWeight="900"
        letterSpacing="-3"
      >
        J.
      </text>
      <text
        x="200"
        y="235"
        fontSize="7"
        letterSpacing="2"
      >
        OFFICIAL
      </text>
    </g>
  );
}

function ShirtPreview({
  color,
  design,
}: {
  color: ShirtColor;
  design: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 460"
      role="img"
      aria-label={`${color.label} T-shirt with ${
        designs.find((item) => item.id === design)?.name
      } design`}
      className="mx-auto h-auto w-full max-w-[480px]"
    >
      <defs>
        <linearGradient
          id="shirt-lighting"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop offset="0%" stopColor="#000" stopOpacity=".10" />
          <stop offset="30%" stopColor="#fff" stopOpacity=".06" />
          <stop offset="75%" stopColor="#fff" stopOpacity=".02" />
          <stop offset="100%" stopColor="#000" stopOpacity=".13" />
        </linearGradient>

        <filter id="shirt-shadow">
          <feDropShadow
            dx="0"
            dy="13"
            stdDeviation="12"
            floodOpacity=".15"
          />
        </filter>
      </defs>

      <motion.g
        key={color.id}
        initial={
          reducedMotion
            ? false
            : { opacity: 0.7, scale: 0.99 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        filter="url(#shirt-shadow)"
      >
        <path
          d="M142 75
             L110 91
             L47 151
             L86 216
             L126 191
             L126 388
             Q200 404 274 388
             L274 191
             L314 216
             L353 151
             L290 91
             L258 75
             Q200 102 142 75 Z"
          fill={color.fill}
          stroke="#000"
          strokeOpacity=".12"
          strokeWidth="1.5"
        />

        <path
          d="M142 75
             L110 91
             L47 151
             L86 216
             L126 191
             L126 388
             Q200 404 274 388
             L274 191
             L314 216
             L353 151
             L290 91
             L258 75
             Q200 102 142 75 Z"
          fill="url(#shirt-lighting)"
        />

        <path
          d="M164 82 Q200 130 236 82"
          fill="none"
          stroke="#000"
          strokeOpacity=".23"
          strokeWidth="7"
        />

        <path
          d="M126 191 L130 369 M274 191 L270 369"
          fill="none"
          stroke="#000"
          strokeOpacity=".07"
          strokeWidth="2"
        />

        <path
          d="M128 382 Q200 394 272 382"
          fill="none"
          stroke="#000"
          strokeOpacity=".13"
          strokeWidth="2"
        />
      </motion.g>

      <motion.g
        key={design + color.id}
        initial={
          reducedMotion
            ? false
            : { opacity: 0, scale: 0.9 }
        }
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "200px 225px" }}
      >
        <PrintArtwork
          design={design}
          ink={color.ink}
        />
      </motion.g>
    </svg>
  );
}

export default function CustomizationStudio() {
  const { addCustomItem } = useCart();
  const [feedback, setFeedback] = useState("");
  const [colorId, setColorId] = useState("ivory");
  const [designId, setDesignId] = useState("original");
  const [size, setSize] = useState("M");

  const selectedColor =
    colors.find((item) => item.id === colorId) ?? colors[0];

  const selectedDesign =
    designs.find((item) => item.id === designId) ?? designs[0];

  const total = BASE_PRICE + selectedDesign.price;

  const reset = () => {
    setFeedback("");
    setColorId("ivory");
    setDesignId("original");
    setSize("M");
  };

  const addToBag = () => {
    const result = addCustomItem(size, selectedColor.label, designId);
    setFeedback(result.message);
  };

  return (
    <section
      id="customize"
      className="scroll-mt-24 bg-[#F7F1E8] py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-5 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="mb-4 flex items-center gap-2 text-burgundy">
            <Sparkles size={17} />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">
              Make it yours
            </span>
          </div>

          <h2 className="max-w-4xl text-5xl font-extrabold leading-[1.05] tracking-[-0.07em] md:text-7xl">
            YOUR STYLE.
            <br />
            <span className="text-burgundy">
              YOUR RULES.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600">
            Choose your favorite color, pick a signature
            print and create your own everyday essential.
          </p>
        </motion.div>

        <div className="grid overflow-hidden border border-burgundy/10 bg-ivory lg:grid-cols-2">
          <div className="relative flex min-h-[430px] flex-col items-center justify-center bg-[#E8DFD4] px-5 py-10 sm:min-h-[560px]">
            <span className="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[0.25em] text-burgundy">
              Live preview / Front
            </span>

            <ShirtPreview
              color={selectedColor}
              design={designId}
            />

            <span className="absolute bottom-6 left-6 text-[10px] uppercase tracking-[0.15em] text-neutral-600">
              Digital mockup. Actual print may vary.
            </span>
          </div>

          <div className="flex flex-col p-6 sm:p-10 lg:p-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-burgundy">
                  Custom essentials
                </p>

                <h3 className="mt-3 text-3xl font-extrabold tracking-tight">
                  Signature Tee
                </h3>
              </div>

              <button
                type="button"
                onClick={reset}
                aria-label="Reset customization"
                className="flex items-center gap-2 text-xs font-semibold text-burgundy hover:underline"
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>

            <p className="mt-5 text-sm leading-7 text-neutral-600">
              A relaxed unisex T-shirt with your choice
              of preset graphic print.
            </p>

            <fieldset className="mt-9">
              <legend className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">
                01 / Choose Color
              </legend>

              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => setColorId(color.id)}
                    aria-label={`Select ${color.label}`}
                    aria-pressed={colorId === color.id}
                    className="group flex flex-col items-center gap-2"
                  >
                    <span
                      className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-transform group-hover:scale-105 ${
                        colorId === color.id
                          ? "border-burgundy"
                          : "border-transparent"
                      }`}
                    >
                      <span
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-black/15"
                        style={{ backgroundColor: color.fill }}
                      >
                        {colorId === color.id && (
                          <Check
                            size={17}
                            color={color.ink}
                          />
                        )}
                      </span>
                    </span>

                    <span className="text-xs">
                      {color.label}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-9">
              <legend className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">
                02 / Select Your Print
              </legend>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {designs.map((design) => (
                  <button
                    key={design.id}
                    type="button"
                    onClick={() => setDesignId(design.id)}
                    aria-pressed={designId === design.id}
                    className={`min-h-24 border p-3 text-left transition-all ${
                      designId === design.id
                        ? "border-burgundy bg-burgundy text-white"
                        : "border-burgundy/15 hover:border-burgundy"
                    }`}
                  >
                    <span className="block text-sm font-bold">
                      {design.name}
                    </span>

                    <span className="mt-2 block text-xs opacity-75">
                      {design.price === 0
                        ? "Included"
                        : `+ Rs. ${design.price}`}
                    </span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mt-9">
              <legend className="mb-4 text-xs font-bold uppercase tracking-[0.15em]">
                03 / Select Size
              </legend>

              <div className="flex flex-wrap gap-3">
                {sizes.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSize(item)}
                    aria-pressed={size === item}
                    className={`flex h-12 w-14 items-center justify-center border text-sm font-bold transition ${
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

            <div className="mt-10 border-t border-burgundy/15 pt-7">
              <div className="flex justify-between text-sm text-neutral-600">
                <span>Base T-shirt</span>
                <span>Rs. {BASE_PRICE.toLocaleString("en-PK")}</span>
              </div>

              <div className="mt-3 flex justify-between text-sm text-neutral-600">
                <span>Selected print</span>
                <span>
                  Rs. {selectedDesign.price.toLocaleString("en-PK")}
                </span>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-burgundy/15 pt-5">
                <span className="font-bold">Total</span>
                <span className="text-3xl font-extrabold text-burgundy">
                  Rs. {total.toLocaleString("en-PK")}
                </span>
              </div>

              <button
                type="button"
                onClick={addToBag}
                className="mt-7 flex w-full items-center justify-between bg-burgundy px-6 py-5 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#5E080F]"
              >
                Add Customized Tee to Bag
                <ArrowUpRight size={20} />
              </button>

              <p role="status" aria-live="polite" className="mt-3 text-center text-xs text-burgundy">
                {feedback}
              </p>
              <p className="mt-4 text-center text-xs leading-6 text-neutral-500">
                Demo customization. Final pricing and availability
                will be confirmed before checkout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
