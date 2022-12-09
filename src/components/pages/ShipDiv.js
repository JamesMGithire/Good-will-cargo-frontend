import { useRef } from 'react'
import { useLoggedInContext } from '../../context/LoggedIn'

export default function ShipDiv(props) {
  const {
    loggedIn: { user },
  } = useLoggedInContext()
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
        <div
          id={id}
          ref={detailsDiv}
          className={props.count ? 'ship-details profile' : 'ship-details'}
        >
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
          {props.count && (
            <div>
              <p>Booked : </p>
              <p>{props.count}</p>
            </div>
          )}
          {user && (
            <>
              {props.handleBook ? (
                <button onClick={() => props.handleBook(props.ship)}>
                  Book
                </button>
              ) : (
                <>
                  <button
                    id="cancel-booking"
                    onClick={() => props.handleCancelClick(props.id)}
                  >
                    Cancel
                  </button>
                  <button onClick={() => props.handleChangeClick(props.id)}>
                    Change Details
                  </button>
                </>
              )}
            </>
          )}
          {props.amount && (
            <div>
              <p>Total : </p>
              <p>Ksh. {props.amount.toLocaleString()}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
