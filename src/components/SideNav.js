import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCategories, setSorting, setCommentSorting } from '../actions'
import { Link } from 'react-router-dom'
import '../styles/app.css'

class SideNav extends Component {
  componentWillMount () {
    this.props.fetchData()
  }
  handleSort = val => {
    this.props.dispatch(setSorting(val))
  }

  handleCommentSort = val => {
    this.props.dispatch(setCommentSorting(val))
  }

  render () {
    return (
      <div style={{ width: '30%', float: 'left' }}>
        <div style={{ marginLeft: '16px' }}>
          {this.props.sortBy &&
            <div>
              <h2 style={{ marginBottom: 0 }}>Sort Posts By</h2>
              <ul style={{ marginTop: '8px' }}>
                <li
                  className='clickable'
                  onClick={() =>
                    this.handleSort(
                      this.props.sortBy === 'BY_SCORE_LOWEST'
                        ? 'BY_SCORE_HIGHEST'
                        : 'BY_SCORE_LOWEST'
                    )}
                >
                  Votes
                </li>
                <li
                  className='clickable'
                  onClick={() =>
                    this.handleSort(
                      this.props.sortBy === 'BY_DATE_NEWEST'
                        ? 'BY_DATE_OLDEST'
                        : 'BY_DATE_NEWEST'
                    )}
                >
                  Date
                </li>
              </ul>
            </div>}

          <h2 style={{ marginBottom: 0 }}>Categories</h2>
          <ul style={{ marginTop: '8px' }}>
            <li>
              <Link to='/'>All</Link>
            </li>
            {this.props.categories &&
              this.props.categories.length > 0 &&
              this.props.categories.map(category =>
                <li key={category.path}>
                  <Link to={`/${category.name}`}>
                    {category.name}
                  </Link>
                </li>
              )}
          </ul>
          {this.props.sortCommentsBy &&
            <div>
              <h2>Sort Comments By:</h2>
              <ul>
                <li
                  className='clickable'
                  onClick={() =>
                    this.handleCommentSort(
                      this.props.sortCommentsBy === 'BY_SCORE_LOWEST'
                        ? 'BY_SCORE_HIGHEST'
                        : 'BY_SCORE_LOWEST'
                    )}
                >
                  Votes
                </li>
                <li
                  className='clickable'
                  onClick={() =>
                    this.handleCommentSort(
                      this.props.sortCommentsBy === 'BY_DATE_NEWEST'
                        ? 'BY_DATE_OLDEST'
                        : 'BY_DATE_NEWEST'
                    )}
                >
                  Date
                </li>
              </ul>
            </div>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.receiveCategories
})

const mapDispatchToProps = dispatch => ({
  dispatch,
  fetchData: () => dispatch(fetchCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(SideNav)
