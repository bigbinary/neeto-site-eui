import axios from "axios";
import {
  Header,
  HeroSection,
  FeatureSection,
  LogoClouds,
  Grid,
  Pricing,
  Testimonial,
  CTA as CTASection,
  FAQ as FAQSection,
  Footer,
} from "@bigbinary/neeto-site-blocks";

export default function Home({ site }) {
  const blockComponents = {
    header: Header,
    hero: HeroSection,
    feature: FeatureSection,
    logo_clouds: LogoClouds,
    grid: Grid,
    pricing: Pricing,
    testimonial: Testimonial,
    cta: CTASection,
    faq: FAQSection,
    footer: Footer,
  };

  return (
    <>
      {site?.pages[0].blocks.map((block) => {
        const BlockComponent = blockComponents[block.name];
        return (
          <BlockComponent
            key={block.id}
            configurations={block.configurations}
          />
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const subdomain = context.req.headers.host.split(".")[0];
    // ADD FALLBACK IF SUBDOMAIN IS NOT FOUND
    const res = await axios.get(
      `${process.env.SERVER_HOST_WITH_PROTOCOL}/public/sites/${subdomain}`,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );

    return { props: { site: res.data } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
