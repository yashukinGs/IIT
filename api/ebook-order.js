import { randomUUID } from "node:crypto"

const PRICE_PAISE = 19700

export default async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store")

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST")
    return response.status(405).json({ error: "Method not allowed." })
  }

  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return response.status(503).json({
      error: "Secure checkout is not configured yet. Please try again later.",
    })
  }

  try {
    const authorization = Buffer.from(
      `${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`,
    ).toString("base64")
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authorization}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: PRICE_PAISE,
        currency: "INR",
        receipt: `ebooks_${randomUUID().replaceAll("-", "").slice(0, 24)}`,
        notes: { product_id: "motivational-ebooks" },
      }),
    })

    if (!razorpayResponse.ok) {
      return response.status(502).json({
        error: "Could not start checkout. Please try again.",
      })
    }

    const order = await razorpayResponse.json()
    return response.status(200).json({
      keyId: RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch {
    return response.status(502).json({
      error: "Could not start checkout. Please try again.",
    })
  }
}