import { useRef } from 'react'
export default function BookingForm({ ship, handleBooking }) {
    const countInput = useRef()
    let count = 0
    const total = useRef()
    const bookButton = useRef()
    function handleCountChange(e) {
      count = parseInt(e.target.value)
      total.current.textContent = `Total: Ksh.${
        `${count}` !== 'NaN' ? (ship.rate_per_cargo * count).toLocaleString() : 0
      }`
      if (count > ship.remaining || count < 1) {
        bookButton.current.style.backgroundColor = 'red'
        bookButton.current.textContent = 'Cancel'
      } else {
        bookButton.current.style.backgroundColor = 'green'
        bookButton.current.textContent = 'Book'
      }
    }
  
    return (
      <form>
        <p>
          {ship.current_location} - {ship.destination}
        </p>
        <p>{ship.leaving_date}</p>
        <p>
          Rate: Ksh.
          {ship.rate_per_cargo ? ship.rate_per_cargo.toLocaleString() : 0}
        </p>
        <p ref={total}>Total: Ksh.0</p>
        <div>
          <input
            ref={countInput}
            placeholder={`Remaining: ${ship.remaining}`}
            type="number"
            onChange={handleCountChange}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault()
            handleBooking(e, ship.id, countInput)
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
  