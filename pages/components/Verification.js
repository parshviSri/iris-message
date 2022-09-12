

import { WorldIDWidget } from "@worldcoin/id";
import { useState } from "react";
import{connectContract,connectWorldCoin,getAccount} from '../../utils/ether'

const Verification = () => {
  const[verify,setVerify] = useState(false)

  const verfiyUser=async(verificationResponse)=>{
    console.log(verificationResponse);
    let iris = await connectContract()
    if(verificationResponse){
      let account = await getAccount()
      let worldCoin = await connectWorldCoin();
      let merkle_root = verificationResponse.merkle_root;
      let nullifier_hash = verificationResponse.nullifier_hash;
      let proof = verificationResponse.nullifier_hash;
      await worldCoin.verifyAndExecute(account,merkle_root,nullifier_hash,proof);
      
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
