import IntroCurtain from "@/components/home/IntroCurtain";
import Opening from "@/components/home/Opening";
import Specimens from "@/components/home/Specimens";
import Intention from "@/components/home/Intention";
import Story from "@/components/home/Story";
import Range from "@/components/home/Range";
import Trust from "@/components/home/Trust";
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
      <IntroCurtain />
      <Opening products={products} />
      <Ticker items={tickerItems} />
      <Specimens products={products} />
      <Intention />
      <Story />
      <Range products={products} />
      <Trust />
      <Gifting />
      <Closing />
    </>
  );
}
