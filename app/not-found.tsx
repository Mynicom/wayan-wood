import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-[80px] min-h-screen bg-[#F8F6F2] flex items-center">
        <div className="max-w-[1280px] mx-auto px-5 md:px-10 py-20 w-full">
          <div className="text-center max-w-lg mx-auto">
            {/* Large 404 */}
            <p className="font-serif text-[6rem] sm:text-[8rem] md:text-[10rem] font-bold text-[#C89B5B]/20 leading-none select-none">
              404
            </p>

            {/* Heading */}
            <h1 className="font-serif text-[#1B1B1B] text-[1.75rem] sm:text-[2.25rem] md:text-[2.5rem] font-bold -mt-6 sm:-mt-8 md:-mt-10 mb-4">
              Page Not Found
            </h1>

            {/* Description */}
            <p className="text-[#666666] text-[0.9375rem] md:text-[1.0625rem] leading-relaxed mb-8">
              Sepertinya halaman yang Anda cari sudah dipindahkan atau tidak tersedia. Mari kita kembali menjelajahi furniture kayu kami.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-[#C89B5B] text-black rounded-full px-6 py-3 md:px-8 md:py-4 text-[0.8125rem] md:text-[0.875rem] font-semibold hover:bg-[#B08A4A] hover:-translate-y-0.5 transition-all duration-300"
              >
                Back to Home
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
              <Link
                href="/collections"
                className="inline-flex items-center justify-center gap-2 text-[#3B2A1F] border border-[#3B2A1F] rounded-full px-6 py-3 md:px-8 md:py-4 text-[0.8125rem] md:text-[0.875rem] font-semibold hover:bg-[#3B2A1F] hover:text-white transition-all duration-300"
              >
                Browse Products
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
