import React from 'react';
import { DashboardIcon, SignOutIcon } from '../utils/constants';
import { useGlobalCtx } from '../context/global';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const { logout } = useGlobalCtx();
  const navigate = useNavigate();
  
  return (
    <main className='border md:w-[16%] h-screen'>
        <div className='flex flex-col'>
            <h2 className='p-8 mx-auto text-4xl text-primary font-semibold'>Logo</h2>
            <div className='flex items-center space-x-4 px-4 bg-[#1890FF]/20 py-3 border-r-4 border-r-[#1890FF] text-primary'>
            <DashboardIcon />
            <h3 className='text-[#1890FF] cursor-pointer'>Songs</h3>
            </div>
        </div>
        <div className='absolute bottom-8 mx-auto'>
          <div className='flex items-center space-x-4 px-4'>
          <SignOutIcon />
          <h2 className='text-lg cursor-pointer' onClick={() => {
            logout()
            navigate("/")
            }}>Logout</h2>
          </div>
        </div>
    </main>
  )
}
