import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import RecentPosts from './components/Posts/RecentPosts'
import FollowedPosts from './components/Posts/Following';
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
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <Route path='/' exact={true} >
          <RecentPosts />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
