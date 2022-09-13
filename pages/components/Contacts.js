/* eslint-disable @next/next/no-img-element */
import SearchBar from "./SearchBar";
import{useEffect, useState} from 'react';
const Contacts =  (props) => {
  const account = (props.accountInfo.current).slice(0,5)+'...';
  const user = props.userInfo.current;
  console.log(account);

  
  return (
    <div>
      <div className=" flex w-2/12 sm:w-4/12 px-4">
        <img
          src={user?.profile || "/profile.png"}
          alt="..."
          className="shadow rounded-full max-w-18 h-18 align-middle border-none"
        />
        <div className="p-4">{user?.name ||account}</div>
        <div></div>
      </div>
      <SearchBar />
      <div className="flex m-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>

        <div className="text-2xl font-sans px-6">Messages</div>
      </div>
      <div>
        {user.messageLog &&
          user.messageLog.map((user, index) => {
            return (
              <div
                key={index}
                className="flex border-y-1 border-slate"
                onClick={() => {
                  sendCallerId(user);
                }}
              >
                <div className=" flex w-2/12 sm:w-4/12 px-4">
                  <img
                    src={user.pic}
                    alt="..."
                    className="shadow rounded-full max-w-8 h-8 align-middle border-none"
                    onClick={sendCallerId}
                  />
                  <div className="p-4">{user.name}</div>
                  <div></div>
                </div>
              </div>
            );
          })}
        {user.messageLog || <div>Add people to contacts</div>}
      </div>
    </div>
  );
};
export default Contacts;
