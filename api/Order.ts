export interface Result {
    code: number;
    data: string;
    message: string;
    [property: string]: any;
}

export interface CreateOrderForm {
    userID: number;
    orderType: 'product' | 'venue';
    relatedID: Number;
    totalAmount: Number;
    orderDate: Date;
    status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
}

/**
 * 创建订单
 * @param data 订单信息
 */
export function create(data: CreateOrderForm) {
    return useAxios().post<Result>('/order/add', data);
}

/**
 * 修改订单
 * @param orderID 订单ID
 * @param data 订单信息
 */
export function update(orderID: string | number, data: CreateOrderForm) {
    return useAxios().put<Result>('/order/update', { orderID, ...data });
}

/**
 * 删除订单
 * @param id 订单ID
 */
export function del(id: string | number) {
    return useAxios().delete('/order/delete/' + id);
}

/**
 * 订单信息查询
 */
export interface OrderListResult {
    code: number;
    data: OrderInfo[];
    message: string;
    [property: string]: any;
}

export interface OrderInfo {
    orderDate?: string;
    orderID?: number;
    orderType?: string;
    productDescription?: string;
    productName?: number;
    productPrice?: number;
    relatedID?: number;
    status?: string;
    totalAmount?: number;
    userID?: number;
    venueCapacity?: number;
    venueLocation?: string;
    venueName?: string;
    venuePricePerHour?: number;
    [property: string]: any;
}

export class SearchForm {
    orderType: 'product' | 'venue' = "venue"; // 订单分为两类，一个是场地预定订单，一个是商品订单
    page: number = 1;
    size: number = 15;
}

/**
 * 查询订单
 * @param data 搜索信息
 */
export function list(data: SearchForm) {
    const params = new URLSearchParams();
    params.append('orderType', data.orderType);
    params.append('page', (data.page ?? 1) + '');
    params.append('size', (data.size ?? 15) + '');
    return useAxios().post('/order/details', params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}