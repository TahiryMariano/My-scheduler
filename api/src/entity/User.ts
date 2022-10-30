import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcrypt"
import { Task } from "./Task";

@Entity()
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @IsNotEmpty()
    firstname!: string;

    @Column()
    @IsNotEmpty()
    lastname!: string;

    @Column()
    @IsEmail()
    email!: string;

    @Column()
    @IsString()
    password!: string

    @OneToMany(() => Task, (task) => task.creator)
    createdTask: Task[]

    @ManyToMany(() => Task, (task) => task.participants)
    participatedTask: Task[]

    hashPassword() {
        this.password = bcrypt.hashSync(this.password, 8)
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
        return bcrypt.compareSync(unencryptedPassword, this.password);
    }
}