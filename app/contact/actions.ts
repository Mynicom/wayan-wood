"use server";

import { createMessage } from "@/lib/services/messages";

export interface ContactFormState {
  success: boolean;
  error: string | null;
}

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    await createMessage({
      name,
      email,
      phone: phone || "",
      subject: subject || "",
      message,
    });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
