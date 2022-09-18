import { ethers } from "ethers";
import Iris from '../artifacts/contracts/Iris.sol/Iris.json';
import WorldCoinIris from "../artifacts/contracts/WorldCoinIris.sol/WorldCoinIris.json";

const contractAddress = "0x5eCbEC56cCB4cFB31aB546A18976c075E688e9aF";
const WorldCoinAddress = "0x2b7913901CCeDE2ffFb5a499ad7afC27e7603E47";

export const getAccount = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  let account = accounts[0].toString();
  return account;
};

export const connectContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

     const contract = new ethers.Contract(contractAddress, Iris.abi, signer);
     return contract;
};
export const connectWorldCoin = async() =>{
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const contract = new ethers.Contract(WorldCoinAddress, WorldCoinIris.abi, signer);
  return contract;
}
