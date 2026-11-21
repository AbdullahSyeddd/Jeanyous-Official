
import CustomizationStudio from "../components/CustomizationStudio";

export default function CustomizePage() {
  return (
    <>
      <section className="bg-burgundy px-5 py-16 text-ivory md:px-12 md:py-20">
        <div className="mx-auto max-w-[1280px]">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em]">
            Jeanyous / Personalization
          </p>

          <h1 className="text-5xl font-extrabold tracking-[-0.07em] md:text-7xl">
            CUSTOM STUDIO.
          </h1>

          <p className="mt-5 max-w-lg text-sm leading-7 text-ivory/75">
            Your shirt. Your color. Your signature print.
            Make it personal.
          </p>
        </div>
      </section>

      <CustomizationStudio />
    </>
  );
}
