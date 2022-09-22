/* eslint-disable @next/next/no-img-element */
import SearchBar from "./SearchBar";
import{useEffect, useRef, useState} from 'react';
import { connectContract, getAccount } from "../../utils/ether";
import axios from "axios";

const Contacts =  (props) => {
  const user = useRef()
  // console.log(user);
  const contact = useRef([]);
  const addNewContact = (_contact) => {
    //  console.log(contact.current);
    //  console.log(_contact);
     if (contact.current){ contact.current = [...contact.current, _contact]}
     else{contact.current = [_contact]}
    // console.log(contact.current);
  };
   useEffect(() => {
     const getuser = async () => {
       let iris = await connectContract();
       user.current = await iris.getUser();
       if(user.current.messageLog){
        let m = await axios.get(user.current.messageLog);
        let a =[]
       for(let key in m.data){
        let u = await iris.getUserById(parseInt(key));
        a.push(u)
       }
        console.log(m.data);
        contact.current = a;
       }
     };
     getuser();
   }, []);
  const openChat=(callee) =>{
    props.getCallee(callee)

  }
  return (
    <div>
      <div className=" flex w-2/12 sm:w-4/12 px-4">
        <img
          src={user.current?.profilepic || "/profile.png"}
          alt="..."
          className="shadow rounded-full max-w-18 h-18 align-middle border-none"
        />
        <div className="p-4">{user.current?.name}</div>
        <div>
          {user.current?.verified && (
            <div className="text-green-500 p-4">
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
                  d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <SearchBar addContact={addNewContact} />
      <div className="flex m-2">
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
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>

        <div className="text-2xl font-sans px-6">Messages</div>
      </div>
      <div>
        {contact.current &&
          contact.current.map((user, index) => {
            return (
              <div key={index} className="flex border-y-1 border-slate">
                <div
                  className=" flex w-2/12 sm:w-4/12 px-4"
                  onClick={openChat(user)}
                >
                  <img
                    src={user.pic || "/profile.png"}
                    alt="..."
                    className="shadow rounded-full max-w-8 h-8 align-middle border-none"
                  />
                  <div className="p-4">{user.name || "unknown"}</div>
                  <div></div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Contacts;
