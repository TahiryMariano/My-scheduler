import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { priority } from "./Priority";
import { User } from "./User";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        length: 100
    })
    name!: string

    @Column("text")
    description!: string

    @ManyToOne(() => User, (user) => user.createdTask, { cascade: true, eager: true })
    @JoinColumn()
    creator!: User

    @ManyToMany(() => User, (user) => user.participatedTask, {
        nullable: true,
        eager: true
    })
    @JoinTable()
    participants!: User[]

    @Column()
    startDate!: Date

    @Column()
    endDate!: Date

    @Column({ default: "MEDIUM" })
    priority!: priority

    @Column()
    beforeStartingNotificationTime!: number
}