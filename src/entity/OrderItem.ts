import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";
import { Order } from "./Order";


@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn({name: 'order_item_id'})
    orderItemId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, (order) => order.orderItems)
    @JoinColumn()
    order: Order;

    @ManyToOne(() => Item, (item) => item.orderItems)
    @JoinColumn()
    item: Item;

}