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
import { isPack } from "@/lib/brand/palette";
import { PACK_LINE } from "@/lib/brand/content";

export default async function Home() {
  const products = orderProducts(await getProducts(24));
  // The hampers are presented on their own terms in the gifting section —
  // they're a styled gift photograph, not a cut-out pack, so they don't
  // belong in the hero's pack row or the botanical plates.
  const packs = products.filter((product) => isPack(product.handle));
  const hampers = products.filter((product) => !isPack(product.handle));

  const tickerItems = packs.length ? packs.map((p) => p.title) : [PACK_LINE];

  return (
    <>
      <IntroCurtain />
      <Opening products={packs} />
      <Ticker items={tickerItems} />
      <Specimens products={packs} />
      <Intention />
      <Story />
      <Range products={products} />
      <Trust />
      <Gifting hampers={hampers} />
      <Closing />
    </>
  );
}
