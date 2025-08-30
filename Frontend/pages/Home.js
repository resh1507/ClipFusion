// Home.js
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VideoNoteTaker from "../components/VideoNoteTaker";
import jsPDF from "jspdf";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const navigate = useNavigate();
  const [videoLink, setVideoLink] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [text, setText] = useState("");
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editNote, setEditNote] = useState({
    videoLink: "",
    timestamp: "",
    text: "",
  });
  const [search, setSearch] = useState(""); // ✅ search field
  const token = localStorage.getItem("token");
  const playerRef = useRef(null);

  useEffect(() => {
    fetchNotes();
  }, [token]);

  const extractYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const formatTime = (timestamp) => {
    const parts = timestamp.split(":").map((p) => p.padStart(2, "0"));
    return parts.join(":");
  };

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleAddNote = async () => {
    if (!videoLink || !timestamp || !text) {
      alert("Please fill in all fields.");
      return;
    }
    const newNote = { videoLink, timestamp, text };
    try {
      await axios.post("http://localhost:5000/api/notes", newNote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTimestamp("");
      setText("");
      fetchNotes();
      if (playerRef.current?.playVideo) {
        playerRef.current.playVideo();
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleEdit = (note) => {
    setEditId(note._id);
    setEditNote({ ...note });
    setVideoLink(note.videoLink);
  };

  const handleUpdate = async () => {
    if (!editNote.text || !editNote.timestamp || !editNote.videoLink) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.put(`http://localhost:5000/api/notes/${editId}`, editNote, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditId(null);
      setEditNote({ videoLink: "", timestamp: "", text: "" });
      fetchNotes();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  const seekToTime = (timestamp, noteVideoLink) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (videoLink !== noteVideoLink) {
      setVideoLink(noteVideoLink);
      setTimeout(() => {
        const seconds = convertTimestampToSeconds(timestamp);
        if (playerRef.current && typeof playerRef.current.seekTo === "function") {
          playerRef.current.seekTo(seconds, "seconds");
          playerRef.current.playVideo?.();
        }
      }, 1000);
    } else {
      const seconds = convertTimestampToSeconds(timestamp);
      if (playerRef.current && typeof playerRef.current.seekTo === "function") {
        playerRef.current.seekTo(seconds, "seconds");
        playerRef.current.playVideo?.();
      }
    }
  };

  const convertTimestampToSeconds = (time) => {
    const parts = time.split(":").map(Number);
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    return parts[0];
  };

  const handleDownloadPDF = (videoLink) => {
    const notesForVideo = notes.filter((n) => n.videoLink === videoLink);
    if (notesForVideo.length === 0) return;

    const videoId = extractYouTubeVideoId(videoLink);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    const doc = new jsPDF();
    let y = 20;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("ClipFusion Notes", 20, 20);
    y += 10;

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.textWithLink("Watch Full Video", 20, y, { url: videoLink });
    y += 10;

    notesForVideo.forEach((note) => {
      const seconds = convertTimestampToSeconds(note.timestamp);
      const timestampLink = `${note.videoLink}&t=${seconds}s`;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`Timestamp:`, 20, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 255);
      doc.textWithLink(note.timestamp, 60, y, { url: timestampLink });
      y += 8;

      doc.setTextColor(0, 0, 0);
      const lines = doc.splitTextToSize(note.text, 170);
      doc.text(lines, 20, y);
      y += lines.length * 8;
    });

    if (thumbnailUrl) {
      doc.addImage(thumbnailUrl, "JPEG", 150, 10, 40, 30);
    }

    doc.save("clipfusion-notes.pdf");
  };

  // ✅ filter notes by search text
  const filteredNotes = notes.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "2rem", minHeight: "100vh", background: "linear-gradient(to right, #f1f8e9, #e0f7fa)" }}>
      <ToastContainer position="top-right" autoClose={3000} />

      <button
        onClick={handleLogout}
        style={{
          float: "right",
          padding: "8px 16px",
          backgroundColor: "#d32f2f",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h2>🎬 ClipFusion - Smart Notes</h2>

      <input
        type="text"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        placeholder="Paste YouTube video link"
        style={{ width: "100%", padding: "8px", marginBottom: "0.5rem" }}
      />

      {videoLink && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <button
            onClick={() => {
              setVideoLink("");
              setTimestamp("");
              setText("");
              setEditId(null);
            }}
            style={{
              backgroundColor: "#f44336",
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "6px 12px",
              marginRight: "10px",
              cursor: "pointer",
            }}
          >
            ❌ Cancel Video
          </button>
        </div>
      )}

      <VideoNoteTaker videoUrl={videoLink} setTimestamp={setTimestamp} playerRef={playerRef} />

      <div>
        <label>Timestamp (auto):</label>
        <input type="text" value={timestamp} readOnly />
        <label>Note:</label>
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (playerRef.current?.pauseVideo) {
              playerRef.current.pauseVideo();
            }
          }}
        ></textarea>
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <h3>📝 Saved Notes by Video</h3>
      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "1rem" }}
      />

      {[...new Set(filteredNotes.map((n) => n.videoLink))].map((link, idx) => {
        const videoId = extractYouTubeVideoId(link);
        const notesForVideo = filteredNotes.filter((n) => n.videoLink === link);

        return (
          <div key={idx} style={{ marginBottom: "2rem", background: "#fff", padding: "1rem", borderRadius: "8px" }}>
            <a href={link} target="_blank" rel="noopener noreferrer">
              <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt="thumbnail" width="300" />
            </a>
            <p>
              🔗 <a href={link} target="_blank" rel="noopener noreferrer">{link}</a>
            </p>

            <button
              onClick={() => handleDownloadPDF(link)}
              style={{
                marginBottom: "10px",
                backgroundColor: "#388e3c",
                color: "white",
                border: "none",
                borderRadius: "4px",
                padding: "6px 12px",
                cursor: "pointer",
              }}
            >
              📄 Download Notes PDF
            </button>

            <ul>
              {notesForVideo.map((note, i) => (
                <li key={i} style={{ marginBottom: "1rem" }}>
                  <strong
                    onClick={() => seekToTime(note.timestamp, note.videoLink)}
                    style={{ cursor: "pointer", color: "#007bff", textDecoration: "underline" }}
                  >
                    ⏱ {formatTime(note.timestamp)}
                  </strong>
                  <br />
                  {editId === note._id ? (
                    <>
                      <input
                        type="text"
                        value={editNote.timestamp}
                        onChange={(e) => setEditNote({ ...editNote, timestamp: e.target.value })}
                      />
                      <textarea
                        value={editNote.text}
                        onChange={(e) => setEditNote({ ...editNote, text: e.target.value })}
                      />
                      <button onClick={handleUpdate}>💾 Save</button>
                      <button onClick={() => setEditId(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      {note.text}
                      <br />
                      <button onClick={() => handleEdit(note)}>✏ Edit</button>
                      <button onClick={() => handleDelete(note._id)}>🗑 Delete</button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
