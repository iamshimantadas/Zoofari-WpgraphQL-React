const AnimalSection = (props) => {

  const chunk = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const columns = chunk(props.data, 2);

  return (
    <>
      <div className="row g-4">
        {columns.map((col, i) => (
          <div
            className="col-lg-4 col-md-6 wow fadeInUp"
            data-wow-delay={`${0.1 * (i + 1)}s`}
            key={i}
          >
            <div className="row g-4">
              {col.map((animal, index) => (
                <div className="col-12" key={index}>
                  <a
                    className="animal-item"
                    href={animal.animalsListingAnimalImage?.node?.sourceUrl}
                    data-lightbox="animal"
                  >
                    <div className="position-relative">
                      <img
                        className="img-fluid"
                        src={animal.animalsListingAnimalImage?.node?.sourceUrl}
                        alt={animal.animalsListingAnimalName}
                      />
                      <div className="animal-text p-4">
                        <p className="text-white small text-uppercase mb-0">
                          {animal.animalsListingAnimalCategory}
                        </p>
                        <h5 className="text-white mb-0">
                          {animal.animalsListingAnimalName}
                        </h5>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimalSection;