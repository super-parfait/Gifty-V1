import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { LightgalleryProvider, LightgalleryItem } from "react-lightgallery";
import Swiper from "react-id-swiper";

const ProductImageGallery = ({ product }) => {
  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // effect for swiper slider synchronize
  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  // swiper slider settings
  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true,
    effect: "fade"
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  product = [product]

  return (
    <Fragment>
      <div className="product-large-image-wrapper">
        
        <LightgalleryProvider>
          <Swiper {...gallerySwiperParams}>

          {
            product[0].product.map(list_products=>{
              
            return(
              <p> {list_products.image} </p>,
              <div>
                <LightgalleryItem
                  group="any"
                  src={"https://dev-mks.com:9000/api/v1/srv-core"+list_products.image}
                >
                  <button>
                    <i className="pe-7s-expand1"></i>
                  </button>
                </LightgalleryItem>
                <div className="single-image">
                  <img
                    src={"https://dev-mks.com:9000/api/v1/srv-core"+list_products.image}
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
                )
              })
            }
          </Swiper>
        </LightgalleryProvider>
      </div>
      <div className="product-small-image-wrapper mt-15">
        <Swiper {...thumbnailSwiperParams}>

          {
            product[0].product.map((single, key) => {
              return (
                <div key={key}>
                  <div className="single-image">
                    <img
                      src={"https://dev-mks.com:9000/api/v1/srv-core"+single.image}
                      className="img-fluid"
                      alt=""
                    />
                  </div>
                </div>
              );
            })

            }
        </Swiper>
      </div>
    </Fragment>
  );
};

ProductImageGallery.propTypes = {
  product: PropTypes.object
};

export default ProductImageGallery;
