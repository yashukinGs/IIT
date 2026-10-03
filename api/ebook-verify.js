import { createHmac, timingSafeEqual } from "node:crypto"

const PRICE_PAISE = 19700

function razorpayAuthorization(keyId, keySecret) {
  return `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`
}

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store")

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST")
    return response.status(405).json({ error: "Method not allowed." })
  }

  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, MOTIVATIONAL_EBOOKS_URL } =
    process.env
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET || !MOTIVATIONAL_EBOOKS_URL) {
    return response.status(503).json({
      error: "E-book access is not configured yet. Please contact support.",
    })
  }

  let accessUrl
  try {
    accessUrl = new URL(MOTIVATIONAL_EBOOKS_URL)
  } catch {
    return response.status(503).json({ error: "E-book access is misconfigured." })
  }
  if (
    accessUrl.protocol !== "https:" ||
    accessUrl.hostname !== "drive.google.com" ||
    !accessUrl.pathname.startsWith("/drive/folders/")
  ) {
    return response.status(503).json({ error: "E-book access is misconfigured." })
  }

  const { orderId, paymentId, signature } = request.body ?? {}
  if (
    typeof orderId !== "string" ||
    typeof paymentId !== "string" ||
    typeof signature !== "string" ||
    !/^[a-f\d]{64}$/i.test(signature)
  ) {
    return response.status(400).json({ error: "Invalid payment details." })
  }

  const expectedSignature = createHmac("sha256", RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest()
  const receivedSignature = Buffer.from(signature, "hex")
  if (
    expectedSignature.length !== receivedSignature.length ||
    !timingSafeEqual(expectedSignature, receivedSignature)
  ) {
    return response.status(400).json({ error: "Payment verification failed." })
  }

  try {
    const authorization = razorpayAuthorization(
      RAZORPAY_KEY_ID,
      RAZORPAY_KEY_SECRET,
    )
    const paymentResponse = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
      { headers: { Authorization: authorization } },
    )
    if (!paymentResponse.ok) {
      return response.status(502).json({ error: "Could not verify payment." })
    }

    let payment = await paymentResponse.json()
    if (
      payment.order_id !== orderId ||
      payment.amount !== PRICE_PAISE ||
      payment.currency !== "INR"
    ) {
      return response.status(400).json({ error: "Payment details do not match." })
    }

    if (payment.status === "authorized") {
      const captureResponse = await fetch(
        `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`,
        {
          method: "POST",
          headers: {
            Authorization: authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: PRICE_PAISE, currency: "INR" }),
        },
      )
      if (!captureResponse.ok) {
        return response.status(402).json({
          error: "Payment could not be captured. Please contact support.",
        })
      }
      payment = await captureResponse.json()
    }

    if (payment.status !== "captured") {
      return response.status(402).json({
        error: "Payment is not complete yet. Please contact support if you were charged.",
      })
    }

    return response.status(200).json({ accessUrl: accessUrl.toString() })
  } catch {
    return response.status(502).json({ error: "Could not verify payment." })
  }
}