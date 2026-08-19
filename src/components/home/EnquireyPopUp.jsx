import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function EnquiryPopup() {

    const API_URL = "https://lax360-web-backend.onrender.com/api/contacts/createContact";

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

            <div className="relative bg-white w-full max-w-2xl rounded-2xl p-8 shadow-2xl">

                {/* Close button */}
                <button
                    onClick={() => setShow(false)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-black"
                >
                    ✕
                </button>

                <h2 className="text-3xl font-semibold text-center mb-8">
                    Contact Us
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <input
                        type="text"
                        name="Name"
                        placeholder="Your Name"
                        value={formData.Name}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-100 border outline-none"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 border outline-none"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg bg-gray-100 border outline-none"
                        />

                    </div>

                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-100 border outline-none"
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
                        rows="4"
                        placeholder="Your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg bg-gray-100 border outline-none"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-3 rounded-full hover:bg-purple-600 transition"
                    >
                        {loading ? "Submitting..." : "Submit →"}
                    </button>

                </form>

            </div>
        </div>
    );
}
