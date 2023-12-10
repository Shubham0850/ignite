import { useCallback, useMemo } from "react";
import { useStore } from "../store/userStore";
import {
  RpcTransactionRequest,
  type Client,
  toHex,
  createPublicClient,
  http,
} from "viem";
import {
  SmartAccountSigner,
  getDefaultEntryPointAddress,
  UserOperationStruct,
  PublicErc4337Client,
  createPublicErc4337Client,
} from "@alchemy/aa-core";
import {
  LightSmartContractAccount,
  getDefaultLightAccountFactoryAddress,
} from "@alchemy/aa-accounts";
import { alchemyApiKey, chain } from "../config/client";
import { AsHex, formatUserOpAsHex, signUserOp } from "../utils/helpers";
import {
  BASE_GOERLI_ALCHEMY_RPC_URL,
  BASE_GOERLI_ENTRYPOINT_ADDRESS,
  BASE_GOERLI_PAYMASTER_URL,
  PRE_VERIFICATION_GAS_BUFFER,
  VERIFICATION_GAS_LIMIT_BUFFER,
} from "../utils/constants";

export const useAlchemyProvider = () => {
  const { provider, setProvider } = useStore();

  // Initialize RPC client connected to the Base Goerli Paymaster. Used to populate
  // `paymasterAndData` field of user operations.
  const paymaster: Client = useMemo(
    () =>
      createPublicClient({
        chain,
        transport: http(BASE_GOERLI_PAYMASTER_URL),
      }),
    []
  );

  // Initialize RPC client connected to Alchemy's Base Goerli RPC URL. Used to submit
  // signed user operations to the network
  const bundler: PublicErc4337Client = useMemo(
    () =>
      createPublicErc4337Client({
        chain,
        rpcUrl: `${BASE_GOERLI_ALCHEMY_RPC_URL}/${alchemyApiKey}`,
      }),
    []
  );
  const connectProviderToAccount = useCallback(
    (signer: SmartAccountSigner) => {
      const connectedProvider = provider.connect((rpcClient) => {
        return new LightSmartContractAccount({
          rpcClient,
          owner: signer,
          chain,
          entryPointAddress: getDefaultEntryPointAddress(chain),
          factoryAddress: getDefaultLightAccountFactoryAddress(chain),
        });
      });

      setProvider(connectedProvider);
      return connectedProvider;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [provider]
  );

  const sendSponsoredUserOperation = async (tx: RpcTransactionRequest) => {
    try {
      if (!provider) {
        console.log("Smart account has not yet initialized.");
        throw new Error("Smart account has not yet initialized.");
      }
      console.log("woohoo we have a provider");

      console.log("kk");

      const userOp = await provider.buildUserOperationFromTx(tx);

      console.log("built useroperation from tx", userOp);

      const populatedUserOp = await populateWithPaymaster(userOp, paymaster);
      console.log("populatedOp", populatedUserOp);

      const signedUserOp = await signUserOp(populatedUserOp, provider);
      console.log("I signed it", signedUserOp);

      const userOpHash = await bundler.sendUserOperation(
        signedUserOp,
        BASE_GOERLI_ENTRYPOINT_ADDRESS
      );

      return userOpHash;
    } catch (error) {
      console.log("error in sending tx", error);
    }
  };

  const populateWithPaymaster = async (
    userOp: UserOperationStruct,
    paymaster: Client
  ): Promise<UserOperationStruct> => {
    // Format every field in the user op to be a hexstring, to make type conversions easier later
    console.log("here in populate with paymaster");

    const formattedUserOp: AsHex<UserOperationStruct> =
      formatUserOpAsHex(userOp);

    console.log("done with formatted user oper");

    // First, increment the user op's `preVerificationGas` and `verificationGasLimit` with the
    // recommended gas buffers to cover verification of the Base Goerli paymaster
    const bufferedUserOp: AsHex<UserOperationStruct> = {
      ...formattedUserOp,
      preVerificationGas: formattedUserOp.preVerificationGas
        ? toHex(
            BigInt(formattedUserOp.preVerificationGas) +
              PRE_VERIFICATION_GAS_BUFFER
          )
        : undefined,
      verificationGasLimit: formattedUserOp.verificationGasLimit
        ? toHex(
            BigInt(formattedUserOp.verificationGasLimit) +
              VERIFICATION_GAS_LIMIT_BUFFER
          )
        : undefined,
    };

    console.log("done with buffered user oper");

    // Then, query the Base Goerli paymaster with the user operation to determine if it will be sponsored
    try {
      const paymasterResponse: `0x${string}` = await paymaster.request({
        // eth_paymasterAndDataForUserOperation is a relatively new RPC and may throw a type error
        // @ts-ignore
        method: "eth_paymasterAndDataForUserOperation",
        params: [
          // @ts-ignore
          bufferedUserOp,
          BASE_GOERLI_ENTRYPOINT_ADDRESS,
          // @ts-ignore
          toHex(chain.id),
        ],
      });

      console.log("responses from paymaster", paymasterResponse);

      // If the paymaster responds successfully, use the response as the user operation's
      // `paymasterAndData` field
      const populatedUserOp: AsHex<UserOperationStruct> = {
        ...bufferedUserOp,
        paymasterAndData: paymasterResponse,
      };

      return populatedUserOp;
    } catch (error) {
      // If the paymaster responds with an error, it will not sponsor the user operation.
      // You might handle this differently, e.g. try a different paymaster
      throw new Error(`hello ${error}`);
    }
  };

  return { provider, connectProviderToAccount, sendSponsoredUserOperation };
};
