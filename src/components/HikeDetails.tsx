import { useParams } from "react-router-dom";
import type { HikeDetailsProps } from "../types/types";

function HikeDetails({hikes}:HikeDetailsProps){
    
    const {id} = useParams();

    const hikeToDisplay=hikes.find(hike=>hike.id === id);

    return (
        <>
            {hikeToDisplay ? 
            <div>
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