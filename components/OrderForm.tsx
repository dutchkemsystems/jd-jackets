"use client";

import { useState, useCallback } from "react";
import {
  SIZES,
  type Size,
  type BrandingMethod,
  type LogoPlacement,
  type OrderPayload,
  buildOrderMessage,
  buildWhatsAppUrl,
  totalQuantity,
} from "@/lib/whatsapp";
import { INDUSTRIES } from "@/lib/industries";
import { JACKET_STYLES } from "@/lib/jackets";

const STEPS = ["Who you are", "What you need", "Review & send"] as const;

const PLACEMENT_OPTIONS: { value: LogoPlacement; label: string }[] = [
  { value: "front", label: "Front" },
  { value: "back", label: "Back" },
  { value: "left-sleeve", label: "Left sleeve" },
  { value: "right-sleeve", label: "Right sleeve" },
];

interface FormState {
  businessName: string;
  contactName: string;
  contactEmail: string;
  industry: string;
  jacketStyle: string;
  sizes: Partial<Record<Size, number>>;
  colours: string;
  brandingMethod: BrandingMethod;
  logoPlacement: LogoPlacement[];
  artworkFiles: string;
  deliveryLocation: string;
  requiredDate: string;
  notes: string;
}

const INITIAL_STATE: FormState = {
  businessName: "",
  contactName: "",
  contactEmail: "",
  industry: "",
  jacketStyle: "",
  sizes: {},
  colours: "",
  brandingMethod: "embroidery",
  logoPlacement: [],
  artworkFiles: "",
  deliveryLocation: "",
  requiredDate: "",
  notes: "",
};

interface FormErrors {
  [key: string]: string;
}

function validateStep(step: number, state: FormState): FormErrors {
  const errors: FormErrors = {};

  if (step === 0) {
    if (!state.businessName.trim()) errors.businessName = "Business name is required";
    if (!state.contactName.trim()) errors.contactName = "Contact name is required";
    if (state.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.contactEmail)) {
      errors.contactEmail = "Please enter a valid email address";
    }
    if (!state.industry) errors.industry = "Please select an industry";
  }

  if (step === 1) {
    if (!state.jacketStyle) errors.jacketStyle = "Please select a jacket style";
    if (totalQuantity(state.sizes) === 0) {
      errors.sizes = "Please enter at least one quantity";
    }
    if (!state.deliveryLocation.trim()) {
      errors.deliveryLocation = "Delivery location is required";
    }
    if (!state.requiredDate) errors.requiredDate = "Required delivery date is required";
  }

  return errors;
}

