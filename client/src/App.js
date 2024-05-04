import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Subject from './components/getsubject/Subject';
import Add from './components/addsubject/Add';
import Edit from './components/updateuser/Edit';

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <Subject/>,
    },
    {
      path:"/add",
      element: <Add/>,
    },
    {
      path:"/edit/:id",
      element: <Edit/>,
    },
  ])

  return (
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
