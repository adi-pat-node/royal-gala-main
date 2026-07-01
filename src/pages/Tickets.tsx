import { useState, useRef, useEffect, useCallback } from "react";
import emailjs from "@emailjs/browser";
import ticketsHero from '../assets/Royal-gala-asset-2.jpeg';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrnamentalDivider from "@/components/OrnamentalDivider";
import ScrollReveal from "@/components/ScrollReveal";
import { motion } from "framer-motion";
import { Plus, Minus, X } from "lucide-react";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: i * 0.2, ease: "easeOut" as const },
});

const eventDetails = [
  { label: "Date", value: "SEPTEMBER 29, 2026" },
  { label: "Time", value: "6:00 PM" },
  { label: "Venue", value: "St Bart's\nNew York" },
  { label: "Dress Code", value: "Black Tie /\nEvening Wear /\nNational Dress" },
];

type TicketCard = {
  number: string;
  tierLabel: string;
  prices: string;
  subtitle: string;
  individualAvail: string;
  tableAvail: string;
  note?: string;
};

type CheckoutData = {
  card: TicketCard;
  bookingType: "individual" | "table";
  price: string;
};

const ticketCards: TicketCard[] = [
  {
    number: "/01",
    tierLabel: "[ TIER 1 ]",
    prices: "$5,000 / $50,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "80 tickets remaining",
    tableAvail: "8 tables remaining",
  },
  {
    number: "/02",
    tierLabel: "[ TIER 2 ]",
    prices: "$2,500 / $25,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "80 tickets remaining",
    tableAvail: "8 tables remaining",
  },
  {
    number: "/03",
    tierLabel: "[ TIER 3 ]",
    prices: "$1,500 / $15,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "50 tickets remaining",
    tableAvail: "5 tables remaining",
  },
  {
    number: "/04",
    tierLabel: "[ TIER 4 ]",
    prices: "$500 / $5,000",
    subtitle: "Individual / Table of 10",
    individualAvail: "20 tickets remaining",
    tableAvail: "2 tables remaining",
    note: "Young Supporters under 30 (Photo ID verification on the evening is kindly requested)",
  },
];

const faqItems = [
  {
    question: "What is the refund policy?",
    answer: "Donation tickets are non-refundable but are transferable. If you are unable to attend, you may transfer your ticket to another guest by contacting us at least two weeks before the event.",
  },
  {
    question: "Is the venue accessible?",
    answer: "St Bart's is wheelchair accessible with step-free access to the nave. Please contact us in advance if you have specific accessibility requirements and we will do our best to accommodate you.",
  },
  {
    question: "Transport Information",
    answer: "A dedicated gala lane will be available at the main entrance of St Bartholomew's Church for guest drop-off and collection by car or taxi.",
  },
  {
    question: "What is the dress code?",
    answer: "The dress code is Black Tie / Evening Wear / National Dress. Gentlemen are invited to wear dinner jackets and ladies are encouraged to wear evening attire. National Dress and Decorations may be worn.",
  },
];

// ─── Checkout helpers ──────────────────────────────────────────────────────────

const DIETARY_OPTIONS = ["None", "Vegetarian", "Vegan", "Gluten Free", "Halal", "Kosher", "Other"];

const inputCss: React.CSSProperties = {
  backgroundColor: "#F2E5C6",
  border: "1px solid #75162D",
  borderRadius: "4px",
  color: "#1a1a1a",
  padding: "12px 14px",
  width: "100%",
  fontSize: "14px",
  fontFamily: "inherit",
  outline: "none",
  boxSizing: "border-box",
  WebkitBoxShadow: "0 0 0 1000px #F2E5C6 inset",
  WebkitTextFillColor: "#1a1a1a",
};

const labelCss: React.CSSProperties = {
  color: "rgba(242,229,198,0.55)",
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontWeight: 300,
  display: "block",
  marginBottom: 6,
};

