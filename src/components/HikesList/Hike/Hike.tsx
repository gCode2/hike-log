import type { HikeProps } from "../../../types/types";

function Hike({hike}: HikeProps){
    return (
    <>
        <div className="w-50 h-50 border-1 rounded-lg flex flex-col items-center justify-between">
            <div className="flex flex-col items-center gap-0">
                <div className="font-bold flex pt-1">
                    {hike.peak}
                </div>
                <div className="text-xs text-zinc-500">
                    {hike.name}
                </div>
            </div>
            
            <div>
                Height: {hike.height} m n.p.m.
            </div>
            <div>
                Distance: {hike.distanceKm} km
            </div>
            <div>
                Elevation Gain: {hike.elevationGainM} m
            </div>
            <div>
                Difficulty: {hike.difficulty}
            </div>
            <div>
                Date: {hike.date.toLocaleDateString()}
            </div>
            <div className="text-zinc-700 flex flex-row w-full justify-center px-3 py-1 items-center">
                <div>
                    <button className="bg-red-500
                    hover:bg-red-700
                    text-white
                    font-bold
                    py-0.5 px-2
                    rounded
                    text-xs
                    hover: cursor-pointer
                    transition duration-300 ease-in-out">
                        Remove
                    </button>
                </div>
            </div>
            
        </div>
    </>
    )
}
export default Hike;