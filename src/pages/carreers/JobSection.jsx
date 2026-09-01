import React, { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { Plus, Minus } from "lucide-react";
import ApplicationModal from "./ApplicationModal";
import { API_BASE_URL } from "../../config/api";

const JobSection = () => {
  const [jobs, setJobs] = useState([]);
  const [openJobId, setOpenJobId] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/jobs/getJob`);
      if (Array.isArray(response.data)) {
        setJobs(response.data);
      } else if (response.data && Array.isArray(response.data.data)) {
        setJobs(response.data.data);
      } else if (response.data && Array.isArray(response.data.jobs)) {
        setJobs(response.data.jobs);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) =>
      job.title?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, jobs]);

  const toggleJob = (id) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  const openApplication = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  return (
    <section className="bg-black text-white min-h-screen py-16 px-4 sm:px-8 md:px-16 careers-list-section">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl md:text-4xl font-semibold">
          Find Your Next Opportunity
        </h2>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search job..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-3 mb-10 rounded bg-[#111] border border-gray-700 w-full md:w-1/2 focus:outline-none focus:border-purple-500"
      />

      {loading ? (
        <p className="text-gray-400">Loading jobs...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredJobs.length === 0 ? (
        <p className="text-gray-400">No jobs found matching your criteria.</p>
      ) : (
        /* Jobs */
        filteredJobs.map((job) => {
          const jobId = job._id || job.id;
          return (
            <div key={jobId} className="bg-[#111] mb-6 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold">
                    {job.title}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2">
                    {job.location} | {job.type}
                  </p>
                </div>

                <button
                  onClick={() => toggleJob(jobId)}
                  className="bg-purple-600 p-3 rounded hover:bg-purple-700 transition"
                >
                  {openJobId === jobId ? <Minus /> : <Plus />}
                </button>
              </div>

              {openJobId === jobId && (
                <div className="mt-4 border-t border-gray-700 pt-4">
                  <p className="text-gray-300">{job.description}</p>

                  <button
                    onClick={() => openApplication(job)}
                    className="mt-6 bg-white text-black px-6 py-2 rounded font-semibold hover:bg-gray-200 transition"
                  >
                    Apply Now
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}

      {/* Safe Modal Rendering */}
      {showModal && selectedJob && (
        <ApplicationModal
          job={selectedJob}
          close={() => {
            setShowModal(false);
            setSelectedJob(null);
          }}
        />
      )}
    </section>
  );
};

export default JobSection;