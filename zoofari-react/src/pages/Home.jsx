import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { ClientTestimonials } from "../components/ClientTestimonials";
import AnimalSection from "../components/AnimalSection";
import { OwlCarousels } from "../components/OwlCarousels";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import { Link } from "react-router";
import parse from 'html-react-parser';

export const Home = () => {

    const [element, setElement] = useState({});
    const [homePageVideo, setHomePageVideo] = useState("");
    const [menu, setMenu] = useState({});
    const [siteidentity, setSiteIdentity] = useState({});
    const [topmenu, setTopMenu] = useState({});
    const [footermenu, setFooterMenu] = useState({});
    const [testimonials, setTestimonials] = useState([]);

    const fetchData = async () => {
        const GET_FIELDS = gql`
            query myquery {
            page(id: "68", idType: DATABASE_ID) {
                homePageBanner {
                bannerLeftImage {
                    node {
                    sourceUrl
                    }
                }
                bannerLeftHeading
                buttonText
                buttonUrl {
                    url
                }
                youtubeVideoUrl {
                    url
                }
                rightCarouselsImages {
                    rightCarouselsImagesImage {
                    node {
                        sourceUrl
                    }
                    }
                }
                }
                aboutUsSection {
                shortUpperText
                sectionHeading
                shortDescription
                visitingReasonOptions {
                    visitingReasonOptionsOption
                }
                rightSideImage {
                    node {
                    sourceUrl
                    }
                }
                buttonTitle
                buttonUrl {
                    url
                }
                numberListSecBackgroundImage {
                    node {
                    sourceUrl
                    }
                }
                numberListSecNumberOptions {
                    numberListSecNumberOptionsOptionITag
                    numberListSecNumberOptionsOptionNumber
                    numberListSecNumberOptionsOptionText
                }
                sectionTitle
                }
                animalsSection {
                sectionShortText
                sectionHeading
                animalsListing {
                    animalsListingAnimalImage {
                    node {
                        sourceUrl
                    }
                    }
                    animalsListingAnimalCategory
                    animalsListingAnimalName
                }
                }
                visitingHoursInfo {
                backgroundImage {
                    node {
                    sourceUrl
                    }
                }
                visitingHoursHeading
                hoursTimeTable {
                    hoursTimeTableDayName
                    hoursTimeTableDayTime
                }
                contactInfoHeading
                contactInfoTable
                }
                servicesSection {
                shortText
                sectionHeading
                sideCallSectionITag
                sideCallSectionUpperShortText
                sideCallSectionPhoneNumber
                visitorOptions {
                    visitorOptionsOptionImage {
                    node {
                        sourceUrl
                    }
                    }
                    visitorOptionsOptionTitle
                    visitorOptionsOptionShortDescription
                }
                }
            }
            testiMonials {
                nodes {
                id
                title
                content
                featuredImage {
                    node {
                    sourceUrl
                    }
                }
                professionName {
                    clientProfession
                }
                }
            }
            headermenu: menu(id: "3", idType: DATABASE_ID) {
                menuItems {
                edges {
                    node {
                    label
                    uri
                    title
                    }
                }
                }
            }
            footermenu: menu(id: "4", idType: DATABASE_ID) {
                menuItems {
                edges {
                    node {
                    label
                    uri
                    title
                    }
                }
                }
            }
            generalSettings {
                title
                url
                siteIconUrl
            }
            globalOptions {
                globalSiteSettings {
                contactAddress
                contactPhoneNumber
                contactMailAddress
                contactHourTimes
                facebookUrl {
                    url
                }
                linkedinUrl {
                    url
                }
                twitterxUrl {
                    url
                }
                youtubeUrl {
                    url
                }
                footerBackgroundImage {
                    node {
                    sourceUrl
                    }
                }
                footerCopyrightText
                addressSectionTitle
                quickLinksSectionTitle
                newsletterSectionTitle
                newsletterSectionShortDescription
                }
            }
            }
        `;

        const { error, data } = await useQuery(GET_FIELDS,{fetchPolicy: 'no-cache'});
        if (error) { console.error(error.message) };

        setElement(data?.page);
        setTestimonials(data?.testiMonials?.nodes);
        setMenu(data?.headermenu);
        setFooterMenu(data?.footermenu);
        setSiteIdentity(data?.generalSettings);
        setTopMenu(data?.globalOptions);
    }
    fetchData();

    function setVideo(videoSrc) {
        setHomePageVideo(videoSrc);
    }


    return (
        <>
            <Header top_menu={topmenu} menu={menu} site_identity={siteidentity} />

            {/* Header Start */}
            <div className="container-fluid bg-dark p-0 mb-5">
                <div className="row g-0 flex-column-reverse flex-lg-row">
                    <div className="col-lg-6 p-0 wow fadeIn" data-wow-delay="0.1s">
                        <div className="header-bg h-100 d-flex flex-column justify-content-center p-5"
                            style={{
                                background: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${element?.homePageBanner?.bannerLeftImage?.node?.sourceUrl}) center center no-repeat`,
                                backgroundSize: 'cover'
                            }}>
                            <h1 className="display-4 text-light mb-5">
                                {element?.homePageBanner?.bannerLeftHeading}
                            </h1>
                            <div className="d-flex align-items-center pt-4 animated slideInDown">
                               
                                <Link to={element?.homePageBanner?.buttonUrl?.url} className="btn btn-primary py-sm-3 px-3 px-sm-5 me-5">
                                    {element?.homePageBanner?.buttonText}
                                </Link>

                                <button
                                    type="button" data-bs-toggle="modal" data-bs-target="#videoModal"
                                    className="btn-play" onClick={() => setVideo(`${element?.homePageBanner?.youtubeVideoUrl?.url}`)}>
                                    <span></span>
                                </button>

                                <h6 className="text-white m-0 ms-4 d-none d-sm-block">
                                    Watch Video
                                </h6>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <div className=" header-carousel">
                            <OwlCarousels data={element?.homePageBanner?.rightCarouselsImages} />
                        </div>
                    </div>

                </div>
            </div>
            {/* Header End */}


            {/* youtube modal */}
            <div
                className="modal fade"
                id="videoModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel2"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="ratio ratio-16x9">
                                <iframe id="homeBannerVideo"
                                    src={homePageVideo}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* About Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p>
                                <span className="text-primary me-2">#</span>
                                {element?.aboutUsSection?.shortUpperText ? parse(element?.aboutUsSection?.shortUpperText) : ''}
                            </p>
                            <h1 className="display-5 mb-4">
                                {element?.aboutUsSection?.sectionHeading ? parse(element?.aboutUsSection?.sectionHeading) : ''}
                            </h1>
                            <p className="mb-4">
                                {element?.aboutUsSection?.shortDescription ? parse(element?.aboutUsSection?.shortDescription) : ''}
                            </p>
                            {element?.aboutUsSection?.visitingReasonOptions?.map((x, y) => {
                                return (
                                    <>
                                        <h5 className="mb-3">
                                            <i className="far fa-check-circle text-primary me-3" />
                                            {x?.visitingReasonOptionsOption ? parse(x.visitingReasonOptionsOption) : ''}
                                        </h5>
                                    </>
                                )
                            })}
                            {/* <a className="btn btn-primary py-3 px-5 mt-3" href={element?.aboutUsSection?.buttonUrl?.url ? element?.aboutUsSection?.buttonUrl?.url : ''}>
                                {element?.aboutUsSection?.buttonTitle ? parse(element?.aboutUsSection?.buttonTitle) : ''}
                            </a> */}
                            <Link className="btn btn-primary py-3 px-5 mt-3" to={element?.aboutUsSection?.buttonUrl?.url ? element?.aboutUsSection?.buttonUrl?.url : ''}>
                                {element?.aboutUsSection?.buttonTitle ? parse(element?.aboutUsSection?.buttonTitle) : ''}
                            </Link>
                        </div>
                        {element?.aboutUsSection?.rightSideImage?.node?.sourceUrl ? <>
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="img-border">
                                    <img className="img-fluid" src={element?.aboutUsSection?.rightSideImage?.node?.sourceUrl ? element?.aboutUsSection?.rightSideImage?.node?.sourceUrl : ''} alt="" />
                                </div>
                            </div>
                        </> : ''}
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Facts Start */}
            <div className="container-xxl bg-primary facts my-5 py-5 wow fadeInUp" data-wow-delay="0.1s" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${element?.aboutUsSection?.numberListSecBackgroundImage?.node?.sourceUrl})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className="container py-5">
                    <div className="row g-4">
                        {element?.aboutUsSection?.numberListSecNumberOptions?.map((x, y) => {
                            return (
                                <>
                                    <div className="col-md-6 col-lg-3 text-center wow fadeIn" data-wow-delay="0.1s">
                                        {x?.numberListSecNumberOptionsOptionITag ? parse(x?.numberListSecNumberOptionsOptionITag) : ''}
                                        <h1 className="text-white mb-2" data-toggle="counter-up">
                                            {x?.numberListSecNumberOptionsOptionNumber}
                                        </h1>
                                        <p className="text-white mb-0">{x?.numberListSecNumberOptionsOptionText}</p>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>
            </div >
            {/* Facts End */}

            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="col-lg-6">
                            <p>
                                <span className="text-primary me-2">#</span>{element?.servicesSection?.shortText}
                            </p>
                            <h1 className="display-5 mb-0">
                                {element?.servicesSection?.sectionHeading ? parse(element?.servicesSection?.sectionHeading) : ''}
                            </h1>
                        </div>
                        <div className="col-lg-6">
                            <div className="bg-primary h-100 d-flex align-items-center py-4 px-4 px-sm-5">
                                {element?.servicesSection?.sideCallSectionITag ? parse(element?.servicesSection?.sideCallSectionITag) : ''}
                                <div className="ms-4">
                                    <p className="text-white mb-0">{element?.servicesSection?.sideCallSectionUpperShortText}</p>
                                    <h2 className="text-white mb-0">{element?.servicesSection?.sideCallSectionPhoneNumber}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-5 gx-4">

                        {element?.servicesSection?.visitorOptions ? element?.servicesSection?.visitorOptions.map((x, y) => {
                            return (<>
                                <div className="col-lg-3 col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <img
                                        className="img-fluid mb-3"
                                        src={x?.visitorOptionsOptionImage?.node?.sourceUrl}
                                        alt="Icon"
                                    />
                                    <h5 className="mb-3">{x?.visitorOptionsOptionTitle}</h5>
                                    <span>
                                        {x?.visitorOptionsOptionShortDescription}
                                    </span>
                                </div>
                            </>)
                        }) : <></>}
                    </div>
                </div>
            </div>
            {/* Service End */}


            {/* Animal Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div
                        className="row g-5 mb-5 align-items-end wow fadeInUp"
                        data-wow-delay="0.1s"
                    >

                        <div className="col-lg-6">
                            <p>
                                <span className="text-primary me-2">#</span>{element?.animalsSection?.sectionShortText}
                            </p>
                            <h1 className="display-5 mb-0">
                                {element?.animalsSection?.sectionHeading ? parse(element?.animalsSection?.sectionHeading) : ''}
                            </h1>
                        </div>
                    </div>

                    {element?.animalsSection?.animalsListing ? <>
                        <AnimalSection data={element.animalsSection.animalsListing} />
                    </> : <></>}


                </div>
            </div>
            {/* Animal End */}


            {/* Visiting Hours Start */}
            <div
                className="container-xxl bg-primary visiting-hours my-5 py-5 wow fadeInUp"
                data-wow-delay="0.1s"
                style={{
                    background:
                        `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${element?.visitingHoursInfo?.backgroundImage?.node?.sourceUrl}) center center no-repeat`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-md-6 wow fadeIn" data-wow-delay="0.3s">
                            <h1 className="display-6 text-white mb-5">{element?.visitingHoursInfo?.visitingHoursHeading}</h1>
                            <ul className="list-group list-group-flush">

                                {element?.visitingHoursInfo?.hoursTimeTable ? element?.visitingHoursInfo?.hoursTimeTable?.map((x, y) => {
                                    return (<>
                                        <li className="list-group-item">
                                            <span>{x?.hoursTimeTableDayName}</span>
                                            <span>{x?.hoursTimeTableDayTime}</span>
                                        </li>
                                    </>)
                                }) : <></>}


                            </ul>
                        </div>
                        <div className="col-md-6 text-light wow fadeIn" data-wow-delay="0.5s">
                            <h1 className="display-6 text-white mb-5">{element?.visitingHoursInfo?.contactInfoHeading}</h1>
                            <table className="table">
                                <tbody>
                                    {element?.visitingHoursInfo?.contactInfoTable ? parse(element?.visitingHoursInfo?.contactInfoTable) : <></>}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {/* Visiting Hours End */}

            <ClientTestimonials sectiontitle={element?.aboutUsSection?.sectionTitle} testimonials={testimonials} />


            <Footer data={topmenu} quick_link_menu={footermenu} />
        </>

    )
}
