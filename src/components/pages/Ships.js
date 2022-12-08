export default function Ships({ cargoShips }) {
  return (
    <div className="cargo-ships-page">
      {cargoShips.map((ship) => (
        <ShipDiv ship={ship} />
      ))}
    </div>
  )
}

function ShipDiv(props) {
  const {
    name,
    capacity,
    remaining,
    current_location,
    destination,
    leaving_date,
    rate_per_cargo,
  } = props.ship
  console.log(name)
  return (
    <div className="ship-card">
      <div className="ship-img-div"></div>
      <div className="ship-details">
        <div>
          <p>Name :</p><p> {name}</p>
        </div>
        <div>
          <p>{current_location + 'to' + destination}</p>
        </div>
        <div>
          <p>Leaving:</p><p> {leaving_date}</p>
        </div>
        <div>
          <p>Rate Per Cargo:</p><p>{rate_per_cargo}</p>
        </div>
        <div>
          <p>Capacity: </p><p>{capacity}</p>
        </div>
        <div>
          <p>Remaining: </p><p>{remaining}</p>
        </div>
        <button>Book</button>
      </div>
    </div>
  )
}
