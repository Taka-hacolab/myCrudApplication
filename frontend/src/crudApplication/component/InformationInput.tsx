import {useState} from "react";
import {postMyModel} from "../repository/NetworkMyModelRepository.ts";
import {RequestMyModel} from "../model/MyModel.ts";

export function InformationInput() {
  const [text, setText] = useState('')
  const [age, setAge] = useState(0)
  const [myModel, setMyModel] = useState<RequestMyModel>({name: '', age: 0})



  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleAgeChange = (e) => {
    setAge(Number(e.target.value))
  }

  const storeContents = (inputName, inputAge) => {
    setMyModel(() => {
      const createModel: RequestMyModel = { name: inputName, age: inputAge };
      postMyModel(createModel);
      return createModel;
    });
  };

  return (
    <>
      <p>ToDoList</p>
      <input type="textbox" value={ text } onChange={handleTextChange} placeholder='名前を入力'
      />
      <input type="number" value={ age } onChange={handleAgeChange}/>
      <div>
        <button onClick={ () => { storeContents(text, age )}}>保存</button>
      </div>
    </>
  )
}