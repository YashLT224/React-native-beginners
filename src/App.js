import axios from 'axios';
import React ,{useState} from 'react';
import Axios from 'axios';
import Recipe from './components/recipe';
import Alert from './components/alert';
import { v4 as uuidv4 } from "uuid";
import './App.css'
const App = () => {


  const [query,setQuery]=useState("");
  const [recipes,setRecipes]=useState([]);
  const [alert,setAlert]=useState("");

  const APP_ID="0a4d3d96";
  const APP_KEY="8889bfac86e0563cdc79255aa830fe06";
  const url=`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData=async()=>{
    if(query!==""){
      const results=await Axios.get(url);
      if(!results.data.more){
        return setAlert("no Food with this name")
      }
      setRecipes(results.data.hits);
      console.log(results.data.hits);
      console.log(recipes);
     setAlert("");//
      setQuery("");
    }
    else{
      setAlert("please fill the form");
    }


  }

  const onSubmit=(e)=>{
    e.preventDefault();
    getData();
  }

  const onChange=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <div className='App'>
     <h1>Receipe Finder</h1>
     <form className="search-form" onSubmit={onSubmit}> 
     {alert!=""&&<Alert alert={alert}/>}
       <input type="text" placeholder="Search Food" value={query} onChange={onChange} autoComplete="off"/>
       <input type="submit" value="search"/>
     </form>
     <div className="recipes">
       {recipes!==[]&&recipes.map(recipe=><Recipe key={uuidv4()} recipe={recipe}/>)}
     </div>
    </div>
  )
}

export default App