export default function OrderForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = useCallback(
    <K extends keyof FormState>(field: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as string];
        return next;
      });
    },
    []
  );

  const updateSize = useCallback((size: Size, value: string) => {
    const num = parseInt(value, 10) || 0;
    setForm((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: num },
    }));
    setErrors((prev) => {
      const next = { ...prev };
      delete next.sizes;
      return next;
    });
  }, []);

  const togglePlacement = useCallback((placement: LogoPlacement) => {
    setForm((prev) => ({
      ...prev,
      logoPlacement: prev.logoPlacement.includes(placement)
        ? prev.logoPlacement.filter((p) => p !== placement)
        : [...prev.logoPlacement, placement],
    }));
  }, []);

  const handleNext = () => {
    const stepErrors = validateStep(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 0));
  };

  const handleSubmit = () => {
    const stepErrors = validateStep(1, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setStep(1);
      return;
    }

    const payload: OrderPayload = {
      businessName: form.businessName,
      contactName: form.contactName,
      contactEmail: form.contactEmail || undefined,
      industry: form.industry,
      jacketStyle: form.jacketStyle,
      sizes: form.sizes,
      colours: form.colours,
      brandingMethod: form.brandingMethod,
      logoPlacement: form.logoPlacement,
      artworkFiles: form.artworkFiles
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      deliveryLocation: form.deliveryLocation,
      requiredDate: form.requiredDate,
      notes: form.notes || undefined,
    };

    const message = buildOrderMessage(payload);
    const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

    if (!phone) {
      throw new Error(
        "NEXT_PUBLIC_WHATSAPP_NUMBER is not configured. Please set it in your environment."
      );
    }

    const url = buildWhatsAppUrl(phone, message);
    window.open(url, "_blank", "noopener,noreferrer");
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <div className="rounded-lg border border-jd-dark bg-jd-dark/50 p-8">
          <h2 className="text-2xl font-bold text-jd-offwhite">
            Order sent to WhatsApp
          </h2>
          <p className="mt-4 text-jd-mid">
            Your order details have been opened in WhatsApp. To complete your
            order, please:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 text-jd-mid">
            <li>Review the pre-filled message in WhatsApp</li>
            <li>
              Attach your artwork files (logos, brand guides) directly in the
              WhatsApp chat
            </li>
            <li>Send the message to our team</li>
          </ol>
          <p className="mt-6 rounded-md bg-jd-black/50 p-4 text-sm text-jd-mid">
            <strong className="text-jd-offwhite">Note:</strong> WhatsApp deep
            links cannot carry file attachments. The form collected your
            artwork filenames only — you must attach the actual files inside
            the WhatsApp thread.
          </p>
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setForm(INITIAL_STATE);
              setStep(0);
            }}
            className="mt-6 rounded-md bg-jd-orange px-6 py-3 text-base font-semibold text-jd-black transition-opacity hover:opacity-90"
          >
            Place another order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {/* Progress indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((label, i) => (
            <div key={label} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                    i <= step
                      ? "bg-jd-orange text-jd-black"
                      : "bg-jd-dark text-jd-mid"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`mt-2 text-xs ${
                    i <= step ? "text-jd-offwhite" : "text-jd-mid"
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 ${
                    i < step ? "bg-jd-orange" : "bg-jd-dark"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Who you are */}
      {step === 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-jd-offwhite">Who you are</h2>

          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Business name <span className="text-jd-red">*</span>
            </label>
            <input
              id="businessName"
              type="text"
              value={form.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite placeholder:text-jd-mid focus:border-jd-orange focus:outline-none"
              placeholder="Acme Corp"
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-jd-red">{errors.businessName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Contact name <span className="text-jd-red">*</span>
            </label>
            <input
              id="contactName"
              type="text"
              value={form.contactName}
              onChange={(e) => updateField("contactName", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite placeholder:text-jd-mid focus:border-jd-orange focus:outline-none"
              placeholder="Jane Doe"
            />
            {errors.contactName && (
              <p className="mt-1 text-sm text-jd-red">{errors.contactName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="contactEmail"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Contact email{" "}
              <span className="text-jd-mid">(optional)</span>
            </label>
            <input
              id="contactEmail"
              type="email"
              value={form.contactEmail}
              onChange={(e) => updateField("contactEmail", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite placeholder:text-jd-mid focus:border-jd-orange focus:outline-none"
              placeholder="jane@acme.com"
            />
            {errors.contactEmail && (
              <p className="mt-1 text-sm text-jd-red">{errors.contactEmail}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="industry"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Industry <span className="text-jd-red">*</span>
            </label>
            <select
              id="industry"
              value={form.industry}
              onChange={(e) => updateField("industry", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite focus:border-jd-orange focus:outline-none"
            >
              <option value="">Select an industry</option>
              {INDUSTRIES.map((ind) => (
                <option key={ind.slug} value={ind.name}>
                  {ind.name}
                </option>
              ))}
            </select>
            {errors.industry && (
              <p className="mt-1 text-sm text-jd-red">{errors.industry}</p>
            )}
          </div>
        </div>
      )}

      {/* Step 2: What you need */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-jd-offwhite">
            What you need
          </h2>

          <div>
            <label
              htmlFor="jacketStyle"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Jacket style <span className="text-jd-red">*</span>
            </label>
            <select
              id="jacketStyle"
              value={form.jacketStyle}
              onChange={(e) => updateField("jacketStyle", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite focus:border-jd-orange focus:outline-none"
            >
              <option value="">Select a jacket style</option>
              {JACKET_STYLES.map((style) => (
                <option key={style.slug} value={style.name}>
                  {style.name}
                </option>
              ))}
            </select>
            {errors.jacketStyle && (
              <p className="mt-1 text-sm text-jd-red">{errors.jacketStyle}</p>
            )}
          </div>

          <div>
            <span className="block text-sm font-medium text-jd-offwhite">
              Quantity per size <span className="text-jd-red">*</span>
            </span>
            <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SIZES.map((size) => (
                <div key={size}>
                  <label
                    htmlFor={`size-${size}`}
                    className="block text-xs text-jd-mid"
                  >
                    {size}
                  </label>
                  <input
                    id={`size-${size}`}
                    type="number"
                    min="0"
                    value={form.sizes[size] ?? ""}
                    onChange={(e) => updateSize(size, e.target.value)}
                    className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite focus:border-jd-orange focus:outline-none"
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
            {errors.sizes && (
              <p className="mt-1 text-sm text-jd-red">{errors.sizes}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="colours"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Colour preferences{" "}
              <span className="text-jd-mid">
                (brand colour codes welcome)
              </span>
            </label>
            <input
              id="colours"
              type="text"
              value={form.colours}
              onChange={(e) => updateField("colours", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite placeholder:text-jd-mid focus:border-jd-orange focus:outline-none"
              placeholder="Navy, White, #FF5A1F"
            />
          </div>

          <div>
            <span className="block text-sm font-medium text-jd-offwhite">
              Branding method
            </span>
            <div className="mt-2 flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="brandingMethod"
                  value="embroidery"
                  checked={form.brandingMethod === "embroidery"}
                  onChange={() =>
                    updateField("brandingMethod", "embroidery" as BrandingMethod)
                  }
                  className="h-4 w-4 accent-jd-orange"
                />
                <span className="text-sm text-jd-offwhite">Embroidery</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="brandingMethod"
                  value="printing"
                  checked={form.brandingMethod === "printing"}
                  onChange={() =>
                    updateField("brandingMethod", "printing" as BrandingMethod)
                  }
                  className="h-4 w-4 accent-jd-orange"
                />
                <span className="text-sm text-jd-offwhite">Printing</span>
              </label>
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium text-jd-offwhite">
              Logo placement
            </span>
            <div className="mt-2 flex flex-wrap gap-3">
              {PLACEMENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    checked={form.logoPlacement.includes(opt.value)}
                    onChange={() => togglePlacement(opt.value)}
                    className="h-4 w-4 accent-jd-orange"
                  />
                  <span className="text-sm text-jd-offwhite">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="artworkFiles"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Artwork filenames{" "}
              <span className="text-jd-mid">(comma-separated)</span>
            </label>
            <input
              id="artworkFiles"
              type="text"
              value={form.artworkFiles}
              onChange={(e) => updateField("artworkFiles", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite placeholder:text-jd-mid focus:border-jd-orange focus:outline-none"
              placeholder="logo.svg, brand-guide.pdf"
            />
          </div>

          <div>
            <label
              htmlFor="deliveryLocation"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Delivery location <span className="text-jd-red">*</span>
            </label>
            <input
              id="deliveryLocation"
              type="text"
              value={form.deliveryLocation}
              onChange={(e) => updateField("deliveryLocation", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite placeholder:text-jd-mid focus:border-jd-orange focus:outline-none"
              placeholder="Amsterdam, Netherlands"
            />
            {errors.deliveryLocation && (
              <p className="mt-1 text-sm text-jd-red">
                {errors.deliveryLocation}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="requiredDate"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Required delivery date <span className="text-jd-red">*</span>
            </label>
            <input
              id="requiredDate"
              type="date"
              value={form.requiredDate}
              onChange={(e) => updateField("requiredDate", e.target.value)}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite focus:border-jd-orange focus:outline-none"
            />
            {errors.requiredDate && (
              <p className="mt-1 text-sm text-jd-red">{errors.requiredDate}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-jd-offwhite"
            >
              Additional notes{" "}
              <span className="text-jd-mid">(optional)</span>
            </label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => updateField("notes", e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border border-jd-dark bg-jd-black px-3 py-2 text-jd-offwhite placeholder:text-jd-mid focus:border-jd-orange focus:outline-none"
              placeholder="Any special requirements…"
            />
          </div>
        </div>
      )}

      {/* Step 3: Review and send */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-jd-offwhite">
            Review and send
          </h2>
          <p className="text-sm text-jd-mid">
            This is the exact message that will be sent to our team via
            WhatsApp:
          </p>
          <pre className="max-h-96 overflow-auto rounded-md border border-jd-dark bg-jd-black p-4 text-sm leading-relaxed text-jd-offwhite">
            {buildOrderMessage({
              businessName: form.businessName,
              contactName: form.contactName,
              contactEmail: form.contactEmail || undefined,
              industry: form.industry,
              jacketStyle: form.jacketStyle,
              sizes: form.sizes,
              colours: form.colours,
              brandingMethod: form.brandingMethod,
              logoPlacement: form.logoPlacement,
              artworkFiles: form.artworkFiles
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean),
              deliveryLocation: form.deliveryLocation,
              requiredDate: form.requiredDate,
              notes: form.notes || undefined,
            })}
          </pre>
          <p className="rounded-md bg-jd-black/50 p-4 text-sm text-jd-mid">
            <strong className="text-jd-offwhite">Important:</strong> WhatsApp
            deep links cannot carry file attachments. After sending this
            message, please attach your artwork files directly in the WhatsApp
            chat.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          disabled={step === 0}
          className="rounded-md border border-jd-dark px-6 py-3 text-base font-medium text-jd-offwhite transition-colors hover:border-jd-mid disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-md bg-jd-orange px-6 py-3 text-base font-semibold text-jd-black transition-opacity hover:opacity-90"
          >
            Next
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-jd-orange px-6 py-3 text-base font-semibold text-jd-black transition-opacity hover:opacity-90"
          >
            Send order on WhatsApp
          </button>
        )}
      </div>
    </div>
  );
}
