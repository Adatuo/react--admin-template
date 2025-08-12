import { createBrowserRouter,Navigate} from "react-router-dom";
import { lazy } from "react";
import Login from "../pages/login/login";

const Main = lazy(() => import('../pages/main'))
const Home = lazy(() => import('../pages/home'))
const Mall = lazy(() => import('../pages/mall'))
const User = lazy(() => import('../pages/user'))
const PageOne = lazy(() => import('../pages/other/pageOne'))
const PageTwo = lazy(() => import('../pages/other/pageTwo'))

const routes = createBrowserRouter([{
  path: '/',
  Component: Main,
  children: [
    //重定向
    {
      path:'/',
      element:<Navigate to="/home" replace />
    },
    {
      path: 'home',
      Component: Home
    },
    {
      path: 'mall',
      Component: Mall
    },
    {
      path: 'user',
      Component: User,
    },
    {
      path: 'other',
      children: [
        {
          path: 'pageOne',
          Component: PageOne
        },
        {
          path: 'pageTwo',
          Component: PageTwo
        }
      ]
    }
  ]
},
  {
    path: '/login',
    Component: Login
  },
])

export default routes