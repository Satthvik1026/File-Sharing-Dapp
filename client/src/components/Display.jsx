import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
    const [data, setData] = useState([]);
    const [inputAddress, setInputAddress] = useState("");

    const getData = async () => {
        try {
            const addressToUse = inputAddress.trim() ? inputAddress : account;
            const files = await contract.display(addressToUse);

            if (!files || files.length === 0) {
                alert("No files to display");
                return;
            }

            const fileElements = files.map((file, i) => {
                const fileCID = file.url.substring(7); // Remove "ipfs://" prefix
                const fileUrl = `https://gateway.pinata.cloud/ipfs/${fileCID}`;

                if (file.fileType.startsWith("image")) {
                    return (
                        <div key={i} className="image-container">
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                                <img src={fileUrl} alt="uploaded" />
                            </a>
                        </div>
                    );
                }

                if (file.fileType.startsWith("video")) {
                    return (
                        <div key={i} className="video-container">
                            <video controls src={fileUrl}></video>
                        </div>
                    );
                }

                if (file.fileType.startsWith("application/pdf")) {
                    return (
                        <div key={i} className="file-item">
                            📄 <a href={fileUrl} target="_blank" rel="noopener noreferrer">PDF File</a>
                        </div>
                    );
                }

                return (
                    <div key={i} className="file-item">
                        📎 <a href={fileUrl} target="_blank" rel="noopener noreferrer">Download File</a>
                    </div>
                );
            });

            setData(fileElements);
        } catch (e) {
            console.error("Error fetching data:", e);
            alert("You don't have access or an error occurred");
        }
    };

    return (
        <>
            <div className="file-list">{data}</div>
            <input
                type="text"
                placeholder="Enter Address"
                className="address"
                value={inputAddress}
                onChange={(e) => setInputAddress(e.target.value)}
            />
            <button className="center button" onClick={getData}>Get Data</button>
        </>
    );
};

export default Display;



// import { useState } from "react";
// import "./Display.css";
// const Display = ({ contract, account }) => {
//     const [data, setData] = useState("");
//     const getData = async () => {
//         let dataArray; //this will consist of img urls seperated by commas
//         const OtherAddress = document.querySelector(".address").value;//here .address is classname of input field
//         try {
//             if (OtherAddress) {
//                 dataArray = await contract.display(OtherAddress);   //address entered in input
//             } else {
//                 dataArray = await contract.display(account); //if no address entered then display current account address
//             }
//         } catch (e) {
//             alert("You don't have access");
//         }

//         const isEmpty = Object.keys(dataArray).length === 0;

//         if (!isEmpty) {
//             const str = dataArray.toString(); //values are in Object, so convert them to string
//             const str_array = str.split(","); //split the values in dataArray
//             const images = str_array.map((item, i) => {
//                 return (
//                     <a href={item} key={i} target="_blank">
//                         <img key={i} src={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`} alt="new" className="image-list">


//                         </img>

//                     </a>
//                 )
//             });
//             setData(images);
//         } else {
//             alert("No image to display")
//         }
//     };
//     return <>
//         <div className="image-list">
//             {data}
//         </div>
//         <input type="text" placeholder="Enter Address" className="address"></input>
//         <button className="center button" onClick={getData}>Get Data</button>
//     </>


// }
// export default Display;


//..................................................................................................................

// import { useState } from "react";
// import "./Display.css";

// const Display = ({ contract, account }) => {
//     const [data, setData] = useState([]);
//     const [inputAddress, setInputAddress] = useState("");

//     const getData = async () => {
//         let dataArray;
//         try {
//             const addressToUse = inputAddress.trim() ? inputAddress : account;
//             dataArray = await contract.display(addressToUse);

//             if (!dataArray || dataArray.length === 0) {
//                 alert("No image to display");
//                 return;
//             }

//             const images = dataArray.map((item, i) => (
//                 <a href={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`} key={i} target="_blank" rel="noopener noreferrer">
//                     <img src={`https://gateway.pinata.cloud/ipfs/${item.substring(7)}`} alt="uploaded" className="image-list" />
//                 </a>
//             ));

//             setData(images);
//         } catch (e) {
//             console.error("Error fetching data:", e);
//             alert("You don't have access or an error occurred");
//         }
//     };

//     return (
//         <>
//             <div className="image-list">{data}</div>
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

//..........................................................................................................................



