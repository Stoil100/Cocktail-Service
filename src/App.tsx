import React,{useState,useEffect} from "react";
import { CocktailList } from "./components/Homepage";

function App() {
  const[todos,setTodos]=useState<[]>();

  return (
    <div>
      <CocktailList/>
    </div>
  );
}

export default App;
