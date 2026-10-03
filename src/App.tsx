import { useEffect, useRef, useState, type FormEvent } from "react"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  CreditCard,
  Globe2,
  GraduationCap,
  Layers3,
  Menu,
  MessageCircle,
  MonitorPlay,
  MousePointer2,
  Palette,
  Play,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WandSparkles,
  X,
  Zap,
} from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { bundle, courses, type Course } from "./data/courses"
import {
  createUpiIntent,
  DISPLAY_PHONE,
  isPaymentConfigured,
  paymentScreenshotLink,
  whatsappLink,
} from "./config/payment"

type RazorpayPaymentDetails = {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
}

type RazorpayCheckoutOptions = {
  key: string
  amount: number
  currency: string
  order_id: string
  name: string
  description: string
  handler: (payment: RazorpayPaymentDetails) => void | Promise<void>
  modal?: { ondismiss?: () => void }
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void }
  }
}

function loadRazorpayCheckout() {
  if (window.Razorpay) return Promise.resolve()

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Could not load secure checkout."))
    document.body.append(script)
  })
}

function Brand({ footer = false }: { footer?: boolean }) {
  const logoDialogRef = useRef<HTMLDialogElement>(null)

  return (
    <div className={`brand ${footer ? "brand-footer" : ""}`}>
      <button
        className="brand-logo-button"
        type="button"
        aria-label="View Infinity Institute of Technology logo"
        onClick={() => logoDialogRef.current?.showModal()}
      >
        <span className="brand-logo">
          <img
            src="/infinity-institute-logo-hd.png"
            alt="Infinity Institute of Technology logo"
            width="54"
            height="54"
          />
        </span>
      </button>
      <a
        className="brand-copy"
        href="#home"
        aria-label="Infinity Institute of Technology home"
      >
        <span className="brand-name">
          <span className="brand-infinity" aria-hidden="true">
            ∞
          </span>
          IIT
        </span>
        <span className="brand-tagline">
          INFINITY INSTITUTE OF TECHNOLOGY
        </span>
      </a>
      <dialog
        ref={logoDialogRef}
        className="logo-preview-dialog"
        aria-label="Infinity Institute of Technology logo preview"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            logoDialogRef.current?.close()
          }
        }}
      >
        <div className="logo-preview-card">
          <button
            className="logo-preview-close"
            type="button"
            aria-label="Close logo preview"
            onClick={() => logoDialogRef.current?.close()}
          >
            <X size={21} />
          </button>
          <img
            src="/infinity-institute-logo-hd.png"
            alt="Infinity Institute of Technology"
            width="280"
            height="280"
          />
          <strong>Infinity Institute of Technology</strong>
          <span>Official institute logo</span>
        </div>
      </dialog>
    </div>
  )
}

function WhatsAppButton({
  children = "Chat on WhatsApp",
  className = "",
}: {
  children?: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`button whatsapp ${className}`}
    >
      <MessageCircle size={18} />
      {children}
    </a>
  )
}

