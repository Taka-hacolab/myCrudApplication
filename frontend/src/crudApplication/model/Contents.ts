export type RequestContents = {
  id?: number | null,
  content: string
  isDone: boolean
}

export type ResponseContents = {
  id: number,
  content: string
  isDone: boolean
}