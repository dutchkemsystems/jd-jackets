import type { Metadata } from "next";
import OrderForm from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "Order Custom Jackets — JD Jackets",
  description:
    "Tell us what you need and send your custom jacket order via WhatsApp.",
};

export default function OrderPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 sm:pt-32">
      <OrderForm />
    </main>
  );
}
