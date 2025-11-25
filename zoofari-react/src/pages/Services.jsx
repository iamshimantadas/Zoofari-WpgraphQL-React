import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InnerBanner } from "../components/InnerBanner";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import parse from 'html-react-parser';


export const Services = () => {

    const [element, setElement] = useState({});
    const [innerBanner, setInnerBanner] = useState({});
    const [testimonials, setTestimonials] = useState([]);
    const [menu, setMenu] = useState({});
    const [siteidentity, setSiteIdentity] = useState({});
    const [topmenu, setTopMenu] = useState({});
    const [footermenu, setFooterMenu] = useState({});

    const fetchData = async () => {
        const GET_FIELDS = gql`
            query myquery {
            page(id: "137", idType: DATABASE_ID) {
                innerBanner {
                bannerBackgroundImage {
                    node {
                    sourceUrl
                    }
                }
                bannerHeading
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

        setInnerBanner(data?.page);
        setElement(data?.page?.servicesSection);
        setMenu(data?.headermenu);
        setFooterMenu(data?.footermenu);
        setSiteIdentity(data?.generalSettings);
        setTopMenu(data?.globalOptions);
    }
    fetchData();

    return (
        <>
        <Header top_menu={topmenu} menu={menu} site_identity={siteidentity} />

            <InnerBanner banner={innerBanner?.innerBanner} />

            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 mb-5 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="col-lg-6">
                            <p>
                                <span className="text-primary me-2">#</span>{element?.shortText}
                            </p>
                            <h1 className="display-5 mb-0">
                                {element?.sectionHeading ? parse(element?.sectionHeading) : ''}
                            </h1>
                        </div>
                        <div className="col-lg-6">
                            <div className="bg-primary h-100 d-flex align-items-center py-4 px-4 px-sm-5">
                                {element?.sideCallSectionITag ? parse(element?.sideCallSectionITag) : ''}
                                <div className="ms-4">
                                    <p className="text-white mb-0">{element?.sideCallSectionUpperShortText}</p>
                                    <h2 className="text-white mb-0">{element?.sideCallSectionPhoneNumber}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gy-5 gx-4">

                        {element?.visitorOptions ? element.visitorOptions.map((x, y) => {
                            console.log(x)
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

            <Footer data={topmenu} quick_link_menu={footermenu} />            

        </>
    )
}
