/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
const NavBar = () => {
  const router = useRouter();
  return (
    <div className="flex relative p-6">
      <div className="float-left flex">
        <img src='./logo.png' alt="logo of flower" className="w-16 h-20" />
        <div
          className="font-extrabold text-transparent text-4xl m-4 px-4 bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600"
          onClick={() => {
            console.log("in iris");
          }}
        >
          IRIS
        </div>
      </div>
      <div className="fixed top-0 right-0">
        <ConnectButton accountStatus="address" showBalance={false} />
      </div>
    </div>
  );
  }
  export default NavBar;