// item actions
const SET_ITEMS = 'SET_ITEMS';
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';

// item action creators
export const setItems = items => ({
	type: SET_ITEMS,
	items,
});

export const addItem = item => ({
	type: ADD_ITEM,
	item,
});

export const removeItem = id => ({
	type: REMOVE_ITEM,
	id,
});

// Define the item reducer function
export const itemReducer = (state, action) => {
  console.log("Action:", action); // Log the action object

  switch (action.type) {
    case SET_ITEMS:
      console.log("SET_ITEMS action"); // Log the specific action type
      return action.items;

    case ADD_ITEM:
      console.log("ADD_ITEM action"); // Log the specific action type
      return [...state, action.item];

    case REMOVE_ITEM:
      console.log("REMOVE_ITEM action"); // Log the specific action type
      return state.filter(item => item.id !== action.id);

    default:
      console.log("Unrecognized action"); // Log if the action type is not recognized
      return state;
  }
};