function CourseArt({
  course,
  hero = false,
}: {
  course: Course
  hero?: boolean
}) {
  return (
    <div
      className={`course-art art-${course.thumbnail} ${hero ? "art-hero" : ""}`}
      role="img"
      aria-label={`${course.shortName} course illustration`}
    >
      <span className="art-grid" />
      <span className="art-orbit" />
      {course.thumbnail === "canva" && (
        <>
          <span className="art-script">Canva</span>
          <span className="art-sticker sticker-pink">
            <Palette size={23} />
          </span>
          <span className="art-sticker sticker-white">
            <MousePointer2 size={24} />
          </span>
          <span className="art-mini-label">MAKE SOMETHING AMAZING.</span>
        </>
      )}
      {course.thumbnail === "video" && (
        <>
          <div className="video-editor">
            <div className="editor-dots">
              <i />
              <i />
              <i />
            </div>
            <div className="editor-preview">
              <Play size={32} fill="currentColor" />
            </div>
            <div className="editor-timeline">
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="art-sticker sticker-violet">
            <MonitorPlay size={23} />
          </span>
          <span className="art-mini-label">TURN IDEAS INTO STORIES.</span>
        </>
      )}
      {course.thumbnail === "chatgpt" && (
        <>
          <div className="ai-symbol">
            <Sparkles size={65} strokeWidth={1.4} />
          </div>
          <span className="ai-prompt">
            <span className="prompt-dot" /> Ask. Create. Achieve.
            <MousePointer2 size={17} />
          </span>
          <span className="art-mini-label">YOUR EVERYDAY AI SUPERPOWER.</span>
        </>
      )}
      {course.thumbnail === "facebook" && (
        <>
          <span className="facebook-symbol">f</span>
          <div className="ad-chart">
            <span>
              Grow your ideas
              <ArrowUpRight size={15} />
            </span>
            <div>
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
          </div>
          <span className="art-mini-label">REACH THE RIGHT PEOPLE.</span>
        </>
      )}
      {course.thumbnail === "wordpress" && (
        <>
          <span className="wordpress-symbol">W</span>
          <div className="website-preview">
            <div />
            <section>
              <i />
              <i />
              <i />
            </section>
            <footer>
              <i />
              <i />
              <i />
            </footer>
          </div>
          <span className="art-mini-label">BUILD YOUR CORNER OF THE WEB.</span>
        </>
      )}
      {course.thumbnail === "animation" && (
        <>
          <div className="animation-frame">
            <div className="animation-star">✦</div>
            <span />
            <span />
            <span />
          </div>
          <span className="art-sticker sticker-orange">
            <WandSparkles size={24} />
          </span>
          <span className="art-mini-label">
            BRING YOUR IMAGINATION TO LIFE.
          </span>
        </>
      )}
      {course.thumbnail === "ebooks" && (
        <>
          <div className="ebook-art-stack" aria-hidden="true">
            <span className="ebook-cover ebook-cover-back">
              <BookOpen size={20} />
            </span>
            <span className="ebook-cover ebook-cover-front">
              <Sparkles size={19} />
              <strong>1000+</strong>
              <small>WORDS TO GROW</small>
            </span>
          </div>
          <span className="art-mini-label">A NEW PAGE STARTS TODAY.</span>
        </>
      )}
      {course.thumbnail === "bundle" && (
        <div className="bundle-art-symbol">
          <Layers3 size={70} />
          <span>{bundle.modules.length} courses. Endless possibilities.</span>
        </div>
      )}
    </div>
  )
}

function PlayfulHeroOffer({ onSelect }: { onSelect: () => void }) {
  const [attempts, setAttempts] = useState(0)
  const prompts = [
    `₹${bundle.price} ka offer pakad ke dikhao! Try 1 / 4`,
    "Oops! Ab idhar hoon. Try 2 / 4",
    "Bas ek aur try! Try 3 / 4",
    "Pakad liya! Ab click karo aur bundle dekho.",
  ]

  return (
    <div className="hero-offer-game" data-attempt={attempts}>
      <div className="hero-offer-track">
        <button
          className="hero-offer-catch"
          aria-label={`Special offer: all ${bundle.modules.length} courses for ₹${bundle.price}`}
          aria-describedby="hero-offer-hint"
          onClick={(event) => {
            // Keyboard and reduced-motion users can open the offer directly.
            if (
              event.detail === 0 ||
              window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
              attempts >= 3
            ) {
              onSelect()
            } else {
              setAttempts((current) => Math.min(current + 1, 3))
            }
          }}
        >
          <span className="hero-offer-pill">
            <span className="hero-offer-zap">
              <Zap size={23} fill="currentColor" />
            </span>
            <span className="hero-offer-text">
              <span className="hero-offer-label">SPECIAL OFFER</span>
              <strong>
                All {bundle.modules.length} courses <span>₹{bundle.price}</span>
              </strong>
            </span>
            <ArrowUpRight className="hero-offer-arrow" size={21} />
          </span>
        </button>
      </div>
      <div className="hero-offer-hint-row">
        <span className="hero-offer-dots" aria-hidden="true">
          {[0, 1, 2, 3].map((index) => (
            <i key={index} className={index <= attempts ? "filled" : ""} />
          ))}
        </span>
        <p id="hero-offer-hint" aria-live="polite">
          {prompts[attempts]}
        </p>
      </div>
    </div>
  )
}

