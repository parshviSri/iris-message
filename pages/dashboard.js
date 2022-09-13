import { useEffect, useRef, useState } from "react";
import { connectContract,getAccount } from "../utils/ether";
import Contacts from "./components/Contacts";
const Dashboard = () => {
    const[user,setuser]= useState(null);
    let _user= useRef(null);
    let account = useRef('');
    useEffect(()=>{
      const getuser =async()=>{
        let iris = await connectContract();
         _user.current = await iris.getUser();
         account.current = await getAccount();
        console.log(_user);
        

      }
      getuser()
     
    },[_user]
    )
    
    
    
    return (
      <div className="container">
        <div className="flex flex-row">
          <div className="basis-1/4 border-black border-2">
            {
            _user &&<div>
              <Contacts userInfo={_user} accountInfo={account}/>
              </div>}
          </div>
        </div>
      </div>
    );
}
export default Dashboard;