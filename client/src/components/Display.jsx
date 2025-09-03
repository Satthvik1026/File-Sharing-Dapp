// import { useState } from "react";
// import "./Display.css";

// const Display = ({ contract, account }) => {
//     const [data, setData] = useState([]);
//     const [inputAddress, setInputAddress] = useState("");

//     const getData = async () => {
//         try {
//             const addressToUse = inputAddress.trim() ? inputAddress : account;
//             const files = await contract.display(addressToUse);

//             if (!files || files.length === 0) {
//                 alert("No files to display");
//                 return;
//             }

//             const fileElements = files.map((file, i) => {
//                 const fileCID = file.url.substring(7); // Remove "ipfs://" prefix
//                 const fileUrl = `https://gateway.pinata.cloud/ipfs/${fileCID}`;

//                 if (file.fileType.startsWith("image")) {
//                     return (
//                         <div key={i} className="image-container">
//                             <a href={fileUrl} target="_blank" rel="noopener noreferrer">
//                                 <img src={fileUrl} alt="uploaded" />
//                             </a>
//                         </div>
//                     );
//                 }

//                 if (file.fileType.startsWith("video")) {
//                     return (
//                         <div key={i} className="video-container">
//                             <video controls src={fileUrl}></video>
//                         </div>
//                     );
//                 }

//                 if (file.fileType.startsWith("application/pdf")) {
//                     return (
//                         <div key={i} className="file-item">
//                             📄 <a href={fileUrl} target="_blank" rel="noopener noreferrer">PDF File</a>
//                         </div>
//                     );
//                 }

//                 return (
//                     <div key={i} className="file-item">
//                         📎 <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>
//                     </div>
//                 );
//             });

//             setData(fileElements);
//         } catch (e) {
//             console.error("Error fetching data:", e);
//             alert("You don't have access or an error occurred");
//         }
//     };

//     return (
//         <>
//             <div className="file-list">{data}</div>
//             <input
//                 type="text"
//                 placeholder="Enter Address"
//                 className="address"
//                 value={inputAddress}
//                 onChange={(e) => setInputAddress(e.target.value)}
//             />
//             <button className="center button" onClick={getData}>Get Data</button>
//         </>
//     );
// };

// export default Display;




import { useState } from "react";

const Display = ({ account, contract }) => {
    const [fileData, setFileData] = useState([]);
    const [fetchAddress, setFetchAddress] = useState("");

    const getData = async () => {
        try {
            const addressToUse = fetchAddress.trim() ? fetchAddress : account;
            if (!addressToUse) {
                alert("Account not connected or no address entered.");
                return;
            }

            const files = await contract.display(addressToUse);

            if (!files || files.length === 0) {
                alert("No files to display for this address.");
                setFileData([]);
                return;
            }

            const fileElements = files.map((file) => {
                const fileCID = file.url.substring(7); // Remove "ipfs://"
                const fileUrl = `https://gateway.pinata.cloud/ipfs/${fileCID}`;
                return { url: fileUrl, type: file.fileType };
            });
            setFileData(fileElements);
        } catch (e) {
            console.error("Error fetching data:", e);
            alert("You don't have access or an error occurred.");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center space-x-4 mb-8">
                <input
                    type="text"
                    placeholder="Enter Address to View Files"
                    value={fetchAddress}
                    onChange={(e) => setFetchAddress(e.target.value)}
                    className="w-full max-w-md p-3 text-center bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={getData}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                    Get Data
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {fileData.map((file, i) => (
                    <div key={i} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
                        {file.type.startsWith("image") ? (
                            <a href={file.url} target="_blank" rel="noopener noreferrer">
                                <img src={file.url} alt="Uploaded content" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
                            </a>
                        ) : file.type.startsWith("video") ? (
                            <video controls src={file.url} className="w-full h-64 object-cover"></video>
                        ) : (
                            <div className="w-full h-64 flex flex-col justify-center items-center p-4">
                                <span className="text-5xl mb-4">📄</span>
                                <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
                                    View File
                                </a>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Display;