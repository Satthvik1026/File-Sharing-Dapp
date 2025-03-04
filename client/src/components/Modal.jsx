// import { useEffect } from "react";
// import "./Modal.css";

// const Modal = ({ setModalOpen, contract }) => {
//     const sharing = async () => {
//         const address = document.querySelector(".address").value;
//         if (!address) {
//             alert("Please enter an address");
//             return;
//         }
//         try {
//             await contract.allow(address);
//             alert("Access shared successfully!");
//         } catch (error) {
//             console.error("Error sharing access:", error);
//             alert("Failed to share access");
//         }
//     };

//     useEffect(() => {
//         const accessList = async () => {
//             const addressList = await contract.shareAccess();
//             let select = document.querySelector("#selectNumber");
//             const options = addressList;

//             for (let i = 0; i < options.length; i++) {
//                 let opt = options[i];
//                 let e1 = document.createElement("option");
//                 e1.textContent = opt;
//                 e1.value = opt;
//                 select.appendChild(e1);
//             }
//         }
//         contract && accessList();
//     }, [contract]);

//     return <>
//         <div className="modalBackground">
//             <div className="modalContainer">
//                 <div className="title">
//                     Share with
//                 </div>
//                 <div className="body">
//                     <input type="text" placeholder="Enter Address" className="address"></input>
//                 </div>
//                 <form id="myForm">
//                     <select id="selectNumber">
//                         <option className="address">People with access </option>
//                     </select>
//                 </form>
//                 <div className="footer">
//                     <button onClick={() => setModalOpen(false)} id="cancelBtn">
//                         Cancel
//                     </button>
//                     <button onClick={sharing}>
//                         Share
//                     </button>
//                 </div>
//             </div>
//         </div>
//     </>

// }

// export default Modal;

import { useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
    const sharing = async () => {
        const address = document.querySelector(".address").value;
        if (!address) {
            alert("Please enter an address");
            return;
        }
        try {
            await contract.allow(address);
            alert("Access shared successfully!");
        } catch (error) {
            console.error("Error sharing access:", error);
            alert("Failed to share access");
        }
    };

    useEffect(() => {
        const accessList = async () => {
            try {
                const addressList = await contract.shareAccess();
                let select = document.querySelector("#selectNumber");

                addressList.forEach((opt) => {
                    let e1 = document.createElement("option");
                    e1.textContent = opt;
                    e1.value = opt;
                    select.appendChild(e1);
                });
            } catch (error) {
                console.error("Error fetching access list:", error);
            }
        };

        if (contract) {
            accessList();
        }
    }, [contract]);

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">Share with</div>
                <div className="body">
                    <input type="text" placeholder="Enter Address" className="address" />
                </div>
                <form id="myForm">
                    <select id="selectNumber">
                        <option value="">People with access</option>
                    </select>
                </form>
                <div className="footer">
                    <button onClick={() => setModalOpen(false)} id="cancelBtn">
                        Cancel
                    </button>
                    <button onClick={sharing}>Share</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
