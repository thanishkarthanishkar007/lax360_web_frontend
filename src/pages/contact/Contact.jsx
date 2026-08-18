import React from 'react';
import ContactHero from './ContacHero';
import ContactDetails from './ContactDetails';
import ContactFormSection from './ContactFormSection';
import SEO from '../../components/SEO';
import { SEO_DATA } from '../../data/seoData';

const Contact = () => {
    return (
        <>
            <SEO
                title={SEO_DATA.contact.title}
                description={SEO_DATA.contact.description}
                keywords={SEO_DATA.contact.keywords}
                canonical={SEO_DATA.contact.canonical}
                ogType={SEO_DATA.contact.ogType}
                breadcrumbs={SEO_DATA.contact.breadcrumbs}
            />
            <ContactHero />
            <ContactDetails />
            <ContactFormSection />
        </>
    );
};

export default Contact;