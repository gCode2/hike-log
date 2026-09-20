import type { FilterHandlerProps } from "../../../types/types";

function FilterHandler({levels, sortHandler}: FilterHandlerProps){
    return (
        <>
            <div className="flex flex-row gap-2">
                {
                    levels.map(level=>(
                        <div className="flex rounded-md py-0.5 px-2.5 border border-transparent border-1 border-zinc-100 text-sm text-white transition-all duration-300 shadow-sm hover:cursor-pointer hover:bg-zinc-700" key={level} onClick={()=>sortHandler(level)}>
                        {level}
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default FilterHandler;