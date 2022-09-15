import { useState } from "react";
import {connectContract} from '../../utils/ether';
import {getDefaultProfile} from '../../utils/lens';
import {getAccount} from '../../utils/ether';
import Verification from "./Verification";
import { useRouter } from "next/router";
const Register = () =>{
    const router = useRouter();

    const[showRegister,setShowRegister] = useState(false)
    const registerWithWallet =async()=>{
        let account = (await getAccount()).slice(0,5)+'...';
        // console.log(account);
        let iris = await connectContract();
        await iris.register();
        await iris.addName(account);
       router.push({ pathname: "/dashboard"});

    }
    const registerWithLens =async() =>{
        let account = await getAccount();
        let profile =await getDefaultProfile(account);
        // console.log(profile);
        if (profile.defaultProfile) {
          let name = profile.defaultProfile.name;
          let pic = profile.defaultProfile.picture.original.url;
          let iris = await connectContract();
          await iris.register();
          await iris.addName(name);
          await iris.addProfilepic(pic);
          router.push({
            pathname: "/dashboard",
          });
        } else {
          console.log("No lens profile");
        }
        

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
          <div>
            <div className="flex absolute bottom-3.5">
              <button className="p-2" onClick={registerWithWallet}>
                Register with wallet
              </button>
              <button onClick={registerWithLens}>
                Register with len profile
              </button>
            </div>
            <Verification className="flex absolute bottom-4.5" />
          </div>
        )}
      </div>
    );
}
export default Register;