import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { Magic, MagicUserMetadata } from "@magic-sdk/react-native-bare";
import { WalletClient, createWalletClient, custom } from "viem";
import { useStore } from "../store/userStore";
import { chain, publishableKey } from "../config/client";
import { useState } from "react";

export const useMagicSigner = () => {
  const { magicClient, magicSigner, setMagicClient, setMagicSigner } =
    useStore();
  const [userInfo, setUserInfo] = useState<MagicUserMetadata | null>(null);
  if (magicClient && magicSigner) {
    return { magic: magicClient, signer: magicSigner };
  }

  const magic = new Magic(publishableKey);
  magic.user.getInfo().then((res) => {
    setUserInfo(res);
    return res;
  });

  const client: WalletClient = createWalletClient({
    transport: custom(magic.rpcProvider),
    account: userInfo?.publicAddress as `0x${string}`,
    chain: chain,
  });

  const signer: SmartAccountSigner = new WalletClientSigner(
    client as any,
    "magic"
  );

  setMagicClient(magic);
  setMagicSigner(signer);

  return { magic, signer };
};
