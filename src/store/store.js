import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import persistedReducer from '../persistConfig'; // 导入使用 redux-persist 配置后的 reducer

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
