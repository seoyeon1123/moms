export default function MarketLoading() {
  return (
    <div className="flex flex-col items-center">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center mb-4"
          >
            <div className="w-24 h-24 bg-neutral-700 animate-pulse rounded" />
            <div className="w-32 h-5 bg-neutral-700 animate-pulse rounded-full mt-2" />
            <div className="w-16 h-5 bg-neutral-700 animate-pulse mt-1" />
          </div>
        ))}
    </div>
  );
}
