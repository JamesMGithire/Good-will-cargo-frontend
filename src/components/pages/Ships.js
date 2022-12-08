import { useRef, useState } from 'react'
import Booking from './Booking'

export default function Ships({ cargoShips }) {
  const bookingParentDiv = useRef()
  const bookingForm = (
    <form>
      <div>
        <input type="number" placeholder="cargos" />
      </div>
      <button>Book</button>
    </form>
  )

  function handleBook() {
    if (bookingParentDiv.current.classList.value.includes("active")){
      bookingParentDiv.current.classList.remove('active')
    }else{
      bookingParentDiv.current.classList.add('active')
    }
    console.log(bookingParentDiv.current.classList)
  }
  return (
    <>
      <div className="cargo-ships-page">
      <div ref={bookingParentDiv} className="booking-parent-div">
        {/* <Booking form={bookingForm}></Booking> */}
      </div>
        {cargoShips.map((ship) => (
          <ShipDiv key={ship.id} ship={ship} handleBook={handleBook}/>
        ))}
      </div>
    </>
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
      detailsDiv.current.classList.remove('active')
    } else {
      detailsDiv.current.classList.add('active')
    }
  }

  return (
    <>
      <div className="ship-card">
        <div
          className="ship-img-div"
          style={{ backgroundImage: `url(${img_url})` }}
          onClick={displayDetails}
        >
          <p>{current_location} <strong> to </strong> {destination}</p>
        </div>
        <div id={id} ref={detailsDiv} className="ship-details">
          <div>
            <p>Name :</p>
            <p> {name}</p>
          </div>
          <div>
            <p>
              {current_location} <strong> to </strong> {destination}
            </p>
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
          <button onClick={props.handleBook}>Book</button>
        </div>
      </div>
    </>
  )
}
