import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InnerBanner } from "../components/InnerBanner";
import { ClientTestimonials } from "../components/ClientTestimonials";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import parse from 'html-react-parser';



export const About = () => {

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
            page(id: "72", idType: DATABASE_ID) {
                uri
                title
                slug
                innerBanner {
                    bannerHeading
                    bannerBackgroundImage {
                        node {
                            sourceUrl
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
                    buttonTitle
                    buttonUrl {
                        url
                    }
                    rightSideImage {
                        node {
                            sourceUrl
                        }
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

        setInnerBanner(data?.page);
        setElement(data?.page?.aboutUsSection);
        setTestimonials(data?.testiMonials?.nodes);
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


            {/* About Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p>
                                <span className="text-primary me-2">#</span>
                                {element?.shortUpperText ? parse(element?.shortUpperText) : ''}
                            </p>
                            <h1 className="display-5 mb-4">
                                {element?.sectionHeading ? parse(element?.sectionHeading) : ''}
                            </h1>
                            <p className="mb-4">
                                {element?.shortDescription ? parse(element?.shortDescription) : ''}
                            </p>
                            {element?.visitingReasonOptions?.map((x, y) => {
                                return (
                                    <>
                                        <h5 className="mb-3">
                                            <i className="far fa-check-circle text-primary me-3" />
                                            {x?.visitingReasonOptionsOption ? parse(x.visitingReasonOptionsOption) : ''}
                                        </h5>
                                    </>
                                )
                            })}
                            <a className="btn btn-primary py-3 px-5 mt-3" href={element?.buttonUrl?.url ? element?.buttonUrl?.url : ''}>
                                {element?.buttonTitle ? parse(element?.buttonTitle) : ''}
                            </a>
                        </div>
                        {element?.rightSideImage?.node?.sourceUrl ? <>
                            <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                                <div className="img-border">
                                    <img className="img-fluid" src={element?.rightSideImage?.node?.sourceUrl ? element?.rightSideImage?.node?.sourceUrl : ''} alt="" />
                                </div>
                            </div>
                        </> : ''}
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Facts Start */}
            <div className="container-xxl bg-primary facts my-5 py-5 wow fadeInUp" data-wow-delay="0.1s" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${element?.numberListSecBackgroundImage?.node?.sourceUrl})`, backgroundPosition: 'center center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                <div className="container py-5">
                    <div className="row g-4">
                        {element?.numberListSecNumberOptions?.map((x, y) => {
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


            <ClientTestimonials sectiontitle={element?.sectionTitle} testimonials={testimonials}  />            
          
          <Footer data={topmenu} quick_link_menu={footermenu} />
        </>
    )
}
