export type RequestContent = {
  id?: number | null,
  content: string
  isDone: boolean
}

export type ResponseContent = {
  id: number,
  content: string
  isDone: boolean
}