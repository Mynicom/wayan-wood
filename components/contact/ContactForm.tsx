"use client";

import { useActionState } from "react";
import { submitContactForm, ContactFormState } from "@/app/contact/actions";

const WHATSAPP_NUMBER = "6281338246791";

const initialState: ContactFormState = {
  success: false,
  error: null,
};

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initialState);

  const handleWhatsApp = () => {
    const message = "Halo Wayan Wood Work,\n\nSaya ingin menanyakan informasi lebih lanjut tentang produk Anda.";
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* WhatsApp Quick Contact */}
      <button
        type="button"
        onClick={handleWhatsApp}
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-semibold text-[0.9375rem] py-4 px-8 rounded-full hover:bg-[#20BD5B] transition-all duration-300 cursor-pointer"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        Chat via WhatsApp
      </button>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-[#E7E3DD]" />
        <span className="text-[0.8125rem] text-[#999999]">or send us an email</span>
        <div className="flex-1 h-px bg-[#E7E3DD]" />
      </div>

      {/* Form */}
      <form action={action} className="flex flex-col gap-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-[0.875rem] font-medium text-[#3B2A1F] mb-1.5">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your name"
            className="w-full h-12 rounded-lg border border-[#E7E3DD] bg-white px-4 text-[0.9375rem] text-[#3B2A1F] placeholder-[#999999] focus:outline-none focus:border-[#C89B5B] transition-colors"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[0.875rem] font-medium text-[#3B2A1F] mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Your email"
            className="w-full h-12 rounded-lg border border-[#E7E3DD] bg-white px-4 text-[0.9375rem] text-[#3B2A1F] placeholder-[#999999] focus:outline-none focus:border-[#C89B5B] transition-colors"
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-[0.875rem] font-medium text-[#3B2A1F] mb-1.5">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            className="w-full h-12 rounded-lg border border-[#E7E3DD] bg-white px-4 text-[0.9375rem] text-[#3B2A1F] placeholder-[#999999] focus:outline-none focus:border-[#C89B5B] transition-colors"
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-[0.875rem] font-medium text-[#3B2A1F] mb-1.5">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Your message"
            className="w-full rounded-lg border border-[#E7E3DD] bg-white px-4 py-3 text-[0.9375rem] text-[#3B2A1F] placeholder-[#999999] focus:outline-none focus:border-[#C89B5B] transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={pending}
          className="w-full bg-[#C89B5B] text-black font-semibold text-[0.875rem] md:text-[1rem] py-4 px-8 rounded-full hover:bg-[#B08A4A] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
        >
          {pending ? "Sending..." : "Send Message"}
        </button>

        {/* Status Messages */}
        {state.success && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-[0.875rem]">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Thank you! Your message has been sent successfully.
          </div>
        )}
        {state.error && (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-[0.875rem]">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {state.error}
          </div>
        )}
      </form>
    </div>
  );
}
