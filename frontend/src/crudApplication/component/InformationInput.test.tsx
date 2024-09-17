import {InformationInput} from "./InformationInput.tsx";
import {render, screen} from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import {postMyModel} from "../repository/NetworkMyModelRepository.ts";
import {vi} from "vitest";

describe('<InformationInput />', () => {
  it('初期レンダリング時に指定の要素がレンダリングされていること', async () => {
    await renderInformationInput()

    expect(screen.getByText('ToDoList')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('名前を入力')).toBeInTheDocument()
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: '保存'}))
  })

  it('保存ボタンを押すと、正しい引数でpostMyModelを呼び出す', async () => {
    await renderInformationInput()

    vi.mock('../repository/NetworkMyModelRepository.ts')

    const inputText = screen.getByRole('textbox')
    const inputAge = screen.getByRole('spinbutton')

    await userEvent.type(inputText, 'hoge')
    await userEvent.type(inputAge, '23')

    await userEvent.click(screen.getByRole('button', {name: '保存'}))

    expect(postMyModel).toHaveBeenCalledWith({name: 'hoge', age: 23})
  })
})

const renderInformationInput = () => {
  return render(<InformationInput/>)
}