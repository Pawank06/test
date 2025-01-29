import { useState } from 'react';

// Declare the ethereum property on the Window interface
declare global {
  interface Window {
    ethereum: any;
  }
}
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const getBalance = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(parseFloat(parseFloat(balanceEth).toFixed(4)));
    } catch (err: any) {
      console.error("Error fetching balance:", err.message || err);
    }
  };

  const connectWallet = async (): Promise<void> => {
    try {
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }
  
      console.log("Requesting accounts...");
      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Accounts received:", accounts);
  
      console.log("Switching to Base Sepolia...");
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x14a34", // Base Sepolia Chain ID in hex
            chainName: "Base Sepolia Testnet",
            nativeCurrency: {
              name: "ETH",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: ["https://sepolia.base.org"],
            blockExplorerUrls: ["https://sepolia.basescan.org"],
          },
        ],
      });
  
      console.log("Switch successful. Setting account...");
      setAccount(accounts[0]);
      await getBalance(accounts[0]);

      // Listen for account changes
      window.ethereum.on('accountsChanged', async (newAccounts: string[]) => {
        setAccount(newAccounts[0]);
        await getBalance(newAccounts[0]);
      });

      // Listen for chain changes
      window.ethereum.on('chainChanged', async () => {
        if (accounts[0]) {
          await getBalance(accounts[0]);
        }
      });
    } catch (err: any) {
      console.error("Error connecting wallet:", err.message || err);
    }
  };
  

// Removed duplicate withdrawAsset function

  const controllerAddress = "0x54d02DcB38B76A67dC9368D8457D1F384B865c70"; // Add your controller contract address here
  const controllerContractAbi = [{"inputs":[{"internalType":"address","name":"_controllerAdmin","type":"address"},{"internalType":"address","name":"_treasury","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_collateralProxy","type":"address"},{"indexed":false,"internalType":"address[]","name":"_assets","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"Liquidation","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_collateralProxy","type":"address"},{"indexed":false,"internalType":"address[]","name":"_assets","type":"address[]"},{"indexed":false,"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"Payment","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_collateralProxy","type":"address"},{"indexed":false,"internalType":"address","name":"_asset","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Withdrawal","type":"event"},{"inputs":[],"name":"EIP712_DOMAIN_NAME","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EIP712_DOMAIN_TYPE_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"EIP712_DOMAIN_VERSION","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"PAY_TYPE_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"WITHDRAW_TYPE_HASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"controllerAdmin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_collateralProxy","type":"address"}],"name":"increaseNonce","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_collateralProxy","type":"address"},{"internalType":"address[]","name":"_assets","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"liquidateAsset","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_collateralProxy","type":"address"},{"internalType":"address[]","name":"_assets","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"},{"internalType":"uint256","name":"_expiresAt","type":"uint256"},{"internalType":"bytes32","name":"_salt","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"makePayment","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonce","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"treasury","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_controllerAdmin","type":"address"}],"name":"updateControllerAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_treasury","type":"address"}],"name":"updateTreasury","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_collateralProxy","type":"address"},{"internalType":"address","name":"_asset","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"},{"internalType":"address","name":"_recipient","type":"address"},{"internalType":"uint256","name":"_expiresAt","type":"uint256"},{"internalType":"bytes32","name":"_salt","type":"bytes32"},{"internalType":"bytes","name":"_signature","type":"bytes"}],"name":"withdrawAsset","outputs":[],"stateMutability":"nonpayable","type":"function"}]
  const proxyAddress = "0xb13B1A18Add4d33979392d5022Aa86B1310A0549";
  const token = '0x0123456789012345678901234567890123456789';
  const amount = 500;
  const recipientAddress = '0xb13B1A18Add4d33979392d5022Aa86B1310A0549';
  const salt = Uint8Array.from(
    atob("5uglC0Hjlfh9v6fpANLf4rzmyjlJVeFrbImY2V2OMDE"),
    (c) => c.charCodeAt(0)
  );



  const expiresAtUnix = Math.floor(new Date("2025-01-28T05:56:16.000Z").getTime() / 1000);
  console.log("Expire unix", expiresAtUnix)
  const signature = '0xf83f889da3ed46a2fabbe272a62d6c2f17c6b906b7b0227e71dca86127d5b3251e2b05e293d90e5caf71d82f63cd1eae2ba75502cd501bb00eab5926a83972821b';

  const withdrawAsset = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    console.log("Signer", signer);
  
    const controllerContract = new ethers.Contract(
      controllerAddress,
      controllerContractAbi,
      signer
    );

    // const dummySalt = new Uint8Array(salt)
    // console.log("Dummy salt", dummySalt);

    console.log("Salt", salt)

  
    const result = await controllerContract.withdrawAsset(
      proxyAddress,
      token,
      amount,
      recipientAddress,
      expiresAtUnix,
      salt,
      signature
    );

    console.log("Result", result);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl mb-4">Base Sepolia Wallet</h1>
        {!account ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Connect Wallet
          </button>
        ) : (
          <div>
            <p className="mb-2">Account: {account}</p>
            <p>Balance: {balance} ETH</p>
            <button onClick={withdrawAsset}>Withdraw</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;