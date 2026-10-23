import { useEffect, useState } from "react";
import Art from "./Art.jsx";
import { fmt } from "../utils.js";

export default function RecipeDetail({ recipe: r, onClose, isFav, onToggleFav }) {
  const [serv, setServ] = useState(r.base);
  const [got, setGot] = useState({});
  const [done, setDone] = useState({});

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const pct = Math.round(
    (Object.values(done).filter(Boolean).length / r.steps.length) * 100
  );

  return (
    <div className="overlay" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Cerrar">✕</button>
        <Art recipe={r} size={150} />
        <div className="inner">
          <div className="eyebrow">{r.cat}</div>
          <h2>{r.name}</h2>
          <p className="desc">{r.desc}</p>

          <div className="stats">
            <div className="stat">Tiempo<b>⏱ {r.time}</b></div>
            <div className="stat">Dificultad<b>👩‍🍳 {r.level}</b></div>
            <div className="stat">Ingredientes<b>🧺 {r.ing.length}</b></div>
            <button className="chip" onClick={() => onToggleFav(r.id)}>
              {isFav ? "♥ En favoritos" : "♡ Guardar"}
            </button>
          </div>

          <div className="cols">
            <section>
              <h3>Ingredientes</h3>
              <div className="serv">
                <button onClick={() => setServ(Math.max(1, serv - 1))} aria-label="Menos">−</button>
                <span><b>{serv}</b> {serv === 1 ? "porción" : "porciones"}</span>
                <button onClick={() => setServ(serv + 1)} aria-label="Más">+</button>
              </div>
              <ul className="ing">
                {r.ing.map(([qty, unit, name], k) => (
                  <li key={k}>
                    <label>
                      <input
                        type="checkbox"
                        checked={!!got[k]}
                        onChange={() => setGot({ ...got, [k]: !got[k] })}
                      />
                      <span className={got[k] ? "done" : ""}>
                        <b>{fmt((qty * serv) / r.base)} {unit}</b> {name}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3>Preparación</h3>
              <div className="progress"><i style={{ width: pct + "%" }} /></div>
              <ol className="steps">
                {r.steps.map((s, k) => (
                  <li
                    key={k}
                    className={done[k] ? "done" : ""}
                    onClick={() => setDone({ ...done, [k]: !done[k] })}
                  >
                    <span className="n">{done[k] ? "✓" : k + 1}</span>
                    <p>{s}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
