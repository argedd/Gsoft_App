export interface RootContract {
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
    finish_installation: any
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
    date_cicle: any
    change_cicle: any
    invoice_date_cicle: any
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
    plan_type_corpor: PlanTypeCorpo
    status: number
    nodo: any
    nodo_name: any
    service_detail: any[]
    id_mw: any
    id_mwm: any
    id_815: any
    contract_detail_package_count: number
    contract_detail_product: any[]
    contract_detail_account: any
  }
  
  export interface ServiceType {
    id: number
    name: string
    description: string
  }
  
  export interface PlanType {
    id: number
    plan: number
    service_type: number
    name: string
    description: string
    cost: string
    profile: string
    mk: string
    channel_count: number
    package_count: number
    image: string
    profit_id: string
    status: boolean
    airport: boolean
  }

  export interface PlanTypeCorpo {
    id: number
    service_type: number
    description: string
    cost: string
    installation_cost: string
    quantity: number
    created_by: number
  }
  