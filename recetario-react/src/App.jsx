import { useEffect, useMemo, useState } from "react";
import { RECIPES } from "./data/recipes.js";
import RecipeCard from "./components/RecipeCard.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";

const STORAGE_KEY = "recetario-favs";

export default function App() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Todas");
  const [openId, setOpenId] = useState(null);
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); }
    catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(favs)); } catch {}
  }, [favs]);

  const toggleFav = (id) =>
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const cats = ["Todas", "Favoritas", ...new Set(RECIPES.map((r) => r.cat))];

  const list = useMemo(
    () =>
      RECIPES.filter(
        (r) =>
          (cat === "Todas" || (cat === "Favoritas" ? favs.includes(r.id) : r.cat === cat)) &&
          (r.name + " " + r.ing.map((i) => i[2]).join(" "))
            .toLowerCase()
            .includes(q.toLowerCase())
      ),
    [q, cat, favs]
  );

  const current = RECIPES.find((r) => r.id === openId);

  return (
    <div className="wrap">
      <header>
        <span className="eyebrow">Cocina en casa</span>
        <h1>Mi Recetario</h1>
        <p className="sub">Elige una receta para ver ingredientes, pasos y porciones.</p>
      </header>

      <div className="tools">
        <label className="search">🔍
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Busca por nombre o ingrediente…"
          />
        </label>
      </div>

      <div className="chips">
        {cats.map((c) => (
          <button
            key={c}
            className={"chip" + (cat === c ? " on" : "")}
            onClick={() => setCat(c)}
          >
            {c === "Favoritas" ? "♥ Favoritas" : c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <div className="empty">No encontramos recetas con ese filtro 🍳</div>
      ) : (
        <div className="grid">
          {list.map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              isFav={favs.includes(r.id)}
              onOpen={setOpenId}
              onToggleFav={toggleFav}
            />
          ))}
        </div>
      )}

      {current && (
        <RecipeDetail
          key={current.id}
          recipe={current}
          isFav={favs.includes(current.id)}
          onClose={() => setOpenId(null)}
          onToggleFav={toggleFav}
        />
      )}
    </div>
  );
}
