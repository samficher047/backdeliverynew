export interface Geocode {
    results: Result[];
    status: string;
}

export interface Result {
    geometry: Geometry;
}

export interface Geometry {
    location: Location;
    location_type: string;
}

export interface Location {
    lat: number;
    lng: number;
}
