/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Register from "./Register";
const NavBar = () => {
  const router = useRouter();
  return (
    <div className="flex relative p-6">
      <div
        className="float-left flex"
        onClick={() => {
          router.push({ pathname: "/" });
        }}
      >
        <img src="./logo.png" alt="logo of flower" className="w-16 h-20" />
        <div className="font-extrabold text-transparent text-4xl m-4 px-4 bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-600">
          IRIS
        </div>
      </div>
      <div className="fixed top-0 right-0">
        <ConnectButton accountStatus="address" showBalance={false} />
      </div>
      <div>
        <Register />
      </div>
    </div>
  );
  }
  export default NavBar;