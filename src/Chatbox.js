import './Chatbox.css';
import {useEffect, useState} from 'react';
import App from './App';
import firebase from './firebaseConfig' // ส่งคอนฟิกมาใช้งาน

const chatroomRef = firebase.database().ref('chatroom-1');


function Chatbox() {
  const [text, setText] = useState("");
  const [lines, setLines] = useState([]);
  // ["-้กดกด","กกกกก","กกกหกดหกดหกด"]
  // [{sender: "Mon", message: "skldfsjdlkfsd", timestamp: 12387687437424}, {sender: "Mon", message: "slkdjfsdlkfline2", timestamp: 123434234}]
  
  useEffect(() => {
    chatroomRef.on('child_added', snapshot => {
      let x = snapshot.val();
      setLines(l => [...l, {
        sender: x.sender,
        message: x.message,
        timestamp: (new Date())
      }])
    });

  }, []);

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const onSend = () =>{
    //push mesaage to firebase server
    chatroomRef.push({
      sender: "โกโจ ซาโตรุ : ",
      message: text,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    });
    setText("");
  };

  const keyPress = (event) => {
    if (event.which === 13){
      onSend();
    }
  };

  return (
    <App>
        <div className="App">
            <div className="App-chatroom">
                {
                lines.map(x => {
                    return <div className="App-chatroom-text">
                            {x.sender}
                            {x.message}
                             
                        </div>
                    })
                }
            </div>
        <div className="App-textbox">
            <input type="text" className="App-textbox-input" 
            value={text} onChange={onTextChange} onKeyPress={keyPress}/>
            
            <div className="App-textbox-send" onClick={onSend}>Send!</div>
            </div>
        </div>
    </App>
  );
}

export default Chatbox;
