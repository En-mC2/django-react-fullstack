import Note from "../components/Note";
import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Home.css";
function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  useEffect(() => {
    getNote();
  }, []);
  const getNote = () => {
    api
      .get("api/notes")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((error) => alert(error));
  };
  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("note deleted");
        else alert("failed to delete");
        getNote();
      })
      .catch((error) => alert(error));
  };
  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note Created");
        else alert("Failed to make Note");
        getNote();
      })
      .catch((err) => alert(err));
  };
  return (
    <div>
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>
      <h2>Create a Note</h2>
      <form onSubmit={createNote}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Content</label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <input type="submit" value="submit"></input>
      </form>
    </div>
  );
}
export default Home;
