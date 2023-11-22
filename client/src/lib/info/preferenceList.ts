import sight from '@/lib/image/관광지.png';
import culture from "@/lib/image/문화시설.png";
import festival from "@/lib/image/축제.png";
import surfing from "@/lib/image/서핑.png";
import hotel from "@/lib/image/호텔.png";
import shopping from "@/lib/image/쇼핑.png";
import restaurant from "@/lib/image/레스토랑.png";
import type { Preference } from '@/domain/Preference';

export const preferenceList: Preference[] = [
    { id: 1, name: "관광지", code: "SIGHTSEEING", image: sight },
    { id: 2, name: "문화시설", code: "CULTURE", image: culture },
    { id: 3, name: "축제 • 공연", code: "FESTIVAL", image: festival },
    { id: 4, name: "레포츠", code: "LEISURE", image: surfing },
    { id: 5, name: "호캉스", code: "VACATION", image: hotel },
    { id: 6, name: "쇼핑", code: "SHOPPING", image: shopping },
    { id: 7, code: "RESTAURANT", name: "맛집탐방", image: restaurant },
]