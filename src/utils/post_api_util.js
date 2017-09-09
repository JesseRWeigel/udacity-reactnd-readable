export const fetchPosts = () => fetch('http://localhost:5001/posts', { headers: { 'Authorization': 'whatever-you-want' }}).then(data => data.json())

export const fetchPostsByCategory = (category) => fetch(`http://localhost:5001/${category}/posts`, { headers: { 'Authorization': 'whatever-you-want' }}).then(data => data.json())

export const fetchPost = (id) => fetch(`http://localhost:5001/posts/${id}`, { headers: { 'Authorization': 'whatever-you-want' }}).then(data => data.json())
