// export const fetchPosts = () => fetch('https://wp2.srtechnologiesus.com/wp-json/wp/v2/pages').then(posts => posts.json());

export const fetchPosts = () => fetch('http://localhost:5001/posts', {headers: {Authorization: 'abc'}}).then(data => data.json())
