class ProductList {
    count: number
    _id: string|number;
}

export class CreateTransactionDto {
    products: [ProductList];
    total: number;
}
