import React, { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState(null); // Track selected album
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Track selected photo for expansion

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      setPhotos(response.data);
    };
    fetchData();
  }, []);

  // Filter photos by the selected album
  const filteredPhotos = selectedAlbumId
    ? photos.filter((photo) => photo.albumId === selectedAlbumId)
    : [];

  return (
    <div>
      <h1>Album Gallery</h1>

      {/* If no album is selected, show album IDs */}
      {!selectedAlbumId ? (
        <div>
          <h2>Select an Album:</h2>
          {[...new Set(photos.map((photo) => photo.albumId))].map((albumId) => (
            <div key={albumId}>
              <button onClick={() => setSelectedAlbumId(albumId)}>
                Album ID: {albumId}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={() => setSelectedAlbumId(null)}>
            Back to Albums
          </button>
          <h2>Photos in Album {selectedAlbumId}</h2>
          {/* Display photos for the selected album */}
          {filteredPhotos.slice(0, 10).map((photo) => (
            <div key={photo.id} style={{ marginBottom: "10px" }}>
              <p>{photo.title}</p>
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                onClick={() => setSelectedPhoto(photo)} // Set photo for modal
                style={{ cursor: "pointer" }}
              />
            </div>
          ))}

          {/* Modal for expanding the image */}
          {selectedPhoto && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
              }}
              onClick={() => setSelectedPhoto(null)} // Close modal on click
            >
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  style={{
                    position: "absolute",
                    top: "-40px",
                    right: "-40px",
                    backgroundColor: "#fff",
                    border: "none",
                    fontSize: "18px",
                    cursor: "pointer",
                    padding: "10px",
                    borderRadius: "50%",
                  }}
                >
                  X
                </button>
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  style={{ width: "80vw", height: "auto" }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
