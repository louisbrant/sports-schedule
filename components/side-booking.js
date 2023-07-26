import Link from "next/link"
import Input from "./common/input"


const SideBooking = () => {
    return <>
        <div className="w-100 open-hours-box">
            <h4 className="mt-4 p-2 light" >
                <i className="fa fa-calendar mr-2"></i>Booking</h4>
            <hr />
           
                <Input
                    type="date"
                    // onChange={handleChange}
                    // value={facilityModel.address}
                    className="form-control bg-white"
                    name="address"
                    placeholder="What are you looking for ?"
                />
                <Input
                    type="text"
                    // onChange={handleChange}
                    // value={facilityModel.address}
                    className="form-control bg-white"
                    name="address"
                    placeholder="Available solts"
                />
                <Input
                    type="text"
                    // onChange={handleChange}
                    // value={facilityModel.address}
                    className="form-control bg-white"
                    name="address"
                    placeholder="Extra Sevice"
                />
                <Link href="/facility-search"><a className="btn-search w-100 mt-4">Search</a></Link> 
        </div>
    </>
}

export default SideBooking