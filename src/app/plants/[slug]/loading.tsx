/** Skeleton for a plant page while a non-prerendered slug streams. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-6 py-10 sm:px-8" aria-busy="true" aria-label="Loading">
      <div className="mb-8 flex justify-between">
        <div className="h-7 w-28 rounded-full bg-black/5" />
        <div className="h-7 w-28 rounded-full bg-black/5" />
      </div>
      <div className="flex flex-col gap-10 md:flex-row md:gap-14">
        <div className="aspect-[3/2] w-full max-w-xl flex-1 rounded-2xl bg-white" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-9 w-56 rounded-lg bg-black/5" />
          <div className="h-5 w-40 rounded bg-black/5" />
          <div className="h-6 w-72 rounded-full bg-black/5" />
          <div className="h-4 w-full rounded bg-black/5" />
          <div className="h-4 w-10/12 rounded bg-black/5" />
        </div>
      </div>
      <div className="mt-10 h-28 rounded-2xl bg-white" />
    </div>
  );
}
