import { useRef } from "react"

export default function Booking({form}) {
  const bookingDiv = useRef();
  function closeBooking(){
    console.log(bookingDiv.current.parentNode)
  }
  return (
    <>
      <div ref={bookingDiv} className="booking-cover-div"></div>
      <div className="booking-div">
        <div onClick={closeBooking} className="close-booking-div"></div>
        {form}
      </div>
    </>
  )
}
