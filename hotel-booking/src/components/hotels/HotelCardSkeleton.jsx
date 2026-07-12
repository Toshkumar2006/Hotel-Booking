// Shimmer placeholder shown while the hotel list is loading.
export default function HotelCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface">
      <div className="aspect-[4/3] animate-pulse bg-surface-2" />
      <div className="space-y-3 p-4">
        <div className="h-3 w-1/3 animate-pulse rounded bg-surface-2" />
        <div className="h-4 w-3/4 animate-pulse rounded bg-surface-2" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-surface-2" />
        <div className="flex items-center justify-between border-t border-line pt-4">
          <div className="h-5 w-20 animate-pulse rounded bg-surface-2" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-surface-2" />
        </div>
      </div>
    </div>
  );
}
