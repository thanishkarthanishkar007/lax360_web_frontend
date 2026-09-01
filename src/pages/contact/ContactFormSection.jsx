import React, { useState } from "react";
import axios from "axios";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config/api";

const ContactFormSection = () => {
    const API_URL = `${API_BASE_URL}/api/contacts/createContact`;

    const [loading, setLoading] = useState(false);
    const [consent, setConsent] = useState(false);

    const [formData, setFormData] = useState({
        Name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.Name || !formData.email || !formData.message) {
            toast.error("Please fill all required fields");
            return;
        }

        if (!validateEmail(formData.email)) {
            toast.error("Please enter a valid email");
            return;
        }

        if (!consent) {
            toast.error("Please agree to the processing of your personal data.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(API_URL, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200 || response.status === 201) {
                toast.success("Message sent successfully!");

                setFormData({
                    Name: "",
                    email: "",
                    phone: "",
                    service: "",
                    message: "",
                });
                setConsent(false);
            }
        } catch (error) {
            console.log(error);

            const errMsg =
                error?.response?.data?.message ||
                "Server error. Please try again.";

            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-gradient-to-br from-purple-400 to-purple-500 py-20 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                {/* LEFT SIDE */}
                <div>
                    <h2 className="font-['Poppins'] text-4xl md:text-6xl font-bold text-black mb-6">
                        Get in Touch for any Information!
                    </h2>

                    <p className="text-black/80 text-lg mb-10 max-w-md">
                        Fill out the form below and our team will contact you soon.
                    </p>

                    <div className="rounded-2xl overflow-hidden shadow-lg">
                        <iframe
                            title="LAX360 Location"
                            src="https://www.google.com/maps?q=11.6728886,78.1416668&hl=en&z=17&output=embed"
                            className="w-full h-72 border-0"
                            loading="lazy"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* RIGHT FORM */}
                <div className="bg-white p-10 rounded-3xl shadow-xl border">
                    <h3 className="text-3xl font-semibold mb-10 text-black">
                        Contact Us
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* NAME */}
                        <div>
                            <label className="block text-sm tracking-widest text-black/70 mb-2">
                                NAME *
                            </label>

                            <input
                                type="text"
                                name="Name"
                                value={formData.Name}
                                onChange={handleChange}
                                placeholder="e.g. Oliver"
                                required
                                className="w-full border-b border-black/40 p-3 outline-none focus:border-black transition"
                            />
                        </div>

                        {/* PHONE */}
                        <div>
                            <label className="block text-sm tracking-widest text-black/70 mb-2">
                                PHONE NUMBER
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+91 9876543210"
                                className="w-full border-b border-black/40 p-3 outline-none focus:border-black transition"
                            />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <label className="block text-sm tracking-widest text-black/70 mb-2">
                                EMAIL *
                            </label>

                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                                required
                                className="w-full border-b border-black/40 p-3 outline-none focus:border-black transition"
                            />
                        </div>

                        {/* SERVICE */}
                        <div>
                            <label className="block text-sm tracking-widest text-black/70 mb-2">
                                SERVICE
                            </label>

                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                                className="w-full border-b border-black/40 p-3 outline-none focus:border-black transition bg-transparent"
                            >
                                <option value="">Select Service</option>
                                <option value="Web 3.0">Web 3.0</option>
                                <option value="AI Solutions">AI Solutions</option>
                                <option value="Blockchain">Blockchain</option>
                                <option value="CAD Design">CAD Design</option>
                                <option value="Cyber Security">Cyber Security</option>
                                <option value="Software Services">Software Services</option>
                                <option value="Embedded Systems">Embedded Systems</option>
                                <option value="IoT Solutions">IoT Solutions</option>
                                <option value="SaaS Solutions">SaaS Solutions</option>
                            </select>
                        </div>

                        {/* MESSAGE */}
                        <div>
                            <label className="block text-sm tracking-widest text-black/70 mb-2">
                                MESSAGE *
                            </label>

                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Write your message here..."
                                rows="3"
                                required
                                className="w-full resize-none border-b border-black/40 p-3 outline-none focus:border-black transition"
                            />
                        </div>

                        {/* DPDP CONSENT CHECKBOX */}
                        <div className="flex items-start gap-2.5 pt-1">
                            <input
                                type="checkbox"
                                id="contact-consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                required
                                className="mt-1 h-4 w-4 accent-purple-600 rounded cursor-pointer flex-shrink-0"
                            />
                            <label
                                htmlFor="contact-consent"
                                className="text-xs text-black/80 leading-relaxed cursor-pointer"
                            >
                                I agree to the processing of my personal data for the purpose described in the{" "}
                                <Link
                                    to="/privacy"
                                    target="_blank"
                                    className="text-purple-700 underline font-medium"
                                >
                                    Privacy Notice
                                </Link>
                                .
                            </label>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`flex items-center gap-3 bg-purple-600 text-white px-8 py-3 rounded-xl font-semibold transition ${
                                loading
                                    ? "opacity-70 cursor-not-allowed"
                                    : "hover:bg-purple-700 cursor-pointer"
                            }`}
                        >
                            {loading ? "Submitting..." : "Submit Now"}
                            <ArrowRight size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactFormSection;