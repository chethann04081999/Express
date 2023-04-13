import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm"

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    age: number

    @Column()
    email:string
}
