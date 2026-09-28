import './App.css'
import "tailwindcss";
import HikesList from './components/HikesList/HikesList';
import FilterHandler from './components/HikeLogControllers/FilterHandler/FilterHandler';
import SortHandler from './components/HikeLogControllers/SortHandler/SortHandler';
import HikesSummary from './components/HikesSummary/HikesSummary';
import { Route, Routes } from 'react-router-dom';
import HikeDetails from './components/HikeDetails/HikeDetails';
import Layout from './components/Layout/Layout';
import HikeForm from './components/HikeForm/HikeForm';
import useHikeLog from './hooks/useHikeLog';

function App() {
  const {state, dispatch, searchText, setSearchText, filteredAndSortedHikes, hikeDifficultyLevels} = useHikeLog();

  return (
    <>
      <div className="app flex flex-col h-screen">
        
        <Routes>
          <Route element={<Layout searchText={searchText} changeHandler={setSearchText}/>}>
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
                  <FilterHandler levels={hikeDifficultyLevels} filterHandler={level => dispatch({type:"SET_FILTER", level})}/>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <div>
                  Sort your hikes by:
                </div>
                <div className="flex flex-col items-center justify-center">
                  <SortHandler sortOrderHandler={order => dispatch({type:"SET_SORT_ORDER", order:order})} sortFieldHandler={field => dispatch({type:"SET_SORT_FIELD", field: field})}/>
                </div>
              </div>
              <div className="pt-2">
                <HikesList hikes={filteredAndSortedHikes}/>
              </div>
            </>
          }/>
          <Route path="/add" element={
            <HikeForm action={"Add"} 
            addHikeHandler={data=>
              dispatch(
                {type:"HIKE_ADD", 
                data:{id: crypto.randomUUID(), ...data}}
              )} 
            editHikeHandler={(id, data) => dispatch({
              type: "HIKE_EDIT",
              data: {...data, id: id}
            })}/>
          }/>
          <Route path="/hikes/:id"  element={
            <HikeDetails/>
          }/>
          <Route path="/hikes/:id/edit" element={
            <HikeForm action={"Edit"}
            addHikeHandler={data=>
              dispatch(
                {type:"HIKE_ADD", 
                data:{id: crypto.randomUUID(), ...data}}
              )} 
              editHikeHandler={(id, data) => dispatch({
              type: "HIKE_EDIT",
              data: {...data, id: id}
              })}/>
          }/>
          </Route>
          
        </Routes>
      </div>
    </>
  )
}

export default App
