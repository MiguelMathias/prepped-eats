import { CartModel } from './Cart'

export interface OrdersModel {
    orderModels: OrderModel[]
}

export interface OrderModel {
    cart: CartModel
    date: string
}
