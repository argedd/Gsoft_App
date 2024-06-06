export interface Client {
    count: number
    next: any
    previous: any
    results: ResultClient[]
  }
  
  export interface ResultClient {
    id: number
    name: string
    last_name: string
    email: string
    identification: string
    phone: string
    mobile: string
    synchronization_third: boolean
  }
  