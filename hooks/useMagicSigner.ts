import { Magic, MagicUserMetadata } from "@magic-sdk/react-native-bare";
import { useStore } from "../store/userStore";
import { chain, publishableKey } from "../config/client";
import { useState } from "react";

export const useMagicSigner = () => {
  const [userInfo, setUserInfo] = useState<MagicUserMetadata | null>(null);

  const magic = new Magic(publishableKey);
  magic.user.getInfo().then((res) => {
    setUserInfo(res);
    return res;
  });

  return { magic };
};
