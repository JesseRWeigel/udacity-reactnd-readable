export const fetchComments = (id) =>
  fetch(`http://localhost:5001/posts/${id}/comments`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(data => data.json())
    .then(data => data)

// Add new post
export const addComment = (data) =>
  fetch(`http://localhost:5001/comments`,
    {
      method: 'POST',
      headers: {
       'Authorization': 'whatever-you-want',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
    })
    .then(data => data.json())
