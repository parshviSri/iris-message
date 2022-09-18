

import { WorldIDWidget } from "@worldcoin/id";
import { useState } from "react";
import{connectContract,connectWorldCoin,getAccount} from '../../utils/ether'
import { defaultAbiCoder as abi } from "@ethersproject/abi";
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
      let proof = abi.decode(["uint256[8]"], verificationResponse.proof)[0];
      console.log(account, merkle_root, nullifier_hash, proof);
      let trans = await worldCoin.verifyAndExecute(
        account,
        merkle_root,
        nullifier_hash,
        proof,
        { gasLimit: 10000000 }
      );
      console.log(trans);
      
      
        setVerify(true)
    
      await iris.verifyYourAccount();
    }

  }
    return (
      <div>
        {!verify && (
          <div>
            <WorldIDWidget
              actionId="wid_staging_6234c67155f2b16af83d9a526f10cfe2" // obtain this from developer.worldcoin.org
              signal="my_signal"
              enableTelemetry
              onSuccess={(verificationResponse) =>
                verfiyUser(verificationResponse)
              }
              onError={(error) => console.error(error)}
            />
          </div>
        )}
      </div>
    );
};
export default Verification;
