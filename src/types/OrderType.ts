export type Order = {
  id: number
  productId: number
  userId: number
  purchasedAt: Date
}
  
export type OrderState = {
  orders: Order[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}