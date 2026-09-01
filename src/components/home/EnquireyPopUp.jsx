import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";
import PrivacyNoticeModal from "../dpdp/PrivacyNoticeModal";

export default function EnquiryPopup() {
    const API_URL = `${API_BASE_URL}/api/contacts/createContact`;

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [consent, setConsent] = useState(false);
    const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        Name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
    });

    // Show popup only on page load
    useEffect(() => {
        const navEntries = performance.getEntriesByType("navigation");
        const navType = navEntries.length > 0 ? navEntries[0].type : null;

        if (navType === "navigate" || navType === "reload") {
            setShow(true);
        }
    }, []);

    // Lock scroll
    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [show]);

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
            toast.error("Invalid email format");
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
                toast.success("Enquiry submitted successfully!");

                setFormData({
                    Name: "",
                    email: "",
                    phone: "",
                    service: "",
                    message: "",
                });
                setConsent(false);

                setTimeout(() => {
                    setShow(false);
                }, 1500);
            }
        } catch (error) {
            const errMsg =
                error?.response?.data?.message ||
                "Server error. Please try again.";

            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    if (!show) return null;

    return (
        <>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                <div className="relative bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl">
                    {/* Close button */}
                    <button
                        onClick={() => setShow(false)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
                    >
                        ✕
                    </button>

                    <h2 className="text-3xl font-semibold text-center mb-8">
                        Contact Us
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="Name"
                            placeholder="Your Name *"
                            value={formData.Name}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-100 border outline-none text-sm"
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone Number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg bg-gray-100 border outline-none text-sm"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address *"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 rounded-lg bg-gray-100 border outline-none text-sm"
                            />
                        </div>

                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 border outline-none text-sm"
                        >
                            <option value="">Select Service</option>
                            <option value="Web Development">Web Development</option>
                            <option value="AI Solutions">AI Solutions</option>
                            <option value="Blockchain">Blockchain</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                            <option value="Enterprise Software">Enterprise Software</option>
                            <option value="Cloud Solutions">Cloud Solutions</option>
                            <option value="Cyber Security">Cyber Security</option>
                        </select>

                        <textarea
                            name="message"
                            rows="3"
                            placeholder="Your message here... *"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="w-full p-3 rounded-lg bg-gray-100 border outline-none text-sm"
                        />

                        {/* DPDP Consent Checkbox */}
                        <div className="flex items-start gap-2.5 pt-1">
                            <input
                                type="checkbox"
                                id="popup-consent"
                                checked={consent}
                                onChange={(e) => setConsent(e.target.checked)}
                                required
                                className="mt-1 h-4 w-4 accent-purple-600 rounded cursor-pointer flex-shrink-0"
                            />
                            <label
                                htmlFor="popup-consent"
                                className="text-xs text-gray-700 leading-relaxed"
                            >
                                I agree to the processing of my personal data for the purpose described in the{" "}
                                <button
                                    type="button"
                                    onClick={() => setPrivacyModalOpen(true)}
                                    className="text-purple-600 underline font-medium cursor-pointer"
                                >
                                    Privacy Notice
                                </button>
                                .
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-full hover:bg-purple-600 transition font-semibold text-sm cursor-pointer"
                        >
                            {loading ? "Submitting..." : "Submit →"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Privacy Notice Modal */}
            <PrivacyNoticeModal
                isOpen={privacyModalOpen}
                onClose={() => setPrivacyModalOpen(false)}
            />
        </>
    );
}
