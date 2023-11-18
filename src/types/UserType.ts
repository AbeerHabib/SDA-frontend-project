export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  ban: boolean
}
  
export type UserState = {
  users: User[]
  error: null | string
  isLoading: boolean
  searchTerm: string
  ban: boolean
  isLoggedIn: boolean
  userData: User | null
}