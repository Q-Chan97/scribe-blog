import App from "./App.tsx"
import SignUp from "./components/SignUp/SignUp.tsx";
import Login from "./components/Login/Login.tsx";
import Main from "./components/Main/Main.tsx";
import CreatePost from "./components/CreatePost/CreatePost.tsx";
import UserPage from "./components/UserPage/UserPage.tsx";

import ForwardAuthenticated from "./Redirect/forwardAuth.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Main /> },
            { path: "create", element: <CreatePost />},
            {
                path: ":userId",
                children: [
                    { index: true, element: <UserPage /> },
                    { path: "posts/newest", element: <UserPage /> },
                    { path: "posts/:id", element: <UserPage />}
                ]
            }
        ]
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