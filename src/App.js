import React, {useState, useEffect} from 'react';
import SinglePost from './Components/SinglePost.jsx'
import './style.css';

export default function App() {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    (async () => {
      try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos?limit=5'
      );

      const data = await response.json()
      setPosts(data)
      
      }
      catch(error){
        console.log(error)
      }
    })();
  }, [])
 
  return (
    <div>
     {!posts ? 
     <h1>LOADING</h1> 
     : posts.map((post) => (
       <SinglePost key={post.id} posts={posts} post={post} setPosts={setPosts}/>
      ))}
    </div>
  );
}
