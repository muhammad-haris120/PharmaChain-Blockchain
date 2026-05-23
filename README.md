# PharmaChain – Blockchain-Based Pharmaceutical Supply Chain

## 📌 Overview

**PharmaChain** is a blockchain-powered pharmaceutical supply chain management system designed to ensure **drug authenticity, transparency, and secure ownership transfer** throughout the medicine distribution process.

The project uses **Ethereum smart contracts**, **MetaMask wallet authentication**, and **QR code tracking** to monitor medicines from manufacturer to customer while preventing counterfeit drugs.

---

# 🚀 Features

## 🔹 Manufacturer Registration

Manufacturers can register products on the blockchain with unique product details.

### Includes:

* Product name
* Batch number
* Manufacturing date
* Expiry date
* Initial owner information

✔ Creates immutable blockchain records

---

## 🔹 QR Code Tracking

Each medicine package is assigned a unique QR code linked to its blockchain record. The QR can be scanned at any stage of the supply chain for secure and transparent product tracking.

✔ Enables real-time product tracing

---

## 🔹 Product Authentication & Verification

Users can scan a product QR code to verify authenticity, manufacturer details, and complete supply chain history through the web application.

✔ Helps detect counterfeit medicines

---

## 🔹 Wallet-Based Identity

Users authenticate using MetaMask wallets, where blockchain wallet addresses are linked with system roles such as Manufacturer, Distributor, Retailer, and Customer.

✔ Provides decentralized and secure authentication

---

## 🔹 Ownership Transfer

Ownership of products can be transferred securely between supply chain participants.

### Flow:

Manufacturer → Distributor → Retailer → Customer

✔ Every transfer is permanently stored on blockchain

---

## 🔹 Accept Product Feature

Users receiving ownership of a product must explicitly accept the transfer before ownership becomes final.

### Purpose:

* Prevent unauthorized transfers
* Ensure receiver confirmation
* Maintain trust in supply chain transactions

✔ Adds secure verification layer to ownership transfers

---

## 🔹 Sell Product (Retailer)

Retailers can sell products directly to customers/end users through the application.

### Includes:

* Final ownership transfer
* Product delivery completion
* End-to-end supply chain closure

✔ Creates a realistic pharmaceutical supply chain workflow

---

# 🛠 Technologies Used

## Frontend

* React.js
* TypeScript
* Tailwind CSS

## Blockchain

* Ethereum
* Solidity Smart Contracts
* MetaMask Wallet

## Development Tools

* Hardhat / Truffle (for smart contract deployment)
* Ethers.js / Web3.js
* QR Code Generator

---

# 🔐 Smart Contract Conditions

The smart contract enforces several important conditions:

## ✔ Only Authorized Roles Can Perform Actions

Different actions are restricted based on user role:

* Manufacturer can create products
* Distributor can receive products
* Retailer can sell products

---

## ✔ Ownership Validation

Only the current owner can transfer a product.

---

## ✔ Acceptance Required

Transferred products must be accepted by the receiver before ownership changes permanently.

---

## ✔ Immutable Records

Once product data is stored on blockchain, it cannot be modified or deleted.

---

## ✔ Product Verification

Users can verify:

* Authenticity
* Current owner
* Product history

---

# 🔄 Supply Chain Workflow

```text
Manufacturer
      ↓
Distributor
      ↓
Retailer
      ↓
Customer
```

Each step is verified and stored on blockchain.


# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd PharmaChain
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Start Frontend

```bash
npm run dev
```

---

## 4️⃣ Connect MetaMask

* Install MetaMask extension
* Connect wallet to local/test Ethereum network

---

## 5️⃣ Deploy Smart Contract

```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

# 🔍 How to Check Blockchain Transactions

You can verify all blockchain transactions using:

## Local Development

* Hardhat console/logs
* Ganache transaction explorer

## Public Blockchain

Use blockchain explorers like:

* Etherscan
* PolygonScan

Search using:

* Wallet address
* Transaction hash
* Smart contract address

---

# 📈 Future Improvements

Potential features to enhance PharmaChain:

* AI-based counterfeit detection
* IoT temperature monitoring
* Email/SMS shipment alerts
* Multi-chain support
* Mobile QR scanner app
* Admin analytics dashboard

---

# 🎯 Purpose of the Project

The main goal of PharmaChain is to:

* Prevent counterfeit medicines
* Increase transparency in pharmaceutical supply chains
* Ensure secure ownership tracking
* Build trust between manufacturers, distributors, retailers, and consumers
* Demonstrate practical blockchain implementation in healthcare logistics

---

# 👨‍💻 Developed Using

* React + TypeScript
* Ethereum Blockchain
* Solidity Smart Contracts
* MetaMask Authentication
* Tailwind CSS
