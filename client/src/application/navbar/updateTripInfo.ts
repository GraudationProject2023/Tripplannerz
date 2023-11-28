import { Trip } from "@/domain/TripList"

export const updateTripInfo = (prevInfo: Trip, key: keyof Trip, value) => ({
    ...prevInfo,
    [key]: value,
})