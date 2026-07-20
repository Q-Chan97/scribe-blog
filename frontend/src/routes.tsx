import App from "./App.tsx"
import SignUp from "./components/SignUp/SignUp.tsx";
import Login from "./components/Login/Login.tsx";
import Main from "./components/Main/Main.tsx";
import Blog from "./components/Blog/Blog.tsx";
import CreatePost from "./components/CreatePost/CreatePost.tsx";

import ForwardAuthenticated from "./Redirect/forwardAuth.tsx";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Main /> },
            { path: ":userId/posts/:id", element: <Blog />},
            { path: "create", element: <CreatePost />}
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