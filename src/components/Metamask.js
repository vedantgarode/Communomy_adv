import React, { useState } from "react";

import Signup from "./Signup";
export const Wallet = () => {
    const [walletAdd, setwallAdd] = useState("");
    async function getAccount() {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const account = accounts[0];
        return account;
    }
const handleMetamask=()=>{
    if (typeof window !== "undefined") {
        getAccount().then((res) => {
            setwallAdd(res);
            // getBalnce(res);
            const account = res;
            return account;
        });
    }

}
 

    return (
        <>


            <Signup walletAdd={walletAdd} />
            <button
            
                onClick={handleMetamask}
            >
                Connect Metamask
            </button>
        </>
    )
}
