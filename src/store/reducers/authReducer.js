// Initial State
const initialState = {
  user: null,
};
// Reducers (Modifies The State And Returns A New State)
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login
    case 'LOGIN': {
      return {
        // State
        ...state,
        // Redux Store
        user: action.payload,
      };
    }
    case 'LOGOUT': {
      return {
        // State
        ...state,
        // Redux Store
        user: null,
      };
    }
    // Default
    default: {
      return state;
    }
  }
};
// Exports
export default authReducer;
