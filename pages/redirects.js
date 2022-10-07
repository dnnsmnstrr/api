import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { redirects } from './api/redirect/redirects'

function Redirects() {
  const inputRef = useRef()
  const [filter, setFilter] = useState('')
  const [filteredRedirects, setFilteredRedirects] = useState(redirects)

  const filterRedirects = (list) => {
    return list.filter(({ name, aliases = [] }) => {
      const nameMatch = name.toLowerCase().includes(filter.toLowerCase())
      const aliasMatch = aliases.some(alias => alias.toLowerCase().includes(filter.toLowerCase()))
      return nameMatch || aliasMatch
    })
  }

  useEffect(() => {
    const newFilteredRedirects = filterRedirects(redirects)
    setFilteredRedirects(newFilteredRedirects)
    document.onkeydown = function(evt) {
      evt = evt || window.event
      let isEscape = false
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        setFilter('')
      }
      if (evt.key === 'Enter' && filteredRedirects.length === 1) {
        window.location.href = filteredRedirects[0].url
      }
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }
  }, [filter])

  return (
    <div>
      <Link href='/' passHref><a style={{ textDecoration: 'none' }}>{'<- Back'}</a></Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 80 }}>
        <form>
          <input ref={inputRef} autofocus name="filter" id="filter" type="text" placeholder='redirects' value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: 300, height: 50, paddingLeft: 20, fontSize: 20, marginBottom: 20, borderRadius: 30 }} />
        </form>
        <ul>
          {filteredRedirects.map(({ name, url, aliases = [] }) => (
            <li key={name} title={aliases.join(', ')} style={{ fontSize: 20, marginBottom: 10 }}>
              <a href={`api/redirect/${name}`}>
                {name}
              </a>
            </li>
          ))}
        </ul>
        {filteredRedirects.length === 0 && (
          <div onClick={() => setFilter('')}>
            No redirects found
          </div>
        )}
      </div>
    </div>
  )
}

export default Redirects