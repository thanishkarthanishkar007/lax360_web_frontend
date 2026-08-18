import React from "react";
import ServiceHero from "./ServiceHero";
import ServicesOverview from "./ServicesOverview";
import ServicesCarousel from "./ServiceCarousel";
import WorkflowSection from "./WorkFlowSection";
import ServiceInteractiveList from "./ServiceInterativeList";
import AiBreakthroughSection from "./AiBreakingthroughSection";
import SEO from "../../components/SEO";
import { SEO_DATA } from "../../data/seoData";

const Service = () => {
  return (
    <div>
      <SEO
        title={SEO_DATA.services.title}
        description={SEO_DATA.services.description}
        keywords={SEO_DATA.services.keywords}
        canonical={SEO_DATA.services.canonical}
        ogType={SEO_DATA.services.ogType}
        breadcrumbs={SEO_DATA.services.breadcrumbs}
        servicesList={SEO_DATA.services.servicesList}
      />
      <ServiceHero />
      <ServicesOverview />
      <ServicesCarousel />
      <WorkflowSection />
      <ServiceInteractiveList />
      <AiBreakthroughSection />
    </div>
  );
};

export default Service;

