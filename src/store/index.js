import { configureStore } from "@reduxjs/toolkit";
import auth from "./auth";
import cardReducers from "./cardReducers";

const store = configureStore({
    reducer: {
        auth,
        cardReducers,
    }
})

export default store