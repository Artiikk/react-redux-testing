import React from 'react';

import Header from './component/header';
import Headline from './component/headline';
import SharedButton from './component/button';
import ListItem from './component/listItem';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';

import './app.scss';

function App({ fetchPosts, posts }) {
  return (
    <div className="App">
      <Header />

      <section className='main'>
        <Headline header='Posts' desc='Click the button to render posts!' />
        <SharedButton buttonText='Get posts' emitEvent={fetchPosts} />

        {!!posts.length && <div>
          {posts.map((post, index) => <ListItem key={post.title} title={post.title} desc={post.body} />)}
        </div>
        }
      </section>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps, { fetchPosts })(App);
