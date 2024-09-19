import axios, { AxiosResponse } from "axios";
import {RequestContents} from "../model/Contents.ts";


export const postContents = async (newContents: RequestContents) => {
  await axios.post('/api/contents', newContents)
}

export const getAllContents = async () => {
  const { data } = (await axios.get('/api/contents')) as AxiosResponse
  return data
}