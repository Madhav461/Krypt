import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import 'web3'
import { contractABI, contractAddress } from "../utils/constants";
import { shortenAddress } from "../utils/shortenAddress";
export const TransactionContext = React.createContext();

const { ethereum } = window;
// const ethers = require("ethers");
// const BigNumber  = require("ethers");

const createEthereumContract = () => {
  // const provider = new ethers.providers.Web3Provider(ethereum);
  const provider = new ethers.providers.Web3Provider(ethereum);

  // MetaMask requires requesting permission to connect users accounts

  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(contractAddress, contractABI);

  // return transactionsContract;
  console.log(
   "Provider:",
   provider,
   "Signer:",
   signer,
   "trabndsj,b:",
   transactionsContract,
  )
};

export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
  // const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  // const getAllTransactions = async () => {
  //   try {
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract();

  //       const availableTransactions = await transactionsContract.getAllTransactions();

  //       const structuredTransactions = availableTransactions.map((transaction) => ({
  //         addressTo: transaction.receiver,
  //         addressFrom: transaction.sender,
  //         timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
  //         message: transaction.message,
  //         keyword: transaction.keyword,
  //         amount: parseInt(transaction.amount._hex) / (10 ** 18)
  //       }));

  //       console.log(structuredTransactions);

  //       setTransactions(structuredTransactions);
  //     } else {
  //       console.log("Ethereum is not present");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });
        console.log(accounts);
      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        // getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum object");
    }
  };

  // const checkIfTransactionsExists = async () => {
  //   try {
  //     if (ethereum) {
  //       const transactionsContract = createEthereumContract();
  //       const currentTransactionCount = await transactionsContract.getTransactionCount();

  //       window.localStorage.setItem("transactionCount", currentTransactionCount);
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  // };
  // const data1="newdata from transactions context";

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_requestAccounts", });

      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if(!ethereum) return alert("Please intsall Metamask!!");
      const {addressTo,amount,keyword,message}=formData;
      const transactionContract=createEthereumContract();
      const parsedAmount=ethers.utils.parseEther(amount);
      await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                  from: currentAccount,
                  to: addressTo,
                  gas: "0x5208",
                  value: parsedAmount._hex,
                }],
              });

      const transactionHash=await transactionContract.addToBlockchain(addressTo,parsedAmount,message,keyword);
      setIsLoading(true);
      console.log(`Loading- ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(flase);
      console.log(`Success-${transactionHash.hash}`);

      const transactionCount=await transactionContract.getTransactioncount();
    }
    catch(error){
      console.log(error);
      console.log("this error is from sendTransactions functin;");
    }
  //     if (ethereum) {
  //       const { addressTo, amount, keyword, message } = formData;
  //       const transactionsContract = createEthereumContract();
  //       const parsedAmount = ethers.utils.parseEther(amount);

  //       await ethereum.request({
  //         method: "eth_sendTransaction",
  //         params: [{
  //           from: currentAccount,
  //           to: addressTo,
  //           gas: "0x5208",
  //           value: parsedAmount._hex,
  //         }],
  //       });

  //       const transactionHash = await transactionsContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

  //       setIsLoading(true);
  //       console.log(`Loading - ${transactionHash.hash}`);
  //       await transactionHash.wait();
  //       console.log(`Success - ${transactionHash.hash}`);
  //       setIsLoading(false);

  //       const transactionsCount = await transactionsContract.getTransactionCount();

  //       setTransactionCount(transactionsCount.toNumber());
  //     } else {
  //       console.log("No ethereum object");
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  };

  useEffect(() => {
    checkIfWalletIsConnect();

    // checkIfTransactionsExists();
  }, [currentAccount]);

  return (
    <TransactionContext.Provider
      value={{
        // transactionCount,
        connectWallet,
        //  transactions,
        currentAccount,
        // isLoading,
        // sendTransaction,
         
        formData,
        setformData,
        handleChange,
        sendTransaction,
        
        // data1,
        // value:"data from transaction context",
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};