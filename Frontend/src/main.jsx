import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx';

import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Calendar from './Pages/Calendar.jsx'
// import { AppProvider } from './Context/AppContext.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='calender' element={<Calendar />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <AppProvider> */}
      <RouterProvider router={router} />
    {/* </AppProvider> */}
  </StrictMode>,
)
