import * as ethers from "ethers";
import { useState } from "react";
import { NotificationItem, chainNameType } from "@epnsproject/sdk-uiweb";
import { getAccount } from "../../utils/ether";

const Notification = (props) =>{
    const[notifications,setNotifications]= useState(props.notification);
    const [showNotify, setshowNotify] = useState(false)

  return (
    <div className="absolute right-1.5 bottom-2.5">
      <div className="relative">
        <button
          className="text-white  bg-gradient-to-r bg-gradient-to-r from-indigo-600 to-pink-600  hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex"
          onClick={() => {
            setshowNotify(!showNotify);
          }}
        >
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
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
          <span className="px-2 border rounded">{notifications.length}</span>
        </button>
      </div>

      <div className="absolute right-4">
        {showNotify &&
          notifications.map((oneNotification, i) => {
            const {
              cta,
              title,
              message,
              app,
              icon,
              image,
              url,
              blockchain,
              notification,
            } = oneNotification;

            return (
              <NotificationItem
                key={i} // any unique id
                notificationTitle={title}
                notificationBody={message}
                cta={cta}
              
                url={url}
                
                // chainName={blockchain as chainNameType} // if using Typescript
              />
            );
          })}
      </div>
    </div>
  );
}
export default Notification