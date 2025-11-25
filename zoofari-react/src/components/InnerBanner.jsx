import { Link } from "react-router";
import { parse } from "graphql";

export const InnerBanner = (props) => {
  
  return (
    <>
      <div className="container-fluid header-bg py-5 mb-5 wow fadeIn" data-wow-delay="0.1s"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)), url(${props?.banner?.bannerBackgroundImage?.node?.sourceUrl}) center center no-repeat`,
        backgroundSize: 'cover'
      }}>
        <div className="container py-5">
          <h1 className="display-4 text-white mb-3 animated slideInDown">
            {props?.banner?.bannerHeading ? props.banner.bannerHeading : ''}
          </h1>
          <nav aria-label="breadcrumb animated slideInDown">
            <ol className="breadcrumb mb-0">
              <li className="breadcrumb-item">
                <Link to="/" className="text-white">Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={{ javascript: void (0) }} className="text-white">Pages</Link>
              </li>
              <li className="breadcrumb-item text-primary active" aria-current="page">
                {props?.banner?.bannerHeading ? props.banner.bannerHeading : ''}
              </li>
            </ol>
          </nav>
        </div>
      </div>

    </>
  )
}
