export default function SearchBar({
  inputRef,
  handleSubmit,
  inputValue,
  onInputChange,
}) {
  return (
    <form onSubmit={handleSubmit} role="search">
      <input
        ref={inputRef}
        id="search-input"
        type="text"
        value={inputValue}
        onChange={(event) => onInputChange(event.target.value)}
        placeholder="Search for a movie..."
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}
