export interface Trail{
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