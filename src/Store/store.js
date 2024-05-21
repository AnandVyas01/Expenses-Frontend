import { configureStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userDetails",
  initialState: { user: null },
  reducers: {
    setUserData(state, action) {
      state.user = action.payload;
    },
  },
});

const getStartedSlice = createSlice({
  name: "getStarted",
  initialState: { email: null, amount: null },
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setAmount(state, action){
      state.amount = action.payload
    },
  },
});

const store = configureStore({
  reducer: {
    userDetails: userSlice.reducer,
    getStarted: getStartedSlice.reducer,
  },
});

export default store;

export const { setUserData } = userSlice.actions;

export const { setEmail, setAmount } = getStartedSlice.actions;

export function getUserThunk(user) {
  return async (dispatch) => {
    const userEmail = user ? user : localStorage.getItem("userEmail");
    try {
      const response = await fetch(
        `http://localhost:3000/user/get?email=${userEmail}`
      );
      if (!response.ok) {
        throw new Error("error");
      }

      const resData = await response.json();
      const userDetails = resData.data;

      dispatch(setUserData(userDetails));
    } catch (error) {
      console.error(
        "An error occured while fetching details => " + error.message
      );
    }
  };
}
