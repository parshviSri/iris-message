/* eslint-disable @next/next/no-img-element */

import Card from "../shared/Card";
const Landing = () => {
  return (
    <div className="container">
      <div className="flex flex-row">
        <div className="basis-1/4">
          <div className="m-3">
            <img src="./person1.png" alt="person" width={200} />
          </div>
          <div className="m-4">
            <img src="./person2.png" alt="person" width={200} />
          </div>
        </div>
        <div className="basis-1/2">
          <img
            src="./mainHeading.png"
            alt="main heading of the page"
            className="object-cover"
          />
        </div>
        <div className="basis-1/4">
          <div className="m-3">
            <img src='./person3.png' alt="person" width={200} />
          </div>
          <div className="m-4">
            <img src='./person4.png' alt="person" width={200} />
          </div>
        </div>
      </div>
      <div className="flex flex-row m-4">
        <div className="basis-1/3">
          <Card
            title={"End to End Encrypted"}
            body={
              "We use Litprotocol for encryption and which encrypt your chats sothat no one not even us know what you are sharing"
            }
          />
        </div>
        <div className="basis-1/3">
          <Card
            title={"Proof of Personhood"}
            body={
              " We use WorldOrbs for Proof of Personhood so that you talk to real humans and keep our system bot free"
            }
          />
        </div>
        <div className="basis-1/3">
          <Card
            title={"Easy Notification"}
            body={
              " We use EPN - Ethereum Push Notifications so that you do not miss any message from your loved ones!!"
            }
          />
        </div>
      </div>
    </div>
  );
};
export default Landing;
