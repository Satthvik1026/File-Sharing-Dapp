
// import { useState } from "react";
// import axios from "axios";
// import "./FileUpload.css";

// const FileUpload = ({ account, provider, contract }) => {
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState("No file selected");
//     const [isFolder, setIsFolder] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (file) {
//             try {
//                 const formData = new FormData();
//                 formData.append("file", file);

//                 const resFile = await axios({
//                     method: "post",
//                     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//                     data: formData,
//                     headers: {
//                         pinata_api_key: "396fe6a6d978a42a0c66", //update these two fields with your keys
//                         pinata_secret_api_key: "ba754003b383caf2831af02414a206aef0cb1bf9c5f79468f838743874b9be8d",
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });

//                 const fileHash = `ipfs://${resFile.data.IpfsHash}`;
//                 const fileType = file.type || "unknown";

//                 if (contract) {
//                     await contract.add(account, fileHash, fileType, isFolder);
//                     alert("Successfully Uploaded to Blockchain!");
//                 } else {
//                     alert("Contract not connected.");
//                 }

//                 setFileName("No file selected");
//                 setFile(null);
//                 setIsFolder(false);
//             } catch (error) {
//                 console.error("Upload failed", error);
//             }
//         }
//     };

//     const retrieveFile = (e) => {
//         const data = e.target.files[0];
//         if (!data) return;

//         setFile(data);
//         setFileName(data.name);
//     };

//     return (
//         <div className="top">
//             <form className="form" onSubmit={handleSubmit}>
//                 <label htmlFor="file-upload" className="choose">Choose File</label>
//                 <input disabled={!account} type="file" id="file-upload" onChange={retrieveFile} />
//                 <span className="textArea">File: {fileName}</span>

//                 <button type="submit" className="upload" disabled={!file}>Upload</button>
//             </form>
//             <div className="bg-bule-400">Hello test</div>
//         </div>
//     );
// };

// export default FileUpload;





import { useState } from "react";
import axios from "axios";

const FileUpload = ({ account, contract }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");

    const handleFileSelect = (e) => {
        const data = e.target.files[0];
        if (data) {
            setFile(data);
            setFileName(data.name);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: import.meta.env.VITE_PINATA_API_KEY,
                        pinata_secret_api_key: import.meta.env.VITE_PINATA_SECRET_API_KEY,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const fileHash = `ipfs://${resFile.data.IpfsHash}`;
                const fileType = file.type || "unknown";

                await contract.add(account, fileHash, fileType, false);
                alert("Successfully Uploaded to Blockchain!");
                setFileName("No file selected");
                setFile(null);

            } catch (error) {
                alert("Upload failed. Make sure your Pinata keys are set correctly.");
                console.error("Upload failed", error);
                console.log("Pinata Key:", import.meta.env.VITE_PINATA_API_KEY);
                console.log("Pinata Secret:", import.meta.env.VITE_PINATA_SECRET_API_KEY);

            }
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-12">
            <form
                className="flex items-center justify-center space-x-4"
                onSubmit={handleFileUpload}
            >
                <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Choose File
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileSelect}
                        disabled={!account}
                    />
                </label>
                <span className="text-gray-400 w-64 truncate">{fileName}</span>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                    disabled={!file}
                >
                    Upload File
                </button>
            </form>
        </div>
    );
};

export default FileUpload;