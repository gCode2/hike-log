import type { SearchbarProps } from "../../../types/types";

function Searchbar({searchText, changeHandler}: SearchbarProps){

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        changeHandler(e.target.value)
    }

    return (
        <>
            <div>
                <input type="text" className="border-1 border-zinc-100 rounded-lg p-1" placeholder="Search your trails..." value={searchText} onChange={handleChange}/>
            </div>
        </>
    )
}
export default Searchbar;