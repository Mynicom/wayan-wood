export default function ProductDetailSkeleton() {
  return (
    <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        {/* Breadcrumb skeleton */}
        <div className="py-6">
          <div className="h-4 w-64 bg-[#E7E3DD] rounded" />
        </div>

        {/* Product layout skeleton */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-20">
          {/* Gallery skeleton */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/5] bg-[#E7E3DD] rounded-lg animate-pulse" />
            <div className="flex gap-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-square w-[80px] md:w-[100px] bg-[#E7E3DD] rounded-lg animate-pulse" />
              ))}
            </div>
          </div>

          {/* Info skeleton */}
          <div className="w-full lg:w-1/2 space-y-4">
            <div className="h-10 w-3/4 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="h-5 w-1/2 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="h-8 w-1/3 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-[#E7E3DD] rounded animate-pulse" />
            <div className="h-14 w-full bg-[#E7E3DD] rounded-lg animate-pulse mt-6" />
          </div>
        </div>

        {/* Product Details skeleton */}
        <div className="border-t border-[#E7E3DD] pt-8 pb-8">
          <div className="h-8 w-48 bg-[#E7E3DD] rounded animate-pulse mb-4" />
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-[#E7E3DD] rounded animate-pulse" style={{ width: `${80 - i * 10}%` }} />
            ))}
          </div>
        </div>

        {/* About Product skeleton */}
        <div className="border-t border-[#E7E3DD] pt-8 pb-8">
          <div className="h-8 w-48 bg-[#E7E3DD] rounded animate-pulse mb-4" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-4 bg-[#E7E3DD] rounded animate-pulse" style={{ width: `${70 - i * 10}%` }} />
            ))}
          </div>
        </div>

        {/* Related products skeleton */}
        <div className="border-t border-[#E7E3DD] pt-8 pb-20">
          <div className="h-8 w-72 bg-[#E7E3DD] rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
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
