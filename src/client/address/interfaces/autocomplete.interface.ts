export class Autocomplete {
    predictions: Prediction[];
    status: string;
}

export class Prediction {
    description: string;
    place_id: string;
    reference: string;
    types: string[];

    constructor(description: string, place_id: string) {
        this.description = description;
        this.place_id = place_id;
    }

}
