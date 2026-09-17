import './App.css'
import "tailwindcss";
import Searchbar from './components/HikeLogControllers/SearchBar.tsx/Searchbar';
import HikesList from './components/HikesList/HikesList';
import AddTrailForm from './components/AddTrailForm/AddTrailForm';
import type { Hike, HikeAction, HikeData, hikeLogState } from './types/types';
import { useEffect, useReducer, useState } from 'react';
function App() {
  const [isAddFormShown, setAddFormShown] = useState(false);

  function hikeLogReducer(state: hikeLogState, action: HikeAction){
    switch(action.type){
      case "LOAD_HIKES":
        return {...state, hikes: action.hikes}
      case "HIKE_ADD":
        return {...state, hikes: [...state.hikes, action.data]}
      case "HIKE_REMOVE":
        return {...state, hikes: state.hikes.filter(hike=>hike.id !== action.id)}
      default:
        throw Error ("Unknown action type!")
    }
  }

  const initialHikes: Hike[] = getInitialHikes();
    
  function getInitialHikes() : Hike[]{
    const saved = localStorage.getItem("hikes");
    if(!saved){
      return [];
    }
    try{
      const parsed = JSON.parse(saved);

      if(!Array.isArray(parsed)){
        return [];
      }
      return parsed.map((hike: any)=>({
        ...hike,
        date: new Date(hike.date)
      }));

    }catch(e: any){
      console.error("Couldn't load hikes list from local storage", e)
      return [];
    }
    
    
  }

  const [state, dispatch] = useReducer(hikeLogReducer, {hikes: initialHikes});
  
  useEffect(()=>{
    localStorage.setItem("hikes", JSON.stringify(state.hikes));
  }, [state.hikes])


  function handleAddFormDisplay(){
    setAddFormShown(true);
  }
  function handleAddFormHide(){
    setAddFormShown(false);
  }
  function addHikeHandler(data: HikeData){
    const newHike: Hike = {id: crypto.randomUUID(), ...data}
    dispatch({
      type: "HIKE_ADD",
      data: newHike
    })
  }
  function handleHikeRemove(id: string){
    dispatch({
      type: "HIKE_REMOVE",
      id: id
    })
  }
  return (
    <>
      <div className="app flex flex-col h-screen">
        <header className="flex flex-row w-screen px-5 items-center justify-between h-25">
          <div className="flex-col">
            <h1 className="text-5xl font-bold">
              Hikrr
            </h1>
            <span className="text-zinc-400">
              Track your mountain trails!
            </span>
          </div>
          <div className="flex px-5 gap-2 items-center">
            <button className="bg-green-600
                    hover:bg-green-700
                    text-white
                    font-bold
                    py-2 px-2
                    rounded
                    text-xs
                    hover:cursor-pointer
                    transition duration-300 ease-in-out" onClick={handleAddFormDisplay}>
                      Add a hike
            </button>
            <span>
              or
            </span>
            <Searchbar/>
          </div>
        </header>
        <div>
          <HikesList hikes={state.hikes} hikeRemoveHandler={handleHikeRemove}/>
        </div>
        {
          isAddFormShown && <AddTrailForm addFormHideHandler={handleAddFormHide} addHikeHandler={addHikeHandler}/>
        }
      </div>
    </>
  )
}

export default App
