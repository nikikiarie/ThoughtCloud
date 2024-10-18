import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Register from '../pages/Register';
import Email from '../pages/Email';
import Home from '../pages/Home';
import Password from '../pages/Password';

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
                path: "",
                element: <Home/>
            }
        ]
    }
])

export default router;