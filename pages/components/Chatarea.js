/* eslint-disable @next/next/no-img-element */
import axios from "axios";
import { useEffect,useRef, useState } from "react";
import SendMessage from "./SendMessage";
import RecordView from "./Recording";
const ChatArea = (props) => {
  let messageLog = useRef(props?.user?.current?.messageLog);
 const [message, setMessage] = useState([]);
 const[user,setUser] = useState( props?.user?.current)
 const[caller,setCaller] = useState(props?.caller);
  const [media, setmedia] = useState("");

  // console.log(caller);

  console.log(user);
  useEffect(()=>{
    getPrevMessage()
  },[]);
  const getPrevMessage = async()=>{
    if(messageLog?.current){
      let m =await axios.get(messageLog?.current);
      
        for (let key in m?.data) {
          let tokenId  = parseInt(caller?.tokenId?._hex);

          if (key == tokenId) {
            console.log(m?.data[key]["message"]);
            setMessage( m?.data[key]['message']);
          }
        }
      
      
    }
  }
  const recordMess = async (_media) =>{
    setmedia(_media);
  }
  return (
    <div className="flex">
      <div>
        <div className="border-y-2">
          <div className=" flex w-3/12 sm:w-3/12 px-4">
            <img
              src={caller?.pic || "/profile.png"}
              alt="..."
              className="shadow rounded-full w-18 h-18 align-middle border-none"
            />
            <div className="p-4 text-2xl m-6">{caller?.name}</div>
          </div>
        </div>
        <div>
          <div className="text-m text-center mb-4 mt-2">Today</div>
          {message &&
            message.map((mess, index) => {
              return (
                <div key={index}>
                  {user?.name === mess?.reciever && (
                    <div className="basis-1/2">
                      <div className="text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 w-1/2 m-3 p-2 text-l rounded-lg">
                        <span className="p-2">{mess?.text}</span>
                        {mess?.image && <img src={mess?.image} alt="send" />}
                        <div className="text-sm float-right">{mess?.time}</div>
                      </div>
                    </div>
                  )}
                  {user?.name === mess?.sender && (
                    <div>
                      <div className="text-white float-right bg-gradient-to-r from-cyan-500 to-blue-500 w-1/2 m-3 p-2 text-l rounded-lg">
                        <span className="p-2">{mess?.text}</span>
                        {mess?.image && <img src={mess?.image} alt="send" />}
                        {mess?.file && <video src={mess?.file} controls/>}
                        <div className="text-sm float-right">{mess?.time}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
        {message &&<SendMessage user={user} receiver={caller} getRecord={recordMess} />}
      </div>
      {media && <RecordView user={user} receiver={caller} media ={media}/>}
    </div>
  );
};
export default ChatArea;
