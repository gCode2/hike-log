export interface Hike{
    id: string,
    name: string,
    peak: string,
    height: number,
    date: Date,
    distanceKm: number,
    elevationGainM: number,
    diffuculty: DifficultyLevel
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
    type: "Y",
} 