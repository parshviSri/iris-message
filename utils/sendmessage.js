import { addFile } from "./ipfs";
import {connectContract} from './ether';
import {sendNotification} from './ens'
import axios from "axios";

export const _sendMessage = async (user,receiver,tokenId,file) => {
  let today = new Date();
  let time = today.getHours() <= 12 ? "AM" : "PM";
  if (user.messageLog) {
    let m = await axios.get(user.messageLog);
    console.log(m);
    for (let key in m.data) {
      console.log(tokenId, key);

      if (key == tokenId) {
        let _message = {
          sender: user.name,
          reciever: receiver.name,
          text: null,
          image: null,
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
  } else {
    let _message = {};
    _message[tokenId] = {
      name: receiver.name,
      pic: receiver.profilepic,
      message: [
        {
          sender: user.name,
          reciever: receiver.name,
          text: null,
          image: null,
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
  await updateSenderLog(user, receiver,file);
  let iris = await connectContract();
  let trans = await iris.getAddressById(tokenId);
  await sendNotification(trans, user, "new message");
};
 const updateSenderLog = async (user, receiver, file) => {
  let today = new Date();
  let time = today.getHours() <= 12 ? "AM" : "PM";
  console.log(user);
  if (user?.messageLog) {
    let m = await axios.get(receiver.messageLog);
    console.log(m);
    let _token = parseInt(user?.tokenId?._hex);
    for (let key in m.data) {

      if (key == _token) {
        let _message = {
          sender: user.name,
          reciever: receiver.name,
          text: null,
          image: null,
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
        await iris.updateMessageLog(_token, url);
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
          text: null,
          image: null,
          file: file,
          star: false,
          time: today.getHours() + ":" + today.getMinutes() + time,
        },
      ],
    };
    let m = JSON.stringify(_message);
    let url = await addFile(m);
    let iris = await connectContract();
    await iris.updateMessageLog(_token, url);
  }
};
