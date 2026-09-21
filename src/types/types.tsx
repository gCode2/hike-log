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
    selectedHikeDifficulty: DifficultyLevel | "all",
    sortOrder: SortOrders | null,
    sortField: SortFields | null;
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
    type: "SET_FILTER",
    level: DifficultyLevel | "all"
} | {
    type: "SET_SORT_ORDER",
    order: SortOrders
} | {
    type: "SET_SORT_FIELD",
    field: SortFields
}

export interface AddTrailFormProps{
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
    filterHandler: (level: DifficultyLevel | "all") => void
}

export type SortFields = "Date" | "Distance";
export type SortOrders = "Asc" | "Desc";

export interface SortHandlerProps{
    sortOrderHandler: (order: SortOrders) => void;
    sortFieldHandler: (field: SortFields) => void;
}
export interface HikesSummaryProps{
    hikes: Hike[]
}