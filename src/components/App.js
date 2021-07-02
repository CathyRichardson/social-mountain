import React, { Component } from 'react';

import './App.css';
import axios from 'axios'

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
  }

  componentDidMount() {
    console.log("in componentDidMount");
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(res => {
        this.setState({ posts: res.data })
      })
      .catch(err => {
        err.message
      })
  }

  updatePost(id, body) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?${id}, ${body}`)
    .then( ({data}) => {
      this.setState({posts: data})
    })
    .catch( err => {
      err.message
    })
  }

  deletePost() {

  }

  createPost() {

  }

  render() {
    const { posts } = this.state;
    console.log("posts array: ", posts);
   
    let renderPosts = posts.map(el => <Post key={el.id} text={el.text} date={el.date} updatePostFn={this.updatePost} id={el.id}/>)

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose />
          {renderPosts}
        </section>
      </div>
    );
  }
}

export default App;
