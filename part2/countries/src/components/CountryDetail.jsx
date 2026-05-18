import Weather from './Weather'

const CountryDetail = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <p>capital {country.capital?.[0]}</p>
    <p>area {country.area}</p>
    <h3>languages</h3>
    <ul>
      {Object.values(country.languages || {}).map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
    <img
      src={country.flags.svg}
      alt={`flag of ${country.name.common}`}
      width={150}
    />
    <Weather capital={country.capital?.[0]} />
  </div>
)

export default CountryDetail