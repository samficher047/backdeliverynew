import { Type } from "class-transformer";
import { IsIn, IsNumber, IsObject, IsString, MinLength, ValidateNested } from "class-validator";
import { Store } from "src/admin/store/entities/store.entity";

export class CreateHoursOperationDto {

    @IsNumber()
    @IsIn([1, 2, 3, 4, 5, 6, 0])
    day: number;

    @IsString()
    @MinLength(8)
    open: string;

    @IsString()
    @MinLength(8)
    close: string;

    @IsObject()
    @ValidateNested()
    @Type(() => Store)
    store: Store;

}
