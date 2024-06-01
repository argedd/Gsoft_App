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
  