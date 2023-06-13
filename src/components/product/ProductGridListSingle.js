import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";

const ProductGridListSingle = ({
  product,
  // currency,
  addToCart,
  addToWishlist,
  addToCompare,
  cartItem,
  wishlistItem,
  compareItem,
  sliderClassName,
  spaceBottomClass
}) => { 
  const [modalShow, setModalShow] = useState(false);
  const { addToast } = useToasts();

  const discountedPrice = getDiscountPrice(product.gift.price);
  const finalProductPrice = +(product.gift.price);
  const finalDiscountedPrice = +(
    discountedPrice
  );

  console.log(product)

  return (

    <Fragment>
      <div
        className={`col-xl-4 col-sm-6 ${
          sliderClassName ? sliderClassName : ""
        }`}
      >
        <div className={`product-wrap ${spaceBottomClass ? spaceBottomClass : ""}`} >

          {/* L'affichage de l'image */}
          <div className="product-img">
            <Link to={process.env.PUBLIC_URL + "/product/" + product.gift.id}>
              <img
                className="default-img"
                // src={process.env.PUBLIC_URL + "assets/img/gift_personnel.jpg"}
                src={product.gift.image}
                alt=""
              />

            </Link>



            {/* debut pour les actions sur les produits */}

            <div className="product-action">

              <div className="pro-same-action">
                
              </div>

              <div className="pro-same-action pro-cart">
                {
                
                // Le lient pour aller sur Amazon

                
                product.quantity && product.quantity > 0 ? (
                  <button
                    onClick={() => addToCart(product, addToast)}
                    
                    className={
                      cartItem !== undefined && cartItem.quantity > 0
                        ? "active"
                        : ""
                    }
                    disabled={cartItem !== undefined && cartItem.quantity > 0}
                    title={
                    cartItem !== undefined ? "Ajouté au panier" : "Ajouter au panier"
                    }
                  >
                    {" "}
                    <i className="pe-7s-cart"></i>{" "}
                    {cartItem !== undefined && cartItem.quantity > 0
                      ? "Ajouté"
                      : "Ajouter au panier"}
                  </button>
                ) : (
                  <button disabled className="active">
                    Indisponible
                  </button>
                )
                
                }
              </div>

              
              <div className="pro-same-action pro-quickview">
                <button onClick={() => setModalShow(true)} title="Plus de détails">
                  <i className="pe-7s-look" />
                </button>
              </div>
            </div>


            {/* Fin pour les actions sur les produits */}
          </div>

            {/* L'affichage du nom et detail du produits */}
          <div className="product-content text-center">
            <h3>
              <Link to={process.env.PUBLIC_URL + "/product/" + product.gift.id}>
                {product.gift.title}
              </Link>
            </h3>


            <div className="product-price">
              {discountedPrice !== null ? (
                <Fragment>
                  <span>{ finalDiscountedPrice + " F CFA"}</span>{" "}
                  <span className="old">
                    { finalProductPrice + " F CFA"}
                  </span>
                </Fragment>
              ) : (
                <span>{ finalProductPrice + " F CFA"} </span>
              )}
            </div>
          </div>
                {/* Fin de L'affichage du nom  et detail du produits */}


        </div>
        

        {/* Gestion de la responsivité avec le spaceBottomClass pour le mb25 ou mb30 */}
        <div className="shop-list-wrap mb-30">
          <div className="row">
            <div className="col-xl-4 col-md-5 col-sm-6">
              <div className="product-list-image-wrap">
                <div className="product-img">
                  
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.gift.id}>
                    <img
                      className="default-img img-fluid"
                      src={product.gift.image}
                      alt={product.gift.title}
                    />

                  </Link>
                  
                </div>
              </div>
            </div>
            <div className="col-xl-8 col-md-7 col-sm-6">
              <div className="shop-list-content">
                <h3>
                  <Link to={process.env.PUBLIC_URL + "/product/" + product.gift.id}>
                    {product.gift.title}
                  </Link>
                </h3>
                <div className="product-list-price">
                  {discountedPrice !== null ? (
                    <Fragment>
                      <span>
                        { finalDiscountedPrice + " F CFA"}
                      </span>{" "}
                      <span className="old">
                        { finalProductPrice + " F CFA"}
                      </span>
                    </Fragment>
                  ) : (
                    <span>{ finalProductPrice + " F CFA"} </span>
                  )}
                </div>

                {product.gift.description ? (
                  <p>{product.gift.description}</p>
                ) : (
                  ""
                )}

                <div className="shop-list-actions d-flex align-items-center">
                  <div className="shop-list-btn btn-hover">
                    {
                    product.quantity && product.quantity > 0 ? (
                      <button
                        onClick={() => addToCart(product, addToast)}
                        className={
                          cartItem !== undefined && cartItem.quantity > 0
                            ? "active"
                            : ""
                        }
                        disabled={
                          cartItem !== undefined && cartItem.quantity > 0
                        }
                        title={
                          cartItem !== undefined
                            ? "Ajouté au panier"
                            : "Ajouter au panier"
                        }
                      >
                        {" "}
                        <i className="pe-7s-cart"></i>{" "}
                        {cartItem !== undefined && cartItem.quantity > 0
                          ? "Ajouté au panier"
                          : "Ajouter au panier"}
                      </button>
                    ) : (
                      <button disabled className="active">
                        Indisponible
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        // currency={currency}
        discountedprice={discountedPrice}
        finalproductprice={finalProductPrice}
        finaldiscountedprice={finalDiscountedPrice}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        addtocompare={addToCompare}
        addtoast={addToast}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  addToCart: PropTypes.func,
  addToCompare: PropTypes.func,
  addToWishlist: PropTypes.func,
  cartItem: PropTypes.object,
  compareItem: PropTypes.object,
  currency: PropTypes.object,
  product: PropTypes.object,
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.object
};

export default ProductGridListSingle;
