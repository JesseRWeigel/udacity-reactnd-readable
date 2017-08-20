import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';

  // {this.props.posts.map(post =>
  //   <div className='post' key='post.id'>
  //     <h3>{post.title}</h3>
  //   </div>
  // )}

class Home extends Component {
  componentDidMount() {
        this.props.fetchData();
    }
  render () {
    return (
      <div style={{width: '100%', minHeight: '100vh', backgroundColor: '#000',
      fontFamily: 'Monospace', color: 'green'}}>
        <div style={{width: '30%', float: 'left'}}>
          <h2>Categories</h2>
          <ul>
            <li>Category</li>
            <li>Category</li>
            <li>Category</li>
            <li>Category</li>
            <li>Category</li>
            <li>Category</li>
            <li>Category</li>
          </ul>
        </div>
        <div style={{width: '70%', float: 'left'}}>
          <h2>Posts</h2>
          {console.log(this.props.posts)}
          {this.props.posts.length > 0 && this.props.posts.map(post =>
            <div className='post' key={post.id}>
              <h3>{post.title}</h3>
              {console.log(post.title)}
            </div>
          )}
        </div>
      </div>

    )
  }
}

const mapStateToProps = (state) => {
    return {
        posts: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchPosts())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home)
