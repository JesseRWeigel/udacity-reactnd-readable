export const fetchCategories = () =>
  fetch('http://localhost:3001/categories', { headers: { 'Authorization': 'whatever-you-want' }})
    .then(data => data.json())
    .then(data => data.categories)
