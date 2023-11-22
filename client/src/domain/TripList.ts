export interface Trip { 
    id: number
    uuid: string
    title?: string
    startingDate?: number
    comingDate?: number
    imagePath?: string
    recruitNum?: number
    currentNum?: number
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