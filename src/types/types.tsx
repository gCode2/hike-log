export interface Hike{
    id: string,
    name: string,
    peak: string,
    height: number,
    date: Date,
    distanceKm: number,
    elevationGainM: number,
    difficulty: DifficultyLevel
}
export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface HikesListProps{
    hikes: Hike[],
    hikeRemoveHandler: (id: string)=>void
}
export interface HikeProps{
    hike: Hike,
    hikeRemoveHandler: (id: string)=>void
}

export interface hikeLogState{
    hikes: Hike[]
}

export type HikeAction = | {
    type: "LOAD_HIKES",
    hikes: Hike[]
} | {
    type: "HIKE_ADD",
    data: Hike
} | {
    type: "HIKE_REMOVE",
    id: string
} 

export interface AddTrailFormProps{
    addFormHideHandler: () => void,
    addHikeHandler: (hikeData: HikeData) => void
}

export interface HikeData{
    name: string,
    peak: string,
    height: number,
    date: Date,
    distanceKm: number,
    elevationGainM: number,
    difficulty: DifficultyLevel
}