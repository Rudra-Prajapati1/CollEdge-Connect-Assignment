import ContactForm from "../models/ContactForm.js";

export const getForms = async (req, res) => {
  try {
    const forms = await ContactForm.find({}).sort({ createdAt: -1 });

    res.status(200).json({ success: true, forms });
  } catch (error) {
    console.error("Getting Form Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error getting the forms." });
  }
};

export const saveForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone)
      return res
        .status(400)
        .json({ success: false, message: "Please enter all required fields." });

    const saved = await ContactForm.create({ name, email, phone, message });

    res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: saved,
    });
  } catch (error) {
    console.error("Save Form Error:", error.message);
    res.status(500).json({ success: false, message: "Error Saving the form." });
  }
};

export const deleteForm = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await ContactForm.findByIdAndDelete(id);

    if (!form)
      return res
        .status(404)
        .json({ success: false, message: "No such form found" });

    res
      .status(200)
      .json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    console.error("Delete Form Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Error deleting the form." });
  }
};
