/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { connectContract } from "../../utils/ether";

const SearchBar = (props) => {
  
  const [search, setSearch] = useState("");
  
  const [exist, setExsist] = useState({
    search:false,
    invalid:false
  });

  const[userData,setUserData] = useState(null);

  const [foundUser, setFoundUser] = useState("");

  const [foundUserPic, setFoundUserPic] = useState("");

  const searchUser = async () => {
    const iris = await connectContract();
    let _userData = await iris.searchUser(search);
    setUserData(_userData)
    if(parseInt(_userData.tokenId._hex)>0){
        setFoundUser(_userData.name || search.slice(0, 5) + "....");
        setFoundUserPic(_userData.profile || "/profile.png");
        setExsist({search:true,invalid:false});
    }
    else{
            setExsist({ search: true, invalid: true });

    }
  };


  const addtocontact = () =>{
     props.addContact(userData);
  }
  return (
    <div>
      <div>
        <label className="mb-2 text-sm font-medium sr-only">Search</label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            ></svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search other profiles"
            required
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <button
            className="text-white absolute right-2.5 bottom-2.5 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300  hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={searchUser}
          >
            Search
          </button>
        </div>
      </div>
      {!exist.invalid && exist.search && (
        <div className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div className=" flex">
            {foundUserPic && (
              <button onClick={addtocontact}>
                <img
                  src={foundUserPic}
                  alt="search result"
                  className="shadow rounded-full max-w-8 h-8 align-middle border-none"
                />
              </button>
            )}
            <div>{foundUser}</div>
            <div></div>
          </div>
        </div>
      )}
      {exist.invalid && exist.search && (
        <div className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <div className=" flex">
            <div>No user exist !!</div>
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
