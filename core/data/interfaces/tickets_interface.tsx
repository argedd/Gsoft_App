export interface RootTickets {
    count: number
    next: any
    previous: any
    results: ResultTickets[]
  }
  
  export interface ResultTickets {
    id: number
    client: number
    client_name: string
    office: number
    office_name: string
    office_color: string
    office_create: number
    office_create_name: string
    office_create_color: string
    operator?: number
    operator_name?: string
    contract: number
    status: number
    status_name: string
    issue: number
    issue_name: string
    description: string
    closing_reason: string
    visit_date: any
    date_closed: string
    portal: boolean
    ubication: string
    created_by: number
    created_by_name: string
    comment_count: number
    created_at: string
    updated_at: string
  }

export type RootIssues = Issue[]

export interface Issue {
  id: number
  name: string
  department: number
  department_name: string
  status: boolean
  created_by: number
  created_by_name: string
}

export interface Timeline {
  id: number
  created_at: string
  updated_at: string
  deleted_at: any
  description: string
  closing_reason: string
  visit_date: any
  date_closed: string
  portal: boolean
  created_by: number
  updated_by: any
  deleted_by: any
  client: number
  office: number
  office_create: number
  operator: any
  contract: number
  status: number
  issue: number
  history: History[]
}

export interface History {
  id: number
  history_change_reason: string
  history_date: string
  created_at: string
  updated_at: string
  deleted_at: any
  description: string
  closing_reason?: string
  visit_date: any
  date_closed?: string
  portal: boolean
  created_by: number
  updated_by: any
  deleted_by: any
  client: number
  office: number
  office_create: number
  operator: any
  contract: number
  status: number
  issue: number
}


export interface RootTicket {
  id: number
  client: Client
  office: Office
  operator: any
  operator_name: any
  nap_box: string
  contract: Contract
  status: number
  status_name: string
  issue: Issue
  description: string
  closing_reason: string
  visit_date: any
  date_closed: string
  portal: boolean
  created_by: number
  created_by_name: string
  created_at: string
  updated_at: string
  comments_tickets: any[]
  files_tickets: any[]
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

export interface Office {
  id: number
  name: string
  email: string
  color: string
  issue: string
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
  plan_type_corpor: any
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

export interface Issue {
  id: number
  name: string
  department: number
  department_name: string
  status: boolean
  created_by: number
  created_by_name: string
}


  