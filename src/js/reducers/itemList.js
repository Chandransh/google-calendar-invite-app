/**
 * Created by chandransh on 20/7/16.
 */
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const SEND_USER_TYPE = 'redux-form/CHANGE';

const initialState = {
  allItems: [
    {
      id: 0,
      name: 'Potato',
      type: 'grocery',
      price: 54
    },
    {
      id: 1,
      name: 'Tomato',
      type: 'grocery',
      price: 90
    },
    {
      id: 2,
      name: 'Jeans',
      type: 'clothing',
      price: 899
    },
    {
      id: 3,
      name: 'Shirt',
      type: 'clothing',
      price: 499
    },
    {
      id: 4,
      name: 'Onion',
      type: 'grocery',
      price: 60
    },
    {
      id: 5,
      name: 'Shoe',
      type: 'clothing',
      price: 1299
    },
    {
      id: 6,
      name: 'Razor',
      type: 'grooming',
      price: 99
    }
  ],
  billedItems: [],
  userType: ''
};

export default function itemList(state = initialState, action = {}) {
  switch (action.type) {
    case ADD_ITEM: {
      let addedItem = state.allItems.filter(i => i.id == action.itemId)[0];
      return {
        ...state,
        billedItems: [...state.billedItems, addedItem]
      };
    }
    case REMOVE_ITEM: {
      return {
        ...state,
        billedItems: state.billedItems.filter((item) => item.id != action.itemId)
      };
    }
    case SEND_USER_TYPE: {
      return {
        ...state,
        userType: action.value
      };
    }
    default:
      return state;
  }
}

/*action creators*/
export function addItem(itemId) {
  return {
    type: ADD_ITEM,
    itemId
  };
}
export function removeItem(itemId) {
  return {
    type: REMOVE_ITEM,
    itemId
  };
}