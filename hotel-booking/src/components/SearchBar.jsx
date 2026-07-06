function SearchBar({ search, setSearch }) {
  return (
    <div className="my-8">
      <input
        type="text"
        placeholder="Search hotels or city..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:outline-none"
      />
    </div>
  );
}

export default SearchBar;
