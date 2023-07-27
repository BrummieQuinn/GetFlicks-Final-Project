// order actions
const CREATE_ORDER = 'CREATE_ORDER';
const PROCESS_ORDER = 'PROCESS_ORDER';

// This is an order action creator that creates an action for creating an order.
// It takes an 'order' object as a parameter.
// The action type is 'CREATE_ORDER'.
// The created action object has two properties: 'type' and 'order'.
// The 'type' property is set to 'CREATE_ORDER' and the 'order' property is set to the provided 'order' object.
export const createOrder = order => {
  console.log("Inside createOrder");
  console.log("order:", order);

  return {
    type: CREATE_ORDER, order
  };
}

// Define a function called processOrder without any parameters.
// This function logs a message to the console and returns an object with a property called type set to the value PROCESS_ORDER.
export const processOrder = () => {
  console.log("Inside processOrder");
  console.log("Processing order");

  return {
    type: PROCESS_ORDER
  };
}

// Define the order reducer function
export const orderReducer = (state, action) => {
  // Check the action type
  switch (action.type) {
    // If the action type is CREATE_ORDER
    case CREATE_ORDER:
      // Return the order from the action
      console.log("Inside orderReducer");
      console.log("CREATE_ORDER action type");
      console.log("action.order:", action.order);

      return action.order;

    // If the action type is PROCESS_ORDER
    case PROCESS_ORDER:
      // Handle processing the order here
      console.log("Inside orderReducer");
      console.log("PROCESS_ORDER action type");

      // Return the unchanged state
      return state;

    // For all other action types
    default:
      console.log("Inside orderReducer");
      console.log("Default action type");

      // Return the unchanged state
      return state;
  }
};

