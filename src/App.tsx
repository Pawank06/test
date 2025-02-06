import { useState } from "react";
import { ethers } from "ethers";
import { controllerContractAbi } from "./controllerabi";

declare global {
  interface Window {
    ethereum: any;
  }
}

function App() {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number | null>(null);

  const controllerAddress = "0x54d02DcB38B76A67dC9368D8457D1F384B865c70"; // Controller address
  const companyId = "bbbebfc4-ff73-4eea-bc94-1881284b9fc2";
  const tokenAddress = "0x29684075a3C86ea11D9964BcAf0F956e801396bD";
  const amount = "100";
  const adminAddress = "0x32Ed26c6e3e7FEFf9675a86D72691814B4770db3";
  const recipientAddress = "0x53a3D640A406D5a8306aE6470a0e221FEAB10828";

  const fetchSignature = async (maxRetries = 5) => {
    let attempts = 0;

    const API_URL = '';
    const API_KEY = ''; // need to add 

    const queryParams = new URLSearchParams({
      chainId: "84532",
      token: tokenAddress,
      amount,
      adminAddress,
      recipientAddress,
      isAmountNative: 'false',
    }).toString();

    while (attempts < maxRetries) {
      try {
        const response = await fetch(`${API_URL}?${queryParams}`, {
          method: "GET",
          headers: {
            "Api-Key": API_KEY,
            Accept: "application/json",
          },
        });

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        //   console.log("API Response:", data);
        if (data.status === "pending") {
          const waitTime = (data.retryAfter || 5) * 1000; // Default wait 5 sec if not provided
          console.log(
            `Signature not ready, retrying in ${waitTime / 1000} seconds...`
          );
          await new Promise((resolve) => setTimeout(resolve, waitTime));
          attempts++;
          continue; // Retry again
        }
        console.log("data", data);
        return data;
      } catch (error) {
        console.error("Error fetching signature:", error);
        break;
      }
    }
    console.error("Max retry attempts reached. Could not fetch signature.");
    return null;
  };

  const getBalance = async (address: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);
      setBalance(parseFloat(parseFloat(balanceEth).toFixed(4)));
    } catch (err) {
      console.error("Error fetching balance:", err);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed!");

      const accounts: string[] = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x14a34",
            chainName: "Base Sepolia Testnet",
            nativeCurrency: { name: "ETH", symbol: "ETH", decimals: 18 },
            rpcUrls: ["https://sepolia.base.org"],
            blockExplorerUrls: ["https://sepolia.basescan.org"],
          },
        ],
      });

      setAccount(accounts[0]);
      await getBalance(accounts[0]);

      // Listen for account changes
      window.ethereum.on("accountsChanged", async (newAccounts: string[]) => {
        setAccount(newAccounts[0]);
        await getBalance(newAccounts[0]);
      });

      // Listen for chain changes
      window.ethereum.on("chainChanged", async () => {
        if (accounts[0]) {
          await getBalance(accounts[0]);
        }
      });
    } catch (err) {
      console.error("Error connecting wallet:", err);
    }
  };

  const withdrawAsset = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const controllerContract = new ethers.Contract(
      controllerAddress,
      controllerContractAbi,
      signer
    );

    const apiData = await fetchSignature();
    console.log("apiData ===>", apiData);
    if (!apiData) {
      console.error("Failed to fetch signature data");
      return;
    }

    const { expiresAt, signature, parameters } = apiData;

    try {
      const proxyAddress = "0xe5ED05defa0631B561751AB96e63f3cbA5Aae449";
      //   const result = await controllerContract.withdrawAsset(
      //     proxyAddress, // Proxy address
      //     tokenAddress, // Token
      //     ethers.parseUnits(amount, 18), // Amount in wei
      //     recipientAddress, // Recipient
      //     expiresAt,
      //     Uint8Array.from(
      //         atob(signature.data),
      //         (c) => c.charCodeAt(0)
      //     ),
      //     signature
      //   );

      const result = await controllerContract.withdrawAsset(
        parameters[0], // Proxy address
        parameters[1], // Proxy address
        parameters[2], // Amount in wei
        parameters[3], // Recipient
        parameters[4], // Recipient
        Uint8Array.from(atob(signature.salt), (c) => c.charCodeAt(0)),
        parameters[6], // Recipient
      );

      console.log("Withdraw Transaction Sent:", result);
    } catch (err) {
      console.error("Withdraw failed:", err);
    }
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
            <button
              onClick={withdrawAsset}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Withdraw
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
