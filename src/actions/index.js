import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // dispatch the result of calling an action creator inside an action creator
  await dispatch(fetchPosts()); // wait to get the posts

  // const userIDs = _.uniq(_.map(getState().posts, "userId"));
  // returns an array of unique user id's
  // userIDs.forEach((id) => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach((id) => dispatch(fetchUser(id)))
    .value(); // same as execute()
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({
    type: "FETCH_POSTS",
    payload: response.data,
  });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
};

// _ -> private function
// function returns undefined
// memoized function will run exactly 1 time when called, and execute instructions
// after all the other calls it will return the previously returned value, which is undefined
// it will no more execute instructions
// cannot re-fetch resource over time

// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data,
//   });
// });

// alternate over-fetching solution
