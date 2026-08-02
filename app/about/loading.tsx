export default function AboutLoading() {
  return (
    <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-20">
        <div className="h-12 w-80 bg-[#E7E3DD] rounded mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-96 bg-[#E7E3DD] rounded mx-auto mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div key={i} className="h-64 bg-[#E7E3DD] rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </main>
  );
}
