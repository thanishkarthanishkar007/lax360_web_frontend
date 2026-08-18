import React from "react";
import { MapPin, Mail, Phone } from "lucide-react";

const ContactDetails = () => {
    return (
        <section className="bg-[#f8f8f8] py-20 px-6">

            {/* SECTION TITLE */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="font-['Poppins'] text-3xl md:text-5xl font-bold text-gray-900">
                    Let’s Build Something Great Together
                </h2>
            </div>

            {/* CARD GRID */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">

                {/* LOCATION CARD */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">

                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6">
                        <MapPin className="text-white" size={28} />
                    </div>

                    <h3 className="font-['Poppins'] text-xl font-semibold mb-4">
                        Location
                    </h3>

                    <p className="text-gray-600 mb-3">
                        Lax360 Pvt Ltd, 1st Floor, 16,
                    </p>
                    <p className="text-gray-900 font-medium">
                        CPS Tower, Advaitha Ashram Rd,
                        Fairlands, Salem, Tamil Nadu 636007 , Koramangala ,Bangalore
                    </p>
                </div>

                {/* EMAIL CARD */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">

                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6">
                        <Mail className="text-white" size={28} />
                    </div>

                    <h3 className="font-['Poppins'] text-xl font-semibold mb-4">
                        Email Address
                    </h3>

                    <p className="text-gray-600 mb-3">
                        Have a project in mind? Send us a message.
                    </p>

                    <a
                        href="mailto:lax360tech@gmail.com"
                        className="block text-gray-900 font-medium hover:text-purple-600 transition"
                    >
                        lax360tech@gmail.com
                    </a>
                </div>

                {/* PHONE CARD */}
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100">

                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mb-6">
                        <Phone className="text-white" size={28} />
                    </div>

                    <h3 className="font-['Poppins'] text-xl font-semibold mb-4">
                        Phone Number
                    </h3>

                    <p className="text-gray-600 mb-3">
                        We’re interested in working together.
                    </p>

                    <div className="flex flex-wrap gap-2 flex-col">
                                            <a
                        href="tel:+919566679928"
                        className="block text-gray-900 font-medium hover:text-purple-600 transition"
                    >
                        +91 9566679928
                    </a>
                    <a
                        href="tel:+919566679958"
                        className="block text-gray-900 font-medium hover:text-purple-600 transition"
                    >
                        +919566679958
                    </a>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContactDetails;