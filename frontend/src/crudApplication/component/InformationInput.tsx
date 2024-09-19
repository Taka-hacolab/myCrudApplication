import {useEffect, useState} from "react";
import {postMyModel} from "../repository/NetworkMyModelRepository.ts";
import {RequestMyModel} from "../model/MyModel.ts";
import {getAllContents, postContents} from "../repository/NetworkContentsRepository.ts";
import {RequestContents, ResponseContents} from "../model/Contents.ts";

export function InformationInput() {
  const [text, setText] = useState('')
  const [requestContents, setRequestContents] = useState<RequestContents>({content: ''})
  const [contents, setContents] = useState<ResponseContents[]>([])

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const storeContents = async () => {
    setRequestContents(() => {
      const createContents: RequestContents = {content: text};
      postContents({
        content: text
      });
      return createContents;
    });
  };

  useEffect(() => {
    getAllContents().then((data) => {
      setContents(data)
    })
  }, []);

  return (
    <>
      <p>ToDoApp</p>
      <input type="textbox" value={text} onChange={handleTextChange} placeholder='コンテンツを入力'/>
      <button onClick={storeContents}>保存</button>
      // TODO とりあえず表示しているだけだから、修正要
      <div>
        {contents.map((obj, index) => (
          <div key={index}>{obj.content}</div>
        ))}
      </div>
    </>
  )
}