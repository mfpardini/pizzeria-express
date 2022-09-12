import { Request, Response } from "express";
import { GetOrderByIdService } from "../../services/order/GetOrderByIdService";

export class GetOrderByIdController {
  async handle(request: Request, response: Response) {
    const service = new GetOrderByIdService();

    const id = parseInt(request.params.id);

    const order = await service.execute(id);
    if (!order) {
      return response.status(404).json({
        message: 'not found'
      })
    }
    return response.json({order: order});
  }
}
