import PropTypes from "prop-types";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
export default function EditNote({ note, reRender }) {
  // State for editing notes
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: note.title,
    content: note.content,
  });

  // Handle edit
  const handleEdit = () => {
    setEditingId(note.id);
    setEditFormData({
      title: note.title,
      content: note.content,
    });
  };

  // Handle update function
  const handleUpdateNote = async () => {
    try {
      const response = await fetch("/api/update-note", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note_id: note.id,
          title: editFormData.title,
          content: editFormData.content,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      await response.json();
      reRender();
      setEditingId(null);
    } catch (error) {
      console.log("Error details:", error);
      console.log("Request payload:", {
        note_id: note.id,
        title: editFormData.title,
        content: editFormData.content,
      });
    }
  }; // Handle updated note submit
  const handleUpdatedNoteSubmit = (e) => {
    e.preventDefault();
    handleUpdateNote();
  };

  // Handle new imput change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {editingId === note.id ? (
        <form onSubmit={handleUpdatedNoteSubmit}>
          <input
            type="text"
            name="title"
            value={editFormData.title}
            onChange={handleInputChange}
            required
          />
          <textarea
            name="content"
            value={editFormData.content}
            onChange={handleInputChange}
            required
          />
          <button type="sumit">Save</button>
        </form>
      ) : (
        <button className="edit-button" onClick={handleEdit}>
          <FaEdit />
        </button>
      )}
    </>
  );
}

EditNote.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
  }),
  reRender: PropTypes.func.isRequired,
};
