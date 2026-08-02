export default function CollectionsLoading() {
  return (
    <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10">
        <div className="py-6 h-6" />
        <div className="h-12 w-80 bg-[#E7E3DD] rounded mb-8 animate-pulse" />
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 pb-20">
          <aside className="w-full lg:w-[270px] lg:flex-shrink-0">
            <div className="h-6 w-32 bg-[#E7E3DD] rounded mb-4 animate-pulse" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-8 bg-[#E7E3DD] rounded animate-pulse" />
              ))}
            </div>
          </aside>
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
      </div>
    </main>
  );
}
