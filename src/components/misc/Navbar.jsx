import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { KadenaKodeLogo } from '../../assets';
import { disconnectProvider } from '../../kda-wallet/store/kadenaSlice';
import { showConnectWalletModal } from '../../kda-wallet/store/connectWalletModalSlice';
import reduceToken from '../../kda-wallet/utils/reduceToken';
import CustomButton from '../layout/CustomButton'
import FlexRow from '../layout/FlexRow';

function Navbar() {
  const account = useSelector(state => state.kadenaInfo.account);
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(showConnectWalletModal());
  }

  const disconnect = () => {
    dispatch(disconnectProvider());
  }

  const goToGithub = () => {
    location.href = 'https://github.com/Luzzotica/KadenaKode';
  }

  return (
    <nav className="w-full flex flex-row space-x-2 justify-between place-items-center p-2 h-20">

      <FlexRow className="gap-2">
        <CustomButton
          className='flex-1 sm:flex-none'
          text='Github'
          onClick={goToGithub} />
        <CustomButton
          className='flex-1 sm:flex-none'
          text={account === '' ? "Connect Wallet" : "Disconnect"}
          onClick={account === '' ? openModal : disconnect} />
          
          <span>Account:</span>
          <span className='break-all'>{account}</span>
      </FlexRow>
    </nav>
  )
}

export default Navbar
