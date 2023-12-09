import {create} from 'zustand';
import {Magic} from '@magic-sdk/react-native-bare';
import {type SmartAccountSigner} from '@alchemy/aa-core';
import {AlchemyProvider} from '@alchemy/aa-alchemy';
import {alchemyApiKey, chain} from '../config/client';

export const useStore = create<IStore>(set => ({
  magicClient: null,
  magicSigner: null,
  isLoggedIn: false,
  provider: new AlchemyProvider({
    chain,
    apiKey: alchemyApiKey,
  }),
  userName: '',
  ownerAddress: '',
  ScaAddress: '',
  setMagicClient: (client: Magic) =>
    set({
      magicClient: client,
    }),
  setMagicSigner: (signer: SmartAccountSigner) =>
    set({
      magicSigner: signer,
    }),
  setProvider: providerConnection =>
    set({
      provider: providerConnection,
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
  magicSigner: SmartAccountSigner | null;
  provider: AlchemyProvider;
  isLoggedIn: boolean;
  userName: string;
  setIsLoggedIn: (value: boolean) => void;
  setProvider: (provider: AlchemyProvider) => void;
  setMagicClient: (client: Magic) => void;
  setMagicSigner: (signer: SmartAccountSigner) => void;
  setUserName: (username: string) => void;
  setOwnerAddress: (address: string) => void;
  setScaAddress: (address: string) => void;
};
