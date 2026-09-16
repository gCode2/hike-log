export interface Hike{
    id: string,
    peak: string,
    height: number,
    date: Date,
    distanceKm: number,
    elevationGainM: number,
    diffuculty: DifficultyLevel,
    notes?: string
}
export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface TrailsListProps{
    hikes: Hike[]
}
export interface TrailProps{
    hike: Hike
}