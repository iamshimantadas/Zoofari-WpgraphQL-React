import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InnerBanner } from "../components/InnerBanner";
import { Loader } from "../components/Loader";
import AnimalSection from "../components/AnimalSection";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import parse from 'html-react-parser';

export const Animals = () => {

    const [element, setElement] = useState({});
    const [animals, setAnimals] = useState([]);
    const [innerBanner, setInnerBanner] = useState({});
    const [menu, setMenu] = useState({});
    const [siteidentity, setSiteIdentity] = useState({});
    const [topmenu, setTopMenu] = useState({});
    const [footermenu, setFooterMenu] = useState({});

    const fetchData = async () => {
        const GET_FIELDS = gql`
            query myquery {
            page(id: "74", idType: DATABASE_ID) {
                innerBanner {
                bannerBackgroundImage {
                    node {
                    sourceUrl
                    }
                }
                bannerHeading
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
        setElement(data?.page?.animalsSection);
        setAnimals(data?.page?.animalsSection?.animalsListing);
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

            {/* Animal Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div
                        className="row g-5 mb-5 align-items-end wow fadeInUp"
                        data-wow-delay="0.1s"
                    >

                        <div className="col-lg-6">
                            <p>
                                <span className="text-primary me-2">#</span>{element?.sectionShortText}
                            </p>
                            <h1 className="display-5 mb-0">
                                {element?.sectionHeading ? parse(element?.sectionHeading) : ''}
                            </h1>
                        </div>
                    </div>
                    { animals ? <>
                    <AnimalSection data={animals} />
                    </> : <></> }
                </div>
            </div>
            {/* Animal End */}

            <Footer data={topmenu} quick_link_menu={footermenu} />

        </>
    )
}
