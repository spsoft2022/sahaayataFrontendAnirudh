import { jwtDecode } from 'jwt-decode';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo-medium.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { logoutSuccess } from '../authSlice';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Workshop from '../Workshop/Workshop';

function Header() {
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    const [workshopHeadings, setWorkshopHeadings] = useState([]);
    const [workshopAbout, setWorkshopAbout] = useState([]);
    const [workshopImmediate, setWorkshopImmediate] = useState([]);
    const [workshopGallery, setWorkshopGallery] = useState([]);
    const [workshopMedia, setWorkshopMedia] = useState([]);
    const [data, setData] = useState([]);
    const [isadmin, setIsadmin] = useState('')
    const handleLogout = () => {
        dispatch(logoutSuccess());
        localStorage.removeItem('token');
    };

    const [token1, setToken] = useState(null);


    const [user, setUser] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            const image = localStorage.getItem('userimage');
            setUser(image);
        }, 1000);

        return () => clearInterval(interval);
    }, [user]);


    const handleHeadingClick = (heading) => {
        localStorage.setItem('activeHeading', heading);
    };
    useEffect(() => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            setToken(accessToken);
            try {
                const decodedToken = jwtDecode(accessToken);

                console.log('Decoded Token:', decodedToken.isAdmin);
                setIsadmin(decodedToken.isAdmin)

            } catch (error) {
                console.error('Invalid token:', error);
            }
        }
        fetchData()
    }, [token]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://192.168.5.56:8089/workshop");
            setData(response.data);
            console.log(response.data)

            const workshops = response.data.workshops || [];
           


            const filteredHeadings = workshops.filter(workshop => workshop.category === 'workshop').map(workshop => workshop.heading);
            setWorkshopHeadings(filteredHeadings);
            console.log(filteredHeadings)


            const filterAbouts = workshops.filter(workshop => workshop.category === 'about')
                .map(workshop => workshop.heading);
            const filterImmediate = workshops.filter(workshop => workshop.category === 'immediate')
                .map(workshop => workshop.heading);
            const filterGallery = workshops.filter(workshop => workshop.category === 'gallery')
                .map(workshop => workshop.heading);
            const filterMedia = workshops.filter(workshop => workshop.category === 'media')
                .map(workshop => workshop.heading);

            setWorkshopHeadings(filteredHeadings);
            console.log(filterAbouts)
            setWorkshopAbout(filterAbouts)
            setWorkshopImmediate(filterImmediate)
            setWorkshopGallery(filterGallery)
            setWorkshopMedia(filterMedia)



        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div>

            <div className='header_top'>
                <div className='container'>
                    <div className='d-flex justify-content-end'>
                        <div className='d-flex gap-3 py-2'>
                            <div className='d-flex gap-2'>
                                <i className="fa-solid fa-phone header_phone mt-1 "></i>
                                <p className='header_phone m-0'> +91 77356 51118</p>
                            </div>
                            <div className='d-flex gap-2'>
                                <i className="fa-solid fa-envelope header_phone mt-1 "></i>
                                <p className='header_phone m-0'> info@sahaayata.org</p>
                            </div>


                        </div>

                    </div>
                </div>
            </div>

            <nav className="navbar shadow-sm navbar-expand-lg bg-white sticky-top ">
                <div className="container">
                    <Link to='/'>
                        <a className="navbar-brand ">
                            <img src={logo} alt="Logo" height="80px" />
                        </a>
                    </Link>
                    <div className="collapse navbar-collapse bg-white px-3 " id="navbarText">
                        <ul className="navbar-nav position-relative mx-auto mb-2 mb-lg-0 gap-0 gap-xxl-3">
                            <li className="nav-item">
                                <Link to="/" className='text-decoration-none'>
                                    <a className="nav-link  text-black-50 text-uppercase">
                                        Home
                                    </a>
                                </Link>
                            </li>

                            < li className="nav-item dropdown-center " >
                                <Link to="/" className='text-decoration-none'>
                                    <a className="nav-link text-black-50 position-relative text-uppercase" aria-expanded="true">
                                        About{''}
                                        <span>
                                            <i className="fa fa-angle-down ms-1 drop-icon fw-bold" data-bs-toggle="dropdown" style={{ color: '#5AADDD', }} aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </Link>
                                <ul className="dropdown-menu px-1  rounded-0 shadow border-0" style={{ backgroundColor: '#ffffffe7' }}>


                                    {workshopAbout.map((heading, index) => (
                                        <li key={index} className="">
                                            <Link to={`/process`} className='text-decoration-none'>
                                                <a
                                                    className="dropdown-item text-black-50 lh-lg"
                                                    onClick={() => handleHeadingClick(heading)}
                                                >
                                                    {heading}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>

                            < li className="nav-item dropdown-center" >
                                <Link to="/" className='text-decoration-none'>
                                    <a className="nav-link text-black-50 position-relative text-uppercase" aria-expanded="true">
                                        Immediate{''}
                                        <span>
                                            <i className="fa fa-angle-down ms-1 drop-icon fw-bold" data-bs-toggle="dropdown" style={{ color: '#5AADDD', }} aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </Link>
                                <ul className="dropdown-menu  rounded-0 shadow border-0" style={{ backgroundColor: '#ffffffe7' }}>

                                    {workshopImmediate.map((heading, index) => (
                                        <li key={index} className="">
                                            <Link to={`/process`} className='text-decoration-none'>
                                                <a
                                                    className="dropdown-item text-black-50 lh-lg"
                                                    onClick={() => handleHeadingClick(heading)}
                                                >
                                                    {heading}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            {token ? (
                                < li className="nav-item dropdown-center" >
                                    <Link to="/" className='text-decoration-none'>
                                        <a className="nav-link text-black-50 position-relative text-uppercase" aria-expanded="true">
                                            Workshop{''}
                                            <span>
                                                <i className="fa fa-angle-down ms-1 drop-icon fw-bold" data-bs-toggle="dropdown" style={{ color: '#5AADDD', }} aria-hidden="true"></i>
                                            </span>
                                        </a>
                                    </Link>
                                    <ul className="dropdown-menu  rounded-0 shadow border-0" style={{ backgroundColor: '#ffffffe7' }}>
                                        {isadmin == 1 ? (
                                            <>
                                                <li className="">
                                                    <Link to={'/admin-portal'} className='text-decoration-none'>
                                                        <a className="dropdown-item btn  text-black-50 lh-lg">
                                                            Create WorkShops
                                                        </a>
                                                    </Link>
                                                </li>
                                                {workshopHeadings.map((heading, index) => (
                                                    <li key={index} className="">
                                                        <Link to={`/process`} className='text-decoration-none'>
                                                            <a
                                                                className="dropdown-item text-black-50 lh-lg"
                                                                onClick={() => handleHeadingClick(heading)}
                                                            >
                                                                {heading}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))}

                                            </>
                                        ) : (
                                            <>
                                                {workshopHeadings.map((heading, index) => (
                                                    <li key={index} className="">
                                                        <Link to={`/process`} className='text-decoration-none'>
                                                            <a
                                                                className="dropdown-item text-black-50 lh-lg"
                                                                onClick={() => handleHeadingClick(heading)}
                                                            >
                                                                {heading}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </>
                                        )}


                                    </ul>
                                </li>
                            ) : (
                                <p className='m-0 p-0 d-none'></p>
                            )}

                            < li className="nav-item dropdown-center" >
                                <Link to="/" className='text-decoration-none'>
                                    <a className="nav-link text-black-50 position-relative text-uppercase" aria-expanded="true">
                                        Media{''}
                                        <span>
                                            <i className="fa fa-angle-down ms-1 drop-icon fw-bold" data-bs-toggle="dropdown" style={{ color: '#5AADDD', }} aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </Link>
                                <ul className="dropdown-menu rounded-0 shadow border-0" style={{ backgroundColor: '#ffffffe7' }}>


                                    {workshopMedia.map((heading, index) => (
                                        <li key={index} className="">
                                            <Link to={`/process`} className='text-decoration-none'>
                                                <a
                                                    className="dropdown-item text-black-50 lh-lg"
                                                    onClick={() => handleHeadingClick(heading)}
                                                >
                                                    {heading}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}

                                </ul>
                            </li>

                            < li className="nav-item dropdown-center" >
                                <Link to="/" className='text-decoration-none'>
                                    <a className="nav-link text-black-50 position-relative text-uppercase" aria-expanded="true">
                                        Gallery{''}
                                        <span>
                                            <i className="fa fa-angle-down ms-1 drop-icon fw-bold" data-bs-toggle="dropdown" style={{ color: '#5AADDD', }} aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </Link>
                                <ul className="dropdown-menu  rounded-0 shadow border-0" style={{ backgroundColor: '#ffffffe7' }}>


                                    {workshopGallery.map((heading, index) => (
                                        <li key={index} className="">
                                            <Link to={`/process`} className='text-decoration-none'>
                                                <a
                                                    className="dropdown-item text-black-50 lh-lg"
                                                    onClick={() => handleHeadingClick(heading)}
                                                >
                                                    {heading}
                                                </a>
                                            </Link>
                                        </li>
                                    ))}


                                </ul>
                            </li>

                            <li className="nav-item">
                                <Link to="/donate" className='text-decoration-none'>
                                    <a className="nav-link  text-black-50 text-uppercase">
                                        Donate
                                    </a>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/contact" className='text-decoration-none'>
                                    <a className="nav-link  text-black-50 text-uppercase">
                                        Contact Us
                                    </a>
                                </Link>
                            </li>

                            < li className="nav-item dropdown-center my-auto" >
                                <Link to="/" className='text-decoration-none '>
                                    <a className="nav-link text-black-50 position-relative text-uppercase px-0 py-0" aria-expanded="true">
                                        {!isadmin == 0 ? (
                                            <>
                                                <i class="fa-solid fa-users fs-4"></i>
                                            </>
                                        ) : (
                                            <>
                                                <img src={user} className='' alt="" style={{ height: '40px', width: '40px', borderRadius: '50%' }} />
                                            </>
                                        )}

                                        <span>
                                            <i className="fa fa-angle-down ms-1 drop-icon fw-bold" data-bs-toggle="dropdown" style={{ color: '#5AADDD', }} aria-hidden="true"></i>
                                        </span>
                                    </a>
                                </Link>
                                <ul className="dropdown-menu  rounded-0 shadow border-0" style={{ backgroundColor: '#ffffffe7' }}>
                                    {!token ? (
                                        <>
                                            <li className="">
                                                <Link to="/user-login" className="dropdown-item text-black-50 lh-lg text-decoration-none">
                                                    Login
                                                </Link>
                                            </li>
                                            <li className="">
                                                <Link to="/user-registration" className="dropdown-item text-black-50 lh-lg text-decoration-none">
                                                    Registration
                                                </Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            {!isadmin == 1 ? (
                                                <li className="">
                                                    <Link to="/user-profile" className="dropdown-item text-black-50 lh-lg text-decoration-none">
                                                        User Profile
                                                    </Link>
                                                </li>

                                            ) : (
                                                <li className="">
                                                    <Link to="/admin-profile" className="dropdown-item text-black-50 lh-lg text-decoration-none">
                                                        Admin Profile
                                                    </Link>
                                                </li>

                                            )}

                                            <li className="">
                                                <Link to="/" className="dropdown-item text-black-50 lh-lg text-decoration-none" onClick={handleLogout}>
                                                    Logout
                                                </Link>
                                                <ToastContainer />
                                            </li>
                                        </>
                                    )}

                                </ul>
                            </li>

                        </ul>


                    </div>

                </div>

            </nav>

        </div>
    );
}

export default Header;
