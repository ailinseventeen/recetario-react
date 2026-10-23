import Art from "./Art.jsx";

export default function RecipeCard({ recipe, isFav, onOpen, onToggleFav }) {
  return (
    <div style={{ position: "relative" }}>
      <button className="card" onClick={() => onOpen(recipe.id)}>
        <Art recipe={recipe} />
        <span className="tag">{recipe.cat}</span>
        <div className="body">
          <h3>{recipe.name}</h3>
          <div className="meta">
            <span>⏱ {recipe.time}</span>
            <span>👩‍🍳 {recipe.level}</span>
            <span>🍽 {recipe.base}</span>
          </div>
        </div>
      </button>
      <button className="fav" onClick={() => onToggleFav(recipe.id)} aria-label="Favorita">
        {isFav ? "♥" : "♡"}
      </button>
    </div>
  );
}
