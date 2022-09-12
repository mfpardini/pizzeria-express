import { OrderStatus } from "../entity/OrderStatus";

export class OrderStatusDto {

    id: number;
    name: string;

    constructor(status: OrderStatus) {
        this.id = status.id;
        this.name = status.name;
    }
}