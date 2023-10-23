import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Store } from '../../store/entities/store.entity';

@Entity()
@Unique(["store", "day"])
export class HoursOperation {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('smallint')
    day: number;

    @Column('time', { default: '00:00:00' })
    open: string;

    @Column('time', { default: '00:00:00' })
    close: string;

    @Column('smallint', { default: -5 })
    timeZone: number;

    @ManyToOne(
        () => Store,
        (store) => store.hoursOperations,
        { onDelete: "CASCADE" }
    )
    store: Store;
}