function CourseCard({
  course,
  onSelect,
}: {
  course: Course
  onSelect: (course: Course) => void
}) {
  return (
    <article className="course-card">
      <button
        className="course-art-button"
        onClick={() => onSelect(course)}
        aria-label={`View ${course.name}`}
      >
        <CourseArt course={course} />
        <span className="thumbnail-pill">
          <Play size={10} fill="currentColor" /> COMPLETE COURSE
        </span>
      </button>
      <div className="course-card-body">
        <div className="course-meta">
          <span>{course.category}</span>
          <span>
            <BookOpen size={12} /> Beginner friendly
          </span>
        </div>
        <h3>{course.name}</h3>
        <p>{course.description}</p>
        <div className="course-card-bottom">
          <div className="course-price">
            ₹{course.price}
            <span>one-time payment</span>
          </div>
          <button className="course-link" onClick={() => onSelect(course)}>
            View Course
            <ArrowUpRight size={17} />
          </button>
        </div>
      </div>
    </article>
  )
}

function CheckoutModal({
  course,
  onClose,
}: {
  course: Course
  onClose: () => void
}) {
  const [step, setStep] = useState<"details" | "payment">("details")
  const [ebookPaymentStatus, setEbookPaymentStatus] = useState<
    "idle" | "processing" | "verified"
  >("idle")
  const [ebookAccessUrl, setEbookAccessUrl] = useState("")
  const [ebookPaymentError, setEbookPaymentError] = useState("")
  const dialogRef = useRef<HTMLDialogElement>(null)
  const configured = isPaymentConfigured()
  const intent = createUpiIntent(course)
  useEffect(() => {
    const dialog = dialogRef.current
    const previousFocus = document.activeElement as HTMLElement | null
    dialog?.showModal()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])
  useEffect(() => {
    dialogRef.current?.scrollTo({ top: 0 })
  }, [step])

  async function startEbookCheckout() {
    setEbookPaymentStatus("processing")
    setEbookPaymentError("")

    try {
      const orderResponse = await fetch("/api/ebook-order", { method: "POST" })
      const order = (await orderResponse.json()) as {
        keyId?: string
        orderId?: string
        amount?: number
        currency?: string
        error?: string
      }
      if (!orderResponse.ok || !order.keyId || !order.orderId || !order.amount) {
        throw new Error(order.error || "Could not start checkout. Please try again.")
      }

      await loadRazorpayCheckout()
      const Razorpay = window.Razorpay
      if (!Razorpay) throw new Error("Secure checkout is unavailable. Please try again.")

      new Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        order_id: order.orderId,
        name: "Infinity Institute of Technology",
        description: course.name,
        handler: async (payment) => {
          try {
            const verificationResponse = await fetch("/api/ebook-verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: payment.razorpay_order_id,
                paymentId: payment.razorpay_payment_id,
                signature: payment.razorpay_signature,
              }),
            })
            const verification = (await verificationResponse.json()) as {
              accessUrl?: string
              error?: string
            }
            if (!verificationResponse.ok || !verification.accessUrl) {
              throw new Error(
                verification.error || "Payment verification failed. Please contact support.",
              )
            }
            setEbookAccessUrl(verification.accessUrl)
            setEbookPaymentStatus("verified")
          } catch (error) {
            setEbookPaymentStatus("idle")
            setEbookPaymentError(
              error instanceof Error
                ? error.message
                : "Payment verification failed. Please contact support.",
            )
          }
        },
        modal: {
          ondismiss: () => setEbookPaymentStatus("idle"),
        },
      }).open()
    } catch (error) {
      setEbookPaymentStatus("idle")
      setEbookPaymentError(
        error instanceof Error ? error.message : "Could not start checkout.",
      )
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className="course-dialog"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      aria-labelledby="dialog-title"
    >
      <div className="dialog-inner">
        <div className="dialog-top">
          <span>
            <GraduationCap size={18} /> COMPUTER POINT CLASS
          </span>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close course details"
          >
            <X size={22} />
          </button>
        </div>
        {step === "details" ? (
          <>
            <CourseArt course={course} />
            <div className="dialog-content">
              <span className="detail-badge">
                <Check size={14} /> Beginner friendly · Practical learning
              </span>
              <h2 id="dialog-title">{course.name}</h2>
              <p className="detail-description">{course.description}</p>
              <div className="detail-price">
                ₹{course.price}
                <span>One-time payment · No subscription</span>
              </div>
              <h3>What you will learn</h3>
              <ul className="detail-features">
                {course.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <h3>Course contents</h3>
              <div className="module-list">
                {course.modules.map((module, index) => (
                  <div key={module}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {module}
                    <BookOpen size={16} />
                  </div>
                ))}
              </div>
              <div className="detail-benefits">
                <span>
                  <Globe2 size={17} /> Learn from anywhere
                </span>
                <span>
                  <MessageCircle size={17} /> WhatsApp support
                </span>
                <span>
                  <Zap size={17} /> Access after verification
                </span>
              </div>
              <button
                className="button primary full-width"
                onClick={() => setStep("payment")}
              >
                Buy Now — ₹{course.price}
                <ArrowRight size={18} />
              </button>
              <p className="payment-note">
                <ShieldCheck size={14} />
                {course.id === "motivational-ebooks"
                  ? "Verified payment unlocks your e-book library here"
                  : "Pay via UPI, then WhatsApp your screenshot for course links"}
              </p>
            </div>
          </>
        ) : (
          <div className="dialog-content payment-content">
            <button className="back-button" onClick={() => setStep("details")}>
              <ChevronLeft size={16} /> Back to course
            </button>
            <span className="eyebrow">SIMPLE, ONE-TIME PAYMENT</span>
            <h2 id="dialog-title">You’re one step closer.</h2>
            <p className="payment-course-name">{course.name}</p>
            <div className="payment-amount">
              <span>Amount to Pay</span>
              <strong>₹{course.price}</strong>
              <span>
                {course.id === "motivational-ebooks"
                  ? "Secure checkout · Access after payment verification"
                  : "Step 1 · Pay, then contact us on WhatsApp"}
              </span>
            </div>
            {course.id === "motivational-ebooks" ? (
              <div className="ebook-payment-flow" aria-live="polite">
                {ebookPaymentStatus === "verified" ? (
                  <>
                    <div className="ebook-payment-success">
                      <Check size={19} /> Payment verified. Your library is ready.
                    </div>
                    <a
                      className="button primary full-width"
                      href={ebookAccessUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <BookOpen size={18} /> Open 1000+ E-books
                      <ArrowUpRight size={18} />
                    </a>
                  </>
                ) : (
                  <>
                    <p className="qr-help">
                      Complete payment in the secure checkout. Your access link
                      appears here only after the payment is verified.
                    </p>
                    <button
                      className="button primary full-width"
                      type="button"
                      onClick={startEbookCheckout}
                      disabled={ebookPaymentStatus === "processing"}
                    >
                      <CreditCard size={18} />
                      {ebookPaymentStatus === "processing"
                        ? "Opening secure checkout..."
                        : `Pay ₹${course.price} securely`}
                      <ArrowUpRight size={18} />
                    </button>
                    {ebookPaymentError && (
                      <p className="ebook-payment-error" role="alert">
                        {ebookPaymentError}
                      </p>
                    )}
                  </>
                )}
              </div>
            ) : configured ? (
              <>
                <div className="qr-container">
                  <QRCodeSVG
                    value={intent}
                    size={220}
                    level="M"
                    marginSize={4}
                    title={`Pay ₹${course.price} for ${course.name}`}
                  />
                </div>
                <p className="qr-help">
                  Scan QR code with Google Pay / PhonePe / Paytm / BHIM or any
                  supported UPI app. Check the recipient and amount before
                  paying.
                </p>
                <a className="button primary full-width" href={intent}>
                  <Smartphone size={18} />
                  Pay with UPI App
                  <ArrowUpRight size={18} />
                </a>
              </>
            ) : (
              <div className="payment-setup">
                <CreditCard size={28} />
                <h3>UPI payments are being set up</h3>
                <p>
                  Please contact us on WhatsApp for payment instructions. Do not
                  send money until the merchant payment details are confirmed.
                </p>
                <WhatsAppButton>Get payment help</WhatsAppButton>
              </div>
            )}
            {course.id !== "motivational-ebooks" && (
              <>
                <div className="screenshot-step">
                  <span className="step-icon">
                    <MessageCircle size={21} />
                  </span>
                  <div>
                    <h3>Step 2 · Get your course links</h3>
                    <p>
                      Payment alone does not unlock access. Contact us on WhatsApp
                      after paying to receive your links.
                    </p>
                    <ol className="mt-3 list-decimal space-y-2 pl-4 text-xs leading-relaxed text-muted">
                      <li>Open WhatsApp using the button below.</li>
                      <li>
                        Attach your payment screenshot and send the ready-made
                        message with your course and amount.
                      </li>
                      <li>
                        We verify your payment and send{" "}
                        {course.id === bundle.id
                          ? `links to all ${bundle.modules.length} courses in this bundle`
                          : "your purchased course link"}{" "}
                        in the same WhatsApp chat.
                      </li>
                    </ol>
                    <strong>WhatsApp: {DISPLAY_PHONE}</strong>
                  </div>
                </div>
                <a
                  className="button whatsapp full-width mt-5"
                  href={paymentScreenshotLink(course)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle size={18} />
                  I've paid — Get course links
                  <ArrowUpRight size={17} />
                </a>
                <p className="payment-note">
                  <ShieldCheck size={15} /> Links are shared on WhatsApp only
                  after manual payment verification. Opening a UPI app does not
                  confirm payment.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </dialog>
  )
}

const reasons = [
  {
    icon: CreditCard,
    title: "Affordable learning",
    text: "Big possibilities. Small prices. Build skills without stretching your budget.",
  },
  {
    icon: GraduationCap,
    title: "Beginner friendly",
    text: "Start from the basics with easy-to-follow, approachable course content.",
  },
  {
    icon: MousePointer2,
    title: "Practical courses",
    text: "Go beyond theory. Learn useful skills you can put into practice.",
  },
  {
    icon: Globe2,
    title: "Learn from anywhere",
    text: "Your home. Your pace. Make learning fit around your everyday life.",
  },
  {
    icon: MessageCircle,
    title: "Easy WhatsApp support",
    text: "A real conversation when you need help with courses or payments.",
  },
  {
    icon: Layers3,
    title: "Multiple digital skills",
    text: "From creative design to AI, explore a whole world of digital possibilities.",
  },
]

const bundleOriginalPrice = courses.reduce(
  (total, course) => total + course.price,
  0,
)

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [filter, setFilter] = useState("All Courses")
  const [formError, setFormError] = useState("")
  const [formReady, setFormReady] = useState(false)
  const [contactLink, setContactLink] = useState("")
  const filters = [
    "All Courses",
    "Design & Creative",
    "AI & Technology",
    "Digital Marketing",
    "Personal Growth",
  ]
  const visibleCourses = courses.filter(
    (course) =>
      filter === "All Courses" ||
      (filter === "Design & Creative" &&
        ["canva", "video-editing", "2d-animation"].includes(course.id)) ||
      (filter === "AI & Technology" &&
        ["chatgpt", "wordpress"].includes(course.id)) ||
      (filter === "Digital Marketing" && course.id === "facebook-ads") ||
      (filter === "Personal Growth" && course.id === "motivational-ebooks"),
  )
  function handleContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const phone = String(data.get("phone") || "").trim()
    if (!/^\+?[\d\s()-]{10,16}$/.test(phone)) {
      setFormError("Please enter a valid phone number.")
      return
    }
    setFormError("")
    const link = whatsappLink(
      `Hello Computer Point Class,\n\nName: ${String(data.get("name")).trim()}\nPhone: ${phone}\n\n${String(data.get("message")).trim()}`,
    )
    setContactLink(link)
    setFormReady(true)
    window.open(link, "_blank", "noopener,noreferrer")
  }
  return (
    <>
      <header className="site-header">
        <div className="nav-container">
          <Brand />
          <nav className="desktop-nav" aria-label="Main navigation">
            <a className="nav-active" href="#home">
              Home
            </a>
            <a href="#courses">Courses</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="nav-actions">
            <WhatsAppButton />
            <button
              className="icon-button mobile-menu-button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Mobile navigation"
          >
            {["Home", "Courses", "About", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {item}
                <ArrowUpRight size={17} />
              </a>
            ))}
            <WhatsAppButton />
          </nav>
        )}
      </header>
      <main>
        <section id="home" className="hero">
          <div className="hero-glow" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <PlayfulHeroOffer onSelect={() => setSelectedCourse(bundle)} />
              <h1>
                Learn.
                <br />
                Create. <span>Earn.</span>
                <svg
                  className="headline-swoosh"
                  viewBox="0 0 220 17"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 12C57 1 131 0 216 8M20 16C96 8 150 8 201 12"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </h1>
              <h2>
                Affordable Computer &amp; Digital Skills Courses — Learn
                Practical Skills From Anywhere.
              </h2>
              <p className="hero-description">
                Master Canva, Video Editing, ChatGPT, Facebook Ads, WordPress,
                2D Animation and more with easy-to-follow courses.
              </p>
              <div className="hero-ctas">
                <a className="button primary" href="#courses">
                  Explore Courses
                  <ArrowRight size={19} />
                </a>
                <WhatsAppButton />
              </div>
              <div className="hero-trust">
                <span>
                  <Check /> Beginner friendly
                </span>
                <span>
                  <Check /> Learn from home
                </span>
                <span>
                  <Check /> Practical skills
                </span>
              </div>
              <div className="hero-small-note">
                <ShieldCheck size={15} />
                <span>
                  Affordable courses. Easy UPI payment. WhatsApp support.
                </span>
              </div>
            </div>
            <div
              className="hero-visual"
              aria-label="Digital skills learning illustration"
            >
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />
              <span className="visual-spark spark-one">
                <Sparkles size={29} />
              </span>
              <span className="visual-spark spark-two">+</span>
              <div className="floating-app app-canva">Canva</div>
              <div className="floating-app app-ai">
                <Sparkles size={28} />
              </div>
              <div className="floating-app app-wordpress">W</div>
              <div className="learning-window">
                <div className="window-header">
                  <span className="window-dots">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>YOUR DIGITAL JOURNEY</span>
                  <span>
                    <Layers3 size={13} />
                  </span>
                </div>
                <div className="window-content">
                  <div className="window-brand">
                    <span className="window-brand-logo">
                      <img
                        src="/infinity-institute-logo-hd.png"
                        alt="Infinity Institute of Technology"
                        width="46"
                        height="46"
                      />
                    </span>
                    <div>
                      COMPUTER POINT CLASS
                      <span>Learn a little. Create a lot.</span>
                    </div>
                  </div>
                  <div className="learning-screen">
                    <span className="screen-label">SKILLS THAT OPEN DOORS</span>
                    <h3>
                      Your next chapter
                      <br />
                      starts with a skill.
                    </h3>
                    <div className="screen-art">
                      <div className="screen-shape shape-one" />
                      <div className="screen-shape shape-two" />
                      <div className="screen-shape shape-three" />
                      <span className="screen-star">✦</span>
                    </div>
                    <button
                      className="screen-play"
                      aria-label="Explore Canva course"
                      onClick={() => setSelectedCourse(courses[0])}
                    >
                      <Play size={20} fill="currentColor" />
                    </button>
                    <div className="screen-footer">
                      <span>CREATE SOMETHING NEW</span>
                      <span>01 / 06</span>
                    </div>
                  </div>
                  <div className="window-progress">
                    <span>
                      <span className="progress-icon">
                        <BookOpen size={17} />
                      </span>
                      <span>
                        One course. A world of possibilities.
                        <small>Start learning at your own pace</small>
                      </span>
                    </span>
                    <ArrowRight size={17} />
                  </div>
                </div>
              </div>
              <div className="floating-skill">
                <span>
                  <Check size={18} />
                </span>
                <div>
                  Practical skills<small>Made simple for beginners</small>
                </div>
              </div>
              <button
                className="floating-offer"
                onClick={() => setSelectedCourse(bundle)}
              >
                <span className="offer-icon">
                  <Zap size={23} fill="currentColor" />
                </span>
                <div>
                  ALL {bundle.modules.length} COURSES
                  <strong>
                    Just ₹{bundle.price} <ArrowUpRight size={17} />
                  </strong>
                </div>
              </button>
              <div className="visual-caption">
                <span />
                <span />
                <span /> Dream it. Learn it. Do it.
              </div>
            </div>
          </div>
        </section>
        <div className="trust-strip">
          <div className="container">
            {[
              { icon: GraduationCap, label: "Beginner Friendly" },
              { icon: Globe2, label: "Learn From Home" },
              { icon: CreditCard, label: "Affordable Courses" },
              { icon: MousePointer2, label: "Practical Skills" },
              {
                icon: Zap,
                label: "Instant Course Access",
                note: "After payment verification",
              },
            ].map(({ icon: Icon, label, note }) => (
              <div key={label}>
                <Icon size={20} />
                <span>
                  {label}
                  {note && <small>{note}</small>}
                </span>
              </div>
            ))}
          </div>
        </div>
        <section id="courses" className="section courses-section">
          <div className="container">
            <div className="section-heading course-heading">
              <div>
                <span className="eyebrow">
                  <span /> POPULAR COURSES
                </span>
                <h2>
                  Small price. <span>Big possibilities.</span>
                </h2>
                <p>
                  Popular courses to build real skills. Choose a course and
                  start learning today.
                </p>
              </div>
              <span className="courses-note">
                <BookOpen size={17} /> {courses.length} practical courses, one bright start
              </span>
            </div>
            <div className="course-filters" aria-label="Filter courses">
              {filters.map((item) => (
                <button
                  key={item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                  aria-pressed={filter === item}
                >
                  {item}
                  {item === "All Courses" && <span>{courses.length}</span>}
                </button>
              ))}
            </div>
            <div className="course-grid">
              {visibleCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={setSelectedCourse}
                />
              ))}
            </div>
            <div className="course-endnote">
              <ShieldCheck size={16} /> One-time payment. Beginner-friendly
              learning. No complicated subscriptions.
            </div>
          </div>
        </section>
        <section className="bundle-section">
          <div className="container">
            <div className="bundle-card">
              <div className="bundle-glow" />
              <div className="bundle-copy">
                <span className="bundle-badge">
                  <Sparkles size={14} /> THE SMARTER WAY TO LEARN
                </span>
                <h2>
                  Why choose one
                  <br />
                  when you can <span>learn it all?</span>
                </h2>
                <h3>ULTIMATE DIGITAL SKILLS BUNDLE</h3>
                <p>
                  Get access to all featured courses at one special bundle
                  price.
                  <br className="desktop-break" /> Your complete digital
                  toolkit, for less than a cup of coffee.
                </p>
                <div className="bundle-features">
                  {bundle.features.map((feature) => (
                    <span key={feature}>
                      <Check size={15} />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bundle-price-panel">
                <span className="bundle-price-label">
                  ALL {bundle.modules.length} COURSES. ONE SPECIAL PRICE.
                </span>
                <div className="bundle-price">
                  <del>₹{bundleOriginalPrice}</del>
                  <strong>
                    ₹{bundle.price}<span>only</span>
                  </strong>
                </div>
                <span className="bundle-saving">
                  Save ₹{bundleOriginalPrice - bundle.price} with the bundle
                </span>
                <button
                  className="button bundle-cta"
                  onClick={() => setSelectedCourse(bundle)}
                >
                  GET ALL COURSES — ₹{bundle.price}
                  <ArrowRight size={18} />
                </button>
                <span className="bundle-footnote">
                  <ShieldCheck size={13} /> One-time payment. All {bundle.modules.length} courses.
                </span>
              </div>
            </div>
          </div>
        </section>
        <section className="section why-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">WHY CHOOSE COMPUTER POINT CLASS?</span>
              <h2>
                Learning made simple.
                <br className="mobile-break" />{" "}
                <span>Possibilities made bigger.</span>
              </h2>
              <p>
                Why choose Computer Point Class? Because your next step should
                be an easy one.
              </p>
            </div>
            <div className="reasons-grid">
              {reasons.map(({ icon: Icon, title, text }) => (
                <article className="reason-card" key={title}>
                  <span className="reason-icon">
                    <Icon size={23} strokeWidth={1.7} />
                  </span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="how-section">
          <div className="container">
            <div className="section-heading centered">
              <span className="eyebrow">FROM CURIOUS TO CONFIDENT</span>
              <h2>
                Your learning journey, <span>in 4 easy steps.</span>
              </h2>
              <p>No complicated process. Just a simple way to get started.</p>
            </div>
            <div className="steps-grid">
              {[
                {
                  title: "Choose your course",
                  text: "Find the skill you want to learn.",
                  icon: BookOpen,
                },
                {
                  title: "Pay securely online",
                  text: "Complete checkout for your selected course. E-book payments use secure online checkout.",
                  icon: Smartphone,
                },
                {
                  title: "Payment is verified",
                  text: "E-book access unlocks here automatically. Other course access is confirmed manually.",
                  icon: ShieldCheck,
                },
                {
                  title: "Open your learning material",
                  text: "Open the e-book library from this website. Contact us for access to other courses.",
                  icon: BookOpen,
                },
              ].map(({ title, text, icon: Icon }, index) => (
                <div className="step-card" key={title}>
                  <div className="step-top">
                    <span className="step-number">0{index + 1}</span>
                    <Icon size={24} />
                    {index < 3 && (
                      <ChevronRight className="step-arrow" size={19} />
                    )}
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="section about-section">
          <div className="container about-layout">
            <div className="about-art">
              <span className="about-art-label">
                <Sparkles size={15} /> A BETTER TOMORROW STARTS TODAY
              </span>
              <div className="about-big-text">
                A new skill.
                <br />A new <span>you.</span>
              </div>
              <div className="about-skill-row">
                <span>
                  <Palette size={20} />
                </span>
                <span>
                  <MonitorPlay size={20} />
                </span>
                <span>
                  <Sparkles size={20} />
                </span>
                <span>
                  <Code2 size={20} />
                </span>
                <ArrowUpRight size={32} />
              </div>
              <div className="about-caption">
                A little learning goes a long way.
              </div>
              <div className="about-circle" />
            </div>
            <div className="about-copy">
              <span className="eyebrow">ABOUT COMPUTER POINT CLASS</span>
              <h2>
                Learn practical
                <br />
                <span>digital skills.</span>
              </h2>
              <p>
                Computer Point Class helps beginners learn useful computer and
                digital skills through affordable, easy-to-understand courses.
              </p>
              <p>
                Whether you want to create your first design, edit a video,
                explore AI or build a website, start with a skill that matters
                to you. We keep the learning simple, practical and accessible.
              </p>
              <a className="text-link" href="#courses">
                Find your first course
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div className="container contact-layout">
            <div className="contact-copy">
              <span className="eyebrow">NEED HELP? WE’RE A MESSAGE AWAY</span>
              <h2>
                Big questions?
                <br />
                <span>Let’s talk.</span>
              </h2>
              <h3>Need help getting started?</h3>
              <p>
                Have a question about a course or payment?
                <br />
                Contact us on WhatsApp. We’re here to help.
              </p>
              <a
                className="contact-number"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  <MessageCircle size={23} />
                </span>
                <div>
                  <small>WHATSAPP SUPPORT</small>
                  {DISPLAY_PHONE}
                </div>
                <ArrowUpRight size={20} />
              </a>
              <WhatsAppButton />
            </div>
            <form className="contact-form" onSubmit={handleContact}>
              <h3>Send us a message</h3>
              <p>A little hello can be the start of something great.</p>
              <label htmlFor="contact-name">Your name</label>
              <input
                id="contact-name"
                name="name"
                placeholder="Enter your full name"
                autoComplete="name"
                required
                maxLength={100}
              />
              <label htmlFor="contact-phone">Phone number</label>
              <div className="phone-input">
                <span>+91</span>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  placeholder="Your mobile number"
                  autoComplete="tel-national"
                  required
                  maxLength={16}
                />
              </div>
              <label htmlFor="contact-message">Your message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="How can we help you?"
                required
                rows={3}
                maxLength={2000}
              />
              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}
              <button className="button primary full-width" type="submit">
                Send Message
                <ArrowUpRight size={18} />
              </button>
              <small className="form-caption">
                <MessageCircle size={13} /> Your message opens in WhatsApp.
                Press send there to deliver it.
              </small>
              {formReady && (
                <p className="form-success" role="status">
                  Message prepared.{" "}
                  <a
                    href={contactLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open WhatsApp
                  </a>{" "}
                  to send it.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <Brand footer />
              <h3>Learn. Create. Earn.</h3>
              <p>
                Practical digital skills. Affordable learning.
                <br />A smarter start, from anywhere.
              </p>
            </div>
            <div className="footer-links">
              <h4>EXPLORE</h4>
              <a href="#home">Home</a>
              <a href="#courses">Courses</a>
              <a href="#about">About us</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-links">
              <h4>LET’S CONNECT</h4>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={15} /> {DISPLAY_PHONE}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp
                <ArrowUpRight size={15} />
              </a>
              <span>Here to help you take the next step.</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © 2026 Infinity Institute of Technology. All Rights Reserved.
            </span>
            <span>
              Learning without limits.
              <ArrowUpRight size={13} />
            </span>
          </div>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Infinity Institute of Technology on WhatsApp"
      >
        <MessageCircle size={26} />
        <span>Need help?</span>
      </a>
      {selectedCourse && (
        <CheckoutModal
          key={selectedCourse.id}
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </>
  )
}
