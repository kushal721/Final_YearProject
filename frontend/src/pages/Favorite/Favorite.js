import React from 'react'
import Header from '../../components/Header/Header'
import { useAuthContext } from '../../hooks/useAuthContext'

import NavbarComp from '../../components/Navbar/Navbar';
const Favorite = () => {
  const { user } = useAuthContext();
  return (
    <div>
     <NavbarComp/>
      <div>this is favorite</div>
    </div>
  )
}

export default Favorite
