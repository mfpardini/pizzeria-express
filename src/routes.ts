import { Router } from "express";
import { GetAllPizzasController } from "./controllers/item/GetAllPizzasController";
import { GetAllOrdersController } from "./controllers/order/GetAllOrdersController";
import { GetOrderByIdController } from "./controllers/order/GetOrderByIdController";

const router = Router();

/* 
/api/orders (list of orders)
/api/orders/:id (details of an individual order)
/api/pizzas (list of pizzas; see './backend/example-pizzas.json')
*/

router.get('/orders', new GetAllOrdersController().handle);

router.get('/orders/:id', new GetOrderByIdController().handle);

router.get('/pizzas', new GetAllPizzasController().handle);

export default router;