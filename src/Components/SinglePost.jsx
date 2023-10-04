import React, {useState} from 'react'

export default function SinglePost({post, posts, setPosts}){
  const [editPost, setEditPost] = useState()

  function deletePost(id){
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then(response => {
      if(response.ok) {
        console.log("deleted succesfully")
      } else {
        console.log("delete error")
        console.log(response)
      }
    })
    .catch((error) => {
      console.log(error)
    }); 
    
    const updatedPost = posts.filter((post) => post.id !== id)
    setPosts(updatedPost)
  }

  function changePost(id){
    if(editPost){
      const newPost = {
        ...post,
        title: editPost
      }
     fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
       method: "PUT",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(newPost)
   }).then((response) => {
       if(response.ok) {
         console.log("updated succesfully")
         console.log(response)
       } else {
         console.log("update error")
         console.log(response)
       }
     })
     .catch((error) => {
       console.log(error)
     });
 
    const updatedPost = posts.map((post) => 
      id === post.id ? newPost : post
    );

    setPosts(updatedPost)
    }
   };

  return (
    <div
    style={{ border: '1px dashed', marginBottom: '5px', padding: '5px'}}
  >
    {post.title}
      <div
       style={{ display: 'flex', gap: '5px'}}
      >
        <input 
          type="text" 
          value={editPost}
          onChange={(e) => setEditPost(e.target.value)}
          />
        <button
          onClick={() => changePost(post.id)}
          style={{backgroundColor: 'green', color: "white"}}
        >
          Change The Post
        </button>
        <button
          onClick={() => deletePost(post.id)}
          style={{backgroundColor: 'red', color: "white"}}
        >
          delete The Post
        </button>
      </div>
  </div>
  )
}