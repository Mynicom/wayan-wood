export default function ProductLoading() {
  return (
    <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="py-5 h-6" />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-12">
          {/* Gallery skeleton */}
          <div className="w-full lg:w-[45%]">
            <div className="aspect-[3/4] bg-[#E7E3DD] rounded-2xl animate-pulse" />
          </div>
          {/* Info skeleton */}
          <div className="w-full lg:w-[55%] space-y-4">
            <div className="h-4 w-32 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="h-6 w-48 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="h-10 w-40 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="space-y-2 mt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 bg-[#E7E3DD] rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
