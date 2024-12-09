import { useState, useEffect } from "react";
import axios from "axios";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [books, setBooks] = useState([]); // State untuk menyimpan array buku
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error handling

  useEffect(() => {
    // Fungsi untuk fetch data dari API
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "https://ca0d97ae24b202efacd5.free.beeceptor.com/api/book/"
        );
        setBooks(response.data); // Simpan data API ke state
        console.log(response.data); // Debug respons API
      } catch (err) {
        setError(err.message); // Tangani error jika ada
      } finally {
        setLoading(false); // Matikan loading
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <div className="card">
        {loading ? (
          <p>Loading...</p> // Tampilkan loading jika sedang memuat data
        ) : error ? (
          <p style={{ color: "red" }}>Error: {error}</p> // Tampilkan error jika ada
        ) : books.length > 0 ? (
          <ul>
            {books.map((book, index) => (
              <li key={index}>
                <h2>{book.title}</h2>
                <p>Page: {book.page}</p>
                <p>ID: {book.id}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available</p>
        )}
      </div>
    </div>
  );
}

export default App;
