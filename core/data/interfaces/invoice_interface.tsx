export interface Invoice {
    id: number
    department: number
    departmen_name: string
    status: number
    status_name: string
    tax: number
    nro_control: any
    date_payment: any
    month: number
    cicle: number
    date_emission: string
    date_expiration: string
    observation: any
    client: Client
    charged: string
    amount: string
    amount_bs: AmountBs
    amount_discount: number
    coupon: any
    coupon_code: any
    coupon_percentage: any
    dollar_date: any
    dollar_rate: any
    iva_amount: string
    sub_total: string
    invoices_items_gsoft: InvoicesItemsGsoft[]
    invoice_third: any
    synchronization_third: boolean
    invoice_payments_gsoft: any[]
    invoices_retentions_gsoft: any[]
    balance: number
    contract: Contract
    created_by: number
    created_by_name: string
    updated_by: any
  }
  
  export interface Client {
    id: number
    name: string
    last_name: string
    email: string
    identification: string
    phone: string
    mobile: string
    synchronization_third: boolean
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
  
  export interface Contract {
    id: number
    client: number
    client_name: string
    client_email: string
    identification: string
    client_type: number
    client_type_name: string
    client_phone: string
    client_mobile: string
    installation_order: string
    signe_base64: any
    signe: string
    order_id: number
    finish_installation: string
    synchronization_third: boolean
    status: number
    balance: number
    debt: number
    sector_name: string
    parish_name: string
    parish: number
    zone: number
    plan_name_internet: string
    pts: string
    latitude: string
    longitude: string
    date_cicle: number
    change_cicle: any
    old_cicle: number
    invoice_date_cicle: number
    status_name: string
    address: string
    address_tax: string
    client_name_name: string
    client_name_lastname: string
    bank_associated: BankAssociated
    sft_detail: any
    created_by_name: string
    created_at: string
    contract_detail: ContractDetail[]
  }
  
  export interface BankAssociated {
    id: number
    bank: number
    bank_name: string
    nro_cta: string
    tlf: string
    status: boolean
  }
  
  export interface ContractDetail {
    id: number
    contract: number
    service_type: ServiceType
    plan_type: PlanType
    plan_type_corpor: any
    status: number
    nodo?: number
    nodo_name?: string
    service_detail: ServiceDetail[]
    id_mw?: string
    id_mwm: any
    id_815: any
    contract_detail_package_count: number
    contract_detail_product: any[]
    contract_detail_account?: ContractDetailAccount
  }
  
  export interface ServiceType {
    id: number
    name: string
    description: string
  }
  
  export interface PlanType {
    id: number
    plan?: number
    service_type: number
    name: string
    description: string
    cost: string
    profile: string
    mk: string
    channel_count: number
    package_count: number
    image?: string
    profit_id?: string
    status: boolean
    airport: boolean
  }
  
  export interface ServiceDetail {
    id: number
    ip: string
    redIPV4: string
    ppuser: string
    pppassw: string
    nap_port: string
    nap_id: number
    mac: string
    smart_olt: any
    serial: string
  }
  
  export interface ContractDetailAccount {
    id: number
    username: string
    password: string
    pin_code: string
    contract_detail: number
    account_id: string
  }
  