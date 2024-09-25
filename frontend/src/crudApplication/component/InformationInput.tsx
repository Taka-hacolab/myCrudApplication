import {ChangeEvent, useEffect, useState} from "react";
import {getAllContents, postContents} from "../repository/NetworkContentsRepository";
import {RequestContents, ResponseContents} from "../model/Contents";

export function InformationInput() {
  const [text, setText] = useState('')
  const [requestContents, setRequestContents] = useState<RequestContents>({content: ''})
  const [contents, setContents] = useState<ResponseContents[]>([])

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const storeContents = async () => {
    const createContents: RequestContents = { content: text };
    setRequestContents(createContents);

    await postContents(createContents);

    const allContents = await getAllContents();
    setContents(allContents);
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
      <div>
        {contents.map((obj, index) => (
          <div key={index}>{obj.content}</div>
        ))}
      </div>
    </>
  )
}