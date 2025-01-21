import { useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { API_CONFIG } from "../config/api_config";

export default function AddNote({ onSubmit }) {
  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);
  // React-hook-form
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Handle for submit
  const onAddNote = async (data) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.ADD_NOTE}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Check add note response
      if (!response.ok) {
        throw new Error(`Failed to add note. Status: ${response.status}`);
      }

      await response.json();
      // Reset & re-render page for all notes
      reset();
      onSubmit();
    } catch (error) {
      console.error("Error: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onAddNote)}>
      <input
        type="text"
        {...register("title", { required: true })}
        placeholder="Note title"
      />
      <textarea
        {...register("content", { required: true })}
        placeholder="Note content"
      />
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add Note"}
      </button>
    </form>
  );
}

AddNote.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
