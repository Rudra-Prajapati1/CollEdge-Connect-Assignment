import React, { useEffect, useState } from "react";
import { PlusCircle, Search } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import FormCard from "./FormCard";
import SkeletonCard from "./SkeletonCard";

const Contacts = () => {
  const [forms, setForms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const isFormValid =
    formData.name.trim() &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    /^\d{10}$/.test(formData.phone);

  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("latest");

  const fetchForms = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/contacts`
      );

      if (!data.success) return toast.error(data.message);
      setForms(data.forms);
    } catch (error) {
      console.error("Fetch Form Error:", error.message);
      toast.error(error.message || "Failed to fetch forms");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) return toast.error("Please enter valid input");

    setSubmitLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/contacts`,
        formData
      );

      if (!data.success) return toast.error(data.message);

      toast.success(data.message || "Form submitted successfully!");
      setFormOpen(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
      fetchForms();
    } catch (error) {
      console.error("Submit error:", error.message);
      toast.error(error.message || "Failed to submit form");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/contacts/${id}`
      );

      if (!data.success) return toast.error(data.message);

      setForms((prev) => prev.filter((form) => form._id !== id));
      toast.success(data.message || "Form deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete form");
    }
  };

  const filteredForms = forms
    .filter(
      (form) =>
        form.name.toLowerCase().includes(search.toLowerCase()) ||
        form.email.toLowerCase().includes(search.toLowerCase()) ||
        form.phone.includes(search)
    )
    .sort((a, b) => {
      if (filter === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (filter === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

  useEffect(() => {
    fetchForms();
  }, []);

  return (
    <section className="border-2 border-white shadow-lg rounded-xl py-10">
      <div className="w-full border-b-2 text-white px-6 flex justify-end mb-10">
        <button
          disabled={loading}
          onClick={() => setFormOpen(true)}
          className={`border flex gap-2 items-center p-2 mb-5 rounded-md transition
    ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `}
        >
          <PlusCircle className="w-5 h-5" /> Add New Form
        </button>
      </div>
      <div className="flex justify-around w-full">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white w-5 h-5" />

          <input
            type="text"
            placeholder="Search forms..."
            className="border border-white placeholder:text-white rounded-xl pl-10 pr-4 py-2 w-80 shadow-sm focus:outline-none focus:ring-none text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-6 mt-4">
          <span className="text-white font-semibold">Filters:</span>

          <label className="flex items-center gap-2 cursor-pointer font-inter text-white">
            <input
              type="radio"
              name="formFilter"
              value="latest"
              checked={filter === "latest"}
              onChange={(e) => setFilter(e.target.value)}
              className="accent-black"
            />
            <span>Latest</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer font-inter text-white">
            <input
              type="radio"
              name="formFilter"
              value="oldest"
              checked={filter === "oldest"}
              onChange={(e) => setFilter(e.target.value)}
              className="accent-black"
            />
            <span>Oldest</span>
          </label>
        </div>
      </div>

      {loading && (
        <div className="px-20 py-10">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {!loading && forms.length > 0 && filteredForms.length === 0 && (
        <div className="py-20 flex flex-col justify-center items-center text-white">
          <p className="text-2xl font-semibold mb-2">
            No matching contacts found
          </p>
          <p className="text-white/70 mb-6">
            Try a different name, email, or phone number
          </p>
          <button
            onClick={() => setSearch("")}
            className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
          >
            Clear Search
          </button>
        </div>
      )}

      {!loading && forms.length === 0 && (
        <div className="py-20 flex flex-col justify-center items-center text-white">
          <p className="text-3xl font-semibold mb-3">No contacts yet</p>
          <p className="text-white/70 mb-6">
            Start by creating your first contact
          </p>
          <button
            onClick={() => setFormOpen(true)}
            className="border border-white px-4 py-2 rounded-md hover:bg-white hover:text-black transition"
          >
            Add First Contact
          </button>
        </div>
      )}
      {forms.length > 0 && (
        <div className="px-20 py-10">
          {filteredForms.map((form, index) => (
            <FormCard
              key={form._id}
              form={form}
              index={index}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-700 border border-white rounded-xl w-full max-w-md p-6 text-white relative">
            <button
              onClick={() => setFormOpen(false)}
              className="absolute top-3 right-3 text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center">
              Create New Contact
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Name *"
                className="border border-white bg-transparent px-4 py-2 rounded-md focus:outline-none"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Email *"
                className="border border-white bg-transparent px-4 py-2 rounded-md focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <input
                type="text"
                placeholder="Phone (10 digits) *"
                className="border border-white bg-transparent px-4 py-2 rounded-md focus:outline-none"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />

              <textarea
                placeholder="Message (optional)"
                className="border border-white bg-transparent px-4 py-2 rounded-md resize-none focus:outline-none"
                rows={3}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />

              <button
                type="submit"
                disabled={!isFormValid || submitLoading}
                className={`mt-4 py-2 rounded-md font-semibold transition ${
                  isFormValid
                    ? "bg-white text-black cursor-pointer"
                    : "bg-gray-500 cursor-not-allowed"
                }`}
              >
                {submitLoading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contacts;
