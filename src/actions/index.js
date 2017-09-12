import * as PostAPIUtil from '../utils/post_api_util'
import * as CategoryAPIUtil from '../utils/category_api_util'
import * as CommentAPIUtil from '../utils/comment_api_util'
export const ADD_POST = 'ADD_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'
export const GET_POST = 'GET_POST'
export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const GET_POSTS_BY_CATEGORY = 'GET_POSTS_BY_CATEGORY'
export const SET_SORTING = 'SET_SORTING'
export const VOTE = 'VOTE'

export const Sorting = {
  BY_DATE_NEWEST: 'BY_DATE_NEWEST',
  BY_DATE_OLDEST: 'BY_DATE_OLDEST',
  BY_SCORE_HIGHEST: 'BY_SCORE_HIGHEST',
  BY_SCORE_LOWEST: 'BY_SCORE_LOWEST',
}

export function setSorting(sortBy) {
  return { type: SET_SORTING, sortBy }
}

export const postsById = posts => ({
  type: RECEIVE_POSTS,
  posts
})

export const fetchPosts = () => dispatch =>
  PostAPIUtil.fetchPosts().then(posts => dispatch(postsById(posts)))

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch =>
  CategoryAPIUtil.fetchCategories().then(categories =>
    dispatch(receiveCategories(categories))
  )

export const getPostsByCategory = posts => ({
  type: GET_POSTS_BY_CATEGORY,
  posts
})

export const fetchPostsByCategory = (category) => dispatch =>
  PostAPIUtil.fetchPostsByCategory(category).then(posts => dispatch(getPostsByCategory(posts)))

export const receiveComments = comments => ({
  type: RECEIVE_COMMENTS,
  comments
})

export const fetchComments = (id) => dispatch =>
  CommentAPIUtil.fetchComments(id).then(comments =>
    dispatch(receiveComments(comments))
  )

export const getPost = post => ({
  type: GET_POST,
  post
})

export const fetchPost = (id) => dispatch =>
  PostAPIUtil.fetchPost(id).then(post => dispatch(getPost(post)))

export const postVote = post => ({
  type:VOTE,
  post
})

export const vote = (id, vote) => dispatch =>
  PostAPIUtil.vote(id, vote).then(post => dispatch(postVote(post)))

export function addPost ({
  id,
  timestamp,
  title,
  body,
  author,
  category,
  voteScore,
  deleted
}) {
  return {
    type: ADD_POST,
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    deleted
  }
}

export function addComment ({
  id,
  parentId,
  timestamp,
  body,
  author,
  voteScore,
  deleted,
  parentDeleted
}) {
  return {
    type: ADD_COMMENT,
    id,
    parentId,
    timestamp,
    body,
    author,
    voteScore,
    deleted,
    parentDeleted
  }
}
