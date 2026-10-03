# E-book checkout setup

The motivational e-books checkout uses Razorpay and the Vercel serverless routes in `api/`. The Drive folder URL is returned only after the server verifies a captured payment. Other courses keep their existing manual flow.

## Configure Vercel

Add these environment variables in the Vercel project settings, then redeploy:

- `RAZORPAY_KEY_ID`: Razorpay test key ID for testing, then the live key ID.
- `RAZORPAY_KEY_SECRET`: matching Razorpay secret. Keep this server-side; never add a `VITE_` prefix.
- `MOTIVATIONAL_EBOOKS_URL`: the supplied Google Drive folder URL.

Test the full checkout with Razorpay test mode before switching both Razorpay values to live credentials. The server order amount is fixed at INR 197 (`19700` paise) to match the e-book course price; update `PRICE_PAISE` in both API route files if the course price changes.

The current Drive folder must allow link access for buyers. A buyer can still copy and share that Drive URL after unlocking it; use authenticated file hosting if access must be revocable or tied to each purchaser.

The Vite preview alone does not run these API routes. Deploy on Vercel (or port the routes to the chosen host's serverless API format) for checkout and payment verification to work.