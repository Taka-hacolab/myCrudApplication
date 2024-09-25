export type RequestContents = {
  id?: number | null,
  content: string
  status: 'notFinished' | 'finished'
}

export type ResponseContents = {
  id: number,
  content: string
  status: 'notFinished' | 'finished'
}