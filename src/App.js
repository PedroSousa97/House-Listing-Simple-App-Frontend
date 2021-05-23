import './App.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import React from 'react'

import Home from './Pages/home'
import Create from './Pages/create'
import Header from './Components/header'

const routes = [
  {path:'/',name:'Home',Component:Home},
  {path:'/create',name:'Create',Component:Create}
]

function App() {
  return (
    <>
      <Router>
      <Header/>
      <div className="container">
        {routes.map(({name,path, Component})=>(
          <Route key={name} exact path={path} component={Component}/>
        ))}
      </div>
      </Router>
    </>
  );
}

export default App;
