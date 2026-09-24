import './App.css'
import "tailwindcss";
import HikesList from './components/HikesList/HikesList';
import type { DifficultyLevel, Hike as HikeType, HikeAction, HikeData, hikeLogState, SortFields, SortOrders, Hike } from './types/types';
import { DIFFICULTY_LEVELS } from './types/types';
import { useEffect, useReducer, useState } from 'react';
import FilterHandler from './components/HikeLogControllers/FilterHandler/FilterHandler';
import SortHandler from './components/HikeLogControllers/SortHandler/SortHandler';
import HikesSummary from './components/HikesSummary/HikesSummary';
import { Route, Routes } from 'react-router-dom';
import HikeDetails from './components/HikeDetails/HikeDetails';
import Layout from './components/Layout/Layout';
import HikeForm from './components/HikeForm/HikeForm';

function App() {
  const [searchText, setSearchText] = useState("");
  function hikeLogReducer(state: hikeLogState, action: HikeAction){
    switch(action.type){
      case "HIKE_ADD":
        return {...state, hikes: [...state.hikes, action.data]}
      case "HIKE_REMOVE":
        return {...state, hikes: state.hikes.filter(hike=>hike.id !== action.id)}
      case "HIKE_EDIT":
        return {...state, 
          hikes: state.hikes.map(
            hike=>hike.id===action.data.id ? action.data : hike
          )}
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

  const initialHikes: HikeType[] = getInitialHikes();

  function getInitialHikes() : HikeType[]{
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

  function addHikeHandler(data: HikeData){
    const newHike: HikeType = {id: crypto.randomUUID(), ...data}
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
        const dateA = a.date.getTime();
        const dateB = b.date.getTime();
        return (dateA - dateB) * modifier;
    }
    if(field === "Distance"){
        const distanceA = a.distanceKm;
        const distanceB = b.distanceKm;
        return (distanceA - distanceB) * modifier;
    }
    return 0;
  })

  function editHikeHandler(id: string, data: HikeData){
    const newHike: Hike = {...data, id: id};
    dispatch({
      type: "HIKE_EDIT",
      data: newHike
    })
  }

  return (
    <>
      <div className="app flex flex-col h-screen">
        
        <Routes>
          <Route element={<Layout searchText={searchText} changeHandler={handleChange}/>}>
            <Route path="/" element={
            <>
              <div className="flex flex-row justify-center">
                <HikesSummary hikes={state.hikes}/>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div>
                  Filter your hikes!
                </div>
                <div>
                  <FilterHandler levels={hikeDifficultyLevels} filterHandler={handleFilter}/>
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
            </>
          }/>
          <Route path="/add" element={
            <HikeForm action={"Add"} hikes={state.hikes} addHikeHandler={addHikeHandler} editHikeHandler={editHikeHandler}/>
          }/>
          <Route path="/hikes/:id"  element={
            <HikeDetails hikes={state.hikes}/>
          }/>
          <Route path="/hikes/:id/edit" element={
            <HikeForm action={"Edit"} hikes={state.hikes}  addHikeHandler={addHikeHandler} editHikeHandler={editHikeHandler}/>
          }/>
          </Route>
          
        </Routes>
      </div>
    </>
  )
}

export default App
