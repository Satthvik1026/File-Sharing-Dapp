const hre = require("hardhat");

async function main() {
    const Upload = await hre.ethers.getContractFactory("Upload");
    const upload = await Upload.deploy(); // Deploy contract

    await upload.waitForDeployment(); // Wait for deployment

    console.log("Upload contract deployed to:", await upload.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
// 0x5FbDB2315678afecb367f032d93F642f64180aa3