import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./Ingredient";
import { ItemType } from "./ItemType";
import { OrderItem } from "./OrderItem";

@Entity()
export class Item {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ItemType, type => type.itens)
    @JoinColumn()
    type: ItemType;

    @Column()
    name: string;

    @Column({type: 'decimal'})
    price: number;

    @OneToMany(() => OrderItem, orderItem => orderItem.item)
    orderItems: OrderItem[];

    @ManyToMany(() => Ingredient)
    @JoinTable({name: 'item_ingredients'})
    ingredients: Ingredient[];

}
