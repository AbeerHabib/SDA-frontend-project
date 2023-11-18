export type Product = {
  id: number
  name: string
  image: string
  description: string
  categories: number[]
  variants: string[]
  sizes: string[]
  price: number
}
  
export type ProductState = {
  products: Product[]
  error: null | string
  isLoading: boolean
  searchTerm: string
}