import type { HikesListProps } from "../../types/types";
import Hike from "./Hike/Hike";

function HikesList({hikes}: HikesListProps){
    return (
    <>
        <div className="flex flex-row gap-3 items-center justify-center">
            
            {hikes.length < 1 ?

                <div className="text-zinc-400">No hikes to display</div> : 
                
                hikes.map(hike=>(
                    <Hike key={hike.id} hike={hike}/>
                ))}
        </div>
    </>
    )
}
export default HikesList;