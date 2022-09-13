import { Item } from "../entity/Item";

export class ItemResumedDto {

    name: string;
    price: number;
    ingredients: string[];

    constructor(item: Item) {
        this.name = item.name;
        this.price = Number(item.price);
        this.ingredients = item.ingredients.map(ing => ing.name);
    }
}