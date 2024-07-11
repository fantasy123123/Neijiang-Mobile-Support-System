import routes from './routes'
import {useRoutes} from "react-router-dom";
import "@arco-design/web-react/dist/css/arco.css";
import { UserProvider } from './Context/UserContext';

function App() {
  return (
    <UserProvider>
      <div>{useRoutes(routes)}</div>
    </UserProvider>
  );
}

export default App;
