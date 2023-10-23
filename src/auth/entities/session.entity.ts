import { Column, CreateDateColumn, Entity, Index, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { User } from './user.entity';
import { Location } from "src/common/interfaces/location.interface";

@Entity()
@Unique(["user", "idDevice"])
export class Session {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('uuid')
    idDevice: string;

    @Column('text', { nullable: true, unique: true })
    tokenPush: string;

    @Column('bool', { default: false, comment: 'If true. The deliveryman wants to receive orders' })
    isOnline: boolean;

    @Column("point", { nullable: true })
    @Index({ spatial: true })
    location: Location | string;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz', onUpdate: 'CURRENT_TIMESTAMP' })
    updateAt: Date;

    @ManyToOne(
        () => User,
        (user) => user.sessions,
        { onDelete: 'CASCADE', nullable: false }
    )
    user: User;

}