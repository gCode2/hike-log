import './App.css'
import "tailwindcss";
import Searchbar from './components/HikeLogControllers/SearchBar.tsx/Searchbar';
function App() {
  

  return (
    <>
      <div className="app flex items-center h-25">
        <header className="flex flex-row w-screen px-5 items-center justify-between">
          <div className="flex-col">
            <h1 className="text-5xl font-bold">Hikerr</h1>
            <span className="text-zinc-400">Track your mountain trails!</span>
          </div>
          <div className="flex px-5">
            <Searchbar/>
          </div>
        </header>
          
        
        
      </div>
    </>
  )
}

export default App
