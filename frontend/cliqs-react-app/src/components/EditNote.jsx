import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { API_CONFIG } from "../config/api_config";
export default function EditNote({ note, reRender }) {
  // State for editing notes
  const [editingId, setEditingId] = useState(null);
  // Loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // React-hook-form for form data management
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: note.title,
      content: note.content,
    },
  });

  // Handle edit
  const handleEdit = () => {
    setEditingId(note.id);
    reset({
      title: note.title,
      content: note.content,
    });
  };

  // Handle update function
  const handleUpdateNote = async (data) => {
    // Load state true
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.UPDATE_NOTE}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note_id: note.id,
            title: data.title,
            content: data.content,
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      reRender();
      setEditingId(null);
    } catch (error) {
      console.log("Error details:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {editingId === note.id ? (
        <form onSubmit={handleSubmit(handleUpdateNote)}>
          <input type="text" {...register("title", { required: true })} />
          <textarea
            name="content"
            {...register("content", { required: true })}
          />
          <button type="sumit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : `Save`}
          </button>
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
