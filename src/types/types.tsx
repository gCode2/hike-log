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
    hikes: Hike[]
}
export interface HikeProps{
    hike: Hike
}

export interface hikeLogState{
    hikes: Hike[]
}

export type HikeAction = | {
    type: "LOAD_HIKES",
    hikes: Hike[]
} | {
    type: "ADD_HIKE",
    data: Hike
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