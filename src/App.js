import React, { useState } from 'react';

import Header from './component/header';
import Headline from './component/headline';
import SharedButton from './component/button';
import ListItem from './component/listItem';
import { connect } from 'react-redux';
import { fetchPosts } from './actions';

import './app.scss';


function App({ fetchPosts, posts }) {
  const [btn, setBtn] = useState(false)
  
  const toggleBtn = () => setBtn(prev => !prev);

  const fetch = () => {
    fetchPosts();
    toggleBtn();
  };

  return (
    <div className="App" data-test="appComponent">
      <Header />

      <section className='main'>
        <Headline header='Posts' desc='Click the button to render posts!' />
        {!btn && <SharedButton buttonText='Get posts' emitEvent={fetch} />}

        {!!posts.length && <div>
          {posts.map(post => <ListItem key={post.title} title={post.title} desc={post.body} />)}
        </div>}
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
