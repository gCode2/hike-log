import type { HikesSummaryProps } from "../../types/types";

function HikesSummary({hikes}: HikesSummaryProps){

    function getDistanceSum(){
        var sum = 0;
        hikes.map(hike=>{
            sum += hike.distanceKm;
        })
        return sum;
    }
    function getElevationGainSum(){
        var sum = 0;
        hikes.map(hike=>{
            sum += hike.elevationGainM;
        })
        return sum;
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