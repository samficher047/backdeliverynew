
import { IsLatitude, IsLongitude } from "class-validator";

export class Location {
    @IsLatitude()
    x: number;

    @IsLongitude()
    y: number;


    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
