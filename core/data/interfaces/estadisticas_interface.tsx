export type ResultEstadisticas = Estadisticas[]

export interface Estadisticas {
  date__year: number
  date__month: number
  download: number
  upload: number
}
