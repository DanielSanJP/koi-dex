/** Skeleton for a variety page while the server streams a slug not in the
    prerendered set. Same layout boxes as the real page, no content. */
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-6 py-10 sm:px-8" aria-busy="true" aria-label="Loading">
      <div className="mb-8 flex justify-between">
        <div className="h-7 w-28 rounded-full bg-black/5" />
        <div className="h-7 w-28 rounded-full bg-black/5" />
      </div>
      <div className="flex flex-col gap-10 md:flex-row md:gap-14">
        <div className="aspect-[688/464] w-full max-w-xl flex-1 rounded-2xl bg-white" />
        <div className="flex flex-1 flex-col gap-4">
          <div className="h-9 w-48 rounded-lg bg-black/5" />
          <div className="h-6 w-64 rounded-full bg-black/5" />
          <div className="h-4 w-full rounded bg-black/5" />
          <div className="h-4 w-11/12 rounded bg-black/5" />
          <div className="h-4 w-4/5 rounded bg-black/5" />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="h-48 rounded-2xl bg-white" />
        <div className="h-48 rounded-2xl bg-white" />
      </div>
    </div>
  );
}
