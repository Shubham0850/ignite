import {isHex, toHex, encodeAbiParameters, keccak256} from 'viem';
import {UserOperationStruct, UserOperationRequest} from '@alchemy/aa-core';
import {BASE_GOERLI_ENTRYPOINT_ADDRESS} from './constants';
import {chain} from '../config/client';
import type {AlchemyProvider} from '@alchemy/aa-alchemy';

type AsHex<T> = {
  [K in keyof T]: `0x${string}`;
};

const formatAsHex = (
  value: undefined | string | Uint8Array | bigint | number,
): `0x${string}` | undefined => {
  if (value === undefined) {
    return value;
  } else if (typeof value === 'string') {
    if (!isHex(value)) {
      throw new Error('Cannot convert a non-hex string to a hex string');
    }
    return value as `0x${string}`;
  } else {
    // Handles Uint8Array, bigint, and number
    return toHex(value);
  }
};

const formatUserOpAsHex = (
  userOp: UserOperationStruct,
): AsHex<UserOperationStruct> => {
  const {
    sender,
    nonce,
    initCode,
    callData,
    callGasLimit,
    verificationGasLimit,
    preVerificationGas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    paymasterAndData,
    signature,
  } = userOp;

  const formattedUserOp: AsHex<UserOperationStruct> = {
    sender: formatAsHex(sender)!,
    nonce: formatAsHex(nonce)!,
    initCode: formatAsHex(initCode)!,
    callData: formatAsHex(callData)!,
    callGasLimit: formatAsHex(callGasLimit),
    verificationGasLimit: formatAsHex(verificationGasLimit),
    preVerificationGas: formatAsHex(preVerificationGas),
    maxFeePerGas: formatAsHex(maxFeePerGas),
    maxPriorityFeePerGas: formatAsHex(maxPriorityFeePerGas),
    paymasterAndData: formatAsHex(paymasterAndData)!,
    signature: formatAsHex(signature)!,
  };

  return formattedUserOp;
};

const packUserOp = (userOp: AsHex<UserOperationStruct>): `0x${string}` => {
  // address -> `0x${string}`, uint256 -> bigint, bytes32 -> `0x${string}`
  const packedUserOp = encodeAbiParameters(
    [
      {name: 'sender', type: 'address'},
      {name: 'nonce', type: 'uint256'},
      {name: 'initCode', type: 'bytes32'},
      {name: 'callData', type: 'bytes32'},
      {name: 'callGasLimit', type: 'uint256'},
      {name: 'verificationGasLimit', type: 'uint256'},
      {name: 'preVerificationGas', type: 'uint256'},
      {name: 'maxFeePerGas', type: 'uint256'},
      {name: 'maxPriorityFeePerGas', type: 'uint256'},
      {name: 'paymasterAndData', type: 'bytes32'},
    ],
    [
      userOp.sender,
      BigInt(userOp.nonce),
      keccak256(userOp.initCode),
      keccak256(userOp.callData),
      BigInt(userOp.callGasLimit!),
      BigInt(userOp.verificationGasLimit!),
      BigInt(userOp.preVerificationGas!),
      BigInt(userOp.maxFeePerGas!),
      BigInt(userOp.maxPriorityFeePerGas!),
      keccak256(userOp.paymasterAndData),
    ],
  );

  return packedUserOp;
};

const computeUserOpHash = (
  userOp: AsHex<UserOperationStruct>,
): `0x${string}` => {
  const packedUserOp = packUserOp(userOp);
  // address -> `0x${string}`, uint256 -> bigint, bytes32 -> `0x${string}`
  const encodedUserOp = encodeAbiParameters(
    [
      {name: 'packed', type: 'bytes32'},
      {name: 'entryPoint', type: 'address'},
      {name: 'chainId', type: 'uint256'},
    ],
    [keccak256(packedUserOp), BASE_GOERLI_ENTRYPOINT_ADDRESS, BigInt(chain.id)],
  );
  const userOpHash = keccak256(encodedUserOp);
  return userOpHash;
};

export const signUserOp = async (
  userOp: UserOperationStruct,
  provider: AlchemyProvider,
): Promise<UserOperationRequest> => {
  // Format every field in the user op to be a hexstring, to make type conversions easier later
  const formattedUserOp = formatUserOpAsHex(userOp);

  // Compute hash and signature
  const userOpHash = computeUserOpHash(formattedUserOp);
  const signature = await provider.signMessage(userOpHash);

  // @ts-ignore
  const signedUserOp: UserOperationRequest = {
    ...userOp,
    signature: signature,
  };

  return signedUserOp;
};

export {formatAsHex, formatUserOpAsHex, type AsHex};
