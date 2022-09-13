import { AppDataSource, connectToDb } from "../../database/data-source";
import { ItemResumedDto } from "../../dto/ItemResumedDto";
import { Item } from "../../entity/Item";

export class GetAllPizzasService {
  async execute(page = 1, limit = 10) {
    await connectToDb();

    const repo = AppDataSource.getRepository(Item);

    const pizzas = await repo.find({
      where: {
        type: {
          name: "pizza",
        },
      },
      relations: ["ingredients"],
      skip: (page - 1) * limit,
      take: limit,
      order: { name: "ASC" },
    });

    return pizzas.map((pizza) => {
      return new ItemResumedDto(pizza);
    });
  }
}
