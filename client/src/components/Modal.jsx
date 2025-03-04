
import { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
    const [sharedUsers, setSharedUsers] = useState([]);
    const [inputAddress, setInputAddress] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    const sharing = async () => {
        if (!inputAddress.trim()) {
            alert("Please enter a valid address");
            return;
        }
        try {
            await contract.allow(inputAddress);
            alert("Access shared successfully!");
            setInputAddress(""); // Clear input field after successful sharing
            fetchAccessList(); // Refresh access list
        } catch (error) {
            console.error("Error sharing access:", error);
            alert("Failed to share access");
        }
    };

    const revokeAccess = async () => {
        if (!selectedUser) {
            alert("Please select a user to revoke access");
            return;
        }
        try {
            await contract.disallow(selectedUser);
            alert("Access revoked successfully!");
            fetchAccessList(); // Refresh access list
        } catch (error) {
            console.error("Error revoking access:", error);
            alert("Failed to revoke access");
        }
    };

    const fetchAccessList = async () => {
        try {
            const addressList = await contract.shareAccess();
            const formattedList = addressList.map((entry) => entry.user); // Extract users
            setSharedUsers(formattedList);
        } catch (error) {
            console.error("Error fetching access list:", error);
        }
    };

    useEffect(() => {
        if (contract) {
            fetchAccessList();
        }
    }, [contract]);

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">Manage Access</div>
                <div className="body">
                    <input
                        type="text"
                        placeholder="Enter Address"
                        value={inputAddress}
                        onChange={(e) => setInputAddress(e.target.value)}
                        className="address"
                    />
                </div>
                <form id="myForm">
                    <select id="selectNumber" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">People with access</option>
                        {sharedUsers.map((user, index) => (
                            <option key={index} value={user}>
                                {user}
                            </option>
                        ))}
                    </select>
                </form>
                <div className="footer">
                    <button onClick={() => setModalOpen(false)} id="cancelBtn">Cancel</button>
                    <button onClick={sharing}>Share</button>
                    <button onClick={revokeAccess} disabled={!selectedUser}>Revoke</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;





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
//             try {
//                 const addressList = await contract.shareAccess();
//                 let select = document.querySelector("#selectNumber");

//                 addressList.forEach((opt) => {
//                     let e1 = document.createElement("option");
//                     e1.textContent = opt;
//                     e1.value = opt;
//                     select.appendChild(e1);
//                 });
//             } catch (error) {
//                 console.error("Error fetching access list:", error);
//             }
//         };

//         if (contract) {
//             accessList();
//         }
//     }, [contract]);

//     return (
//         <div className="modalBackground">
//             <div className="modalContainer">
//                 <div className="title">Share with</div>
//                 <div className="body">
//                     <input type="text" placeholder="Enter Address" className="address" />
//                 </div>
//                 <form id="myForm">
//                     <select id="selectNumber">
//                         <option value="">People with access</option>
//                     </select>
//                 </form>
//                 <div className="footer">
//                     <button onClick={() => setModalOpen(false)} id="cancelBtn">
//                         Cancel
//                     </button>
//                     <button onClick={sharing}>Share</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;
