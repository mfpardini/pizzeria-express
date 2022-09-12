import { AppDataSource, connectToDb } from "../../database/data-source";
import { OrderDto } from "../../dto/OrderDto";
import { Order } from "../../entity/Order";

export class GetOrderByIdService {
  async execute(id: number) {
    await connectToDb();

    const repo = AppDataSource.getRepository(Order);

    const order = await repo.findOne({
      where: {id: id},
      relations: ["orderItems.item", "orderItems.item.type", "status", "client"],
    });

    if (order) {
      return new OrderDto(order);
    }

    return null;

  }
}
