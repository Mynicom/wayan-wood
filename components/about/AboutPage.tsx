import Story from "./Story";
import WhyChoose from "./WhyChoose";
import Process from "./Process";
import Values from "./Values";
import Statistics from "./Statistics";
import Showroom from "./Showroom";
import CTA from "./CTA";
import { aboutData } from "@/data/about";

interface AboutPageProps {
  products: {
    id: number;
    title: string;
    slug: string;
    category: string;
    image: string;
  }[];
}

export default function AboutPage({ products }: AboutPageProps) {
  return (
    <>
      <Story data={aboutData.story} />
      <WhyChoose data={aboutData.whyChoose} />
      <Process data={aboutData.process} />
      <Values data={aboutData.values} />
      <Statistics data={aboutData.statistics} />
      <Showroom data={aboutData.showroom} products={products} />
      <CTA data={aboutData.cta} />
    </>
  );
}
