import routes from './routes'
import {useRoutes} from "react-router-dom";
import "@arco-design/web-react/dist/css/arco.css";
import { UserProvider } from './Context/UserContext';
import {Provider} from "react-redux";
import {PersistGate} from 'redux-persist/integration/react';
import { store, persistor} from "./store/store";

function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <UserProvider>
                    <div>{useRoutes(routes)}</div>
                </UserProvider>
            </PersistGate>
        </Provider>
    );
}

export default App;
