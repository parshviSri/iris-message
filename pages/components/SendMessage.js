/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { connectContract } from "../../utils/ether";
import { addFile } from "../../utils/ipfs";
import { sendNotification } from "../../utils/ens";
import axios from "axios";
const SendMessage = (props) => {
  let user = props.user
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
    let tokenId = parseInt(props?.receiver?.tokenId?._hex);
  const addImage = async (e) => {

    let url = await addFile(e?.target?.files[0]);
    setImage(url);
  };
  const _addFile = async (e) => {
    let url = await addFile(e?.target?.files[0]);
    setFile(url);
  };
  const _sendMessage = async() =>{
    let today = new Date();
    let time = today.getHours() <= 12 ? "AM" : "PM";
    if(user.messageLog){
      let m = await axios.get(user.messageLog);
      console.log(m);
      for(let key in m.data){
              console.log(tokenId, key);

        if(key == tokenId){
          let _message = {
            sender: user.name,
            reciever: props.receiver.name,
            text: message,
            image: image,
            file: file,
            star: false,
            time: today.getHours() + ":" + today.getMinutes() + time,
          };
          m.data[key]["message"].push(_message);
          let b = m.data;
          console.log(b);
          let c = JSON.stringify(b);
          let url = await addFile(c);
          let iris = await connectContract();
          await iris.addMessage(url);
          
        }
      }
    }
    else{
      let _message = {};
      _message[tokenId] = {
        name: props.receiver.name,
        pic: props.receiver.profilepic,
        message: [
          {
            sender: user.name,
            reciever: props.receiver.name,
            text: message,
            image: image,
            file: file,
            star: false,
            time: today.getHours() + ":" + today.getMinutes() + time,
          },
        ],
      };
      let m = JSON.stringify(_message);
      let url = await addFile(m);
      let iris = await connectContract();
      await iris.addMessage(url);
    }
    await updateSenderLog();
    let iris = await connectContract();
     let trans =await iris.getAddressById(tokenId);
     await sendNotification(trans, user, 'new message');
  }
  const updateSenderLog = async() =>{
    let today = new Date();
    let time = today.getHours() <= 12 ? "AM" : "PM";
    if (user.messageLog) {
      let m = await axios.get(props.receiver.messageLog);
      console.log(m);
      let _token = parseInt(user?.tokenId?._hex);
      for (let key in m.data) {
        console.log(tokenId, key);

        if (key == _token) {
          let _message = {
            sender: user.name,
            reciever: props.receiver.name,
            text: message,
            image: image,
            file: file,
            star: false,
            time: today.getHours() + ":" + today.getMinutes() + time,
          };
          m.data[key]["message"].push(_message);
          let b = m.data;
          console.log(b);
          let c = JSON.stringify(b);
          let url = await addFile(c);
          let iris = await connectContract();
          await iris.updateMessageLog(tokenId,url);
        }
      }
    } else {
      let _token = parseInt(user?.tokenId?._hex);
      let _message = {};
      _message[_token] = {
        name: user.name,
        pic: user.profilepic,
        message: [
          {
            sender: user.name,
            reciever: props.receiver.name,
            text: message,
            image: image,
            file: file,
            star: false,
            time: today.getHours() + ":" + today.getMinutes() + time,
          },
        ],
      };
      let m = JSON.stringify(_message);
      let url = await addFile(m);
      let iris = await connectContract();
      await iris.updateMessageLog(tokenId,url);
    }

  }
  const recordMess = async(_media) =>{
    props.getRecord(_media)
  }

  return (
    <div className="shadow-md rounded bottom-0 w-full">
      <div className="border  rounded   focus:border-blue-500 focus:outline-none">
        <div>{image && <img src={image} alt="send" width={124} />}</div>

        <textarea
          className=" 
                          w-full
                          appearance-none
                         
                         
                          text-white-700 
                         
                          "
          placeholder="Send Your Message.."
          onChange={(e) => {
            setMessage(e?.target?.value);
          }}
        ></textarea>
      </div>
      <div className="float-right flex">
        <div>
          <input
            type="file"
            className="hidden"
            id="postImage"
            onChange={addImage}
          />
          <label htmlFor="postImage">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          </label>
        </div>
        <div className="px-2">
          <input
            type="file"
            className="hidden"
            id="addFile"
            onChange={_addFile}
          />
          <label htmlFor="addFile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13.5l3 3m0 0l3-3m-3 3v-6m1.06-4.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
              />
            </svg>
          </label>
        </div>
        <div className="px-2">
          <button onClick={_sendMessage}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="float-left flex">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={() => {
            recordMess("audio");
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          onClick={() => {
            recordMess("video");
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      </div>
    </div>
  );
};

export default SendMessage;
