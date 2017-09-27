import { combineReducers } from 'redux'
import {
  GET_POST,
  GET_POSTS_BY_CATEGORY,
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES,
  RECEIVE_COMMENTS,
  SET_SORTING,
  VOTE,
  ADD_POST,
  COMMENT_VOTE,
  ADD_COMMENT,
  DELETE_POST,
  DELETE_COMMENT,
  SET_COMMENT_SORTING,
  EDIT_POST
} from '../actions'

function setSorting (state = null, action) {
  switch (action.type) {
    case SET_SORTING:
      return { ...state, sort: action.sortBy }
    default:
      return state
  }
}

function setCommentSorting (state = null, action) {
  switch (action.type) {
    case SET_COMMENT_SORTING:
      return { ...state, sort: action.sortCommentsBy }
    default:
      return state
  }
}

function receiveCategories (state = null, action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}

function makeObj (items) {
  const newObj = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemId = item.id
    newObj[itemId] = item
  }
  return newObj
}

function postsById (state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case GET_POSTS_BY_CATEGORY:
      return { ...state, ...makeObj(action.posts) }

    case GET_POST:
    case VOTE:
    case ADD_POST:
    case DELETE_POST:
    case EDIT_POST:
      return { ...state, ...makeObj([action.posts]) }

    default:
      return state
  }
}

function receiveComments (state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return { ...state, ...makeObj(action.comments) }

    case ADD_COMMENT:
    case COMMENT_VOTE:
    case DELETE_COMMENT:
      return { ...state, ...makeObj([action.comments]) }

    default:
      return state
  }
}

export default combineReducers({
  receiveCategories,
  receiveComments,
  setSorting,
  postsById,
  setCommentSorting
})
