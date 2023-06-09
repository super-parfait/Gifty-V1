import PropTypes from "prop-types";
import React from "react";

const ProductImageFixed = ({ product }) => {
  return (
    <div className="product-large-image-wrapper">
      {/* {product.discount || product.new ? (
        <div className="product-img-badges">
          {product.discount ? (
            <span className="pink">-{product.discount}%</span>
          ) : (
            ""
          )}
          {product.new ? <span className="purple">New</span> : ""}
        </div>
      ) : (
        ""
      )} */}

      <div className="product-fixed-image">
        {product.product.map(list_products=>{
          return(
            <img
              src={"https://dev-mks.com:9000/api/v1/srv-core"+list_products.image}
            // src={ list_products.image }
            alt=""
            className="img-fluid"
          />
         )
        })
      }
      </div>
    </div>
  );
};

ProductImageFixed.propTypes = {
  product: PropTypes.object
};

export default ProductImageFixed;
