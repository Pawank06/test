export const controllerContractAbi = [
    {
      inputs: [
        { internalType: "address", name: "_controllerAdmin", type: "address" },
        { internalType: "address", name: "_treasury", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_collateralProxy",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "_assets",
          type: "address[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "_amounts",
          type: "uint256[]",
        },
      ],
      name: "Liquidation",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_collateralProxy",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address[]",
          name: "_assets",
          type: "address[]",
        },
        {
          indexed: false,
          internalType: "uint256[]",
          name: "_amounts",
          type: "uint256[]",
        },
      ],
      name: "Payment",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "_collateralProxy",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "_asset",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "_amount",
          type: "uint256",
        },
      ],
      name: "Withdrawal",
      type: "event",
    },
    {
      inputs: [],
      name: "EIP712_DOMAIN_NAME",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "EIP712_DOMAIN_TYPE_HASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "EIP712_DOMAIN_VERSION",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "PAY_TYPE_HASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "WITHDRAW_TYPE_HASH",
      outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "controllerAdmin",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_collateralProxy", type: "address" },
      ],
      name: "increaseNonce",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_collateralProxy", type: "address" },
        { internalType: "address[]", name: "_assets", type: "address[]" },
        { internalType: "uint256[]", name: "_amounts", type: "uint256[]" },
      ],
      name: "liquidateAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_collateralProxy", type: "address" },
        { internalType: "address[]", name: "_assets", type: "address[]" },
        { internalType: "uint256[]", name: "_amounts", type: "uint256[]" },
        { internalType: "uint256", name: "_expiresAt", type: "uint256" },
        { internalType: "bytes32", name: "_salt", type: "bytes32" },
        { internalType: "bytes", name: "_signature", type: "bytes" },
      ],
      name: "makePayment",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "nonce",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "treasury",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_controllerAdmin", type: "address" },
      ],
      name: "updateControllerAdmin",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "_treasury", type: "address" }],
      name: "updateTreasury",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_collateralProxy", type: "address" },
        { internalType: "address", name: "_asset", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
        { internalType: "address", name: "_recipient", type: "address" },
        { internalType: "uint256", name: "_expiresAt", type: "uint256" },
        { internalType: "bytes32", name: "_salt", type: "bytes32" },
        { internalType: "bytes", name: "_signature", type: "bytes" },
      ],
      name: "withdrawAsset",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];