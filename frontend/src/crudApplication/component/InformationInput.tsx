import {useState} from "react";
import {postMyModel} from "../repository/NetworkMyModelRepository.ts";
import {RequestMyModel} from "../model/MyModel.ts";
import {postContents} from "../repository/NetworkContentsRepository.ts";
import {RequestContents} from "../model/Contents.ts";

export function InformationInput() {
  const [text, setText] = useState('')
  const [contents, setContents] = useState<RequestContents>({content: ''})

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const storeContents = async () => {
    setContents(() => {
      const createContents: RequestContents = {content: text};
      postContents({
        content: text
      });
      return createContents;
    });
  };

  return (
    <>
      <p>ToDoApp</p>
      <input type="textbox" value={ text } onChange={handleTextChange} placeholder='コンテンツを入力'/>
      <button onClick={storeContents}>保存</button>
    </>
  )
}