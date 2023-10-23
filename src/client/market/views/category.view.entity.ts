import { ViewColumn, ViewEntity } from "typeorm";

const query =
    `
    SELECT DISTINCT ON (ct.id) ct.id, ct.name, ct.image, s.location
	FROM public.company AS c 
    INNER JOIN public.store AS s ON s."companyId" = c.id
    INNER JOIN public.company_category AS cc ON cc."companyId" = c.id
    INNER JOIN public.category AS ct ON cc."categoryId" = ct.id;
    `
    
@ViewEntity({
    schema: 'public',
    name: 'vw_category',
    expression: query
})
export class ViewCategory {

    @ViewColumn()
    id: number;

    @ViewColumn()
    name: string;

    @ViewColumn()
    image: string;

}

