import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider_2";
// import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab_2";
// import ProductImageDescription from "../../wrappers/product/ProductImageDescription_2";

import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider_2";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab_2";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription_2";

const ProductFixedImage = ({ location, product }) => {
  const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Cadeaux </title>
        <meta
          name="description"
          content="Votre application de cadeau, qui vous facilite la vie."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Détails Produit
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={product}
          galleryType="fixedImage"
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={product.fullDescription}
        />

        {/* related product slider */}


        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={product.category[0]}
        />


      </LayoutOne>
    </Fragment>
  );
};

ProductFixedImage.propTypes = {
  location: PropTypes.object,
  product: PropTypes.object
};

const mapStateToProps = (state, ownProps) => {
  const itemId = ownProps.match.params.id;
  return {
    product: state.productData.products.filter(
      single => single.id === itemId
    )[0]
  };
};

export default connect(mapStateToProps)(ProductFixedImage);
