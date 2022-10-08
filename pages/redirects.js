import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { redirects } from './api/redirect/redirects'

function Redirects() {
  const inputRef = useRef()
  const [filter, setFilter] = useState('')
  const [filteredRedirects, setFilteredRedirects] = useState(redirects)
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const params = (new URL(document.location)).searchParams;
    const filterParam = params.get('filter')
    setFilter(filterParam || '')
  }, [])

  const filterRedirects = (list) => {
    return list.filter(({ name, aliases = [] }) => {
      const nameMatch = name.toLowerCase().includes(filter.toLowerCase())
      const aliasMatch = aliases.some(alias => alias.toLowerCase().includes(filter.toLowerCase()))
      return nameMatch || aliasMatch
    })
  }

  useEffect(() => {
    const newFilteredRedirects = filterRedirects(redirects)
    if (newFilteredRedirects.length < selectedIndex) {
      setSelectedIndex(null)
    }
    setFilteredRedirects(newFilteredRedirects)
  }, [filter])

  useEffect(() => {
    document.onkeydown = function(evt) {
      evt = evt || window.event
      switch (evt.key) {
        case 'Esc':
        case 'Escape':
          setFilter('')
          setSelectedIndex(null)
          break;
        case 'ArrowUp':
          if (selectedIndex > 0) {
            setSelectedIndex(prev => prev - 1)
          }
          break;
        case 'ArrowDown':
          if (!selectedIndex || selectedIndex < filteredRedirects.length - 1) {
            setSelectedIndex(prev => prev === null ? 0 : prev + 1)
          }
          break;
        case 'Enter':
          let href
          if (selectedIndex) {
            href = filteredRedirects[selectedIndex].url || '/api/redirect/' + filteredRedirects[selectedIndex].name
          } else {
            href = filteredRedirects[0].url || '/api/redirect/' + filteredRedirects[0].name
          }
          window.location.href = href
        default:
          console.log('evt', evt)
          if (inputRef.current) {
            inputRef.current.focus()
          }
          break;
      }
    }
  }, [filteredRedirects, selectedIndex])

  return (
    <div style={{ paddingTop: 20 }}>
      <Link href='/' passHref><a style={{ textDecoration: 'none' }}>{'<- Back'}</a></Link>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 40 }}>
        <div style={{ minWidth: 300, maxWidth: 500, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input ref={inputRef} autoFocus autocomplete="off" name="filter" id="filter" type="text" placeholder='redirects' value={filter} onChange={(e) => setFilter(e.target.value)} style={{ width: '100%', height: 50, paddingLeft: 20, fontSize: 20, marginBottom: 20, borderRadius: 30 }} />
          <ul style={{ listStyle: 'inside', width: '100%', paddingLeft: 0 }}>
            {filteredRedirects.map(({ name, url, aliases = [] }, index) => (
              <li key={name} title={aliases.join(', ')} style={{ fontSize: 20, marginBottom: 10, backgroundColor: index === selectedIndex ? '#d3d3d330' : null, borderRadius: 20, padding: 20 }}>
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
    </div>
  )
}

export default Redirects