const btnBack: React.CSSProperties = {
  flex: 1,
  backgroundColor: "transparent",
  color: "#F2E5C6",
  borderRadius: "4px",
  padding: "14px",
  border: "1px solid rgba(242,229,198,0.22)",
  cursor: "pointer",
  fontSize: "13px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: "Cormorant Garamond, serif",
  transition: "opacity 0.2s",
};

const btnPrimary: React.CSSProperties = {
  flex: 1,
  backgroundColor: "#75162D",
  color: "#F2E5C6",
  borderRadius: "4px",
  padding: "14px",
  border: "none",
  cursor: "pointer",
  fontSize: "13px",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  fontFamily: "Cormorant Garamond, serif",
  transition: "opacity 0.2s",
};

const CustomSelect = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (val: string) => void;
  options: string[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        style={{
          backgroundColor: "#F2E5C6",
          border: "1px solid #75162D",
          borderRadius: isOpen ? "4px 4px 0 0" : "4px",
          color: "#1a1a1a",
          padding: "12px 14px",
          width: "100%",
          fontSize: "14px",
          fontFamily: "inherit",
          outline: "none",
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          textAlign: "left",
        }}
      >
        <span>{value}</span>
        <span
          style={{
            width: 0,
            height: 0,
            flexShrink: 0,
            marginLeft: 10,
            ...(isOpen
              ? { borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderBottom: "6px solid #75162D" }
              : { borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #75162D" }),
          }}
        />
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 200,
            backgroundColor: "#F2E5C6",
            border: "1px solid #75162D",
            borderTop: "none",
            borderRadius: "0 0 4px 4px",
            overflow: "hidden",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setIsOpen(false); }}
              style={{
                display: "block",
                width: "100%",
                padding: "11px 14px",
                textAlign: "left",
                backgroundColor: opt === value ? "#75162D" : "#F2E5C6",
                color: opt === value ? "#F2E5C6" : "#1a1a1a",
                border: "none",
                borderBottom: "1px solid rgba(117,22,45,0.12)",
                cursor: "pointer",
                fontSize: "14px",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                if (opt !== value) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "rgba(117,22,45,0.1)";
              }}
              onMouseLeave={(e) => {
                if (opt !== value) (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#F2E5C6";
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FormField = ({
  id,
  label,
  required,
  error,
  note,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  note?: string;
  children: React.ReactNode;
}) => (
  <div style={{ marginBottom: 20 }}>
    <label htmlFor={id} style={labelCss}>
      {label}
      {required && <span style={{ color: "#75162D" }}> *</span>}
    </label>
    {children}
    {note && (
      <p style={{ color: "rgba(242,229,198,0.38)", fontSize: "11px", marginTop: 6, letterSpacing: "0.04em" }}>
        {note}
      </p>
    )}
    {error && (
      <p style={{ color: "#e07070", fontSize: "11px", marginTop: 4, letterSpacing: "0.04em" }}>{error}</p>
    )}
  </div>
);

const ProgressIndicator = ({ step }: { step: number }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 }}>
    {[1, 2, 3].map((s, i) => (
      <div key={s} style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: s < step ? "#F2E5C6" : s === step ? "#75162D" : "rgba(242,229,198,0.2)",
            border: s === step ? "2px solid #F2E5C6" : "none",
            boxSizing: "border-box",
            transition: "all 0.3s",
            flexShrink: 0,
          }}
        />
        {i < 2 && (
          <div
            style={{
              width: 28,
              height: 1,
              backgroundColor: s < step ? "rgba(242,229,198,0.4)" : "rgba(242,229,198,0.15)",
              transition: "background-color 0.3s",
            }}
          />
        )}
      </div>
    ))}
    <span
      style={{
        color: "rgba(242,229,198,0.38)",
        fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        marginLeft: 14,
      }}
    >
      Step {step} of 3
    </span>
  </div>
);

// ─── Checkout Modal ────────────────────────────────────────────────────────────

