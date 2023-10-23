export declare class Autocomplete {
    predictions: Prediction[];
    status: string;
}
export declare class Prediction {
    description: string;
    place_id: string;
    reference: string;
    types: string[];
    constructor(description: string, place_id: string);
}
