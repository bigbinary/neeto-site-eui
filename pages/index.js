import axios from "axios";
import Head from "next/head";
import {
  Header,
  HeroSection,
  FeatureSection,
  FeatureSectionWithList,
  LogoClouds,
  Grid,
  Pricing,
  Testimonial,
  CTA as CTASection,
  FAQ as FAQSection,
  Footer,
} from "@bigbinary/neeto-site-blocks";

export default function Home({ site = {} }) {
  const blockComponents = {
    header: Header,
    hero: HeroSection,
    feature: FeatureSection,
    feature_with_list: FeatureSectionWithList,
    logo_clouds: LogoClouds,
    grid: Grid,
    pricing: Pricing,
    testimonial: Testimonial,
    cta: CTASection,
    faq: FAQSection,
    footer: Footer,
  };

  const { configuration: siteConfiguration = null, name } = site;

  return (
    <>
    <Head>
        <title>{name}</title>
    </Head>
    <div className="mx-auto max-w-7xl">
      {siteConfiguration?.pages[0].blocks.map((block) => {
        const BlockComponent = blockComponents[block.name];
        return (
          <BlockComponent
            key={block.id}
            configurations={block.configurations}
          />
        );
      })}
    </div>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const host = context.req.headers.host.split(".");
    const isDevelopment = host.includes("localhost:3000");
    const redirectToNeetoSite = isDevelopment
      ? host.length <= 1
      : host.length <= 2;

    if (redirectToNeetoSite) {
      return {
        redirect: {
          destination: "https://neeto.com",
          permanent: false,
        },
      };
    }

    const subdomain = host[0];
    const res = await axios.get(
      `${process.env.SERVER_HOST_WITH_PROTOCOL}/public/published_sites/${subdomain}`,
      {
        headers: {
          Accept: "*/*",
        },
      }
    );
    console.log(res.data);
    return { props: { site: res.data } };
  } catch (error) {
    console.log(error);
    return { props: {} };
  }
}
