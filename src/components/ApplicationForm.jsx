import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./ApplicationForm.css";

function ApplicationForm({ jobId }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: "",
    coverLetter: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newApplication = {
      ...formData,
      jobId,
      status: "Pending",
      appliedAt: new Date().toISOString()
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:3001/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newApplication)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      toast.success("Application submitted successfully!");

      // Clear form
      setFormData({
        name: "",
        email: "",
        resume: "",
        coverLetter: ""
      });

      // Redirect (change to /tracker if that route exists)
      navigate("/");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      
      <input
        type="text"
        name="name"
        placeholder="Full Name *"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        type="email"
        name="email"
        placeholder="Email *"
        value={formData.email}
        onChange={handleChange}
      />

      <input
        type="text"
        name="resume"
        placeholder="Resume Link (Google Drive, etc)"
        value={formData.resume}
        onChange={handleChange}
      />

      <textarea
        name="coverLetter"
        placeholder="Cover Letter"
        rows="5"
        value={formData.coverLetter}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}

export default ApplicationForm;
