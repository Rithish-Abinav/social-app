import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
 <footer>
    <Link  href='/all-users'>All Users</Link>
    <Link href='/'>Feeds</Link>
    <Link  href='/friend-request'>Friends</Link>
 </footer>
  )
}
