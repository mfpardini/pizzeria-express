import { Request, Response } from "express";
import { GetAllPizzasService } from "../../services/item/GetAllPizzasService";

export class GetAllPizzasController {
    async handle(request: Request, response: Response) {
        const service = new GetAllPizzasService();
    
        const page = request.query.page ? parseInt(request.query.page as string) : 1;
        const limit = request.query.limit ? parseInt(request.query.limit as string) : 10;
    
        const pizzas = await service.execute(page, limit);
        return response.json({
            pizzas,
            pagination: {
                page,
                limit
            }
        });
      }
}