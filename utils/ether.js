import { ethers } from "ethers";
import Iris from '../artifacts/contracts/Iris.sol/Iris.json';
const contractAddress = "0xAf64F288ad6a32b882909b7819DC2610bba206F2";
export const getAccount = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const accounts = await window.ethereum.request({ method: "eth_accounts" });
  let account = accounts[0].toString();
  return account;
};

export const connectContract = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(process.env.NEXT_APP_CONTRACT_ADDRESS);

     const contract = new ethers.Contract(contractAddress, Iris.abi, signer);
     return contract;
};
