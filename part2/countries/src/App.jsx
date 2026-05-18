import { useState, useEffect } from 'react'
import countryService from './services/countries'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    countryService.getAll().then(data => setCountries(data))
  }, [])

  // reset selected when search changes
  useEffect(() => {
    setSelected(null)
  }, [search])

  const filtered = countries.filter(c =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  )

  const renderResult = () => {
    if (!search) return null

    if (selected) return <CountryDetail country={selected} />

    if (filtered.length > 10)
      return <p>Too many matches, specify another filter</p>

    if (filtered.length === 1)
      return <CountryDetail country={filtered[0]} />

    return (
      <ul>
        {filtered.map(c => (
          <li key={c.cca3}>
            {c.name.common}
            <button onClick={() => setSelected(c)}>show</button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      <div>
        find countries <input value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      {renderResult()}
    </div>
  )
}

export default App