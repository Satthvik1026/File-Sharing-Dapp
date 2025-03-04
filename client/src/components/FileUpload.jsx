
import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";

const FileUpload = ({ account, provider, contract }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
    const [isFolder, setIsFolder] = useState(false);

    const handleSubmit = async (e) => {
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
                        pinata_api_key: "", //update these two fields with your keys
                        pinata_secret_api_key: "",
                        "Content-Type": "multipart/form-data",
                    },
                });

                const fileHash = `ipfs://${resFile.data.IpfsHash}`;
                const fileType = file.type || "unknown";

                if (contract) {
                    await contract.add(account, fileHash, fileType, isFolder);
                    alert("Successfully Uploaded to Blockchain!");
                } else {
                    alert("Contract not connected.");
                }

                setFileName("No file selected");
                setFile(null);
                setIsFolder(false);
            } catch (error) {
                console.error("Upload failed", error);
            }
        }
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0];
        if (!data) return;

        setFile(data);
        setFileName(data.name);
    };

    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">Choose File</label>
                <input disabled={!account} type="file" id="file-upload" onChange={retrieveFile} />
                <span className="textArea">File: {fileName}</span>

                <button type="submit" className="upload" disabled={!file}>Upload</button>
            </form>
        </div>
    );
};

export default FileUpload;






// import { useState } from "react"
// import axios from "axios"
// import "./FileUpload.css"

// const FileUpload = ({ account, provider, contract }) => {
//     const [file, setFile] = useState(null);
//     const [fileName, setFileName] = useState("No image selected");


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (file) {
//             try {
//                 const formData = new FormData();
//                 formData.append("file", file); //key and value

//                 const resFile = await axios({
//                     method: "post",
//                     url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
//                     data: formData,
//                     headers: {
//                         pinata_api_key: "396fe6a6d978a42a0c66",
//                         pinata_secret_api_key: "ba754003b383caf2831af02414a206aef0cb1bf9c5f79468f838743874b9be8d",
//                         "Content-Type": "multipart/form-data",
//                     },
//                 });
//                 //getting ipfs hash of the upload file
//                 const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
//                 if (contract) {
//                     await contract.add(account, ImgHash);  // Ensure function is awaited
//                     alert("Successfully Uploaded Image to Blockchain!");
//                 } else {
//                     alert("Contract not connected.");
//                 }
//                 //reset filename and file
//                 setFileName("No image selected");
//                 setFile(null);

//             } catch (error) {
//                 console.error("Unable to upload image to pinata", error);
//             }
//         }
//     }


//     // Function to retrieve the file from input
//     const retriveFile = (e) => {
//         const data = e.target.files[0];
//         if (!data) return;

//         setFile(data);
//         setFileName(data.name);
//     };

//     return <div className="top">
//         <form className="form" onSubmit={handleSubmit}>
//             <label htmlFor="file-upload" className="choose">
//                 Choose Image
//             </label>
//             <input disabled={!account} type="file" id="file-upload" name="data" onChange={retriveFile} />
//             <span className="textArea">Image: {fileName}</span>

//             <button type="submit" className="upload" disabled={!file}>
//                 Upload File
//             </button>
//         </form>


//     </div>
// }

// export default FileUpload

// //install axios to interact with pinta




//.........................................................................................
