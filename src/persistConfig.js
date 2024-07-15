import storage from 'redux-persist/lib/storage'; // 默认使用 localStorage 作为存储引擎
import { persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import articleReducer from './store/articleSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['article'], // 需要持久化的 reducer 名称
};

const rootReducer = combineReducers({
    article: articleReducer,
    // 可以添加其他的 reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
