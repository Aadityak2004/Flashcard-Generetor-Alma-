import { combineReducers } from "redux";
import flashCardReducers from "./flashCardReducers";


const rootReducer = combineReducers({
    flashCardReducers:flashCardReducers,
})

export default rootReducer;