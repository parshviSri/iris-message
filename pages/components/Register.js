import { useState } from "react";
import {connectContract} from '../../utils/ether'
const Register = () =>{
    const[showRegister,setShowRegister] = useState(false)
    const registerWithWallet =async()=>{
        let iris = await connectContract();
        await iris.register();

    }
    return (
      <div>
        <button
          onClick={() => {
            setShowRegister(!showRegister);
          }}
          className="text-white absolute right-2.5 bottom-2.5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300  hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register
        </button>
        {showRegister && (
          <div className="flex absolute bottom-3.5">
            <button className="p-2" onClick={registerWithWallet}>Register with wallet</button>
            <button>Register with len profile</button>
          </div>
        )}
      </div>
    );
}
export default Register;