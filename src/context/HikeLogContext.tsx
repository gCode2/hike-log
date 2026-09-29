import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { DIFFICULTY_LEVELS, type Hike, type HikeAction, type HikeLogContextType, type HikeLogProviderProps, type hikeLogState} from "../types/types";

export const HikeLogContext = createContext<HikeLogContextType | null>(null);

function HikeLogContextProvider({children} : HikeLogProviderProps){
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
      return parsed.map((hike: Hike)=>({
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

  const hikeDifficultyLevels = ["all", ...DIFFICULTY_LEVELS] as const;

  


  
  const filteredAndSortedHikes = useMemo(()=>{

    const filteredHikes = state.hikes.filter(hike=>{
      const matchesLevel = state.selectedHikeDifficulty === "all" || hike.difficulty === state.selectedHikeDifficulty;

      const matchesSearch = hike.name.toLowerCase().includes(searchText.toLowerCase()) || hike.peak.toLowerCase().includes(searchText.toLowerCase())

      return matchesLevel && matchesSearch;
    })

    return [...filteredHikes].sort((a,b)=>{
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
  },[state, searchText])
  
  
  

  return(
  <>
    <HikeLogContext.Provider value={{state, dispatch, searchText, setSearchText, filteredAndSortedHikes, hikeDifficultyLevels}}>
        {children}
    </HikeLogContext.Provider>
  </>
  )
}
export default HikeLogContextProvider;