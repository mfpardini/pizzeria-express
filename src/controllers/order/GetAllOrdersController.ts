import { Request, Response } from "express";
import { GetAllOrdersService } from "../../services/order/GetAllOrdersService";

export class GetAllOrdersController {
  async handle(request: Request, response: Response) {
    const service = new GetAllOrdersService();

    const page = request.query.page ? parseInt(request.query.page as string) : 1;
    const limit = request.query.limit ? parseInt(request.query.limit as string) : 10;

    const orders = await service.execute(page, limit);
    return response.json({
        orders,
        pagination: {
            page,
            limit
        }
    });
  }
}
