export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERORR = 'error'
}

export type Pizza = {
    id: string, title: string, price: number, imageUrl: string, sizes: number[], types: number[] 
}

export interface PizzaSliceState {
    items: Pizza[],
    status: 'loading' | 'success' | 'error'
}

export type SearchPizzaParams = {
    category: string, search: string, sortBy: string, order: string, currentPage: string
}