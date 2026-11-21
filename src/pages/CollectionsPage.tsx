
import ProductCatalog from "../components/ProductCatalog";

export default function CollectionsPage() {
  return (
    <>
      <section className="bg-burgundy px-5 py-20 text-ivory md:px-12 md:py-28">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em]">
            Jeanyous Official / Shop
          </p>

          <h1 className="text-5xl font-extrabold tracking-[-0.07em] md:text-8xl">
            ALL COLLECTIONS.
          </h1>

          <p className="mt-6 max-w-lg text-sm leading-7 text-ivory/75">
            Explore our full selection of T-shirts, hoodies
            and trousers. Find your everyday fit.
          </p>
        </div>
      </section>

      <div className="pt-20">
        <ProductCatalog />
      </div>
    </>
  );
}
