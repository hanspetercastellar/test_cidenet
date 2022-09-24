import { configureStore  } from '@reduxjs/toolkit'
import reducer from './reducers/reducers'
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from 'redux-saga'
import sagas from './sgas/saga';
import {
    persistStore,
    persistReducer,
} from "redux-persist";

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (middlewareDefault) => middlewareDefault({thunk: false,serializableCheck: false}).concat(sagaMiddleware)
})

sagaMiddleware.run(sagas)

export let persistor = persistStore(store);
export default store