import React, { useState } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const CreateJobModal = ({ close, fetchJobs }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    type: "Full Time",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.location || !formData.description) {
      toast.error("Title, Location, and Description are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://lax360-web-backend.onrender.com/api/jobs/createJob",
        formData
      );

      if (response.data) {
        toast.success("Job created successfully!");
        fetchJobs(); // Refresh job list
        close();
      }
    } catch (error) {
      console.error(error);
      const errMsg =
        error?.response?.data?.message ||
        "Server error. Please try again.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="relative bg-[#1a1a1a] w-full max-w-xl rounded-xl p-6 md:p-8 shadow-lg overflow-y-auto max-h-[90vh]">
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white">
          Post a New Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Job Title *"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="location"
              placeholder="Location *"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500"
            />

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500"
            >
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <textarea
            name="description"
            placeholder="Job Description *"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 rounded bg-[#111] border border-gray-700 text-white focus:outline-none focus:border-purple-500 resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded font-semibold transition ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {loading ? "Posting..." : "Create Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;
