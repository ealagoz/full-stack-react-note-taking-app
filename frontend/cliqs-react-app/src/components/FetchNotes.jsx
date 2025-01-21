import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import EditNote from "./EditNote";
import { API_CONFIG } from "../config/api_config";

export default function FetchNotes({ data = [], loading, error, reRender }) {
  // Handle error state in the render
  if (error) return <div>Error: {error}</div>;

  // Handle delete note
  const handleDelete = async (noteId) => {
    // Prevent accidental note deletions
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DELETE_NOTE}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            note_id: noteId,
            title: "",
            content: "",
          }),
        }
      );
      if (!response.ok) {
        throw new Error(`Failed to delete note: ${response.statusText}`);
      }
      if (response.ok) {
        // Refresh fetch notes
        reRender();
      }
    } catch (err) {
      console.log("Error: ", err);
    }
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {data?.map((note) => (
            <div key={note.id} className="note-card">
              {/* Improve datetime display format */}
              <p>{new Date(note.created_at).toLocaleDateString()}</p>
              <br />
              <p className="title">{note.title}</p>
              <br />
              <p>
                {note.content}{" "}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(note.id)}
                >
                  <FaTrash />
                </button>{" "}
              </p>
              <br />
              <EditNote note={note} reRender={reRender} />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

FetchNotes.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      content: PropTypes.string,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  reRender: PropTypes.func.isRequired,
};
