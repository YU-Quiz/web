import { createBrowserRouter } from "react-router-dom";
import Root from "../pages/Root";

const router = createBrowserRouter([
  {
    path: '/', 
    element: <Root />,    // Root 컴포넌트
  },
]);

export default router;
