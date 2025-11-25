import { useState } from "react";
import axios from "axios";
import { Link } from "react-router";

export const Footer = (props) => {

    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        var formdata = new FormData();
        formdata.append('form_id', 196);
        formdata.append('email', email);

        axios({
            method: 'POST',
            url: import.meta.env.VITE_WORDPRESS_PROJECT_URL + import.meta.env.VITE_CF7_NEWSLETTER_ROUTE_URL,
            data: formdata,
        })
            .then(function (response) {
                alert(response.data.message)
                setEmail("")
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });

    }

    return (
        <>
            {/* Footer Start */}
            <div
                className="container-fluid footer bg-dark text-light footer mt-5 pt-5 wow fadeIn"
                data-wow-delay="0.1s"
                style={{
                    background: `linear-gradient(rgba(0,0,0,.7), rgba(0,0,0,.7)), url(${props?.data?.globalSiteSettings?.footerBackgroundImage?.node?.sourceUrl}) center center / cover no-repeat`,
                }}
            >
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">
                                {props?.data?.globalSiteSettings?.addressSectionTitle}
                            </h5>

                            {props?.data?.globalSiteSettings?.contactAddress ? <>
                                <p className="mb-2">
                                    <i className="fa fa-map-marker-alt me-3" />
                                    {props.data.globalSiteSettings.contactAddress}
                                </p>
                            </> : <></>}

                            {props?.data?.globalSiteSettings?.contactPhoneNumber ? <>
                                <p className="mb-2">
                                    <i className="fa fa-phone-alt me-3" />
                                    {props.data.globalSiteSettings.contactPhoneNumber}
                                </p>
                            </> : <></>}

                            {props?.data?.globalSiteSettings?.contactMailAddress ? <>
                                <p className="mb-2">
                                    <i className="fa fa-envelope me-3" />
                                    {props.data.globalSiteSettings.contactMailAddress}
                                </p>
                            </> : <></>}

                            <div className="d-flex pt-2">

                                {props?.data?.globalSiteSettings?.twitterxUrl?.url && (
                                    <a
                                        className="btn btn-outline-light btn-social"
                                        href={props.data.globalSiteSettings.twitterxUrl.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-twitter" />
                                    </a>
                                )}

                                {/* Facebook Link */}
                                {props?.data?.globalSiteSettings?.facebookUrl?.url && (
                                    <a
                                        className="btn btn-outline-light btn-social"
                                        href={props.data.globalSiteSettings.facebookUrl.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-facebook-f" />
                                    </a>
                                )}

                                {/* YouTube Link */}
                                {props?.data?.globalSiteSettings?.youtubeUrl?.url && (
                                    <a
                                        className="btn btn-outline-light btn-social"
                                        href={props.data.globalSiteSettings.youtubeUrl.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-youtube" />
                                    </a>
                                )}

                                {/* LinkedIn Link */}
                                {props?.data?.globalSiteSettings?.linkedinUrl?.url && (
                                    <a
                                        className="btn btn-outline-light btn-social"
                                        href={props.data.globalSiteSettings.linkedinUrl.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <i className="fab fa-linkedin-in" />
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">
                                {props?.data?.globalSiteSettings?.quickLinksSectionTitle}
                            </h5>

                            {props?.quick_link_menu?.menuItems?.edges ? props.quick_link_menu.menuItems.edges.map((x, y) => {
                                return (<>
                                    <Link to={x?.node?.uri} className="btn btn-link">{x?.node?.label}</Link>
                                </>)
                            }) : <></>}
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <h5 className="text-light mb-4">
                                {props?.data?.globalSiteSettings?.newsletterSectionTitle}
                            </h5>
                            <p>
                                {props?.data?.globalSiteSettings?.newsletterSectionShortDescription}
                            </p>
                            <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        className="form-control border-0 w-100 py-3 ps-4 pe-5"
                                        type="text"
                                        placeholder="Your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <button type="submit" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">
                                        SignUp
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                ©{props?.data?.globalSiteSettings?.footerCopyrightText}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up" />
            </a>
        </>

    )
}
