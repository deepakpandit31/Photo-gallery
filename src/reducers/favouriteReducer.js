export const favouriteReducer = (state, action) => {

  switch (action.type) {

    case "TOGGLE_FAV":

      const exists = state.includes(action.payload);

      if (exists) {
        return state.filter(id => id !== action.payload);
      }

      return [...state, action.payload];

    default:
      return state;

  }
};