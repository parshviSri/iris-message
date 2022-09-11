

import { WorldIDWidget } from "@worldcoin/id";
import { useState } from "react";
import{connectContract,connectWorldCoin} from '../../utils/ether'

const Verification = () => {
  const[verify,setVerify] = useState(false)
  const verfiyUser=async(verificationResponse)=>{
    let iris = await connectContract()
    if(verificationResponse){
      let worldCoin = connectWorldCoin();
      await worldCoin.verifyAndExecute(verificationResponse);
      await worldCoin.on('Verify',(response)=>{
        setVerify(response)
      })
      await iris.verifyYourAccount();
    }

  }
    return(<div>
      <WorldIDWidget
        actionId="wid_staging_6234c67155f2b16af83d9a526f10cfe2" // obtain this from developer.worldcoin.org
        signal="my_signal"
        enableTelemetry 
        onSuccess={(verificationResponse) => verfiyUser(verificationResponse)}
        onError={(error) => console.error(error)}
      />

    </div>);
};
export default Verification;
