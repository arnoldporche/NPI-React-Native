import * as ActionTypes from "./ActionTypes";

export const individuals = (
  state = {
    isLoading: true,
    errMess: null,
    individuals: []
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_INDIVIDUALS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        individuals: action.payload
      };

    case (ActionTypes.INDIVIDUALS_LOADING = "INDIVIDUALS_LOADING"):
      return {
        ...state,
        isLoading: true,
        individuals: []
      };

    case ActionTypes.INDIVIDUALS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload
      };

    default:
      return state;
  }
};
