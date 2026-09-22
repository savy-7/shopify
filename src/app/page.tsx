import Opening from "@/components/home/Opening";
import Hero from "@/components/home/Hero";
import Intention from "@/components/home/Intention";
import Story from "@/components/home/Story";
import Range from "@/components/home/Range";
import Gifting from "@/components/home/Gifting";
import Closing from "@/components/home/Closing";
import Ticker from "@/components/ui/Ticker";
import { getProducts, orderProducts } from "@/lib/shopify/products";
import { PACK_LINE } from "@/lib/brand/content";

export default async function Home() {
  const products = orderProducts(await getProducts(24));

  const tickerItems = products.length
    ? products.map((p) => p.title)
    : [PACK_LINE];

  return (
    <>
      <Opening products={products} />
      <Hero products={products} />
      <Ticker items={tickerItems} />
      <Intention />
      <Story />
      <Range products={products} />
      <Gifting />
      <Closing />
    </>
  );
}
