import mongoose from "mongoose";

const contactFormSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    phone: {
      type: String,
      required: true,
      match: [/^\d{10}$/, "Phone must be 10 digits"],
    },
    message: { type: String },
  },
  { timestamps: true }
);

const ContactForm = mongoose.model("ContactForm", contactFormSchema);
export default ContactForm;
