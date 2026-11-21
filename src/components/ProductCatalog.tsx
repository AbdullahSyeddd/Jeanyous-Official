
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "../data/products";
import ProductCard from "./ProductCard";

const categories = [
  "All",
  "T-Shirts",
  "Hoodies",
  "Trousers",
] as const;

type CategoryFilter = (typeof categories)[number];

type SortOption =
  | "featured"
  | "price-low"
  | "price-high"
  | "name";

export default function ProductCatalog() {
  const [category, setCategory] =
    useState<CategoryFilter>("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("featured");

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        category === "All" || product.category === category;

      const matchesSearch =
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    switch (sort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        break;
    }

    return result;
  }, [category, search, sort]);

  return (
    <section
      id="shop-products"
      className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-28 md:px-12 lg:px-20"
    >
      <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-burgundy">
            Discover the essentials
          </p>

          <h2 className="text-4xl font-extrabold tracking-[-0.06em] md:text-6xl">
            SHOP THE EDIT
            <span className="text-burgundy">.</span>
          </h2>

          <p className="mt-4 text-sm text-neutral-600">
            {filteredProducts.length} demo products
          </p>
        </div>

        <div className="relative w-full md:max-w-xs">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
          />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            aria-label="Search products"
            className="w-full border border-burgundy/20 bg-transparent py-3 pl-11 pr-4 text-sm outline-offset-2 focus:border-burgundy"
          />
        </div>
      </div>

      <div className="mb-9 flex flex-col justify-between gap-5 border-b border-burgundy/15 pb-6 md:flex-row md:items-center">
        <div
          className="flex flex-wrap gap-2"
          aria-label="Product category filters"
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                category === item
                  ? "border-burgundy bg-burgundy text-white"
                  : "border-burgundy/20 hover:border-burgundy"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <SlidersHorizontal size={17} aria-hidden="true" />

          <label htmlFor="product-sort" className="text-sm">
            Sort:
          </label>

          <select
            id="product-sort"
            value={sort}
            onChange={(event) =>
              setSort(event.target.value as SortOption)
            }
            className="min-h-11 border border-burgundy/20 bg-ivory px-3 text-sm"
          >
            <option value="featured">Featured</option>
            <option value="price-low">
              Price: Low to High
            </option>
            <option value="price-high">
              Price: High to Low
            </option>
            <option value="name">Name: A to Z</option>
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center">
          <h3 className="text-2xl font-bold">
            No products found
          </h3>

          <p className="mt-3 text-neutral-600">
            Try another search or category.
          </p>

          <button
            type="button"
            onClick={() => {
              setSearch("");
              setCategory("All");
              setSort("featured");
            }}
            className="mt-6 bg-burgundy px-6 py-3 text-sm font-semibold text-white"
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}
