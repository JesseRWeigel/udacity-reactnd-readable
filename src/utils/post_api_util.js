//  Get all posts
export const fetchPosts = () =>
  fetch('http://localhost:3001/posts', {
    headers: { Authorization: 'whatever-you-want' }
  }).then(data => data.json())

// Get all posts in a category
export const fetchPostsByCategory = category =>
  fetch(`http://localhost:3001/${category}/posts`, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(data => data.json())

// Get a single post based on id
export const fetchPost = id =>
  fetch(`http://localhost:3001/posts/${id}`, {
    headers: { Authorization: 'whatever-you-want' }
  }).then(data => data.json())

// Delete post
export const deletePost = id =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'whatever-you-want'
    }
  }).then(data => data.json())

// Change voteScore for a post
export const vote = (id, vote) =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  }).then(data => data.json())

// Add new post
export const addPost = data =>
  fetch(`http://localhost:3001/posts`, {
    method: 'POST',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())

// Edit post
export const editPost = (data, id) =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'whatever-you-want',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(data => data.json())
