'use client';

import { useState, useEffect } from "react" 
import PromptCard from "./PromptCard"

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}
const Feed = () => {
  
  const [allPosts, setAllPosts] = useState([])

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    if (searchTimeout) clearTimeout(searchTimeout);
    setSearchTimeout(
      setTimeout(() => {
        const results = allPosts.filter((post) =>
          post.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(results);
      }
      , 500)
    );
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const results = allPosts.filter((post) =>
      post.tag.toLowerCase().includes(tagName.toLowerCase())
    );
    setSearchedResults(results);
  }

  const fetchPosts = async () =>{
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPosts(data);
  }

  useEffect(()=>{
    fetchPosts();
  },[])

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
          type="text" 
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed