import App from "./App.tsx"
import SignUp from "./components/SignUp/SignUp.tsx";
import Login from "./components/Login/Login.tsx";

import ForwardAuthenticated from "./Redirect/forwardAuth.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/signUp",
        element: <ForwardAuthenticated><SignUp /></ForwardAuthenticated>
    },
    {
        path: "/login",
        element: <ForwardAuthenticated><Login /></ForwardAuthenticated>
    },
]

export default routes;