// Ilustración SVG de la receta (degradado + emoji). Sustituye por <img> si tienes fotos.
export default function Art({ recipe, size = 120 }) {
  const id = "g" + recipe.id;
  return (
    <svg className="art" viewBox="0 0 400 260" role="img" aria-label={recipe.name}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={recipe.c[0]} />
          <stop offset="1" stopColor={recipe.c[1]} />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill={`url(#${id})`} />
      <circle cx="330" cy="50" r="90" fill="#fff" opacity=".14" />
      <circle cx="40" cy="240" r="110" fill="#000" opacity=".08" />
      <circle cx="200" cy="140" r="86" fill="#fff" opacity=".22" />
      <ellipse cx="200" cy="228" rx="90" ry="9" fill="#000" opacity=".15" />
      <text x="200" y="175" fontSize={size} textAnchor="middle">{recipe.emoji}</text>
    </svg>
  );
}
