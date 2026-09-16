import './App.css'
import "tailwindcss";
import Searchbar from './components/HikeLogControllers/SearchBar.tsx/Searchbar';
import HikesList from './components/HikesList/HikesList';
import AddTrailForm from './components/AddTrailForm/AddTrailForm';
function App() {
  

  // function loadTrails(){
  //   const trails = localStorage.getItem("trails");
  // }

  

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
          <HikesList/>
        </div>
        {/* <AddTrailForm/> */}
        
      </div>
    </>
  )
}

export default App
