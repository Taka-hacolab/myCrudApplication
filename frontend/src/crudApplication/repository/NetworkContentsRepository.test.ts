import {vi} from "vitest";
import axios, {AxiosResponse} from "axios";
import {deleteContent, getAllContents, postContent, putContent} from "./NetworkContentsRepository";
import {RequestContent, ResponseContent} from "../model/Contents";


vi.mock('axios')

describe('NetworkContentsRepository', async () => {

  it('postContentsを実行すると、正しい引数で/api/contentsにpostする', () => {
    const stubContent: RequestContent = {
      content: '保存コンテンツ',
      isDone: false
    }

    postContent(stubContent)

    expect(axios.post).toHaveBeenCalledWith('/api/contents', stubContent)
  })

  it('getAllContentsを実行すると、正しい引数でaxios.getを呼び出す', () => {
    vi.mocked(axios.get).mockResolvedValue({})

    getAllContents()

    expect(axios.get).toHaveBeenCalledWith('/api/contents')
  })

  it('getAllContentsを実行すると、取得したデータを返す', async () => {
    const content1: ResponseContent = {
      id: 1,
      content: 'コンテンツ1',
      isDone: false
    }
    const content2: ResponseContent = {
      id: 2,
      content: 'コンテンツ2',
      isDone: false
    }
    const content3: ResponseContent = {
      id: 3,
      content: 'コンテンツ3',
      isDone: false
    }
    vi.mocked(axios.get).mockResolvedValue({
      data: [content1, content2, content3]
    } as AxiosResponse)

    const result = await getAllContents()

    expect(result).toEqual([content1, content2, content3])
  })

  it('putContentsを実行すると、正しい引数でputする', () => {
    vi.mocked(axios.put).mockResolvedValue({})

    const updateContent: RequestContent = {
      id: 99,
      content: 'コンテンツ1',
      isDone: false
    }

    putContent(updateContent)

    expect(axios.put).toHaveBeenCalledWith('/api/contents', updateContent)
  })

  it('deleteContentsを実行すると、正しい引数でdeleteする', () => {
    vi.mocked(axios.delete).mockReturnValue({})

    const stubContent: RequestContent = {
      id: 99,
      content: 'コンテンツ1',
      isDone: false
    }

    deleteContent(stubContent.id!)

    expect(axios.delete).toHaveBeenCalledWith(`/api/contents/${stubContent.id}`)
  })
})