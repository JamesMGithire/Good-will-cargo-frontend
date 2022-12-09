import { useRef } from 'react'

export default function ShipDiv(props) {
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
  const shipImgDiv = useRef()

  function displayDetails() {
    if (detailsDiv.current.classList.value.includes('active')) {
      detailsDiv.current.classList.remove('active')
      shipImgDiv.current.classList.remove('active')
    } else {
      shipImgDiv.current.classList.add('active')
      detailsDiv.current.classList.add('active')
    }
  }

  return (
    <>
      <div className="ship-card">
        <div
          ref={shipImgDiv}
          className="ship-img-div"
          style={{ backgroundImage: `url(${img_url})` }}
          onClick={displayDetails}
        >
          <p>
            {current_location} <strong> to </strong> {destination}
          </p>
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
            <p>Ksh.{rate_per_cargo.toLocaleString()}</p>
          </div>
          <div>
            <p>Capacity :</p>
            <p>{capacity}</p>
          </div>
          <div>
            <p>Remaining : </p>
            <p>{remaining}</p>
          </div>
          {props.handleBook && <button onClick={() => props.handleBook(props.ship)}>Book</button>}
        </div>
      </div>
    </>
  )
}
