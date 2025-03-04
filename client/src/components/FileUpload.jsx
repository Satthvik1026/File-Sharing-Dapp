import { useState } from "react"
import axios from "axios"
import "./FileUpload.css"

const FileUpload = ({ account, provider, contract }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file); //key and value

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: process.env.PINATA_API_KEY,
                        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
                        "Content-Type": "multipart/form-data",
                    },
                });
                //getting ipfs hash of the upload file
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                if (contract) {
                    await contract.add(account, ImgHash);  // Ensure function is awaited
                    alert("Successfully Uploaded Image to Blockchain!");
                } else {
                    alert("Contract not connected.");
                }
                //reset filename and file 
                setFileName("No image selected");
                setFile(null);

            } catch (error) {
                console.error("Unable to upload image to pinata", error);
            }
        }
    }


    // Function to retrieve the file from input
    const retriveFile = (e) => {
        const data = e.target.files[0];
        if (!data) return;

        setFile(data);
        setFileName(data.name);
    };

    return <div className="top">
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="file-upload" className="choose">
                Choose Image
            </label>
            <input disabled={!account} type="file" id="file-upload" name="data" onChange={retriveFile} />
            <span className="textArea">Image: {fileName}</span>

            <button type="submit" className="upload" disabled={!file}>
                Upload File
            </button>
        </form>


    </div>
}

export default FileUpload

//install axios to interact with pinta