import { Client } from "../entity/Client";

export class ClientDto {
    id: number;
    name: string;

    constructor(client: Client) {
        this.id = client.id;
        this.name = client.name;
    }
}