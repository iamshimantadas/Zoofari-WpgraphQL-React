import { Link } from "react-router";

export const Header = (props) => {
    return (
        <>
            <div className="container-fluid bg-light p-0 wow fadeIn" data-wow-delay="0.1s">
                <div className="row gx-0 d-none d-lg-flex">
                    <div className="col-lg-7 px-5 text-start">

                        {props?.top_menu?.globalSiteSettings?.contactAddress ? <>
                            <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                                <small className="fa fa-map-marker-alt text-primary me-2" />
                                <small>{props.top_menu.globalSiteSettings.contactAddress}</small>
                            </div>
                        </> : <></>}

                        {props?.top_menu?.globalSiteSettings?.contactHourTimes ? <>
                            <div className="h-100 d-inline-flex align-items-center py-3">
                                <small className="far fa-clock text-primary me-2" />
                                <small>{props.top_menu.globalSiteSettings.contactHourTimes}</small>
                            </div>
                        </> : <></>}
                    </div>
                    <div className="col-lg-5 px-5 text-end">
                        <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                            {props?.top_menu?.globalSiteSettings?.contactPhoneNumber ? <>
                                <small className="fa fa-phone-alt text-primary me-2" />
                                <small>{props.top_menu.globalSiteSettings.contactPhoneNumber}</small>
                            </> : <></>}
                        </div>
                        <div className="h-100 d-inline-flex align-items-center">
                            {props?.top_menu?.globalSiteSettings?.facebookUrl?.url ? <>
                                <a target="_blank" className="btn btn-sm-square bg-white text-primary me-1" href={props.top_menu.globalSiteSettings.facebookUrl.url}>
                                    <i className="fab fa-facebook-f" />
                                </a>
                            </> : <></>}

                            {props?.top_menu?.globalSiteSettings?.twitterxUrl?.url ? <>
                                <a target="_blank" className="btn btn-sm-square bg-white text-primary me-1" href={props.top_menu.globalSiteSettings.twitterxUrl.url}>
                                    <i className="fab fa-twitter" />
                                </a>
                            </> : <></>}

                            {props?.top_menu?.globalSiteSettings?.linkedinUrl?.url ? <>
                                <a target="_blank" className="btn btn-sm-square bg-white text-primary me-1" href={props.top_menu.globalSiteSettings.linkedinUrl.url}>
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </> : <></>}

                            {props?.top_menu?.globalSiteSettings?.youtubeUrl?.url ? <>
                                <a target="_blank" className="btn btn-sm-square bg-white text-primary me-0" href={props.top_menu.globalSiteSettings.youtubeUrl.url}>
                                    <i className="fab fa-youtube" />
                                </a>
                            </> : <></>}


                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}
            {/* Navbar Start */}
            <nav
                className="navbar navbar-expand-lg bg-white navbar-light sticky-top py-lg-0 px-4 px-lg-5 wow fadeIn"
                data-wow-delay="0.1s"
            >
                
                <Link to="/" className="navbar-brand p-0">
                    <img className="img-fluid me-3" src={props?.site_identity?.siteIconUrl} alt="Icon" />
                    <h1 className="m-0 text-primary">
                        {props?.site_identity?.title}
                    </h1>
                </Link>
                <button
                    type="button"
                    className="navbar-toggler"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarCollapse"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse py-4 py-lg-0" id="navbarCollapse">
                    <div className="navbar-nav ms-auto">
                        {props?.menu?.menuItems?.edges ? props.menu.menuItems.edges.map((x, y) => {
                            const isActive = window.location.pathname === x?.node?.uri;
                            const linkClassName = `nav-item nav-link ${isActive ? 'active' : ''}`;
                            return (<>
                                <Link to={x?.node?.uri} className={linkClassName}>{x?.node?.label}</Link >
                            </>)
                        }) : <></>}

                    </div>
                    {/* <a href="" className="btn btn-primary">
                        Buy Ticket
                        <i className="fa fa-arrow-right ms-3" />
                    </a> */}
                </div>
            </nav >
            {/* Navbar End */}
        </>
    )
}
