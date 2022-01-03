import React, {useEffect} from 'react';
import superagent from 'superagent';
import {useInView} from "react-intersection-observer";
import {Link} from "react-router-dom";
import {atom, useRecoilState} from "recoil";

const agent = superagent.agent().use(function(req) {
  req.url = `https://api-dev.jdjeon.com${req.url}`;
});

const postsState = atom<Array<{id: string, body: string}>>({
  key: 'postsState',
  default: [],
});

const hasMoreState = atom<boolean>({
  key: 'hasMoreState',
  default: true,
});

const firstLoadState = atom<boolean>({
  key: 'firstLoadState',
  default: true,
});


function App() {
  const [posts, setPosts] = useRecoilState(postsState);
  const [hasMore, setHasMore] = useRecoilState(hasMoreState);
  const [firstLoad, setFirstLoad] = useRecoilState(firstLoadState);
  const { ref, inView } = useInView()

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      agent.get('/communities/wXp0wBuE54HqXS67/posts')
        .then(res => {
          setPosts(res.body.data);
          setHasMore(res.body.hasMore);
        })
    }
  }, [])

  useEffect(() => {
    if (inView && hasMore && 0 < posts.length) {
      agent.get('/communities/wXp0wBuE54HqXS67/posts')
        .query({
          before: posts[posts.length - 1].id
        })
        .then(res => {
          setPosts([...posts, ...res.body.data]);
          setHasMore(res.body.hasMore);
        })
    }
  }, [inView])

  return (
    <div className="App">
      {posts.map(post => (
        <div key={post.id} style={{marginBottom: '200px'}}>
          <Link to={`/posts/${post.id}`}>
            <p>{post.body}</p>
          </Link>
        </div>
      ))}
      <div ref={ref}/>
    </div>
  );
}

export default App;
