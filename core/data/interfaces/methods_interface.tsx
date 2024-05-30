export interface RootMethods {
    count: number
    next: any
    previous: any
    results: ResultMethods[]
  }
  
  export interface ResultMethods {
    id: number
    sender: string
    name: string
    email?: string
    method: number
    method_name: string
    client: number
    status: boolean
    created_at: string
    created_by: number
    created_by_name: string
  }
  