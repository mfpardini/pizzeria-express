import { Item } from "../entity/Item";

export class ItemDto {
    type: string;
    name: string;
    price: number;

    constructor(item: Item) {
        this.type = item.type.name;
        this.name = item.name;
        this.price = item.price;
    }
}