const CheckoutModal = ({ data, onClose }: { data: CheckoutData; onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    dietary: "None",
    specialRequests: "",
  });

  const isYoungSupporter = data.card.number === "/04";
  const today = new Date();
  const maxDob = isYoungSupporter
    ? new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
        .toISOString().split("T")[0]
    : undefined;
  const minDob = isYoungSupporter
    ? new Date(today.getFullYear() - 30, today.getMonth(), today.getDate())
        .toISOString().split("T")[0]
    : undefined;

  const bookingLabel = data.bookingType === "individual" ? "Individual Ticket" : "Table of 10";

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!formData.fullName.trim()) e.fullName = "Full name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Please enter a valid email";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    if (!formData.dob) e.dob = "Date of birth is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    setErrors({});
    setStep((s) => s + 1);
  };

  const update =
    (field: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((d) => ({ ...d, [field]: e.target.value }));

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const ticketPriceNumber = parseFloat(data.price.replace(/[$,]/g, ""));
      const airtableResponse = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/Guest`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              "Full Name": formData.fullName,
              "Email": formData.email,
              "Phone": formData.phone,
              "Date of Birth": formData.dob,
              "Ticket Type": `${data.card.tierLabel} · ${bookingLabel}`,
              "Ticket Price": ticketPriceNumber,
              "Dietary Requirements": formData.dietary,
              "Special Requests": formData.specialRequests,
              "Payment Status": "Pending",
              "Booking date": new Date().toISOString().split("T")[0],
            },
          }),
        }
      );
      if (!airtableResponse.ok) {
        const errorData = await airtableResponse.json();
        console.error("Airtable error:", JSON.stringify(errorData, null, 2));
        throw new Error("Airtable submission failed");
      }
      const ticketType = `${data.card.tierLabel} · ${bookingLabel}`;
      try {
        console.log('EmailJS Service ID:', import.meta.env.VITE_EMAILJS_SERVICE_ID)
        console.log('EmailJS Template ID:', import.meta.env.VITE_EMAILJS_TEMPLATE_ID)
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            to_email: formData.email,
            guest_name: formData.fullName,
            ticket_type: ticketType,
            ticket_price: data.price,
            reply_to: "rsvp@sjp.org.uk",
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_NOTIFICATION_TEMPLATE_ID,
          {
            notification_email: "rsvp@sjp.org.uk",
            guest_name: formData.fullName,
            guest_email: formData.email,
            guest_phone: formData.phone,
            guest_dob: formData.dob,
            ticket_type: ticketType,
            booking_type: bookingLabel,
            ticket_price: data.price,
            dietary_requirements: formData.dietary,
            special_requests: formData.specialRequests || "None",
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
      } catch (emailError) {
        console.error("EmailJS error:", JSON.stringify(emailError, null, 2));
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again or contact us at rsvp@sjp.org.uk");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center sm:p-6"
      style={{ backgroundColor: "rgba(0,0,0,0.78)" }}
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full h-full sm:h-auto sm:max-w-lg sm:max-h-[90vh] sm:rounded overflow-y-auto"
        style={{ backgroundColor: "#3B010B" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            zIndex: 10,
            color: "rgba(242,229,198,0.5)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 8,
            lineHeight: 0,
          }}
        >
          <X size={20} />
        </button>

        <style>{`.checkout-field::placeholder { color: #8a7a6a; }`}</style>
        <div className="px-6 sm:px-8 pb-10 pt-14">
          {submitted ? (
            <div style={{ textAlign: "center", paddingTop: 32, paddingBottom: 32 }}>
              <h2
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontStyle: "italic",
                  color: "#F2E5C6",
                  fontSize: "clamp(2rem, 5vw, 5rem)",
                  fontWeight: 300,
                  marginBottom: 20,
                }}
              >
                Thank You
              </h2>
              <p
                style={{
                  color: "rgba(242,229,198,0.72)",
                  fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)",
                  lineHeight: 1.9,
                  maxWidth: 360,
                  margin: "0 auto 40px",
                }}
              >
                Thank you for your reservation request. Please check your email for payment instructions.
              </p>
              <button onClick={onClose} style={{ ...btnPrimary, flex: "unset", padding: "14px 48px" }}>
                Close
              </button>
            </div>
          ) : (
            <>
              <ProgressIndicator step={step} />

              {step === 1 && (
                <>
                  <h2
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontStyle: "italic",
                      color: "#F2E5C6",
                      fontSize: "clamp(2rem, 5vw, 5rem)",
                      fontWeight: 300,
                      textAlign: "center",
                      marginBottom: 10,
                    }}
                  >
                    Guest Information
                  </h2>
                  <p
                    style={{
                      color: "rgba(242,229,198,0.55)",
                      fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)",
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      textAlign: "center",
                      marginBottom: 28,
                    }}
                  >
                    {data.card.tierLabel} &middot; {bookingLabel} &middot; {data.price}
                  </p>

                  <FormField id="fullName" label="Full Name" required error={errors.fullName}>
                    <input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={update("fullName")}
                      style={inputCss}
                      placeholder="Your full name"
                      autoComplete="name"
                      className="checkout-field"
                    />
                  </FormField>

                  <FormField id="email" label="Email Address" required error={errors.email}>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={update("email")}
                      style={inputCss}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="checkout-field"
                    />
                  </FormField>

                  <FormField id="phone" label="Phone Number" required error={errors.phone}>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={update("phone")}
                      style={inputCss}
                      placeholder="+1 (000) 000-0000"
                      autoComplete="tel"
                      className="checkout-field"
                    />
                  </FormField>

                  <FormField
                    id="dob"
                    label="Date of Birth"
                    required
                    error={errors.dob}
                    note={isYoungSupporter ? "Required for age verification for Young Supporters under 30" : undefined}
                  >
                    <input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={update("dob")}
                      max={maxDob}
                      min={minDob}
                      style={{ ...inputCss, colorScheme: "light" }}
                      autoComplete="bday"
                      className="checkout-field"
                    />
                  </FormField>

                  <button
                    onClick={handleNext}
                    style={{ ...btnPrimary, flex: "unset", width: "100%", marginTop: 8 }}
                  >
                    Next
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <h2
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontStyle: "italic",
                      color: "#F2E5C6",
                      fontSize: "clamp(2rem, 5vw, 5rem)",
                      fontWeight: 300,
                      textAlign: "center",
                      marginBottom: 28,
                    }}
                  >
                    Additional Details
                  </h2>

                  <FormField id="dietary" label="Dietary Requirements">
                    <CustomSelect
                      value={formData.dietary}
                      onChange={(val) => setFormData((d) => ({ ...d, dietary: val }))}
                      options={DIETARY_OPTIONS}
                    />
                  </FormField>

                  <FormField id="specialRequests" label="Special Requests (Optional)">
                    <textarea
                      id="specialRequests"
                      value={formData.specialRequests}
                      onChange={update("specialRequests")}
                      style={{ ...inputCss, minHeight: 96, resize: "vertical" }}
                      placeholder="Any additional information or requests..."
                      className="checkout-field"
                    />
                  </FormField>

                  <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                    <button onClick={() => setStep(1)} style={btnBack}>Back</button>
                    <button onClick={handleNext} style={btnPrimary}>Next</button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h2
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontStyle: "italic",
                      color: "#F2E5C6",
                      fontSize: "clamp(2rem, 5vw, 5rem)",
                      fontWeight: 300,
                      textAlign: "center",
                      marginBottom: 28,
                    }}
                  >
                    Review &amp; Submit
                  </h2>

                  <div
                    style={{
                      backgroundColor: "rgba(242,229,198,0.05)",
                      border: "1px solid rgba(242,229,198,0.12)",
                      borderRadius: "4px",
                      padding: "20px 24px",
                      marginBottom: 24,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <span style={{ color: "rgba(242,229,198,0.42)", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginRight: 16 }}>Tier</span>
                      <span style={{ color: "#F2E5C6", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", textAlign: "right" }}>{data.card.tierLabel}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <span style={{ color: "rgba(242,229,198,0.42)", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginRight: 16 }}>Booking</span>
                      <span style={{ color: "#F2E5C6", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", textAlign: "right" }}>{bookingLabel}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 16 }}>
                      <span style={{ color: "rgba(242,229,198,0.42)", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginRight: 16 }}>Price</span>
                      <span style={{ color: "#F2E5C6", fontSize: "clamp(1.5rem, 3vw, 2.8rem)", fontFamily: "Cormorant Garamond, serif", fontWeight: 300, letterSpacing: "0.02em" }}>{data.price}</span>
                    </div>
                    <div style={{ height: 1, backgroundColor: "rgba(242,229,198,0.1)", marginBottom: 16 }} />
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
                      <span style={{ color: "rgba(242,229,198,0.42)", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginRight: 16 }}>Name</span>
                      <span style={{ color: "#F2E5C6", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}>{formData.fullName}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                      <span style={{ color: "rgba(242,229,198,0.42)", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0, marginRight: 16 }}>Email</span>
                      <span style={{ color: "#F2E5C6", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", wordBreak: "break-all", textAlign: "right" }}>{formData.email}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: "#F2E5C6",
                      border: "1px solid #75162D",
                      borderRadius: "4px",
                      padding: "16px",
                      marginBottom: 28,
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="8" cy="8" r="7" stroke="#75162D" strokeWidth="1.5" />
                      <line x1="8" y1="7" x2="8" y2="11" stroke="#75162D" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="8" cy="5" r="0.75" fill="#75162D" />
                    </svg>
                    <p style={{ color: "#373737", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", fontWeight: 500, lineHeight: 1.7, margin: 0 }}>
                      Upon submission you will receive an email with bank transfer instructions to complete your reservation.
                    </p>
                  </div>

                  {submitError && (
                    <div
                      style={{
                        backgroundColor: "#F2E5C6",
                        border: "1px solid #75162D",
                        borderRadius: "4px",
                        padding: "12px 16px",
                        marginBottom: 16,
                      }}
                    >
                      <p style={{ color: "#373737", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", lineHeight: 1.7, margin: 0 }}>{submitError}</p>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      onClick={() => setStep(2)}
                      disabled={isSubmitting}
                      style={{ ...btnBack, opacity: isSubmitting ? 0.5 : 1, cursor: isSubmitting ? "default" : "pointer" }}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      style={{ ...btnPrimary, opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "default" : "pointer" }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Booking Type Modal ────────────────────────────────────────────────────────

const BookingOptionCard = ({
  label,
  price,
  availability,
  selected,
  onSelect,
}: {
  label: string;
  price: string;
  availability: string;
  selected: boolean;
  onSelect: () => void;
}) => {
  const [hovered, setHovered] = useState(false);
  const borderStyle = selected
    ? "2px solid #F2E5C6"
    : hovered
    ? "1px solid rgba(117,22,45,0.75)"
    : "1px solid #75162D";

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#3B010B",
        border: borderStyle,
        borderRadius: "2px",
        padding: "20px 16px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.2s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 8px 24px rgba(0,0,0,0.4)"
          : selected
          ? "0 0 14px rgba(242,229,198,0.1)"
          : "none",
      }}
    >
      {selected && (
        <span style={{ position: "absolute", top: 10, right: 10, color: "#F2E5C6", lineHeight: 0 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="2.5,8.5 6.5,12.5 13.5,4.5" stroke="#F2E5C6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <p style={{ color: "rgba(242,229,198,0.5)", fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 300, marginBottom: 10 }}>
        {label}
      </p>
      <p style={{ fontFamily: "Cormorant Garamond, serif", color: "#F2E5C6", fontSize: "clamp(1.5rem, 3vw, 2.8rem)", fontWeight: 300, lineHeight: 1, marginBottom: 10 }}>
        {price}
      </p>
      <p style={{ color: "rgba(242,229,198,0.55)", fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)", lineHeight: 1.5 }}>
        {availability}
      </p>
    </button>
  );
};

const BookingTypeModal = ({
  card,
  onClose,
  onContinue,
}: {
  card: TicketCard;
  onClose: () => void;
  onContinue: (type: "individual" | "table", price: string) => void;
}) => {
  const [selected, setSelected] = useState<"individual" | "table" | null>(null);
  const [individualPrice, tablePrice] = card.prices.split(" / ");

  const handleContinue = () => {
    if (!selected) return;
    const price = selected === "individual" ? individualPrice : tablePrice;
    onContinue(selected, price);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-md"
        style={{ backgroundColor: "#560B18", borderRadius: "2px" }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            color: "rgba(242,229,198,0.45)",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 6,
            lineHeight: 0,
          }}
        >
          <X size={18} />
        </button>

        <div className="px-6 sm:px-8 pt-10 pb-8">
          <h2
            style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic",
              color: "#F2E5C6",
              fontSize: "clamp(2rem, 5vw, 5rem)",
              fontWeight: 300,
              textAlign: "center",
              marginBottom: 16,
            }}
          >
            Select Your Booking Type
          </h2>

          <div style={{ height: 1, backgroundColor: "#75162D", marginBottom: 24 }} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <BookingOptionCard
              label="Individual Ticket"
              price={individualPrice}
              availability={card.individualAvail}
              selected={selected === "individual"}
              onSelect={() => setSelected("individual")}
            />
            <BookingOptionCard
              label="Table of 10"
              price={tablePrice}
              availability={card.tableAvail}
              selected={selected === "table"}
              onSelect={() => setSelected("table")}
            />
          </div>

          <button
            onClick={handleContinue}
            disabled={!selected}
            style={{
              width: "100%",
              backgroundColor: selected ? "#75162D" : "rgba(117,22,45,0.3)",
              color: selected ? "#F2E5C6" : "rgba(242,229,198,0.35)",
              border: "none",
              borderRadius: "4px",
              padding: "14px",
              fontFamily: "Cormorant Garamond, serif",
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: selected ? "pointer" : "default",
              transition: "background-color 0.2s, color 0.2s",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Ticket Arch Card ──────────────────────────────────────────────────────────

const TicketArchCard = ({ detail, delay }: { detail: { label: string; value: string }; delay: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative flex flex-col items-center">
      <svg
        viewBox="0 0 200 280"
        className="w-full max-w-[180px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M10 280 L10 120 Q10 10 100 10 Q190 10 190 120 L190 280 L10 280"
          stroke="hsl(345, 68%, 27%)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          pathLength={1}
          strokeDasharray={1}
          initial={{ strokeDashoffset: 1 }}
          animate={inView ? { strokeDashoffset: 0 } : { strokeDashoffset: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay }}
        />
      </svg>
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pt-4"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: delay + 2.0 }}
      >
        <span
          className="text-burgundy tracking-wider-luxe uppercase font-light mb-3"
          style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
        >
          {detail.label}
        </span>
        <span
          className="font-display italic text-burgundy leading-tight text-center px-6 whitespace-pre-line"
          style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)" }}
        >
          {detail.value}
        </span>
      </motion.div>
    </div>
  );
};

// ─── Ticket Card ───────────────────────────────────────────────────────────────

const TicketCardItem = ({ card, onReserve }: { card: TicketCard; onReserve: () => void }) => (
  <div
    className="flex flex-col p-5 border"
    style={{
      backgroundColor: "#3B010B",
      borderColor: "rgba(242,229,198,0.15)",
      borderRadius: "2px",
    }}
  >
    <div className="flex items-start justify-between mb-4 gap-4">
      <span
        className="font-display text-[#F2E5C6]/40 tracking-widest shrink-0"
        style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
      >
        {card.number}
      </span>
      <span
        className="text-[#F2E5C6]/50 tracking-wider uppercase font-light text-right leading-relaxed"
        style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
      >
        {card.tierLabel}
      </span>
    </div>

    <div className="w-8 h-[1px] mb-4" style={{ backgroundColor: "#75162D" }} />

    <div className="mb-2">
      <span
        className="font-display text-[#F2E5C6] font-light leading-none"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
      >
        {card.prices}
      </span>
    </div>

    <p
      className="text-[#F2E5C6]/60 tracking-wider uppercase font-light mb-3"
      style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
    >
      {card.subtitle}
    </p>

    {card.note && (
      <p
        className="font-display italic text-[#F2E5C6]/70 leading-relaxed mb-3"
        style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
      >
        {card.note}
      </p>
    )}

    <div className="flex-1" />

    <button
      onClick={onReserve}
      className="w-full py-3 font-display text-[13px] uppercase tracking-wider transition-opacity duration-200 hover:opacity-90"
      style={{
        backgroundColor: "#75162D",
        color: "#F2E5C6",
        borderRadius: "4px",
        border: "none",
        cursor: "pointer",
      }}
    >
      Reserve Your Place
    </button>
  </div>
);

// ─── FAQ ───────────────────────────────────────────────────────────────────────

const FaqAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="border-b" style={{ borderColor: "hsl(345, 68%, 27%)" }}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between py-6 text-left"
            >
              <span
                className="font-display italic text-burgundy"
                style={{ fontSize: "clamp(1rem, 2vw, 1.5rem)" }}
              >
                {item.question}
              </span>
              {isOpen ? (
                <Minus size={16} className="text-burgundy shrink-0 ml-4" />
              ) : (
                <Plus size={16} className="text-burgundy shrink-0 ml-4" />
              )}
            </button>
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <p
                className="text-[#373737] leading-[1.8] pb-6"
                style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
              >
                {item.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ─── Page ──────────────────────────────────────────────────────────────────────

const Tickets = () => {
  const [parallaxY, setParallaxY] = useState(0);
  const [activeCard, setActiveCard] = useState<TicketCard | null>(null);
  const [checkoutData, setCheckoutData] = useState<CheckoutData | null>(null);

  const handleScroll = useCallback(() => {
    setParallaxY(window.scrollY * 0.5);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = activeCard || checkoutData ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activeCard, checkoutData]);

  const handleContinue = (type: "individual" | "table", price: string) => {
    if (!activeCard) return;
    setCheckoutData({ card: activeCard, bookingType: type, price });
    setActiveCard(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          minHeight: "100svh",
          paddingTop: "clamp(4rem, 10vw, 8rem)",
          paddingBottom: "clamp(4rem, 10vw, 8rem)",
        }}
      >
        <div
          className="absolute inset-0 w-full"
          style={{
            backgroundImage: `url(${ticketsHero})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: `translateY(${parallaxY}px)`,
            willChange: "transform",
            top: "-20%",
            height: "140%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(59, 1, 11, 0.55)" }}
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            className="text-champagne tracking-wider-luxe font-light mb-6"
            style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
            {...fade(0)}
          >
            AMERICAN FRIENDS OF ST JAMES'S PICCADILLY
          </motion.p>
          <motion.div {...fade(1)}>
            <OrnamentalDivider color="gold" className="mb-8" />
          </motion.div>
          <motion.h1
            className="font-display italic text-champagne font-light leading-[0.9] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 9rem)" }}
            {...fade(2)}
          >
            An Evening of<br />Distinction
          </motion.h1>
          <motion.p
            className="text-champagne font-light mb-8 text-center"
            style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)", letterSpacing: "0.2em" }}
            {...fade(3)}
          >
            SEPTEMBER 29, 2026 &nbsp;·&nbsp; 6:00 PM &nbsp;·&nbsp; ST BART'S, NEW YORK, 325 PARK AVE, NEW YORK, NY 10022
            <span style={{ display: "block", marginTop: "0.75rem" }}>BLACK TIE / EVENING WEAR / NATIONAL DRESS</span>
          </motion.p>
          <motion.div {...fade(4)}>
            <OrnamentalDivider color="gold" />
          </motion.div>
        </div>
      </section>

      {/* Event Details Strip */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
            {eventDetails.map((detail, i) => (
              <TicketArchCard key={detail.label} detail={detail} delay={i * 0.15} />
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Ticket Tiers Section */}
      <section className="py-24 px-6" style={{ backgroundColor: "hsl(350, 80%, 19%)" }}>
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mb-10" />
          <h2
            className="font-display italic text-champagne font-light text-center mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
          >
            {"{ "}The Tickets{" }"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
            {ticketCards.map((card) => (
              <TicketCardItem key={card.number} card={card} onReserve={() => setActiveCard(card)} />
            ))}
          </div>
          <div className="max-w-[900px] mx-auto mt-4">
            <div
              className="flex flex-col p-5 border"
              style={{
                backgroundColor: "#3B010B",
                borderColor: "rgba(242,229,198,0.15)",
                borderRadius: "2px",
              }}
            >
              <div className="flex items-start justify-between mb-4 gap-4">
                <span
                  className="text-[#F2E5C6]/50 tracking-wider uppercase font-light"
                  style={{ fontSize: "clamp(0.6rem, 0.9vw, 0.75rem)" }}
                >
                  [ CANNOT ATTEND ]
                </span>
              </div>
              <div className="w-8 h-[1px] mb-4" style={{ backgroundColor: "#75162D" }} />
              <div className="mb-2">
                <span
                  className="font-display text-[#F2E5C6] font-light leading-none"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
                >
                  Make a Donation
                </span>
              </div>
              <p
                className="font-display italic text-[#F2E5C6]/70 leading-relaxed mb-4 mt-2"
                style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
              >
                Unable to join us on the evening but would like to support the work of St James's Piccadilly and the Changemaker Programme?
              </p>
              <div className="flex-1" />
              <button
                className="w-full py-3 font-display text-[13px] uppercase tracking-wider transition-opacity duration-200 hover:opacity-90"
                style={{
                  backgroundColor: "#75162D",
                  color: "#F2E5C6",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Make a Donation
              </button>
            </div>
          </div>
          <OrnamentalDivider color="gold" className="mt-12" />
        </ScrollReveal>
      </section>

      {/* FAQ Section */}
      <section className="bg-champagne grain-texture py-24 px-6">
        <ScrollReveal>
          <OrnamentalDivider color="gold" className="mb-12" />
          <h2
            className="font-display italic text-burgundy font-light text-center mb-16"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            {"{ "}Frequently Asked Questions{" }"}
          </h2>
          <FaqAccordion />
        </ScrollReveal>
      </section>

      {/* Closing CTA */}
      <section className="py-24 px-6" style={{ backgroundColor: "#3B010B" }}>
        <ScrollReveal>
          <div className="max-w-3xl mx-auto text-center">
            <OrnamentalDivider color="gold" className="mb-12" />
            <h2
              className="font-display italic text-champagne font-light leading-[1.1] mb-6"
              style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
            >
              We Look Forward<br />to Seeing You
            </h2>
            <p
              className="text-champagne/80 font-display leading-relaxed mb-10"
              style={{ fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}
            >
              Secure your place at an unforgettable evening celebrating legacy, art, and community
            </p>
            <OrnamentalDivider color="gold" className="mt-12" />
          </div>
        </ScrollReveal>
      </section>

      <Footer />

      {activeCard && (
        <BookingTypeModal
          card={activeCard}
          onClose={() => setActiveCard(null)}
          onContinue={handleContinue}
        />
      )}

      {checkoutData && (
        <CheckoutModal
          data={checkoutData}
          onClose={() => setCheckoutData(null)}
        />
      )}
    </div>
  );
};

export default Tickets;
