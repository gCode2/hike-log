import type { HikesSummaryProps } from "../../types/types";

function HikesSummary({hikes}: HikesSummaryProps){

    function getDistanceSum(){
        return hikes.reduce((sum,hike)=>{
            return sum+=hike.distanceKm;
        }, 0)
    }
    function getElevationGainSum(){
        return hikes.reduce((sum,hike)=>{
            return sum+=hike.elevationGainM;
        }, 0)
    }


    return (
        <>
            <div className="border-1 rounded w-100 p-4 pt-2 flex flex-col justify-center items-center">
                <div>
                    <h1 className="font-bold text-xl">Hikes Summary:</h1>
                </div>
                <div>
                    Hikes count: {hikes.length}
                </div>
                <div>
                    Sum of distances: {getDistanceSum()} km
                </div>
                <div>
                    Sum of elevation gain: {getElevationGainSum()} m
                </div>
            </div>
        </>
    )
}
export default HikesSummary;