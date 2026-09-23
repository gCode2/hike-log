import { Link, Outlet } from "react-router-dom";
import Searchbar from "../HikeLogControllers/SearchBar.tsx/Searchbar";
import type { LayoutProps } from "../../types/types";

function Layout({searchText, changeHandler}: LayoutProps){
    return(
        <>
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
            <Link to="/add" className="bg-green-600
                    hover:bg-green-700
                    text-white
                    font-bold
                    py-2 px-2
                    rounded
                    text-xs
                    hover:cursor-pointer
                    transition duration-300 ease-in-out">
                      Add a hike
            </Link>
            <span>
              or
            </span>
            <Searchbar searchText={searchText} changeHandler={changeHandler}/>
          </div>
        </header>
        
        <Outlet/>
        </>
    )
}
export default Layout;