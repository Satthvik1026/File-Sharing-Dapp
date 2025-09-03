import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="p-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tighter">Gdrive 3.0</h1>
                <Link to="/app" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Launch App
                </Link>
            </header>

            {/* Hero Section */}
            <main className="flex flex-col items-center justify-center text-center px-4" style={{ height: '70vh' }}>
                <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                    Decentralized File Storage & Sharing
                </h2>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-8">
                    Your Files, Your Control. Securely store and share your files on a decentralized network, managed by a smart contract on the blockchain.
                </p>
                <Link to="/app" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105">
                    Get Started
                </Link>
            </main>

            {/* Features Section */}
            <section className="bg-gray-800 py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h3 className="text-4xl font-bold mb-12">Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                        {/* Feature 1 */}
                        <div className="p-8 bg-gray-900 rounded-lg">
                            <div className="text-green-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>
                            </div>
                            <h4 className="text-2xl font-semibold mb-2">Decentralized Storage</h4>
                            <p className="text-gray-400">
                                Files are stored on IPFS, a distributed network, ensuring your data is never held by a single entity.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-gray-900 rounded-lg">
                            <div className="text-blue-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </div>
                            <h4 className="text-2xl font-semibold mb-2">Blockchain Security</h4>
                            <p className="text-gray-400">
                                Ownership and access permissions are managed immutably on a secure Ethereum smart contract.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-gray-900 rounded-lg">
                            <div className="text-purple-400 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
                            </div>
                            <h4 className="text-2xl font-semibold mb-2">Total Control</h4>
                            <p className="text-gray-400">
                                You have full sovereign control. Grant and revoke access to your files at any time, to any Ethereum address.
                            </p>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;