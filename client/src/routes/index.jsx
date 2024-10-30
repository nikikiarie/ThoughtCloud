import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Register from '../pages/Register';
import Email from '../pages/Email';
import Home from '../pages/Home';
import Password from '../pages/Password';
import CreateBlog from '../pages/CreateBlog';
import UserPosts from '../pages/UserPosts';
import ViewPost from '../pages/ViewPost';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "register",
                element:  <Register/> 
            },
            {
                path: "email",
                element: <Email/> 
            },
            {
                path: "password",
                element: <Password/>
            },
            {
                path: "blog/create",
                element: <CreateBlog/>
            },
            {
                path: "",
                element: <Home/>
            },
            {
                path: "/:userId/blogs",
                element: <UserPosts/>
            },
            {
                path: "/posts/:postId",
                element: <ViewPost/>
            }
            
            
            
        ]
    }
])

export default router;