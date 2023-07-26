import React, {useState} from 'react'
import Link from 'next/link'
import DashboardIcon from './svg_icons/dashboard_icon'
import BookingIcon from './svg_icons/booking_icon'
import FacilityIcon from './svg_icons/facility_icon'
import FeatureIcon from './svg_icons/feature_icon'
import SportsIcon from './svg_icons/sports_icon'
import SettingsIcon from './svg_icons/settings_icon'
import LogoutIcon from './svg_icons/logout_icon'
import LoginService from '../../screens/login/login-service'

const DashboardMenu = ({admin, router, userData, setUserData}) => {

  const [logoutClicked, setLogoutClicked] = useState(false);
  
  console.log(router, userData, admin);

  const handleLogout = () => {
    const isLoggedOut = LoginService.logout();
    if (isLoggedOut) {
      setUserData({});
      router.push("/");
    }
  };

  return (
    <div className='dashboard_menu_list'>
        <div className='mb-5 pt-3 pb-2'>
            <h3 className='secondary-light' style={{fontSize: 20, fontWeight: 500}}> General </h3>
            {userData.roleId === admin && (
              <Link href="/dashboard">
                <div className='d-flex py-2 px-1 align-items-center'>
                    <DashboardIcon color={router.pathname==='/dashboard' ? '#EE2E2A' : '#243358'}/>
                    <p className='px-3' 
                       style={router.pathname==='/dashboard' ? {fontSize: 18, fontWeight: 600, color: '#EE2E2A', cursor: 'pointer'} 
                             : {fontSize: 18, fontWeight: 500, color: 'rgb(36, 51, 88)', cursor: 'pointer'}}
                    > Dashboard </p>
                </div>
              </Link>
            )}
        </div>

        <div className='mb-5 pb-2'>
            <h3 className='secondary-light' style={{fontSize: 20, fontWeight: 500}}> Management </h3>
            {userData.roleId === admin && (
              <Link href="/facility-management">
                <div className='d-flex py-2 px-1 align-items-center'>
                    <FacilityIcon color={router.pathname==='/facility-management' ? '#EE2E2A' : '#243358'}/>
                    <p className='px-3' 
                       style={(router.pathname=='/facility-management') ? {fontSize: 18, fontWeight: 600, color: '#EE2E2A', cursor: 'pointer'} 
                             : {fontSize: 18, fontWeight: 500, color: 'rgb(36, 51, 88)', cursor: 'pointer'}}
                    > Facility </p>
                </div>
              </Link>
            )}
            {userData.roleId === admin && (
              <Link href="/booking-management">
                <div className='d-flex py-2 px-1 align-items-center'>
                    <BookingIcon color={router.pathname==='/booking-management' ? '#EE2E2A' : '#243358'}/>
                    <p className='px-3' 
                       style={(router.pathname=='/booking-management') ? {fontSize: 18, fontWeight: 600, color: '#EE2E2A', cursor: 'pointer'} 
                             : {fontSize: 18, fontWeight: 500, color: 'rgb(36, 51, 88)', cursor: 'pointer'}}
                    > Booking </p>
                </div>
              </Link>
            )}
            {userData.roleId === admin && (
              <Link href="/feature">
                <div className='d-flex py-2 px-1 align-items-center'>
                    <FeatureIcon color={router.pathname==='/feature' ? '#EE2E2A' : '#243358'}/>
                    <p className='px-3' 
                       style={(router.pathname=='/feature') ? {fontSize: 18, fontWeight: 600, color: '#EE2E2A', cursor: 'pointer'} 
                             : {fontSize: 18, fontWeight: 500, color: 'rgb(36, 51, 88)', cursor: 'pointer'}}
                    > Feature </p>
                </div>
              </Link>
            )}
            {userData.roleId === admin && (
              <Link href="/sports">
                <div className='d-flex py-2 px-1 align-items-center'>
                    <SportsIcon color={router.pathname==='/sports' ? '#EE2E2A' : '#243358'}/>
                    <p className='px-3' 
                       style={(router.pathname=='/sports') ? {fontSize: 18, fontWeight: 600, color: '#EE2E2A', cursor: 'pointer'} 
                             : {fontSize: 18, fontWeight: 500, color: 'rgb(36, 51, 88)', cursor: 'pointer'}}
                    > Sports </p>
                </div>
              </Link>
            )}
        </div>

        <div className='mb-5 pb-4'>
            <h3 className='secondary-light' style={{fontSize: 20, fontWeight: 500}}> Accounts </h3>
            <div className='d-flex py-2 px-1 align-items-center'>
                <SettingsIcon color="#243358"/>
                <p className='px-3' 
                   style={{fontSize: 18, fontWeight: 500, cursor: 'pointer', color: "#243358"}} 
                   //onClick={showModal}
                > Settings </p>
            </div>
            <div className='d-flex py-2 px-1 align-items-center'>
                <LogoutIcon color={logoutClicked===true ? '#EE2E2A' : '#243358'}/>
                <p className='px-3' 
                   style={{
                    fontSize: 18, 
                    fontWeight: 500, 
                    cursor: 'pointer', 
                    color: logoutClicked===true ? '#EE2E2A' : '#243358'
                   }}
                   onClick={()=> {handleLogout(); setLogoutClicked(true);}}
                  //  onMouseOver={()=> setLogoutClicked(true)}
                  //  onMouseOut={()=> setLogoutClicked(false)}
                > Logout </p>
            </div>
        </div>
    </div>
  )
}

export default DashboardMenu