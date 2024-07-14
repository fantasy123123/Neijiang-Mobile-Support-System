import { legacy_createStore } from '@reduxjs/toolkit'
import countReducer from "./count_reducer";

export default legacy_createStore(countReducer)
