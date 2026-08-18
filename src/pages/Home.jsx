import React from "react";
import Hero from "../components/home/Hero";
import AboutPreview from "../components/home/AboutPreview";
import ServicesPreview from "../components/home/ServicePreview";
import ProjectPreview from "../components/home/ProjectPreview";
import WhyChooseUs from "../components/home/WhyChooseUs";
import Testimonial from "../components/home/Testimonial";
import PurpleGlowCTA from "../components/home/PurpleGlowCTA";
import ContactFormSection from "./contact/ContactFormSection";
import SEO from "../components/SEO";
import { SEO_DATA } from "../data/seoData";

const Home = () => {
  return (
    <div>
      <SEO
        title={SEO_DATA.home.title}
        description={SEO_DATA.home.description}
        keywords={SEO_DATA.home.keywords}
        canonical={SEO_DATA.home.canonical}
        ogType={SEO_DATA.home.ogType}
      />
      <Hero />
      <div className="bg-black">
        <AboutPreview />
        <ServicesPreview />
        <WhyChooseUs />
        <ProjectPreview />
        <Testimonial />
        <ContactFormSection />
        <PurpleGlowCTA />
      </div>
    </div>
  );
};

export default Home;

