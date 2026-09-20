import './App.css'
import "tailwindcss";
import Searchbar from './components/HikeLogControllers/SearchBar.tsx/Searchbar';
import HikesList from './components/HikesList/HikesList';
import AddTrailForm from './components/AddTrailForm/AddTrailForm';
import type { DifficultyLevel, Hike, HikeAction, HikeData, hikeLogState, SortFields, SortOrders } from './types/types';
import { DIFFICULTY_LEVELS } from './types/types';
import { useEffect, useReducer, useState } from 'react';
import FilterHandler from './components/HikeLogControllers/FilterHandler/FilterHandler';
import SortHandler from './components/HikeLogControllers/SortHandler/SortHandler';
import HikesSummary from './components/HikesSummary/HikesSummary';
function App() {
  const [isAddFormShown, setAddFormShown] = useState(false);
  const [searchText, setSearchText] = useState("");
  function hikeLogReducer(state: hikeLogState, action: HikeAction){
    switch(action.type){
      case "LOAD_HIKES":
        return {...state, hikes: action.hikes}
      case "HIKE_ADD":
        return {...state, hikes: [...state.hikes, action.data]}
      case "HIKE_REMOVE":
        return {...state, hikes: state.hikes.filter(hike=>hike.id !== action.id)}
      case "SET_FILTER":
        return {...state, selectedHikeDifficulty: action.level}
      case "SET_SORT_ORDER":
        return {...state, sortOrder: action.order}
      case "SET_SORT_FIELD":
        return {...state, sortField: action.field}
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

    }catch(e: unknown){
      console.error("Couldn't load hikes list from local storage", e)
      return [];
    }
    
  }

  const [state, dispatch] = useReducer(hikeLogReducer, {hikes: initialHikes, selectedHikeDifficulty:"all", sortOrder: null, sortField: null});
  
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
  function handleChange(text: string){
    setSearchText(text)
  }

  const hikeDifficultyLevels = ["all", ...DIFFICULTY_LEVELS] as const;

  function handleFilter(level: DifficultyLevel | "all"){
    dispatch({
      type: "SET_FILTER",
      level: level
    })
  }
  function handleSortOrder(order: SortOrders){
    dispatch({
      type: "SET_SORT_ORDER",
      order: order
    })
  }
  function handleSortFields(field: SortFields){
    dispatch({
      type: "SET_SORT_FIELD",
      field: field
    })
  }

  const filteredHikes = state.hikes.filter(hike=>{
    const matchesLevel = state.selectedHikeDifficulty === "all" || hike.difficulty === state.selectedHikeDifficulty;

    const matchesSearch = hike.name.toLowerCase().includes(searchText.toLowerCase()) || hike.peak.toLowerCase().includes(searchText.toLowerCase())

    return matchesLevel && matchesSearch;
  })
  const filteredAndSortedHikes = [...filteredHikes].sort((a,b)=>{
    const field = state.sortField;
    const order = state.sortOrder;
    if(!field || !order) return 0;

    const modifier = order === "Asc" ? 1 : -1;
    if(field === "Date"){
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return (dateA - dateB) * modifier;
    }
    if(field === "Distance"){
        const distanceA = a.distanceKm;
        const distanceB = b.distanceKm;
        return (distanceA - distanceB) * modifier;
    }
    return 0;
  })



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
            <Searchbar searchText={searchText} changeHandler={handleChange}/>
          </div>
        </header>
        <div className="flex flex-row justify-center">
          <HikesSummary hikes={state.hikes}/>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            Filter your hikes!
          </div>
          <div>
            <FilterHandler levels={hikeDifficultyLevels} sortHandler={handleFilter}/>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div>
            Sort your hikes by:
          </div>
          <div className="flex flex-col items-center justify-center">
            <SortHandler sortOrderHandler={handleSortOrder} sortFieldHandler={handleSortFields}/>
          </div>
        </div>
        <div className="pt-2">
          <HikesList hikes={filteredAndSortedHikes} hikeRemoveHandler={handleHikeRemove}/>
        </div>
        {
          isAddFormShown && <AddTrailForm addFormHideHandler={handleAddFormHide} addHikeHandler={addHikeHandler}/>
        }
      </div>
    </>
  )
}

export default App
