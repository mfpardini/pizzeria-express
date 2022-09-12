import { OrderItem } from "../entity/OrderItem";
import { ItemDto } from "./ItemDto";

export class OrderItemDto {
    quantity: number;
    item: ItemDto;

    constructor(orderItem: OrderItem) {
        this.quantity = orderItem.quantity;
        this.item = new ItemDto(orderItem.item);
    }
}