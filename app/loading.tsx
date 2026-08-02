export default function Loading() {
  return (
    <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* Hero skeleton */}
        <div className="h-[600px] bg-[#E7E3DD] rounded-2xl mb-12 animate-pulse" />

        {/* Categories skeleton */}
        <div className="py-12">
          <div className="h-8 w-48 bg-[#E7E3DD] rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square bg-[#E7E3DD] rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>

        {/* Products skeleton */}
        <div className="py-12">
          <div className="h-8 w-48 bg-[#E7E3DD] rounded mb-8 animate-pulse" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="aspect-[3/4] bg-[#E7E3DD] animate-pulse" />
                <div className="p-3 space-y-2">
                  <div className="h-4 bg-[#E7E3DD] rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-[#E7E3DD] rounded w-1/2 animate-pulse" />
                  <div className="h-4 bg-[#E7E3DD] rounded w-1/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
