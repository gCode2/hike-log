import type { SortHandlerProps } from "../../../types/types";

function SortHandler({sortOrderHandler, sortFieldHandler}: SortHandlerProps){
    return (
        <>
        <div className="flex flex-row gap-2">
            <div className="flex rounded-md py-0.5 px-2.5 border border-transparent border-1 border-zinc-100 text-sm text-white transition-all duration-300 shadow-sm hover:cursor-pointer hover:bg-zinc-700" onClick={()=>sortFieldHandler("Date")}>
                Date
            </div>
            <div className="flex rounded-md py-0.5 px-2.5 border border-transparent border-1 border-zinc-100 text-sm text-white transition-all duration-300 shadow-sm hover:cursor-pointer hover:bg-zinc-700" onClick={()=>sortFieldHandler("Distance")}>
                Distance
            </div>
        </div>
        <div>
            Order:
        </div>
        <div className="flex flex-row gap-2">
            <div className="flex rounded-md py-0.5 px-2.5 border border-transparent border-1 border-zinc-100 text-sm text-white transition-all duration-300 shadow-sm hover:cursor-pointer hover:bg-zinc-700" onClick={()=>sortOrderHandler("Asc")}>
                Asc
            </div>
            <div className="flex rounded-md py-0.5 px-2.5 border border-transparent border-1 border-zinc-100 text-sm text-white transition-all duration-300 shadow-sm hover:cursor-pointer hover:bg-zinc-700" onClick={()=>sortOrderHandler("Desc")}>
                Desc
            </div>
        </div>

        </>
    )
}
export default SortHandler;