import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import xwallet from "../providers/xwallet";
import zelcore from "../providers/zelcore";
import { connectWithProvider } from "../store/kadenaSlice";
import { hideModal } from "../store/modalSlice";

function ConnectWalletModal(props) {
  const dispatch = useDispatch();
  const shouldShow = useSelector(state => state.connectWalletModal.showing);
  const newMessage = useSelector(state => state.kadenaInfo.newMessage);
  const newTransaction = useSelector(state => state.kadenaInfo.newTransaction);

  const closeModal = () => {
    dispatch(hideModal());
  }

  const connectXWalletClicked = () => {
    dispatch(connectWithProvider(xwallet));
  }

  const connectZelcoreClicked = () => {
    dispatch(connectWithProvider(zelcore));
  }

  useEffect(() => {
    if (props.onNewTransaction) {
      props.onNewTransaction(newTransaction);
    }
  }, [newTransaction]);

  useEffect(() => {
    if (props.onNewMessage) {
      props.onNewMessage(newMessage);
    }
  }, [newMessage]);

  if (!shouldShow) {
    return null;
  }

  const modalStyle = props.modalStyle ? props.modalStyle : "border-white border-4 rounded-md py-4 px-8 shadow-lg min-w-max max-w-xl flex flex-col space-y-4 bg-slate-800";
  const buttonStyle = props.buttonStyle ? props.buttonStyle : "border-white border-2 rounded-md h-16 px-10 py-2 hover:border-red-400 active:border-red-700 focus:border-red-500 transition duration-150 ease-out";

  return (
    <div className="z-50 bg-blend-darken bg-black bg-opacity-50 transition duration-300 ease-in-out fixed top-0 left-0 w-full h-full overflow-x-hidden overflow-y-auto flex flex-col justify-center place-items-center">
      {/* <div className="w-full flex flex-row justify-center pointer-events-none"> */}
      <div className={modalStyle}>
        <div className="flex flex-row justify-between space-x-10">
          <span className="text-3xl">Connect Wallet</span>
          <button
            className="text-3xl"
            onClick={closeModal}
          >X</button>
        </div>
        <button
          className={buttonStyle}
          onClick={connectXWalletClicked}>
          X WALLET
        </button>
        <button
          className={buttonStyle}
          onClick={connectZelcoreClicked}>
          ZELCORE
        </button>
      </div>
      {/* </div> */}
    </div >
  );
}

export default ConnectWalletModal;