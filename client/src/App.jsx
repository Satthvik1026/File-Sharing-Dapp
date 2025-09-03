// // import { useEffect, useState } from "react";
// // import { ethers } from "ethers";
// // import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
// // import "./App.css";
// // import FileUpload from "./components/FileUpload";
// // import Display from "./components/Display";
// // import Modal from "./components/Modal";

// // function App() {
// //   const [account, setAccount] = useState("");
// //   const [contract, setContract] = useState(null);
// //   const [provider, setProvider] = useState(null);
// //   const [modalOpen, setModalOpen] = useState(false);

// //   useEffect(() => {
// //     const connectWallet = async () => {
// //       try {
// //         if (!window.ethereum) {
// //           alert("MetaMask is not installed! Please install MetaMask.");
// //           return;
// //         }



// //         const provider = new ethers.BrowserProvider(window.ethereum);

// //         await provider.send("eth_requestAccounts", []);

// //         const signer = await provider.getSigner();
// //         const address = await signer.getAddress();
// //         setAccount(address);

// //         const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update with your contract address
// //         console.log("Contract Address:", contractAddress);

// //         const contract = new ethers.Contract(contractAddress, Upload.abi, signer);

// //         setContract(contract);
// //         setProvider(provider);
// //       } catch (error) {
// //         console.error("Error connecting wallet:", error);
// //       }
// //     };

// //     connectWallet();

// //     // Attach event listeners
// //     if (window.ethereum) {
// //       window.ethereum.on("chainChanged", () => {
// //         window.location.reload();
// //       });

// //       window.ethereum.on("accountsChanged", () => {
// //         window.location.reload();
// //       });
// //     }
// //   }, []);

// //   return (
// //     <>
// //       {!modalOpen && (
// //         <button className="share" onClick={() => setModalOpen(true)}>
// //           Share
// //         </button>
// //       )}
// //       {modalOpen && (
// //         <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
// //       )}

// //       <div className="App">
// //         <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
// //         <div className="bg"></div>
// //         <div className="bg bg2"></div>
// //         <div className="bg bg3"></div>

// //         <p style={{ color: "white" }}>
// //           Account : {account ? account : "Not connected"}
// //         </p>
// //         <FileUpload account={account} provider={provider} contract={contract} />
// //         <Display contract={contract} account={account} />
// //       </div>
// //     </>
// //   );
// // }

// // export default App;


// import { useEffect, useState } from "react";
// import { ethers } from "ethers";
// import Upload from "./artifacts/contracts/Upload.sol/Upload.json";


// // Import the new components
// import FileUpload from "./components/FileUpload";
// import Display from "./components/Display";
// import Modal from "./components/Modal";

// function App() {
//   const [account, setAccount] = useState("");
//   const [contract, setContract] = useState(null);
//   const [provider, setProvider] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);

//   useEffect(() => {
//     const connectWallet = async () => {
//       try {
//         if (!window.ethereum) {
//           alert("MetaMask is not installed! Please install MetaMask.");
//           return;
//         }

//         const provider = new ethers.BrowserProvider(window.ethereum);

//         window.ethereum.on("chainChanged", () => window.location.reload());
//         window.ethereum.on("accountsChanged", () => window.location.reload());

//         await provider.send("eth_requestAccounts", []);
//         const signer = await provider.getSigner();
//         const address = await signer.getAddress();
//         setAccount(address);

//         const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
//         const contractInstance = new ethers.Contract(contractAddress, Upload.abi, signer);

//         setProvider(provider);
//         setContract(contractInstance);
//       } catch (error) {
//         console.error("Error connecting wallet:", error);
//       }
//     };
//     connectWallet();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-6">
//       {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

//       <div className="max-w-7xl mx-auto">
//         <header className="flex justify-between items-center mb-10">
//           <h1 className="text-5xl font-bold tracking-tighter">Gdrive 3.0</h1>
//           <button
//             onClick={() => setModalOpen(true)}
//             className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
//           >
//             Share Access
//           </button>
//         </header>

//         <p className="font-mono text-center mb-10 break-all">
//           Account: {account || "Not Connected"}
//         </p>

//         <FileUpload account={account} contract={contract} />

//         <Display account={account} contract={contract} />
//       </div>
//     </div>
//   );
// }

// export default App;



import { useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from 'react-hot-toast'; // Import toast
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";

import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";

function App() {
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // NEW: Wallet connect and disconnect functions
  const connectWallet = async () => {
    const connectPromise = new Promise(async (resolve, reject) => {
      try {
        if (!window.ethereum) {
          return reject("MetaMask is not installed!");
        }

        const provider = new ethers.BrowserProvider(window.ethereum);

        // Setup listeners
        window.ethereum.on("chainChanged", () => window.location.reload());
        window.ethereum.on("accountsChanged", () => window.location.reload());

        // Request account access
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);

        const contractAddress = "0xDe7d21d3172bB1f057152d1C998F248476Cbbc6C";
        const contractInstance = new ethers.Contract(contractAddress, Upload.abi, signer);
        setContract(contractInstance);

        resolve("Wallet connected successfully!");
      } catch (error) {
        console.error("Error connecting wallet:", error);
        reject("Failed to connect wallet.");
      }
    });

    toast.promise(connectPromise, {
      loading: 'Connecting to wallet...',
      success: (message) => <b>{message}</b>,
      error: (message) => <b>{message}</b>,
    });
  };

  const disconnectWallet = () => {
    setAccount(null);
    setContract(null);
    toast.success(<b>Wallet Disconnected!</b>);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* NEW: Toaster for notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      {modalOpen && <Modal setModalOpen={setModalOpen} contract={contract} />}

      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-bold tracking-tighter">Gdrive 3.0</h1>

          {/* UPDATED: Header with conditional connect/disconnect button */}
          <div className="flex items-center space-x-4">
            {account ? (
              <>
                <button
                  onClick={() => setModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                >
                  Share Access
                </button>
                <div className="bg-gray-800 p-2 rounded-lg flex items-center space-x-3">
                  <span className="font-mono text-sm">{`${account.substring(0, 6)}...${account.substring(account.length - 4)}`}</span>
                  <button onClick={disconnectWallet} className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md text-sm">
                    Disconnect
                  </button>
                </div>
              </>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </header>

        {/* Conditionally render content based on wallet connection */}
        {account ? (
          <div>
            <p className="font-mono text-center mb-10 break-all">
              Account: {account}
            </p>
            <FileUpload account={account} contract={contract} />
            <Display account={account} contract={contract} />
          </div>
        ) : (
          <div className="text-center mt-20">
            <h2 className="text-3xl font-semibold text-gray-400">Please connect your wallet to use the app.</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;