import React, { useState } from "react";
import { Search } from "lucide-react";

const Contacts = () => {
  const [forms, setForms] = useState([]);
  const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");
    
    const fetchForms = async () => {
        try {
            
        } catch (error) {
            
        }
    }
  return (
    <section className="border-2 border-white shadow-lg rounded-xl px-6 py-10">
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
              value="all"
              checked={filter === "all"}
              onChange={(e) => setFilter(e.target.value)}
              className="accent-black"
            />
            <span>All</span>
          </label>

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
    </section>
  );
};

export default Contacts;
