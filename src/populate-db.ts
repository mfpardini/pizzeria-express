import { AppDataSource } from "./data-source";
import { Client } from "./entity/Client";
import { Ingredient } from "./entity/Ingredient";
import { Item } from "./entity/Item";
import { ItemType } from "./entity/ItemType";
import { Order } from "./entity/Order";
import { OrderItem } from "./entity/OrderItem";
import { OrderStatus } from "./entity/OrderStatus";

AppDataSource.initialize()
  .then(async () => {
    const clientRepo = AppDataSource.getRepository(Client);

    const pizzas = [
      {
        name: "Margherita",
        price: 5,
        ingredients: ["tomato", "mozzarella"],
      },
      {
        name: "Bufala",
        price: 6,
        ingredients: ["tomato", "mozarella di bufala"],
      },
      {
        name: "Romana",
        price: 5,
        ingredients: ["tomato", "mozzarella", "anchovies", "oregano", "oil"],
      },
      {
        name: "Diavola",
        price: 7.5,
        ingredients: ["tomato", "mozzarella", "spicy salami"],
      },
      {
        name: "Pizza Bianca",
        price: 5,
        ingredients: ["mozzarella", "oregano"],
      },
    ];
    
    const itemTypeRepo = AppDataSource.getRepository(ItemType);
    const itemType = new ItemType();
    itemType.name = 'pizza';
    await itemTypeRepo.save(itemType);
    
    const itemRepo = AppDataSource.getRepository(Item);
    const ingredentRepo = AppDataSource.getRepository(Ingredient);
    
    let ingreds: string[] = [];
    pizzas.forEach((p) => {
      ingreds = ingreds.concat(p.ingredients);
    });
    const ingredients = [...new Set(ingreds)];
    
    const ingredientPromisses = ingredients.map(async (ing) => {
      const ingredient = new Ingredient();
      ingredient.name = ing;
      await ingredentRepo.save(ingredient);
    });

    await Promise.all(ingredientPromisses);
    
    const pizzaPromisses = pizzas.map(async (p) => {
      const item = new Item();
      item.name = p.name;
      item.price = p.price;
      
      let ingredients: Ingredient[] = [];
      
      const ingPromisses = p.ingredients.map(async (ing) => {
        const ingredient = await ingredentRepo.findOneBy({name: ing});
        if (!!ingredient) {
          ingredients.push(ingredient);
        }
      });

      await Promise.all(ingPromisses);
      
      item.ingredients = ingredients;
      
      item.type = itemType;
      await itemRepo.save(item);
    })

    await Promise.all(pizzaPromisses);

    const client1 = new Client()
    client1.name = 'Matheus';
    await clientRepo.save(client1);
    const client2 = new Client()
    client2.name = 'Mariana';
    await clientRepo.save(client2);
    const client3 = new Client()
    client3.name = 'Daniel';
    await clientRepo.save(client3);

    const statusRepo = AppDataSource.getRepository(OrderStatus);

    const status1 = new OrderStatus();
    status1.name = 'created';
    await statusRepo.save(status1);
    const status2 = new OrderStatus();
    status2.name = 'canceled';
    await statusRepo.save(status2);
    const status3 = new OrderStatus();
    status3.name = 'acepted';
    await statusRepo.save(status3);
    const status4 = new OrderStatus();
    status4.name = 'preparing';
    await statusRepo.save(status4);
    const status5 = new OrderStatus();
    status5.name = 'out_for_delivery';
    await statusRepo.save(status5);
    const status6 = new OrderStatus();
    status6.name = 'delivered';
    await statusRepo.save(status6);

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const orderRepo = queryRunner.manager.getRepository(Order);
      const orderItemRepo = queryRunner.manager.getRepository(OrderItem);

      /* ------------------------- */
      const order1 = new Order();
      order1.client = client1;
      order1.status = status1;
      await orderRepo.save(order1);
  
      const orderItem1 = new OrderItem();
      orderItem1.order = order1;
      orderItem1.item = await itemRepo.findOneByOrFail({id:1});
      orderItem1.quantity = 2;
      await orderItemRepo.save(orderItem1);

      /* ------------------------ */
      const order2 = new Order();
      order2.client = client3;
      order2.status = status1;
      await orderRepo.save(order2);
      
      const orderItem2 = new OrderItem();
      orderItem2.order = order2;
      orderItem2.item = await itemRepo.findOneByOrFail({id:2});
      orderItem2.quantity = 3;
      await orderItemRepo.save(orderItem2);
      
      order2.status = status3;
      await orderRepo.save(order2);
      order2.status = status4;
      await orderRepo.save(order2);
      
      const orderItem2_1 = new OrderItem();
      orderItem2_1.order = order2;
      orderItem2_1.item = await itemRepo.findOneByOrFail({id:3});
      orderItem2_1.quantity = 1;
      await orderItemRepo.save(orderItem2_1);

      /* ------------------------ */
      const order3 = new Order();
      order3.client = client2;
      order3.status = status1;
      await orderRepo.save(order3);
      
      const orderItem3 = new OrderItem();
      orderItem3.order = order1;
      orderItem3.item = await itemRepo.findOneByOrFail({id:1});
      orderItem3.quantity = 2;
      await orderItemRepo.save(orderItem3);
      
      order3.status = status2;
      await orderRepo.save(order3);

      /* ------------------------ */

      await queryRunner.commitTransaction();
    } catch (error) {
      
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    console.log('finished to populate database');

  })
  .catch((error) => console.log(error))
  .finally(() => process.exit());
