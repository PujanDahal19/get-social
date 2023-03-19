import React, { useContext, useState } from 'react'
import { PostContext } from '../../context/PostContext'
import Mainbar from '../Mainbar/Mainbar'
import Popup from '../Popup/Popup'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Home = () => {
  const {openModal, setOpenModal} = useContext(PostContext);
  return (
    <div className='container'>
      <Navbar />
      <div className="bar-container">
        <Mainbar />
        <Sidebar setOpenModal={setOpenModal} />
      </div>
      <Popup open={openModal} onClose={()=> setOpenModal(false)} />
    </div>
  )
}

export default Home