import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { InnerBanner } from "../components/InnerBanner";
import { Loader } from "../components/Loader";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";
import parse from 'html-react-parser';
import axios from "axios";

export const Contact = () => {

    const [element, setElement] = useState({});
    const [innerBanner, setInnerBanner] = useState({});
    const [menu, setMenu] = useState({});
    const [siteidentity, setSiteIdentity] = useState({});
    const [topmenu, setTopMenu] = useState({});
    const [footermenu, setFooterMenu] = useState({});

    const [full_name, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");

    const fetchData = async () => {
        const GET_FIELDS = gql`
        query myquery {
        page(id: "76", idType: DATABASE_ID) {
            innerBanner {
            bannerHeading
            bannerBackgroundImage {
                node {
                sourceUrl
                }
            }
            }
            contactUsPage {
            contactFormShortTitle
            contactFormTitle
            contactFormShortDescription
            contactFormSideMap
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

        setInnerBanner(data.page);
        setElement(data.page.contactUsPage);
        setMenu(data?.headermenu);
        setFooterMenu(data?.footermenu);
        setSiteIdentity(data?.generalSettings);
        setTopMenu(data?.globalOptions);
    }
    fetchData();

    const handleSubmit = (e) => {
        e.preventDefault();
      
        var formdata = new FormData();
        formdata.append('form_id', 195);
        formdata.append('name', full_name);
        formdata.append('email', email);
        formdata.append('subject', subject);
        formdata.append('message', message);

        axios({
            method: 'POST',
            url: import.meta.env.VITE_WORDPRESS_PROJECT_URL + import.meta.env.VITE_CF7_CONTACT_ROUTE_URL,
            data: formdata,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                alert(response.data.message)
                setFullName("")
                setEmail("")
                setSubject("")
                setMessage("")
            })
            .catch(error => {
                console.error('Error posting data:', error);
            });

    }


    return (
        <>
            <Header top_menu={topmenu} menu={menu} site_identity={siteidentity} />

            <InnerBanner banner={innerBanner?.innerBanner} />

            {/* Contact Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-4 mb-5">
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="h-100 bg-light d-flex align-items-center p-5">
                                <div className="btn-lg-square bg-white flex-shrink-0">
                                    <i className="fa fa-map-marker-alt text-primary" />
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">
                                        <span className="text-primary me-2">#</span>Address
                                    </p>
                                    <h5 className="mb-0">{topmenu?.globalSiteSettings?.contactAddress}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="h-100 bg-light d-flex align-items-center p-5">
                                <div className="btn-lg-square bg-white flex-shrink-0">
                                    <i className="fa fa-phone-alt text-primary" />
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">
                                        <span className="text-primary me-2">#</span>Call Now
                                    </p>
                                    <h5 className="mb-0">{topmenu?.globalSiteSettings?.contactPhoneNumber}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="h-100 bg-light d-flex align-items-center p-5">
                                <div className="btn-lg-square bg-white flex-shrink-0">
                                    <i className="fa fa-envelope-open text-primary" />
                                </div>
                                <div className="ms-4">
                                    <p className="mb-2">
                                        <span className="text-primary me-2">#</span>Mail Now
                                    </p>
                                    <h5 className="mb-0">{topmenu?.globalSiteSettings?.contactMailAddress}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-5">
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
                            <p>
                                <span className="text-primary me-2">#</span>
                                {element?.contactFormShortTitle ? parse(element?.contactFormShortTitle) : ''}
                            </p>
                            <h1 className="display-5 mb-4">{element?.contactFormTitle ? parse(element?.contactFormTitle) : ''}</h1>
                            <p className="mb-4">
                                {element?.contactFormShortDescription ? parse(element?.contactFormShortDescription) : ''}
                            </p>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                value={full_name}
                                                placeholder="Your Name"
                                                onChange={(e) => setFullName(e.target.value)}
                                            />
                                            <label htmlFor="name">Your Name</label>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control bg-light border-0"
                                                value={email}
                                                placeholder="Your Email"
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                            <label htmlFor="email">Your Email</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0"
                                                value={subject}
                                                placeholder="Subject"
                                                onChange={(e) => setSubject(e.target.value)}
                                            />
                                            <label htmlFor="subject">Subject</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control bg-light border-0"
                                                placeholder="Leave a message here"
                                                value={message}
                                                style={{ height: 100 }}
                                                defaultValue={""}
                                                onChange={(e) => setMessage(e.target.value)}
                                            />
                                            <label htmlFor="message">Message</label>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="h-100" style={{ minHeight: 400 }}>
                                <iframe
                                    className="rounded w-100 h-100"
                                    src={element?.contactFormSideMap}
                                    frameBorder={0}
                                    allowFullScreen=""
                                    aria-hidden="false"
                                    tabIndex={0}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Contact End */}

            <Footer data={topmenu} quick_link_menu={footermenu} />
        </>
    )
}
