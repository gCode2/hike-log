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
export const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"] as const;

export type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];

export interface HikesListProps{
    hikes: Hike[],
    hikeRemoveHandler: (id: string)=>void
}
export interface HikeProps{
    hike: Hike,
    hikeRemoveHandler: (id: string)=>void
}

export interface hikeLogState{
    hikes: Hike[],
    selectedHikeDifficulty: DifficultyLevel | "all"
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
} | {
    type: "SET_SORT",
    level: DifficultyLevel | "all"
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
export interface SearchbarProps{
    searchText: string,
    changeHandler: (text: string) => void
}
export interface FilterHandlerProps{
    levels: readonly (DifficultyLevel | "all")[],
    sortHandler: (level: DifficultyLevel | "all") => void
}