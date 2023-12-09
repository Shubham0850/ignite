import { create } from "zustand";
import { Magic } from "@magic-sdk/react-native-bare";
import { alchemyApiKey, chain } from "../config/client";

export const useStore = create<IStore>((set) => ({
  magicClient: null,
  magicSigner: null,
  isLoggedIn: false,
  userName: "",
  ownerAddress: "",
  ScaAddress: "",
  setMagicClient: (client: Magic) =>
    set({
      magicClient: client,
    }),

  setIsLoggedIn: (val: boolean) =>
    set({
      isLoggedIn: val,
    }),
  setUserName: (name: string) =>
    set({
      userName: name,
    }),
  setOwnerAddress: (address: string) =>
    set({
      ownerAddress: address,
    }),
  setScaAddress: (address: string) =>
    set({
      ownerAddress: address,
    }),
}));

export type IStore = {
  magicClient: Magic | null;
  ownerAddress: string;
  ScaAddress: string;
  isLoggedIn: boolean;
  userName: string;
  setIsLoggedIn: (value: boolean) => void;
  setMagicClient: (client: Magic) => void;
  setUserName: (username: string) => void;
  setOwnerAddress: (address: string) => void;
  setScaAddress: (address: string) => void;
};
