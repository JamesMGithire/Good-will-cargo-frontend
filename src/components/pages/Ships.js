import { useRef } from 'react'

export default function Ships({ cargoShips }) {
  return (
    <div className="cargo-ships-page">
      {cargoShips.map((ship) => (
        <ShipDiv key={ship.id} ship={ship} />
      ))}
    </div>
  )
}

function ShipDiv(props) {
  const {
    id,
    name,
    img_url,
    capacity,
    remaining,
    current_location,
    destination,
    leaving_date,
    rate_per_cargo,
  } = props.ship

  const detailsDiv = useRef()

  function displayDetails() {
    if (detailsDiv.current.classList.value.includes('active')) {
      detailsDiv.current.classList.remove("active")
    } else {
      detailsDiv.current.classList.add("active")
    }
  }

  return (
    <div className="ship-card">
      <div
        className="ship-img-div"
        style={{ backgroundImage: `url(${img_url})` }}
        onClick={displayDetails}
      >
        <p>{name}</p>
      </div>
      <div id={id} ref={detailsDiv} className="ship-details">
        <div>
          <p>Name :</p>
          <p> {name}</p>
        </div>
        <div>
          <p>{current_location} <strong> to </strong> {destination}</p>
        </div>
        <div>
          <p>Leaving :</p>
          <p> {leaving_date}</p>
        </div>
        <div>
          <p>Rate Per Cargo :</p>
          <p>Ksh.{rate_per_cargo}</p>
        </div>
        <div>
          <p>Capacity :</p>
          <p>{capacity}</p>
        </div>
        <div>
          <p>Remaining : </p>
          <p>{remaining}</p>
        </div>
        <button>Book</button>
      </div>
    </div>
  )
}
