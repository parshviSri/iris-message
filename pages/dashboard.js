import { useEffect, useRef, useState } from "react";
import { connectContract,getAccount } from "../utils/ether";
import Contacts from "./components/Contacts";
import ChatArea from "./components/Chatarea";
const Dashboard = () => {
    const[caller,setCaller]= useState(null);
    let _user= useRef(null);
    useEffect(()=>{
      const getuser =async()=>{
        let iris = await connectContract();
         _user.current = await iris.getUser();
        

      }
      getuser()
     
    },[_user]
    )
    const callee =(_callee)=>{
      // console.log(_callee);
      setCaller(_callee)
    }
    
    return (
      <div className="container">
        <div className="flex flex-row">
          <div className="basis-1/4 border-black border-2">
            {_user && (
              <div>
                <Contacts
                  userInfo={_user}
                  getCallee={callee}
                />
              </div>
            )}
          </div>
          <div className="basis-1/2 border relative">
            {caller && <ChatArea caller={caller} user={_user}/>}
          </div>
        </div>
      </div>
    );
}
export default Dashboard;