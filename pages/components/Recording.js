import { useReactMediaRecorder } from "react-media-recorder";
import { useEffect, useState } from "react";
 import { addFile } from "../../utils/ipfs";
 import {_sendMessage,updateSenderLog} from '../../utils/sendmessage'
const RecordView = (props) => {
  const [second, setSecond] =useState  ("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    try{
       let intervalId;

       if (isActive) {
         intervalId = setInterval(() => {
           const secondCounter = counter % 60;
           const minuteCounter = Math.floor(counter / 60);

           let computedSecond =
             String(secondCounter).length === 1
               ? `0${secondCounter}`
               : secondCounter;
           let computedMinute =
             String(minuteCounter).length === 1
               ? `0${minuteCounter}`
               : minuteCounter;

           setSecond(computedSecond);
           setMinute(computedMinute);

           setCounter((counter) => counter + 1);
         }, 650);
       }

       return () => clearInterval(intervalId);
    }
    catch(err){
      console.log(err);
    }
   
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: props.media === 'video'?true:false,
    audio: true,
    blobPropertyBag: {
      type: "audio/wav",
    },
    // echoCancellation: true;
  });
  const _addFile = async () => {
     let file = await fetch(mediaBlobUrl).then((r) => r?.blob());
    let url = await addFile(file);
    setFileUrl(url);
    // let url = event.target.files[0];
    return url
  };
  const sendRecord = async()=>{
    let url =await _addFile();
    console.log(props.user);
    console.log(url);
    await _sendMessage(props.user, props.receiver,parseInt(props?.receiver?.tokenId?._hex),url);
  }

  return (
    <div className="container">
      <div className="border-y-2">
        <div className="text-4xl m-9 p-2 text-center">Record Your Message</div>
      </div>
      <div style={{ height: "38px" }}>
        <h4>{status}</h4>
      </div>

      <div>
        {status === "recording" && <button onClick={stopTimer}>Clear</button>}
        <div className="text-4xl text-center">
          <span className="minute">{minute}</span>
          <span>:</span>
          <span className="second">{second}</span>
        </div>

        <div className="flex flex-row">
          <label>
            <h3 className="text-xl text-center">Press the Start to record</h3>

            <div className="mx-10">
              <button
                className="text-white  right-2.5 bottom-2.5 bg-gradient-to-r from-cyan-500 to-blue-500  hover:bg-gradient-to-r focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  if (!isActive) {
                    startRecording();
                  } else {
                    pauseRecording();
                  }

                  setIsActive(!isActive);
                }}
              >
                {isActive ? "Pause" : "Start"}
              </button>
              <button
                className="text-white  right-2.5 bottom-2.5 bg-gradient-to-r m-4  hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => {
                  pauseRecording();
                  stopRecording();
                  setIsActive(!isActive);
                }}
              >
                Stop
              </button>
            </div>
          </label>
        </div>
        {mediaBlobUrl && (
          <div>
            <video src={mediaBlobUrl} controls onTimeUpdate={_addFile} />
            <button onClick={sendRecord}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RecordView;
