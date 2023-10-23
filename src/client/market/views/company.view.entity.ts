import { Location } from "src/common/interfaces/location.interface";
import { ViewColumn, ViewEntity } from "typeorm";

const query =
    `
    SELECT c.id, s.id AS "storeId", s.name, s.address, s.contact, c.image, s.location, 
    cc."categoryId", ho.open, ho.close, ho."day", 
    ( (NOW() + ("timeZone" ||' H')::INTERVAL)::TIME > ho.open AND  (NOW() + ("timeZone" ||' H')::INTERVAL)::TIME < ho.close) AS "isOpen"
	FROM public.company AS c 
    INNER JOIN public.company_category AS cc ON cc."companyId" = c.id
    INNER JOIN public.store AS s ON s."companyId" = c.id
    INNER JOIN public.hours_operation AS ho ON ho."storeId" = s.id AND ho.day = EXTRACT(DOW FROM (NOW() + ("timeZone" ||' H')::INTERVAL));
    `

@ViewEntity({
    schema: 'public',
    name: 'vw_company',
    expression: query
})
export class ViewCompany {

    @ViewColumn()
    id: number;

    @ViewColumn()
    storeId: number;

    @ViewColumn()
    isOpen: boolean;

    @ViewColumn()
    name: string;

    @ViewColumn()
    address: string;

    @ViewColumn()
    contact: string;

    @ViewColumn()
    image: string;

    @ViewColumn()
    open: string;

    @ViewColumn()
    close: string;

    @ViewColumn()
    categoryId: string;

    @ViewColumn()
    location: Location;
}
