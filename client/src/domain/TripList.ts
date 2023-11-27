export interface Trip { 
    id?: number
    uuid?: string
    title?: string
    capacity?: number
    closeRecruitDate?: number
    goingDate?: number
    comingDate?: number
    image?: string
    recruitNum?: number
    currentNum?: number
    area?: string
    sigungu?: string
}

export interface TripList {
    content?: Array<Trip>
    pageable?: {
        sort?: {
            empty?: boolean
            unsorted?: boolean
            sorted?: boolean
        }
        offset?: number
        pageSize?: number
        pageNumber?: number
        paged?: boolean
        unpaged?: boolean
    }
    last?: boolean
    totalElements?: number
    totalPages?: number
    first?: boolean
    size? :number
    number?: number
    sort?: {
        empty?: boolean
        unsorted?: boolean
    }
    numberOfElements?: number
    empty?: boolean
}