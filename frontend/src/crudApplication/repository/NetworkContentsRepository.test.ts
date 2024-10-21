import {vi} from "vitest";
import axios, {AxiosResponse} from "axios";
import {deleteContents, getAllContents, postContents, putContents} from "./NetworkContentsRepository";
import {RequestContents, ResponseContents} from "../model/Contents";


vi.mock('axios')

describe('NetworkContentsRepository', async () => {

  it('postContentsを実行すると、正しい引数で/api/contentsにpostする', () => {
    const stubContents: RequestContents = {
      content: '保存コンテンツ',
      status: "finished"
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
      content: 'コンテンツ1',
      status: "notFinished"
    }
    const contents2: ResponseContents = {
      id: 2,
      content: 'コンテンツ2',
      status: "notFinished"
    }
    const contents3: ResponseContents = {
      id: 3,
      content: 'コンテンツ3',
      status: "finished"
    }
    vi.mocked(axios.get).mockResolvedValue({
      data: [contents1, contents2, contents3]
    } as AxiosResponse)

    const result = await getAllContents()

    expect(result).toEqual([contents1, contents2, contents3])
  })

  it('putContentsを実行すると、正しい引数でputする', () => {
    vi.mocked(axios.put).mockResolvedValue({})

    const updateContents: RequestContents = {
      id: 99,
      content: 'コンテンツ1',
      status: 'finished'
    }

    putContents(updateContents)

    expect(axios.put).toHaveBeenCalledWith('/api/contents', updateContents)
  })

  it('deleteContentsを実行すると、正しい引数でdeleteする', () => {
    vi.mocked(axios.delete).mockReturnValue({})

    const stubContent: RequestContents = {
      id: 99,
      content: 'コンテンツ1',
      status: 'finished'
    }

    deleteContents(stubContent.id)

    expect(axios.delete).toHaveBeenCalledWith(`/api/contents/${stubContent.id}`)
  })
})