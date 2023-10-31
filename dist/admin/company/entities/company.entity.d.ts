import { Product } from 'src/admin/product/entities/product.entity';
import { Store } from 'src/admin/store/entities/store.entity';
import { CompanyCategory } from 'src/admin/company-category/entities/company-category.entity';
import { Location } from 'src/common/interfaces/location.interface';
import { User } from 'src/auth/entities/user.entity';
export declare class Company {
    id: number;
    name: string;
    address: string;
    contact: string;
    image: string;
    marker: string;
    email: string;
    location: Location | string;
    createdAt: Date;
    updatedAt: Date;
    checkLocation(): void;
    user: User;
    products?: Product[];
    stores?: Store[];
    categories?: CompanyCategory[];
}
