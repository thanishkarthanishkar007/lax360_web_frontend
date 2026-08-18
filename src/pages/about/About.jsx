import React from "react";
import OverviewSection from "./OverviewSection";
import MissionSection from "./MissionSection";
import VisionSection from "./VisionSection";
import StatsSection from "./StatsSection";
import CTASection from "./CTASection";
import AboutHero from "./AboutHero";
import ValueSection from "./ValueSection";
import SEO from "../../components/SEO";
import { SEO_DATA } from "../../data/seoData";

const About = () => {
  return (
    <>
      <SEO
        title={SEO_DATA.about.title}
        description={SEO_DATA.about.description}
        keywords={SEO_DATA.about.keywords}
        canonical={SEO_DATA.about.canonical}
        ogType={SEO_DATA.about.ogType}
        breadcrumbs={SEO_DATA.about.breadcrumbs}
      />
      <AboutHero />
      <OverviewSection />
      <MissionSection />
      <VisionSection />
      <StatsSection />
      <ValueSection />
      <CTASection />
    </>
  );
};

export default About;

