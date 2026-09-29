import { useMemo } from "react";
import type { HikesSummaryProps } from "../../types/types";

function HikesSummary({hikes}: HikesSummaryProps){
    const totalDistance = useMemo(()=>{
        return hikes.reduce((sum,hike)=>{
                return sum+=hike.distanceKm;
        }, 0)
    }, [hikes])
    const totalElevationGain = useMemo(()=>{
        return hikes.reduce((sum,hike)=>{
            return sum+=hike.elevationGainM;
        }, 0)
    }, [hikes])

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
                    Sum of distances: {totalDistance} km
                </div>
                <div>
                    Sum of elevation gain: {totalElevationGain} m
                </div>
            </div>
        </>
    )
}
export default HikesSummary;