import "./index.css";
import { API_CONFIG } from "./config/api_config";
import { MdNoteAlt } from "react-icons/md";
import { useState, useEffect } from "react";
import FetchNotes from "./components/FetchNotes";
import AddNote from "./components/AddNote";
import Footer from "./components/Footer";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await fetch(API_CONFIG.BASE_URL);
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Fetch all notes
  useEffect(() => {
    // Call fetchData function
    fetchData();
  }, []);

  // Handle refresh notes re-rendering
  const refreshNotes = () => {
    setLoading(true);
    fetchData();
  };

  return (
    <>
      <header>
        <h1>
          <MdNoteAlt /> Notes App
        </h1>
      </header>
      <main>
        <section className="read-all-notes">
          <FetchNotes
            data={data}
            loading={loading}
            error={error}
            reRender={refreshNotes}
          />
        </section>
        <section className="add-note">
          <AddNote onSubmit={refreshNotes} />
        </section>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
