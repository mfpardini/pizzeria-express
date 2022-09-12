import { AppDataSource, connectToDb } from "../../database/data-source";
import { OrderDto } from "../../dto/OrderDto";
import { Order } from "../../entity/Order";

export class GetAllOrdersService {
  async execute(page = 1, limit = 10) {
    await connectToDb();

    const repo = AppDataSource.getRepository(Order);

    const orders = await repo.find({
      relations: ["orderItems.item", "orderItems.item.type", "status", "client"],
      loadEagerRelations: true,
      skip: (page - 1) * limit,
      take: limit,
    });

    return orders.map((order) => {
      return new OrderDto(order);
    });
  }
}
