import { bundle, type Course } from "../data/courses"

type Purchase = Pick<Course, "name" | "price">

// Central payee details used by every generated UPI intent and QR code.
export const MERCHANT_UPI_ID: string = "jadeja.karan@ybl"
const MERCHANT_PAYEE_NAME = "Paytm"
export const WHATSAPP_NUMBER = "919152963107"
export const DISPLAY_PHONE = "9152963107"

export function isPaymentConfigured() {
  return (
    MERCHANT_UPI_ID !== "YOUR_UPI_ID_HERE" &&
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/.test(MERCHANT_UPI_ID)
  )
}

// Keep checkout intent creation separate so a payment provider can be added later.
export function createUpiIntent(course: Purchase) {
  const params = {
    pa: MERCHANT_UPI_ID.trim(),
    pn: MERCHANT_PAYEE_NAME,
    am: course.price.toFixed(2),
    cu: "INR",
    tn: course.name,
  }
  // UPI is a URI, not form data: encode spaces as %20 rather than +.
  // Some UPI scanners reject the form-style encoding from URLSearchParams.
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&")
  return `upi://pay?${query}`
}

export function whatsappLink(message?: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`
}

export function paymentScreenshotLink(course: Course) {
  const isBundle = course.id === bundle.id
  const includedCourses = isBundle
    ? `\nCourses included:\n${course.modules.map((name) => `• ${name}`).join("\n")}\n`
    : ""
  const requestedLinks = isBundle
    ? `the links for all ${course.modules.length} courses in my bundle`
    : "the access link for this course"

  return whatsappLink(
    `Hello Computer Point Class,\nI have made a UPI payment and would like my course links.\n\nCourse: ${course.name}\nAmount: ₹${course.price}\n${includedCourses}\nPlease verify my payment screenshot and send ${requestedLinks} here on WhatsApp.\n\nI will attach my payment screenshot in this chat.\n\nThank you.`,
  )
}
