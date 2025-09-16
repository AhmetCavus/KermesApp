export default class OrderIdService {
  private static instance: OrderIdService;
  private currentId: number;

  private constructor() {
    this.currentId = 0;
  }

  public static getInstance(): OrderIdService {
    if (!OrderIdService.instance) {
      OrderIdService.instance = new OrderIdService();
    }
    return OrderIdService.instance;
  }

  public createNextId(): string {
    this.currentId += 1;
    return `MEI-${this.currentId.toFixed(0).padStart(4, "0")}`;
  }
} 