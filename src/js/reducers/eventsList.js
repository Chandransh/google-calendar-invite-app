/**
 * Created by chandransh on 29/11/16.
 */
export const UPDATE_SUCCESS = 'UPDATE_SUCCESS';

const initialState = {
  data: [],
  loaded: false
};

export default function eventsList(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SUCCESS: {
      return {
        ...state,
        loaded: true,
        data: action.data
      };
    }
    default:
      return state;
  }
}

export function updateState(data) {
  return {
    type: UPDATE_SUCCESS,
    data
  }
}