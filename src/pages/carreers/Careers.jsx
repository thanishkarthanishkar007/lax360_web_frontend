import React from 'react';
import CareersHero from './CareerHero';
import JobSection from './JobSection';
import ApplicationModel from './ApplicationModal';
import SEO from '../../components/SEO';
import { SEO_DATA } from '../../data/seoData';

const Careers = () => {
    return (
        <div>
            <SEO
                title={SEO_DATA.careers.title}
                description={SEO_DATA.careers.description}
                keywords={SEO_DATA.careers.keywords}
                canonical={SEO_DATA.careers.canonical}
                ogType={SEO_DATA.careers.ogType}
                breadcrumbs={SEO_DATA.careers.breadcrumbs}
            />
            <CareersHero />
            <JobSection />
            <ApplicationModel /> 
        </div>
    );
};

export default Careers;