export interface RootInvoices {
    count: number
    next: string
    previous: any
    results: ResultInvoices[]
  }
  
  export interface ResultInvoices {
    id: number
    department: string
    status: number
    status_name: string
    tax: number
    nro_control: string
    id_tfhk: number
    date_payment: string
    month: number
    cicle: number
    date_emission: string
    date_emission_tfhk: string
    observation: any
    date_expiration: string
    client: string
    id_client: number
    client_phone: string
    client_mobile: string
    contract: number
    charged: string
    amount: string
    coupon: any
    amount_discount: number
    amount_bs: AmountBs
    dollar_date: string
    dollar_rate: string
    iva_amount: string
    sub_total: string
    url: string
    invoice_third: any
    synchronization_third: boolean
    invoices_items_gsoft: InvoicesItemsGsoft[]
    created_by_name: string
  }
  
  export interface AmountBs {
    amount: number
    sub_total: number
    iva_amount: number
  }
  
  export interface InvoicesItemsGsoft {
    id: number
    invoice: number
    service: number
    service_name: string
    details: string
    sum: number
    amount: string
    amount_bs: number
  }
  