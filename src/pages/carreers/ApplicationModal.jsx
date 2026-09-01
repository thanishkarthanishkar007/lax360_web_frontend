import React, { useEffect, useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";
import PrivacyNoticeModal from "../../components/dpdp/PrivacyNoticeModal";

const ApplicationModal = ({ job, close }) => {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [consent, setConsent] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    resume: null,
  });

  useEffect(() => {
    if (!job) return;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [job]);

  if (!job) return null;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        resume: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.resume) {
      toast.error("First Name, Email and Resume are required.");
      return;
    }

    if (!consent) {
      toast.error("Please agree to the processing of your personal data to submit your application.");
      return;
    }

    try {
      setLoading(true);
      setUploadProgress(0);

      const data = new FormData();
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("state", formData.state);
      data.append("zip", formData.zip);
      data.append("jobTitle", job.title);
      data.append("resume", formData.resume);

      const response = await axios.post(
        `${API_BASE_URL}/api/careers/apply`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percent = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percent);
            }
          },
        }
      );

      if (response.data.success) {
        toast.success("Application submitted successfully!");

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          city: "",
          state: "",
          zip: "",
          resume: null,
        });
        setConsent(false);
        setUploadProgress(0);

        close();
      } else {
        toast.error(
          response.data.message || "Application submission failed."
        );
      }
    } catch (error) {
      console.error("Application submit error:", error);

      const errMsg =
        error?.response?.data?.message ||
        "Server error. Please try again.";

      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
        <div className="relative bg-[#1a1a1a] w-full max-w-3xl rounded-xl p-6 md:p-8 shadow-lg overflow-y-auto max-h-[90vh]">
          {/* Close Button */}
          <button
            type="button"
            onClick={close}
            className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
          >
            <X size={22} />
          </button>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
            Apply for {job.title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name / Last Name */}
            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
              />

              <input
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            {/* Email */}
            <input
              name="email"
              type="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
            />

            {/* Phone */}
            <input
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
            />

            {/* Address */}
            <input
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
            />

            {/* City / State / Zip */}
            <div className="grid md:grid-cols-3 gap-4">
              <input
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
              />

              <input
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className="p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
              />

              <input
                name="zip"
                placeholder="Zip Code"
                value={formData.zip}
                onChange={handleChange}
                className="p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 text-sm"
              />
            </div>

            {/* Resume */}
            <div>
              <label className="text-sm text-gray-400">
                Upload Resume (PDF/DOC) *
              </label>

              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
                className="w-full mt-2 text-gray-400 p-3 rounded bg-[#111] border border-gray-700 cursor-pointer text-sm"
              />

              {formData.resume && (
                <p className="text-sm text-green-400 mt-2">
                  Selected: {formData.resume.name}
                </p>
              )}
            </div>

            {/* Upload Progress */}
            {loading && (
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Uploading resume...</span>
                  <span>{uploadProgress}%</span>
                </div>

                <div className="w-full bg-gray-700 rounded h-2">
                  <div
                    className="bg-purple-600 h-2 rounded transition-all"
                    style={{
                      width: `${uploadProgress}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* DPDP Consent Checkbox */}
            <div className="flex items-start gap-2.5 pt-2">
              <input
                type="checkbox"
                id="career-consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
                className="mt-1 h-4 w-4 accent-purple-600 rounded cursor-pointer flex-shrink-0"
              />
              <label
                htmlFor="career-consent"
                className="text-xs text-gray-300 leading-relaxed cursor-pointer"
              >
                I agree to the processing of my personal data for the purpose described in the{" "}
                <button
                  type="button"
                  onClick={() => setPrivacyModalOpen(true)}
                  className="text-purple-400 underline font-semibold cursor-pointer"
                >
                  Privacy Notice
                </button>
                .
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-xl font-semibold transition cursor-pointer text-sm ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {loading
                ? `Uploading ${uploadProgress}%`
                : "Submit Application"}
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
};

export default ApplicationModal;