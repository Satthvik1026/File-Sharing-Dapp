
// import { useState, useEffect } from "react";
// import "./Modal.css";

// const Modal = ({ setModalOpen, contract }) => {
//     const [sharedUsers, setSharedUsers] = useState([]);
//     const [inputAddress, setInputAddress] = useState("");
//     const [selectedUser, setSelectedUser] = useState("");

//     const sharing = async () => {
//         if (!inputAddress.trim()) {
//             alert("Please enter a valid address");
//             return;
//         }
//         try {
//             await contract.allow(inputAddress);
//             alert("Access shared successfully!");
//             setInputAddress(""); // Clear input field after successful sharing
//             fetchAccessList(); // Refresh access list
//         } catch (error) {
//             console.error("Error sharing access:", error);
//             alert("Failed to share access");
//         }
//     };

//     const revokeAccess = async () => {
//         if (!selectedUser) {
//             alert("Please select a user to revoke access");
//             return;
//         }
//         try {
//             await contract.disallow(selectedUser);
//             alert("Access revoked successfully!");
//             fetchAccessList(); // Refresh access list
//         } catch (error) {
//             console.error("Error revoking access:", error);
//             alert("Failed to revoke access");
//         }
//     };

//     const fetchAccessList = async () => {
//         try {
//             const addressList = await contract.shareAccess();
//             const formattedList = addressList.map((entry) => entry.user); // Extract users
//             setSharedUsers(formattedList);
//         } catch (error) {
//             console.error("Error fetching access list:", error);
//         }
//     };

//     useEffect(() => {
//         if (contract) {
//             fetchAccessList();
//         }
//     }, [contract]);

//     return (
//         <div className="modalBackground">
//             <div className="modalContainer">
//                 <div className="title">Manage Access</div>
//                 <div className="body">
//                     <input
//                         type="text"
//                         placeholder="Enter Address"
//                         value={inputAddress}
//                         onChange={(e) => setInputAddress(e.target.value)}
//                         className="address"
//                     />
//                 </div>
//                 <form id="myForm">
//                     <select id="selectNumber" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
//                         <option value="">People with access</option>
//                         {sharedUsers.map((user, index) => (
//                             <option key={index} value={user}>
//                                 {user}
//                             </option>
//                         ))}
//                     </select>
//                 </form>
//                 <div className="footer">
//                     <button onClick={() => setModalOpen(false)} id="cancelBtn">Cancel</button>
//                     <button onClick={sharing}>Share</button>
//                     <button onClick={revokeAccess} disabled={!selectedUser}>Revoke</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;


import { useState, useEffect } from "react";

const Modal = ({ contract, setModalOpen }) => {
    const [sharedUsers, setSharedUsers] = useState([]);
    const [shareAddress, setShareAddress] = useState("");
    const [selectedUser, setSelectedUser] = useState("");

    useEffect(() => {
        const fetchAccessList = async () => {
            if (contract) {
                try {
                    const addressList = await contract.shareAccess();
                    const formattedList = addressList
                        .filter(item => item.access === true)
                        .map((item) => item.user);
                    setSharedUsers(formattedList);
                } catch (error) {
                    console.error("Error fetching access list:", error);
                }
            }
        };
        fetchAccessList();
    }, [contract]);

    const handleSharing = async () => {
        if (!shareAddress.trim()) return alert("Please enter a valid address");
        try {
            await contract.allow(shareAddress);
            alert("Access shared successfully!");
            setModalOpen(false);
        } catch (error) {
            console.error("Error sharing access:", error);
            alert("Failed to share access.");
        }
    };

    const handleRevoke = async () => {
        if (!selectedUser) return alert("Please select a user to revoke");
        try {
            await contract.disallow(selectedUser);
            alert("Access revoked successfully!");
            setModalOpen(false);
        } catch (error) {
            console.error("Error revoking access:", error);
            alert("Failed to revoke access.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-lg text-center">
                <h2 className="text-2xl font-bold mb-6">Manage Access</h2>

                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Enter Address to Share With"
                        value={shareAddress}
                        onChange={(e) => setShareAddress(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleSharing}
                        className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                        Share Access
                    </button>
                </div>

                <div>
                    <select
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                        className="w-full p-3 bg-gray-700 border border-gray-600 rounded-md mb-3"
                    >
                        <option value="">Select User to Revoke</option>
                        {sharedUsers.map((user, index) => (
                            <option key={index} value={user}>{user}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleRevoke}
                        disabled={!selectedUser}
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Revoke Access
                    </button>
                </div>

                <button
                    onClick={() => setModalOpen(false)}
                    className="mt-8 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;