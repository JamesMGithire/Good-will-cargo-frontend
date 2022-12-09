import { useRef, useState } from 'react'
import { useLoggedInContext } from '../../context/LoggedIn'
import Booking from './Booking'
import ShipDiv from './ShipDiv'
import BookingForm from './BookingForm'

export default function Ships({ cargoShips, setCargoShips }) {
  const { setLoggedIn } = useLoggedInContext()
  const [bookingForm, setForm] = useState(<></>)
  const bookingParentDiv = useRef()
  const bookingSuperParentDiv = useRef()

  function closeBookingForm() {
    if (bookingParentDiv.current.classList.value.includes('active')) {
      bookingParentDiv.current.classList.remove('active')
      bookingSuperParentDiv.current.classList.remove('active')
    } else {
      bookingParentDiv.current.classList.add('active')
      bookingSuperParentDiv.current.classList.add('active')
    }
  }

  function handleBook(ship) {
    closeBookingForm()
    function handleBooking(e, id, countInput) {
      let newCount = parseInt(countInput.current.value)
      let isBooking = e.target.textContent === 'Book' && newCount > 0
      // if (isBooking) {
      //   console.log(`${e.target.textContent} , ${id} , ${newCount}`)
      //   countInput.current.value = null
      // } else {
      //   countInput.current.value = null
      //   closeBookingForm()
      // }
      if (isBooking) {
        fetch('/user_cargos', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ count: newCount, cargo_ship_id: id }),
        })
          .then((res) => {
            if (res.ok) {
              res
                .json()
                .then((cargo) => {
                  console.log(cargo)
                  setLoggedIn((prev) => ({
                    user: {
                      ...prev.user,
                      cargos: [...prev.user.cargos, cargo],
                    },
                  }))
                })
                .then(() => {
                  fetch('/cargo_ships')
                    .then((r) => r.json())
                    .then((cargoShips) => {
                      setCargoShips(cargoShips.reverse())
                      closeBookingForm()
                    })
                })
            }
          })
          .catch((e) => console.error(e))
      } else if (newCount === 0) {
        closeBookingForm()
      } else {
        countInput.current.value = null
      }
    }

    setForm(<BookingForm ship={ship} handleBooking={handleBooking} />)
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
