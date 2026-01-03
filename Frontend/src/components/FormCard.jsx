import React from "react";
import { Trash2, Mail, Phone, MessageSquare } from "lucide-react";

const FormCard = ({ form, index, onDelete }) => {
  return (
    <div className="border border-white rounded-xl p-5 mb-4 text-white flex justify-between items-start gap-4 hover:bg-white/5 transition">
      {/* Left: Index */}
      <div className="text-2xl font-bold text-gray-400 w-10">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Middle: Details */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{form.name}</h3>

        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <Mail className="w-4 h-4" />
          <span>{form.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-300 mb-1">
          <Phone className="w-4 h-4" />
          <span>{form.phone}</span>
        </div>

        {form.message && (
          <div className="flex items-start gap-2 text-sm text-gray-300 mt-2">
            <MessageSquare className="w-4 h-4 mt-0.5" />
            <p>{form.message}</p>
          </div>
        )}
      </div>

      {/* Right: Delete */}
      <button
        onClick={() => onDelete(form._id)}
        className="text-red-400 hover:text-red-600 transition"
        title="Delete form"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default FormCard;
