import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";
import EditNote from "./EditNote";

export default function FetchNotes({ data = [], loading, error, reRender }) {
  // Handle error state in the render
  if (error) return <div>Error: {error}</div>;

  // Handle delete note
  const handleDelete = async (noteId) => {
    try {
      const response = await fetch("/api/delete-note", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note_id: noteId,
          title: "",
          content: "",
        }),
      });
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
              <p>{note.created_at}</p>
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
