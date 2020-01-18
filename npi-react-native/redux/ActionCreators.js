import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchComments = () => dispatch => {
  return fetch(baseUrl + "comments")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(comments => dispatch(addComments(commentšs)))
    .catch(error => dispatch(commentsFailed(error.message)));
};

export const commentsFailed = errMess => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
});

export const addComments = comments => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const fetchIndividuals = () => {
  dispatch(individualsLoading());

  return fetch(baseUrl + "individuals")
    .then(
      reponse => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then(response => response.json())
    .then(individuals => dispatch(addIndividuals(individuals)))
    .catch(error => dispatch(individualsFailed(error.message)));
};

export const individualsLoading = () => ({
  type: ActionTypes.INDIVIDUALS_LOADING
});

export const individualsFailed = () => ({
  type: ActionTypes.INDIVIDUALS_LOADING,
  payload: errMess
});

export const addIndividuals = individuals => ({
  type: ActionTypes.ADD_INDIVIDUALS,
  payload: individuals
});
