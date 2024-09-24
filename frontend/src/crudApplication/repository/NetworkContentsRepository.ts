import axios, { AxiosResponse } from "axios";
import {RequestContents, ResponseContents} from "../model/Contents";


export const postContents = async (newContents: RequestContents) => {
  await axios.post('/api/contents', newContents)
}

export const getAllContents = async (): Promise<ResponseContents[]> => {
  const { data } = (await axios.get('/api/contents')) as AxiosResponse
  return data
}