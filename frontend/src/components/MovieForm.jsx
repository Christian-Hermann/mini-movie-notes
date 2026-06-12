function MovieForm({
  title,
  note,
  setTitle,
  setNote,
  handleSubmit,
  editMovieId,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Movie Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <textarea
        placeholder="Movie note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <button type="submit">
        {editMovieId ? "Update Movie" : "Add Movie"}
      </button>
    </form>
  );
}

export default MovieForm;
