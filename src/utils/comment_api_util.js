export const fetchComments = (id) =>
  fetch(`http://localhost:5001/posts/${id}/comments`, { headers: { 'Authorization': 'whatever-you-want' }})
    .then(data => data.json())
    .then(data => data)
