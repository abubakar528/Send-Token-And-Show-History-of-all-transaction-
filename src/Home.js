import { ethers } from "ethers";
import React, { useState } from "react";


const Transfer = () => {
  const [loading, setLoading] = useState(null);
  const [amount, setAmount] = useState("");
  const [to, setTo] = useState("");
  const [connect, setConnect] = useState(false);
  // transfer ethers fucction 
  const transferEthers = async () => {
    setLoading(true);
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    const balance = await signer.getBalance();
    console.log(balance);
    const tx = await signer.sendTransaction({
      to: to,
      value: ethers.utils.parseEther(amount),

    });
   
    console.log(tx);
    // strignfy tx and save to local storage
    const txString = JSON.stringify(tx);
    localStorage.setItem("tx", txString);
    setLoading(false);
    provider.once(tx.hash, (transaction) => {
    provider.getTransactionReceipt(tx.hash).then((receipt) => {
    console.log(receipt);
    if(localStorage.getItem('hash') === null){

        localStorage.setItem("hash", JSON.stringify([{hash:tx.hash, status:receipt.status}]))
        }else{
            let hash = JSON.parse(localStorage.getItem('hash'))
            hash.push({hash:tx.hash, status:receipt.status})
            localStorage.setItem("hash", JSON.stringify(hash))
        }

   }).catch(error => {
    console.log(error);
   }    
    );
    })
}

  const connectWallet= async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner()
    const address = await signer.getAddress()
    console.log(address);
    setConnect(true);
  }
  return (
    <div className="transfer">
    <button className='cntBtn' onClick={connectWallet}>{connect ? "Connected" : "Connect Wallet"}</button>
    <h1>Transfer TOKEN</h1>
      <input placeholder="address"  onChange={(e)=>setTo(e.target.value)} id="mint1"></input>
      <input placeholder="amount" onChange={(e)=>setAmount(e.target.value)} id="mint2"></input>
      <button className="mintBtn" onClick={transferEthers}>
      {loading?"transfering......":
        "Transfer"
        }
      </button>
    </div>

  );
};
export default Transfer;
