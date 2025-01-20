import { useState } from "react";
import PropTypes from "prop-types";

export default function AddNote({ onSubmit }) {
  // States for form data
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  // Handle for form input data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle for submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/add-note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      await response.json();
      // Clear form after successful submission
      setFormData({ title: "", content: "" });

      // Re-render page for all notes
      onSubmit();
    } catch (error) {
      console.error("Error: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Note title"
        required
      />
      <textarea
        name="content"
        value={formData.content}
        onChange={handleChange}
        placeholder="Note content"
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

AddNote.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
