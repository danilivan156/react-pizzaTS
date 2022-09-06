export type CartItemType = { 
    id: string, 
    title: string, 
    price: number, 
    size: number, 
    imageUrl: string, 
    type: string,
    count: number
}

export interface CartSliceState {
    totalPrice: number,
    items: CartItemType[]
}