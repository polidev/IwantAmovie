export default function SearchBar({ handleSubmit, inputRef }) {
  return (
    <form onSubmit={handleSubmit} role="search">
      <input
        ref={inputRef}
        id="search-input"
        type="text"
        placeholder="Search for a movie..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}
