import {AiOutlineClose} from "react-icons/ai"

export default function Booking({ form, bookingDivRef, cancelBooking }) {
  return (
    <div ref={bookingDivRef}  className="booking-cover-div">
      <AiOutlineClose onClick={cancelBooking} className='close-button'/>
      <div className="booking-form-div">
        {form}
      </div>
    </div>
  )
}
