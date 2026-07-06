function FilterBar({ sort, setSort }) {
  return (
    <div className="flex justify-end mb-8">

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg p-3"
      >
        <option value="">Sort By</option>
        <option value="priceLow">Price Low → High</option>
        <option value="priceHigh">Price High → Low</option>
        <option value="rating">Highest Rating</option>
        <option value="name">A-Z</option>
      </select>

    </div>
  );
}

export default FilterBar;
