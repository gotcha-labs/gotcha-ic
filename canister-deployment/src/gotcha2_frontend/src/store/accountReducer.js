// action - state management
import { LOGIN, LOGOUT, REGISTER } from "./actions";

// ==============================|| ACCOUNT REDUCER ||============================== //

const accountReducer = (state, action) => {
  switch (action.type) {
    case REGISTER: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    case LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isLoggedIn: true,
        isInitialized: true,
        user,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        isInitialized: false,
        user: null,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default accountReducer;
