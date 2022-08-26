import { Request, Response, Router } from "express";

const router = Router();

/* 
/api/orders (list of orders)
/api/orders/:id (details of an individual order)
/api/pizzas (list of pizzas; see './backend/example-pizzas.json')
*/

router.get('/orders', (req: Request, res: Response) => {
    res.send('A LIST OF ORDERS')
});

router.get('/orders/:id', (req: Request, res: Response) => {
    res.send(`DETAIL OF ORDER: ${req.params.id}`)
});

router.get('/pizzas', (req: Request, res: Response) => {
    res.send('A LIST OF PIZZAS')
});

export default router;