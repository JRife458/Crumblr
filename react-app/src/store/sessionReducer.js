import { normalizeArray } from "../resources";
// constants
const SET_USER = 'session/SET_USER';
const REMOVE_USER = 'session/REMOVE_USER';
const FOLLOW_USER = 'session/FOLLOW_USER';
const UNFOLLOW_USER = 'session/UNFOLLOW_USER'

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const followUser = (user) => ({
  type: FOLLOW_USER,
  payload: user
})

const unfollowUser = (userId) => ({
  type: UNFOLLOW_USER,
  payload: userId
})

const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const thunkFollowUser = (followeeId, followerId) => async (dispatch) => {
  const response = await fetch(`/api/users/${followeeId}/follow`, {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      followeeId,
      followerId
    }),
  });
  if (response.ok) {
    const followedUser = await response.json()
    dispatch(followUser(followedUser))
    return followedUser
  }
}

export const thunkUnfollowUser = (followeeId) => async (dispatch) => {
  const response = await fetch(`/api/users/${followeeId}/follow`, {
    method: "delete",
  });
  if (response.ok) {
    const unfollowedUser = await response.json()
    dispatch(unfollowUser(followeeId))
    return unfollowedUser
  }
}

const sessionReducer = (state = initialState, action) => {
  let newState

  switch (action.type) {


    case SET_USER:
      newState = { user: action.payload }
      newState.user.Following = normalizeArray(action.payload.Following)
      return newState


    case REMOVE_USER:
      return { user: null }

    case FOLLOW_USER:
      newState = {...state}
      newState.user.Following[action.payload.id] = action.payload
      return newState

    case UNFOLLOW_USER:
      newState = {...state}
      delete newState.user.Following[action.payload]
      return newState

    default:
      return state;
  }
}

export default sessionReducer
