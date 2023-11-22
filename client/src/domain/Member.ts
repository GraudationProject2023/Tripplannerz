import type { PreferenceName } from "@/domain/Preference"

export interface Member {
    name?: string
    gender?: string
    email?: string
    pw?: string
    types?: PreferenceName[]
}