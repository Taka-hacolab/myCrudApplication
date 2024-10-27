import {InformationInput} from "./InformationInput";
import {render, screen, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import {deleteContents, getAllContents, postContents, putContents} from "../repository/NetworkContentsRepository";
import userEvent from '@testing-library/user-event'
import {act} from "react";

vi.mock('../repository/NetworkContentsRepository', () => ({
  getAllContents: vi.fn(),
  postContents: vi.fn(),
  putContents: vi.fn(),
  deleteContents: vi.fn()
}));

describe('<InformationInput />', () => {
  beforeEach( () => {
    vi.mocked(getAllContents).mockResolvedValue()
  })

  describe('初期レンダリング時', () => {
    it('指定の要素がレンダリングされていること', async () => {
      await act(async () => {
        render(<InformationInput/>)
      })

      expect(screen.getByText('ToDoApp')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('コンテンツを入力')).toBeInTheDocument()
      expect(screen.getByRole('button', {name: '保存'}))
    })

    it('フックのgetAllContentsが動作し、保存されているコンテンツが正しく表示される', async () => {
      const stubStoredContents = [
        {id: 1, content: 'hoge', isDone: false},
        {id: 2, content: 'fuga', isDone: true},
      ]
      vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

      await act(async () => {
        render(<InformationInput/>)
      })

      expect(screen.getAllByRole('button', {name: '更新'})[0]).toBeInTheDocument();

      const targetTextElement = screen.getAllByRole('textbox')[2] as HTMLInputElement
      const targetCheckBoxElement = screen.getAllByRole('checkbox')[1] as HTMLInputElement

      expect(targetTextElement.value).toBe('fuga')
      expect(targetCheckBoxElement.checked).toBe(true)
    })
  })


  it('保存ボタンを押すと、正しい引数でpostContentsを呼び出す', async () => {
    await act(async () => {
      render(<InformationInput/>)
    })

    const inputContent = screen.getByRole('textbox') as HTMLInputElement

    await userEvent.type(inputContent, 'hoge')
    await userEvent.click(screen.getByRole('button', {name: '保存'}))

    expect(postContents).toHaveBeenCalledWith({content: 'hoge', isDone: false})
  })

  it('保存されている情報を変更し、更新ボタンを押すと、正しい引数でputContentsを呼び出す', async () => {
    const stubStoredContents = [
      {id: 1, content: 'hoge', isDone: false},
      {id: 2, content: 'fuga', isDone: true},
    ]
    vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

    //TODO 原因調査
    await act(async () => {
      render(<InformationInput/>)
    })

    const targetTextElement = screen.getAllByRole('textbox')[1] as HTMLInputElement
    const targetCheckboxElement = screen.getAllByRole('checkbox')[0] as HTMLInputElement

    targetTextElement.value = ''
    await userEvent.type(targetTextElement, 'piyo')
    await userEvent.click(targetCheckboxElement)
    await userEvent.click(screen.getAllByRole('button', {name: '更新'})[0])

    expect(putContents).toHaveBeenCalledWith({id: 1, content: 'piyo', isDone: true})
  })

  it('削除ボタンを押すと、正しい引数でdeleteContentsを呼び出す', async () => {
    const stubStoredContents = [
      {id: 1, content: 'hoge', isDone: false},
      {id: 2, content: 'fuga', isDone: true},
    ]
    vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

    await act(async () => {
      render(<InformationInput/>)
    })

    await userEvent.click(screen.getAllByRole('button', {name: '削除'})[0])
    expect(deleteContents).toHaveBeenCalledWith(stubStoredContents[0].id)
  })
})