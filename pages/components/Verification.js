

// import { WorldIDWidget } from "@worldcoin/id";
// import { useState } from "react";
// import{connectContract,getAccount} from '../../utils/ether';
// import { defaultAbiCoder as abi } from "@ethersproject/abi";
// import { ethers } from "ethers";
// import WorldCoinIris from "../../artifacts/contracts/WorldCoinIris.sol/WorldCoinIris.json";
// const WorldCoinAddress = "0x2b7913901CCeDE2ffFb5a499ad7afC27e7603E47";

// const Verification = () => {
//   const[verify,setVerify] = useState(false)
  
//   const verfiyUser=async(verificationResponse)=>{
//     let iris = await connectContract()
//     if(verificationResponse){
//       let account = await getAccount();
//       let merkle_root = verificationResponse?.merkle_root;
//       let nullifier_hash = verificationResponse?.nullifier_hash;
//       let proof = abi.decode(["uint256[8]"], verificationResponse?.proof)[0];
//       // eslint-disable-next-line
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       const signer = provider.getSigner();

//       const worldCoin = new ethers.Contract(
//         WorldCoinAddress,
//         WorldCoinIris.abi,
//         signer
//       );
//       await worldCoin.verifyAndExecute(
//         account,
//         merkle_root,
//         nullifier_hash,
//         proof,
//         { gasLimit: 10000000 }
//       );
//       setVerify(true);

//       await iris.verifyYourAccount();
//     }
//     else{
//       console.error('Some error has occured!!')
//     }

//   }
//     return (
//       <div>
//         {!verify && (
//           <div>
//             <WorldIDWidget
//               actionId="wid_staging_6234c67155f2b16af83d9a526f10cfe2" // obtain this from developer.worldcoin.org
//               signal="my_signal"
//               enableTelemetry
//               onSuccess={(verificationResponse) =>
//                 verfiyUser(verificationResponse)
//               }
//               onError={(error) => console.error(error)}
//             />
//           </div>
//         )}
//       </div>
//     );
// };
// export default Verification;
