"use client";

import Link from "next/link";
import Image from "next/image";
import FadeIn from "@/components/ui/FadeIn";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ContactForm from "@/components/contact/ContactForm";

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    label: "Address",
    value: "Br Tengah, Batuan, Kec. Sukawati, Kabupaten Gianyar, Bali 80582",
    href: "https://www.google.com/maps/place/Wayan+Wood+Work/@-8.5826219,115.2753651,19.75z/data=!4m18!1m9!3m8!1s0x2dd23e1902532753:0x37c89499f5b3d574!2sWayan+Wood+Work!8m2!3d-8.5825011!4d115.2753871!9m1!1b1!16s%2Fg%2F11cp228hvh!3m7!1s0x2dd23e1902532753:0x37c89499f5b3d574!8m2!3d-8.5825011!4d115.2753871!9m1!1b1!16s%2Fg%2F11cp228hvh?entry=ttu&g_ep=EgoyMDI2MDcxNS4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    label: "Phone",
    value: "081320325102554",
    href: "https://wa.me/6281338246791",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    label: "Email",
    value: "wayanwoodwork@gmail.com",
    href: "mailto:wayanwoodwork@gmail.com",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    label: "Instagram",
    value: "@wayanwoodworkk",
    href: "https://www.instagram.com/wayanwoodworkk/",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    label: "Facebook",
    value: "Wayan Wood Work",
    href: "https://www.facebook.com/wayan.woodwork",
  },
];

const businessHours = [
  { day: "Monday - Friday", time: "08:00 - 17:00" },
  { day: "Saturday", time: "08:00 - 15:00" },
  { day: "Sunday", time: "Closed" },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="pt-[80px] min-h-screen bg-[#F8F6F2]">
        {/* Hero Section */}
        <section className="relative h-[300px] md:h-[360px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=1600&h=600&fit=crop"
            alt="Wayan Wood Work Workshop"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
            <p className="text-[#C89B5B] text-[0.875rem] tracking-[0.2em] uppercase font-medium mb-3 animate-[fadeSlideUp_0.5s_ease-out_both]">
              Get in Touch
            </p>
            <h1 className="font-serif text-white text-[2rem] sm:text-[2.5rem] md:text-[3rem] font-bold animate-[fadeSlideUp_0.5s_ease-out_0.1s_both]">
              Contact Us
            </h1>
            <p className="text-white/80 text-[0.9375rem] md:text-[1.125rem] mt-3 max-w-lg animate-[fadeSlideUp_0.5s_ease-out_0.2s_both]">
              Have a question or want to place an order? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <div className="max-w-[1280px] mx-auto px-5 md:px-10">
          <nav className="py-6">
            <p className="text-[0.875rem] text-[#666666]">
              <Link href="/" className="hover:text-[#C89B5B] transition-colors">home</Link>
              <span className="mx-1">/</span>
              <span className="text-[#1B1B1B]">Contact Us</span>
            </p>
          </nav>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-12">
            {contactInfo.map((item, index) => (
              <FadeIn key={item.label} delay={index * 80}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)] group hover:shadow-[0_8px_24px_rgba(0,0,0,0.1)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C89B5B]/10 flex items-center justify-center text-[#C89B5B] group-hover:bg-[#C89B5B] group-hover:text-white transition-all duration-300 mb-4">
                    {item.icon}
                  </div>
                  <p className="text-[0.8125rem] text-[#666666] mb-1">{item.label}</p>
                  <p className="text-[0.9375rem] text-[#3B2A1F] font-medium group-hover:text-[#C89B5B] transition-colors leading-relaxed">
                    {item.value}
                  </p>
                </a>
              </FadeIn>
            ))}

            <FadeIn delay={contactInfo.length * 80}>
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                <div className="w-12 h-12 rounded-xl bg-[#C89B5B]/10 flex items-center justify-center text-[#C89B5B] mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-[0.8125rem] text-[#666666] mb-3">Business Hours</p>
                <div className="space-y-1.5">
                  {businessHours.map((item) => (
                    <div key={item.day} className="flex justify-between text-[0.875rem]">
                      <span className="text-[#3B2A1F]">{item.day}</span>
                      <span className={`font-medium ${item.time === "Closed" ? "text-[#999999]" : "text-[#3B2A1F]"}`}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Content: Form + Map */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 pb-20">
            <FadeIn direction="left" className="w-full lg:w-[55%]">
              <div className="bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6 md:p-8">
                <h2 className="font-serif text-[#3B2A1F] text-[1.25rem] md:text-[1.5rem] font-bold mb-2">
                  Send Us a Message
                </h2>
                <p className="text-[0.875rem] text-[#666666] mb-6">
                  Fill out the form below and we&apos;ll get back to you as soon as possible.
                </p>
                <ContactForm />
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={200} className="w-full lg:w-[45%]">
              <div className="rounded-2xl overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.3169999999997!2d115.2753651!3d-8.5825011!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd23e1902532753%3A0x37c89499f5b3d574!2sWayan%20Wood%20Work!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Wayan Wood Work Location"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
