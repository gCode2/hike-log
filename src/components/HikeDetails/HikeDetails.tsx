import { Link, useParams } from "react-router-dom";
import type { HikeDetailsProps } from "../../types/types";
import useHikeLog from "../../hooks/useHikeLog";


function HikeDetails({}:HikeDetailsProps){
    const {id} = useParams();
    const context = useHikeLog();
    const hikeToDisplay=context.state.hikes.find(hike=>hike.id === id);

    return (
        <>
            {hikeToDisplay ? 
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-row justify-center items-center">
                    <span className="text-2xl font-bold">Hike details</span>
                </div>
                <div>
                    Hike name: {hikeToDisplay.name}
                </div>
                <div>
                    Mountain name: {hikeToDisplay.peak}
                </div>
                <div>
                    Mountain height: {hikeToDisplay.height} m
                </div>
                <div>
                    Hike date: {hikeToDisplay.date.toLocaleDateString()}
                </div>
                <div>
                    Hike distance: {hikeToDisplay.distanceKm} km
                </div>
                <div>
                    Elevation gain: {hikeToDisplay.elevationGainM} m
                </div>
                <div>
                    Difficulty: {hikeToDisplay.difficulty}
                </div>
                <div className="flex flex-row gap-2 py-2">
                    <Link to={`/hikes/${hikeToDisplay.id}/edit`} className="bg-zinc-500
                    hover:bg-zinc-600
                    text-white
                    font-bold
                    py-0.5 px-2
                    rounded
                    text-xs
                    hover:cursor-pointer
                    transition duration-300 ease-in-out">
                        Edit
                    </Link>
                    <Link to="/" className="
                    hover:bg-zinc-600
                    border-1
                    text-white
                    font-bold
                    py-0.5 px-2
                    rounded
                    text-xs
                    hover:cursor-pointer
                    transition duration-300 ease-in-out">
                        Home
                    </Link>
                </div>
            </div>
            : 
            <div className="flex flex-row justify-center items-center">
                <span className="text-2xl font-bold">No hikes found :(</span>
            </div>
            }
        </>
    )
}
export default HikeDetails;