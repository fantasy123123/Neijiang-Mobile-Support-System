import routes from './routes'
import {useRoutes} from "react-router-dom";
import "@arco-design/web-react/dist/css/arco.css";

function App() {
  return (
    <div>{useRoutes(routes)}</div>
  );
}

export default App;
