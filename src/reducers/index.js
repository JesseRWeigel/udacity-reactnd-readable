import { combineReducers } from 'redux'
import { GET_POST, GET_POSTS_BY_CATEGORY, RECEIVE_POSTS, RECEIVE_CATEGORIES, RECEIVE_COMMENTS, SET_SORTING, Sorting, VOTE, ADD_POST, COMMENT_VOTE, ADD_COMMENT, DELETE_POST, DELETE_COMMENT, SET_COMMENT_SORTING } from '../actions'
const { BY_DATE_NEWEST, BY_DATE_OLDEST, BY_SCORE_HIGHEST, BY_SCORE_LOWEST } = Sorting

function setSorting (state = null, action) {
  switch (action.type) {
    case SET_SORTING:
      return {...state, sort: action.sortBy}
    default:
      return state
  }
}

function setCommentSorting (state = null, action) {
  switch (action.type) {
    case SET_COMMENT_SORTING:
      return {...state, sort: action.sortCommentsBy}
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

function sorter(items, sortCriteria = 'BY_SCORE_HIGHEST') {
  switch (sortCriteria) {
    case BY_DATE_NEWEST:
    return items.sort((a, b) =>  b.date - a.date)

    case BY_DATE_OLDEST:
    return items.sort((a, b) =>  a.date - b.date)

    case BY_SCORE_HIGHEST:
    return items.sort((a, b) =>  b.voteScore - a.voteScore)

    case BY_SCORE_LOWEST:
    return items.sort((a, b) =>  a.date - b.date)

    default:
    return items
  }
}

function makeObj(items) {
  const sortedItems = sorter(items)
  const newObj = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemId = item.id
    newObj[itemId] = item
  }
  return newObj
}

function postsById(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case GET_POSTS_BY_CATEGORY:
    return {...state, ...makeObj(action.posts)}

    case GET_POST:
    case VOTE:
    case ADD_POST:
    case DELETE_POST:
    return {...state, ...makeObj([action.posts])}

    default:
    return state
  }
}

function receiveComments (state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
      return {...state, ...makeObj(action.comments)}

    case ADD_COMMENT:
    case COMMENT_VOTE:
    case DELETE_COMMENT:
      return {...state, ...makeObj([action.comments])}

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
