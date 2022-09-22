import { create as ipfsHttpClient } from "ipfs-http-client";
const projectId = '2ETzwpUpgW6FtZDWvqvmqDmfHTt';
const projectSecret = "ccde840a9fb902bc0a4445ffee1e0c05";
 import { Blob } from "buffer";
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = ipfsHttpClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});
export const addFile = async (_file) => {
  const file = _file;
  try {
    const added = await client.add(file, {
      progress: (prog) => console.log(`received: ${prog}`),
    });
    console.log(added);
    const url = `https://iris.infura-ipfs.io/ipfs/${added.path}`;
    console.log(url);
    return url;
  } catch (error) {
    console.log("Error uploading file: ", error);
  }
};
export function makeFileObjects(jsonObj) {
  const blob = new Blob([JSON.stringify(jsonObj)], {
    type: "application/json",
  });

  const files = [
    new File(["contents-of-file-1"], "plain-utf8.txt"),
    new File([blob], "hello.json"),
  ];
  return files;
}
