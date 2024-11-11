import {InformationInput} from "./InformationInput";
import {render, screen, waitFor} from "@testing-library/react";
import {vi} from "vitest";
import {deleteContent, getAllContents, postContent, putContent} from "../repository/NetworkContentsRepository";
import userEvent from '@testing-library/user-event'

vi.mock('../repository/NetworkContentsRepository')

const user = userEvent.setup()

describe('<InformationInput />', () => {
  beforeEach( () => {
    vi.mocked(getAllContents).mockResolvedValue([
      {id: 1, content: 'hoge', isDone: false},
      {id: 2, content: 'fuga', isDone: true},
    ])
  })

  describe('初期レンダリング時', () => {
    it('指定の要素がレンダリングされていること', async () => {
      await renderInformationInput()

      expect(screen.getByText('ToDoApp')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('コンテンツを入力')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '保存' })).toBeInTheDocument();
    })

    it('フックのgetAllContentsが動作し、保存されているコンテンツが正しく表示される', async () => {
      const stubStoredContents = [
        {id: 1, content: 'hoge', isDone: false},
        {id: 2, content: 'fuga', isDone: true},
      ]
      vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

      await renderInformationInput()

      const buttons = screen.getAllByRole('button', {name: '更新'})
      expect(buttons[0]).toBeInTheDocument()

      const targetTextElement = (screen.getAllByRole('textbox'))[2] as HTMLInputElement
      const targetCheckBoxElement = (screen.getAllByRole('checkbox'))[1] as HTMLInputElement

      expect(targetTextElement.value).toBe('fuga')
      expect(targetCheckBoxElement.checked).toBe(true)
    })
  })


  it('保存ボタンを押すと、正しい引数でpostContentsを呼び出す', async () => {
    await renderInformationInput()

    const inputContent = screen.getAllByRole('textbox')[0] as HTMLInputElement

    await user.type(inputContent, 'hoge')
    await user.click(screen.getByRole('button', {name: '保存'}))

    expect(postContent).toHaveBeenCalledWith({content: 'hoge', isDone: false})
  })

  it('保存されている情報を変更し、更新ボタンを押すと、正しい引数でputContentsを呼び出す', async () => {
    const stubStoredContents = [
      {id: 1, content: 'hoge', isDone: false},
      {id: 2, content: 'fuga', isDone: true},
    ]
    vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

    await renderInformationInput()

    const targetTextElement = screen.getAllByRole('textbox')[1] as HTMLInputElement
    const targetCheckboxElement = screen.getAllByRole('checkbox')[0] as HTMLInputElement

    targetTextElement.value = ''
    await user.type(targetTextElement, 'piyo')
    await user.click(targetCheckboxElement)
    await user.click(screen.getAllByRole('button', {name: '更新'})[0])

    expect(putContent).toHaveBeenCalledWith({id: 1, content: 'piyo', isDone: true})
  })

  it('削除ボタンを押すと、正しい引数でdeleteContentsを呼び出す', async () => {
    const stubStoredContents = [
      {id: 1, content: 'hoge', isDone: false},
      {id: 2, content: 'fuga', isDone: true},
    ]
    vi.mocked(getAllContents).mockResolvedValue(stubStoredContents)

    await renderInformationInput()

    await user.click(screen.getAllByRole('button', {name: '削除'})[0])
    expect(deleteContent).toHaveBeenCalledWith(stubStoredContents[0].id)
  })
})

const renderInformationInput = async () => {
  await waitFor(() => {
    render(<InformationInput />)
  })
}