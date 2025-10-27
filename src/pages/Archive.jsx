import React from "react";
import useNewsCache from "../Hooks/useNewsCatch";

export default function Archive() {
  const { saved, unsaveArticle } = useNewsCache();

  return (
    <div className="saved-page" style={{ padding: "16px" }}>
      <h2>Saved Articles</h2>
      {saved.length === 0 ? (
        <p>No saved articles yet.</p>
      ) : (
        saved.map((a) => (
          <div key={a.url} className="saved-item" style={{ marginBottom: "10px" }}>
            <a
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h4>{a.title}</h4>
              <p>{a.abstract}</p>
            </a>
            <button onClick={() => unsaveArticle(a.url)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}
