import cookies from "next-cookies";
import CourtService from "../../../../screens/court/court-service";
import CourtScreen from "../../../../screens/court/court-screen";
import FacilityService from "../../../../screens/facility/facility-service";

const Court = ({ facilityData, courtData }) => {
  return (
    <CourtScreen
      facilityData={facilityData}
      courtData={courtData}
    ></CourtScreen>
  );
};

export async function getServerSideProps(ctx) {
  const facilityId = ctx.params.facilityId;
  const courtId = ctx.params.courtId;
  // Fetch data from external API
  const { token } = cookies(ctx).userData;
  //const token = JSON.parse(userData).token;
  if (!facilityId) return;
  if (!courtId) return;
  try {
    const [facilityRes, courtRes] = await Promise.all([
      FacilityService.serverGetById(facilityId, token),
      CourtService.serverGetById(courtId, token),
    ]);
    const facilityData = facilityRes.data;
    const courtData = courtRes.data;

    // Pass data to the page via props
    return {
      props: {
        facilityData: facilityData.facility,
        courtData: courtData.court,
      },
    };
  } catch (error) {
    return;
  }
}

export default Court;
