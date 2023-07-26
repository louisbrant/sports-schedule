import HttpService from "../../shared/http-service";

const BookingService = {
  add: (obj) => {
    return HttpService.post("/bookings", obj);
  },
  getByFacilityIdAndDate: (id, date) => {
    return HttpService.get(`/bookings/facility/${id}/${date}`);
  },
};

export default BookingService;
