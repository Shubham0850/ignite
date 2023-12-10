/**
 *
 * @param imageBlob Uri of Image
 * @returns CID of image
 */

import { IPFS_UPLOAD_API, WEB3STORAGETOKEN } from "../config/client";

const uploadImageToIPFS = async (uri: string): Promise<string> => {
  try {
    const headersList = {
      Authorization: `Bearer ${WEB3STORAGETOKEN}`,
    };

    console.log("uri:", uri);

    const response = await fetch(uri);
    const blob = await response.blob();

    console.log("blob:", blob);

    const filehash = await fetch(IPFS_UPLOAD_API, {
      method: "POST",
      headers: headersList,
      body: blob,
    });
    const data = await filehash.json();
    console.log("this is data", data.cid);

    return data.cid;
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error in uploading image to ipfs:", error);
    }
    throw new Error("Something went wrong");
  }
};
export default uploadImageToIPFS;
