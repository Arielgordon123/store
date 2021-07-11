import { Entity, ObjectIdColumn, Column } from 'typeorm';
import {ObjectID} from 'mongodb'
@Entity()
export class Product {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    name: string;
    
    @Column()
    price: number;
    
    @Column()
    desc: string;
    
    @Column()
    imageUrl: string;
}
