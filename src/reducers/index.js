import { combineReducers } from 'redux'
import { GET_POST, GET_POSTS_BY_CATEGORY, RECEIVE_POSTS, RECEIVE_CATEGORIES, RECEIVE_COMMENTS, SET_SORTING, Sorting, VOTE, ADD_POST, COMMENT_VOTE, ADD_COMMENT, DELETE_POST, DELETE_COMMENT } from '../actions'
const { BY_DATE_NEWEST, BY_DATE_OLDEST, BY_SCORE_HIGHEST, BY_SCORE_LOWEST } = Sorting

function setSorting (state = null, action) {
  switch (action.type) {
    case SET_SORTING:
      return {...state, sort: action.sortBy}
    default:
      return state
  }
}

// function receivePosts (state = {}, action) {
//   switch (action.type) {
//     case RECEIVE_POSTS:
//       return action.posts
//     default:
//       return state
//   }
// }

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
  console.log(items)
  const sortedItems = sorter(items)
  const newObj = {}
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    const itemId = item.id
    newObj[itemId] = item
  }
  console.log(Object.values(newObj))
  return newObj
}

function postsById(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
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

function getPostsByCategory (state = {}, action) {
  switch (action.type) {
    case GET_POSTS_BY_CATEGORY:
      return action.posts
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

// function getPost (state = null, action) {
//   switch (action.type) {
//     case GET_POST:
//       return action.post
//     default:
//       return state
//   }
// }

// function postVote (state = null, action) {
//   switch (action.type) {
//     case GET_POST:
//       return action.post
//     default:
//       return state
//   }
// }

export default combineReducers({
  // receivePosts,
  receiveCategories,
  getPostsByCategory,
  receiveComments,
  setSorting,
  postsById
})
