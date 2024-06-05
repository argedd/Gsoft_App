export type Packages = ResultPackages[]

export interface ResultPackages  {
  id: number
  name: string
  detail: string
  price: string
  file_logo: any
  status: boolean
  channels_package_gtv_count: number
}

export type ChannelPackages = ResultChannel[]

export interface ResultChannel {
  id: number
  package: Package
  channel: Channel
}

export interface Package {
  id: number
  name: string
  detail: string
  price: string
  file_logo: any
  status: boolean
  channels_package_gtv_count: number
}

export interface Channel {
  id: number
  name: string
  file_logo: string
}