import type { HikesListProps } from "../../types/types";
import Hike from "./Hike/Hike";

function HikesList({hikes}: HikesListProps){
    return (
    <>
        <div className="flex flex-row gap-3 items-center justify-center">
            {hikes.map(hike=>(
                <Hike key={hike.id} hike={hike}/>
            ))}
        </div>
    </>
    )
}
export default HikesList;