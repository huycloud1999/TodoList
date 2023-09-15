import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub,faFacebook} from '@fortawesome/free-brands-svg-icons'
import styles from '../css/Footer.module.css'
function Footer() {
  return (
    <footer className="flex justify-between items-center px-5 bg-gray700 text-white py-6 ">
      <p className='font-bold text-base'>Copyright 2023! All rights reserved.</p>
      <div className="flex gap-2">
      <a href="http://github.com/huycloud1999"><FontAwesomeIcon icon={faGithub} className={styles['icon']} /></a> 
      <a href="http://fb.com/huycloud1999"><FontAwesomeIcon icon={faFacebook} className={styles['icon']} /></a>
      </div>
    </footer>
  )
}

export default Footer