import Hero from "@/components/home/Hero";
import Ticker from "@/components/ui/Ticker";

const TICKER_ITEMS = [
  "Premium Almonds",
  "Roasted & Salted Pistachios",
  "Premium Cashews",
  "Nuts & Seeds Mix",
  "Premium Raisins",
  "Premium Arabian Dates",
];

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker items={TICKER_ITEMS} />
    </>
  );
}
