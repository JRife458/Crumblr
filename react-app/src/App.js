import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import RecentPosts from './components/Posts/RecentPosts'
import FollowedPosts from './components/Posts/Following';
import Footer from './components/Footer';
import { authenticate } from './store/sessionReducer';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation isLoaded={loaded} />
      <Switch>
        <Route path='/following' exact={true}>
          <FollowedPosts />
        </Route>
        <Route path='/' exact={true} >
          <RecentPosts />
        </Route>
        <Route path='*'>
          <h1>Error 404 Page Not Found</h1>
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
