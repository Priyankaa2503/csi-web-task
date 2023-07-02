import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import SignInSide from '@/components/Login'
export default function Home() {
  return (
    <>
    <div className=''>
      <SignInSide/>
    </div>
    </>
  )
}
