import cookies from "next-cookies";
import CourtScreen from "../../../screens/court/court-screen"
import FacilityService from "../../../screens/facility/facility-service";

const Court = ({ facilityData }) => {
    return <CourtScreen facilityData={facilityData}></CourtScreen>
}


export async function getServerSideProps(ctx) {
    const facilityId = ctx.params.facilityId;
    // Fetch data from external API
    const { token } = cookies(ctx).userData
    //const token = JSON.parse(userData).token;
    if (!facilityId) return
    try {
        const res = await FacilityService.serverGetById(facilityId, token);
        const data = res.data;
        // Pass data to the page via props
        return { props: { facilityData: data.facility } }
    } catch (error) {
        return
    }

}

export default Court