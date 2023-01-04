import styles from "./Categories.module.scss";

export default function Categories(props) {
  const { categories, activeCategory, setActiveCategory } = props;
  return (
    <>
      <select
        value={activeCategory}
        onChange={(e) => setActiveCategory(e.target.value)}
      >
        <option value="">Toutes les catégories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <button onClick={() => setActiveCategory("")}>Réinitialiser</button>
    </>
  );
}
