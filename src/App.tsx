import './App.css'
import "tailwindcss";
import Searchbar from './components/HikeLogControllers/SearchBar.tsx/Searchbar';
import HikesList from './components/HikesList/HikesList';
import AddTrailForm from './components/AddTrailForm/AddTrailForm';
import type { Hike, HikeAction, hikeLogState } from './types/types';
import { useEffect, useReducer } from 'react';
function App() {
  

  // function loadTrails(){
  //   const trails = localStorage.getItem("trails");
  // }
  const testHikes: Hike[] = [
    {
          id: "ddd",
          name: "Red trail to Rysy",
          peak: "Rysy",
          height: 2499,
          date: new Date(),
          distanceKm: 13.5,
          elevationGainM: 1670,
          diffuculty: "Medium"
    },
    {
          id: "aaa",
          name: "Easy hike - green trail",
          peak: "Radziejowa",
          height: 1266.5,
          date: new Date(),
          distanceKm: 10.3,
          elevationGainM: 450,
          diffuculty: "Easy",
    }
  ]

  function hikeLogReducer(state: hikeLogState, action: HikeAction){
    switch(action.type){
      case "LOAD_HIKES":
        return {...state, hikes: action.hikes}
      default:
        throw Error ("Unknown action type!")
    }
  }

  function loadHikes(hikes: Hike[]){
    dispatch({
      type: "LOAD_HIKES",
      hikes: hikes
    })
  }

  useEffect(()=>{
    loadHikes(testHikes);
  },[])
  
  const [state, dispatch] = useReducer(hikeLogReducer, {hikes: []})

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
          <div className="flex px-5">
            <Searchbar/>
          </div>
        </header>
        <div>
          <HikesList hikes={state.hikes}/>
        </div>
        {/* <AddTrailForm/> */}
        
      </div>
    </>
  )
}

export default App
