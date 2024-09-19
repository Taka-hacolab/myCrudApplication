import {vi} from "vitest";
import axios, {AxiosResponse} from "axios";
import {getAllContents, postContents} from "./NetworkContentsRepository.ts";
import {RequestContents, ResponseContents} from "../model/Contents.ts";


vi.mock('axios')

describe('NetworkContentsRepository', async () => {

  it('postContentsを実行すると、正しい引数で/api/contentsにpostする', () => {
    const stubContents: RequestContents = {
      content: '保存コンテンツ'
    }

    postContents(stubContents)

    expect(axios.post).toHaveBeenCalledWith('/api/contents', stubContents)
  })

  it('getAllContentsを実行すると、正しい引数でaxios.getを呼び出す', () => {
    vi.mocked(axios.get).mockResolvedValue({})

    getAllContents()

    expect(axios.get).toHaveBeenCalledWith('/api/contents')
  })

  it('getAllContentsを実行すると、取得したデータを返す', async () => {
    const contents1: ResponseContents = {
      id: 1,
      content: 'コンテンツ1'
    }
    const contents2: ResponseContents = {
      id: 2,
      content: 'コンテンツ2'
    }
    const contents3: ResponseContents = {
      id: 3,
      content: 'コンテンツ3'
    }
    vi.mocked(axios.get).mockResolvedValue({
      data: [contents1, contents2, contents3]
    } as AxiosResponse)

    const result = await getAllContents()

    expect(result).toEqual([contents1, contents2, contents3])
  })
})