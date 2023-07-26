import SearchPageScreen from "../screens/facility/search-page-screen";
import FacilityService from "../screens/facility/facility-service";

const SearchPage = ({ facilities }) => {
    return <SearchPageScreen facilities={facilities}></SearchPageScreen>
}


export async function getServerSideProps(ctx) {
    const { data } = await FacilityService.getAll();
    const facilities = data.facilities
    return {
        props: {
            facilities,
        },
    };
}

export default SearchPage;