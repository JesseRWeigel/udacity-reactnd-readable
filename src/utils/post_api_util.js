const myHeaders = new Headers({
  "Authorization": "abc123"
})

export const fetchPosts = () => fetch('http://localhost:5001/posts').then(data => data.json())

export const fetchPost = (id) => fetch(`http://localhost:5001/posts/${id}`).then(data => data.json())
