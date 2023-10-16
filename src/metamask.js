import React, {useState} from 'react';
import { ethers  } from 'ethers';
import './style.css';

const MetaMask = () => {
   
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaulAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  

  const connectWallet= () => {
    if(window.ethereum){
      window.ethereum.request({method:'eth_requestAccounts'})
      .then(result => {
        accountChanged([result[0]])
      })
    } else {
      setErrorMessage('Install MetaMask!')
    }
  }

  const accountChanged = (accountName) => {
    setDefaultAccount(accountName)
    getUserBalance(accountName)
  }
  
  const getUserBalance = (accountAddress) =>{
    window.ethereum.request({method:'eth_getBalance', params:[String(accountAddress) , "latest"]})
    .then(balance =>{
      setUserBalance(ethers.formatEther(balance));
    })
  }
  
  async function sendTransaction (e) {
    let params =[{
      from : e.target.to_address.value,
      to:"0x0f0444ad73588236beb019049ff9b2f9d80bd484",
      gas:Number(21000).toString(16),
      gasPrice: Number(2500000).toString(16),
      value:Number(10000000000000000).toString(16)
    }]

    let result = await window.ethereum.request({method:"eth_sendTransaction", params}).catch((err)=>{
      console.log(err)
    })

  }

  return (

    <>
      <p>MetaMask Connection</p>
    
      <button onClick={connectWallet}>Connect Wallet Button</button>
      <p>Address: {defaulAccount} </p>
      <p>Price:  0,013 Eth </p>
      
       <form onSubmit={sendTransaction}> 
       <p>Enter Address:</p>
       <input type="text" name="from_address" placeholder="Your Address:"/>
       <input type="submit" value="Submit"/>
       </form>

    
     {errorMessage}
    </>
  )
}

export default MetaMask;