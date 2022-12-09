import { useRef, useState } from 'react'
import Booking from './Booking'
import ShipDiv from './ShipDiv'

export default function Ships({ cargoShips }) {
  const bookingParentDiv = useRef()
  const bookingSuperParentDiv = useRef()
  const [bookingForm, setForm] = useState(<></>)
  const bookButton = useRef()
  const countInput = useRef()

  function closeBookingForm() {
    if (countInput.current) {
      countInput.current.value = 0
    }
    if (bookingParentDiv.current.classList.value.includes('active')) {
      bookingParentDiv.current.classList.remove('active')
      bookingSuperParentDiv.current.classList.remove('active')
    } else {
      bookingParentDiv.current.classList.add('active')
      bookingSuperParentDiv.current.classList.add('active')
    }
  }
  function handleBook(ship) {
    let count = 0
    closeBookingForm()
    function handleBooking(e, id) {
      let isBooking = e.target.textContent == 'Book' && count > 0
      if (isBooking) {
        console.log({ count: parseInt(count), cargo_ship_id: id })

        fetch('/user_cargos', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: parseInt(count), cargo_ship_id: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            closeBookingForm()
          })
          .catch((e) => console.error(e))
      } else if (count == 0) {
        closeBookingForm()
      } else {
        countInput.current.value = 0
      }
    }
    function hanldeCountChange(e) {
      count = e.target.value
      if (count > ship.remaining || count < 1) {
        bookButton.current.style.backgroundColor = 'red'
        bookButton.current.textContent = 'Cancel'
      } else {
        bookButton.current.style.backgroundColor = 'green'
        bookButton.current.textContent = 'Book'
      }
    }
    setForm(
      <form>
        <p>
          {ship.current_location} - {ship.destination}
        </p>
        <p>{ship.leaving_date}</p>
        <p>{ship.rate_per_cargo}</p>
        <div>
          <input
            ref={countInput}
            defaultValue={0}
            placeholder={`Remaining: ${ship.remaining}`}
            type="number"
            onChange={hanldeCountChange}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            handleBooking(e, ship.id)
          }}
          ref={bookButton}
        >
          Book
        </button>
        <div>
          <span>{ship.name}</span>
        </div>
      </form>
    )
  }
  return (
    <>
      <div className="cargo-ships-page">
        <div ref={bookingSuperParentDiv} className="booking-parent-div">
          <Booking
            form={bookingForm}
            bookingDivRef={bookingParentDiv}
            cancelBooking={handleBook}
          ></Booking>
        </div>
        {cargoShips.map((ship) => (
          <ShipDiv key={ship.id} ship={ship} handleBook={handleBook} />
        ))}
      </div>
    </>
  )
}
