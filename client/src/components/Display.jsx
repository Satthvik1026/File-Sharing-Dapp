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


// import { useState } from "react";

// const Display = ({ account, contract, setModalOpen, selectedFiles, setSelectedFiles }) => {
//     const [fileData, setFileData] = useState([]);
//     const [fetchAddress, setFetchAddress] = useState("");
//     const [isOwner, setIsOwner] = useState(false);

//     const handleFileSelect = (index) => {
//         if (selectedFiles.includes(index)) {
//             setSelectedFiles(selectedFiles.filter((i) => i !== index));
//         } else {
//             setSelectedFiles([...selectedFiles, index]);
//         }
//     };

//     const getData = async () => {
//         try {
//             const addressToUse = fetchAddress.trim() ? fetchAddress.trim() : account;
//             if (!addressToUse) return alert("Account not connected or no address entered.");

//             const files = await contract.display(addressToUse);

//             // Check if the current user is the owner of the displayed files
//             setIsOwner(addressToUse.toLowerCase() === account.toLowerCase());

//             if (!files || files.length === 0) {
//                 alert("No files to display for this address.");
//                 setFileData([]);
//                 return;
//             }

//             const fileElements = files.map((file, index) => {
//                 const fileCID = file.url.substring(7);
//                 const fileUrl = `https://gateway.pinata.cloud/ipfs/${fileCID}`;
//                 return { url: fileUrl, type: file.fileType, originalIndex: index }; // Keep original index for sharing
//             });
//             setFileData(fileElements);
//             setSelectedFiles([]); // Clear selection on new fetch
//         } catch (e) {
//             console.error("Error fetching data:", e);
//             alert("You don't have access or an error occurred.");
//         }
//     };

//     return (
//         <div>
//             <div className="flex items-center justify-center space-x-4 mb-8">
//                 <input
//                     type="text"
//                     placeholder="Enter Address to View Files (or leave blank for yours)"
//                     value={fetchAddress}
//                     onChange={(e) => setFetchAddress(e.target.value)}
//                     className="w-full max-w-md p-3 text-center bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <button onClick={getData} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
//                     Get Data
//                 </button>
//             </div>

//             {isOwner && selectedFiles.length > 0 && (
//                 <div className="text-center mb-6">
//                     <button onClick={() => setModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
//                         Share {selectedFiles.length} Selected File(s)
//                     </button>
//                 </div>
//             )}

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//                 {fileData.map((file) => (
//                     <div key={file.originalIndex} className="relative bg-gray-800 rounded-lg shadow-lg overflow-hidden group">
//                         {isOwner && (
//                             <input
//                                 type="checkbox"
//                                 checked={selectedFiles.includes(file.originalIndex)}
//                                 onChange={() => handleFileSelect(file.originalIndex)}
//                                 className="absolute top-3 right-3 h-6 w-6 z-10"
//                             />
//                         )}

//                         {file.type.startsWith("image") ? (
//                             <a href={file.url} target="_blank" rel="noopener noreferrer">
//                                 <img src={file.url} alt="Uploaded content" className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300" />
//                             </a>
//                         ) : file.type.startsWith("video") ? (
//                             <video controls src={file.url} className="w-full h-64 object-cover"></video>
//                         ) : (
//                             <div className="w-full h-64 flex flex-col justify-center items-center p-4">
//                                 <span className="text-5xl mb-4">📄</span>
//                                 <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline break-all">
//                                     View File
//                                 </a>
//                             </div>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Display;