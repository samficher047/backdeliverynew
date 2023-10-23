import { MinLength } from "class-validator";

export class CreateCategoryDto {

    @MinLength(7)
    name: string;

    @MinLength(7)
    image: string;
}
