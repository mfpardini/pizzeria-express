import { Order } from "../entity/Order";
import { ClientDto } from "./ClientDto";
import { OrderItemDto } from "./OrderItemDto";
import { OrderStatusDto } from "./OrderStatusDto";

export class OrderDto {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  client: ClientDto;
  status: OrderStatusDto;
  orderItems: OrderItemDto[];
  totalPrice?: number;

  constructor(order: Order) {
    this.id = order.id;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
    this.client = new ClientDto(order.client);
    this.status = new OrderStatusDto(order.status);
    this.orderItems = order.orderItems.map((orderItem) => {
        return new OrderItemDto(orderItem);
    });
    if (this.orderItems) {
        const prices = this.orderItems.map(item => item.item.price);
        this.totalPrice = prices.reduce((accum: number, curr: any) => accum + parseFloat(curr), 0);
    }
  }
}
