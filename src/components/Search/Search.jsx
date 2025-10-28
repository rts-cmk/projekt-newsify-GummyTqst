import "../Search/Search.sass"

export default function Search() {
  return (
    <form className="search-container">
      <input 
        type="text" 
        name="search"
        placeholder="Search news" 
        className="search-container__input" 
      />
    </form>
  )
}