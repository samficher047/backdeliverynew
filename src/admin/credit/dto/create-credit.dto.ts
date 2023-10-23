import { IsPositive, IsString, MinLength } from "class-validator";

export class CreateCreditDto {

    @IsPositive()
    amount: number;

    @IsString()
    @MinLength(8)
    phone: string;
}
