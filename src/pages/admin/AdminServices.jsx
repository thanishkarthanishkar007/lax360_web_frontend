import React, { useState, useEffect } from "react";
import api from "../../config/api";
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  Search,
  X,
  Check,
  Image as ImageIcon,
  Sparkles,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-toastify";

// Default images reference in case admin wants to pick a preset
const presetImages = [
  { name: "Web 3.0", url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80" },
  { name: "AI & ML", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" },
  { name: "Blockchain", url: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80" },
  { name: "CAD Design", url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80" },
  { name: "Cyber Security", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" },
  { name: "Software Development", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80" },
  { name: "Embedded Systems", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80" },
  { name: "IoT Solutions", url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" },
  { name: "Cloud & SaaS", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" },
];

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Delete Confirmation State
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "Development",
    description: "",
    image: "",
    order: 0,
  });

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/services");
      if (res.data?.services) {
        setServices(res.data.services);
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      toast.error("Failed to load services from backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setSelectedService(null);
    setFormData({
      title: "",
      category: "Development",
      description: "",
      image: presetImages[0].url,
      order: services.length + 1,
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setIsEditing(true);
    setSelectedService(service);
    setFormData({
      title: service.title || "",
      category: service.category || "General",
      description: service.description || "",
      image: service.image || "",
      order: service.order || 0,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required.");
      return;
    }

    try {
      setSubmitting(true);
      if (isEditing && selectedService) {
        const res = await api.put(
          `/api/services/${selectedService._id || selectedService.id}`,
          formData
        );
        if (res.data?.success) {
          toast.success("Service updated successfully!");
          setModalOpen(false);
          fetchServices();
        }
      } else {
        const res = await api.post("/api/services", formData);
        if (res.data?.success) {
          toast.success("New service created successfully!");
          setModalOpen(false);
          fetchServices();
        }
      }
    } catch (err) {
      console.error("Save service error:", err);
      toast.error(err.response?.data?.message || "Failed to save service.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeleting(true);
      const res = await api.delete(`/api/services/${id}`);
      if (res.data?.success) {
        toast.success("Service deleted successfully!");
        setDeleteConfirmId(null);
        fetchServices();
      }
    } catch (err) {
      console.error("Delete service error:", err);
      toast.error(err.response?.data?.message || "Failed to delete service.");
    } finally {
      setDeleting(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const term = search.toLowerCase();
    return (
      s.title?.toLowerCase().includes(term) ||
      s.category?.toLowerCase().includes(term) ||
      s.description?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0e22] border border-white/10 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
              <Layers size={20} />
            </div>
            <h2 className="text-xl font-bold font-['Poppins'] text-white">
              Services Management
            </h2>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Total {services.length} services configured &bull; Live updates sync directly to the homepage & services page
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchServices}
            className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition"
            title="Refresh list"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-lg shadow-purple-600/30 transition"
          >
            <Plus size={16} />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="relative">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search services by title, category, or keyword..."
          className="w-full pl-11 pr-4 py-3 bg-[#0e0e22] border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 transition"
        />
      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading services from database...</p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="bg-[#0e0e22] border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center gap-3">
          <Layers size={40} className="text-gray-600" />
          <p className="text-gray-300 font-semibold text-lg">No services found</p>
          <p className="text-gray-500 text-xs max-w-sm">
            {search ? "No services match your search query." : "You haven't added any services yet."}
          </p>
          {!search && (
            <button
              onClick={openAddModal}
              className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white text-xs font-semibold transition"
            >
              Add First Service
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, idx) => {
            const serviceId = service._id || service.id || `srv-${idx}`;
            return (
              <div
                key={serviceId}
                className="bg-[#0e0e22] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-purple-500/40 transition-all duration-300 group shadow-lg"
              >
                <div>
                  {/* Service Image / Header Preview */}
                  <div className="relative h-44 w-full bg-[#080816] overflow-hidden">
                    {service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-900/30 to-indigo-900/20 text-purple-300">
                        <ImageIcon size={32} className="opacity-50" />
                        <span className="text-[11px] mt-1 text-gray-400">No Image Set</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e22] via-black/30 to-transparent" />

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="text-[11px] font-semibold bg-purple-600/80 backdrop-blur-md text-white px-2.5 py-1 rounded-full border border-purple-400/30">
                        {service.category || "Service"}
                      </span>
                    </div>

                    {/* Order Badge */}
                    {service.order !== undefined && (
                      <div className="absolute top-3 right-3">
                        <span className="text-[10px] font-bold bg-black/70 backdrop-blur-md text-gray-300 px-2 py-0.5 rounded-md border border-white/10">
                          #{service.order}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white font-['Poppins'] group-hover:text-purple-300 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-xs mt-2 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 border-t border-white/10 bg-[#0a0a1a] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-gray-500">
                    Live Dynamic Service
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-purple-600/20 hover:text-purple-300 text-gray-300 border border-white/10 hover:border-purple-500/30 transition text-xs flex items-center gap-1 font-medium"
                      title="Edit Service"
                    >
                      <Edit2 size={13} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmId(serviceId)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition text-xs flex items-center gap-1 font-medium"
                      title="Delete Service"
                    >
                      <Trash2 size={13} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Service Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121226] border border-white/15 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between sticky top-0 bg-[#121226] z-10">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                  <Sparkles size={18} />
                </div>
                <h3 className="text-lg font-bold text-white font-['Poppins']">
                  {isEditing ? "Edit Service" : "Add New Service"}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. AI & Intelligent Systems"
                  required
                  className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Category & Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  >
                    <option value="Development">Development</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="Blockchain">Blockchain</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Security">Security</option>
                    <option value="Design">Design</option>
                    <option value="Hardware & IoT">Hardware & IoT</option>
                    <option value="Consulting">Consulting</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                    placeholder="1"
                    className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Image URL with Preset selector */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                  className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500"
                />

                {/* Preset Image Quick Selection */}
                <div className="mt-3">
                  <p className="text-[11px] text-gray-400 mb-2">Or select from presets:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {presetImages.map((preset, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`text-[10px] px-2.5 py-1 rounded-lg border transition ${
                          formData.image === preset.url
                            ? "bg-purple-600 text-white border-purple-400"
                            : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Image preview */}
                {formData.image && (
                  <div className="mt-3 h-28 rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Description *
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Comprehensive description of the service offering..."
                  required
                  className="w-full px-4 py-3 bg-[#090915] border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-purple-600/30 transition disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check size={14} />
                      <span>{isEditing ? "Save Changes" : "Create Service"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#121226] border border-red-500/30 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400 mb-4">
              <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/20">
                <AlertCircle size={22} />
              </div>
              <h3 className="text-lg font-bold text-white font-['Poppins']">
                Delete Service?
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Are you sure you want to remove this service? It will no longer be visible on the public website.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={deleting}
                className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold transition flex items-center gap-2 disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;
