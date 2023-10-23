import { ViewColumn, ViewEntity } from "typeorm";

const query =
    `
    SELECT p.id, p."companyId", cc.name AS "companyName", p.name, p.image, p.description, p.type, p.price
	FROM public.product AS p
    INNER JOIN public.company AS cc ON cc.id = p."companyId"
    `

@ViewEntity({
    schema: 'public',
    name: 'vw_product',
    expression: query
})
export class ViewProduct {

    @ViewColumn()
    id: number;

    @ViewColumn({ name: 'companyId' })
    companyId: number;

    @ViewColumn({ name: 'companyName' })
    companyName: string;

    @ViewColumn()
    name: string;

    @ViewColumn()
    description: string;

    @ViewColumn()
    type: number;

    @ViewColumn()
    price: number;

    @ViewColumn()
    image: string;

}
