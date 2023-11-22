export type PreferenceName = "관광지" | "문화시설" | "축제 • 공연" | "레포츠" | "호캉스" | "쇼핑" | "맛집탐방" 
export type PreferenceCode = "SIGHTSEEING" | "CULTURE" | "FESTIVAL" | "LEISURE" | "VACATION" | "SHOPPING" | "RESTAURANT"

export interface Preference {
    id: number,
    name: PreferenceName,
    code: PreferenceCode,
    image: string
}