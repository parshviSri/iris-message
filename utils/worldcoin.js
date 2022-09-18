import WorldCoinIris from "../artifacts/contracts/WorldCoinIris.sol/WorldCoinIris.json";
const { ethers } = dynamic(import("ethers"), { ssr: false });

const WorldCoinAddress = "0x2b7913901CCeDE2ffFb5a499ad7afC27e7603E47";

export const connectWorldCoin = async () => {
    if(window !== undefined){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(
          WorldCoinAddress,
          WorldCoinIris.abi,
          signer
        );
        return contract;
    }
  
};
