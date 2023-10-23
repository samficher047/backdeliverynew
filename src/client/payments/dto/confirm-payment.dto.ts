
import { IsNumber } from "class-validator";
export class ConfirmPaymentDto {

    @IsNumber()
    id: number;

}
