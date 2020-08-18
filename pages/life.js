import React from 'react'
import Link from 'next/link'
import LifeTimeline from '../components/LifeTimeline'
import events from '../events.json'

export async function getStaticProps (context) {
  const response = await fetch('https://next.muensterer.xyz/api/events')
  console.log('response', response)
  const events = await response.json()
  return {
    props: { events }
  }
}

export default function Life ({ eventss = [] }) {

  return (
    <div>
      <div>
        Back to{' '}
        <Link href="/" as={process.env.BACKEND_URL || '' + '/'}>
          <a>Home</a>
        </Link>
        <h1>Dennis Muensterer - Life by Weeks</h1>
        <LifeTimeline
          subject={{ name: 'Dennis', birthday: new Date('1997-06-16') }}
          events={events}
        />
      </div>
    </div>
  )
}
