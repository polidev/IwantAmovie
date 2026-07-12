export default function SearchBar({
  inputRef,
  handleSubmit,
  searchInput,
  onSearchInput,
}) {
  return (
    <form onSubmit={handleSubmit} role="search">
      <input
        ref={inputRef}
        id="search-input"
        type="text"
        value={searchInput}
        onChange={(event) => onSearchInput(event.target.value)}
        placeholder="Search for a movie..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}
