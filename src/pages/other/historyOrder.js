import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
// import { connect } from "react-redux";
// import { getDiscountPrice } from "../../helpers/product";

import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import Table from "./table";

const historyOrder = ({
  location
}) => {


//   const [quantityCount] = useState(1);
//   const { addToast } = useToasts();
  const { pathname } = location;
//   let cartTotalPrice = 0;

  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Historique Commande</title>
        <meta
          name="description"
          content="Votre application de cadeau, qui vous apporte du sourire."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Mon Historique de Commande
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="cart-main-area pt-90 pb-100">
                <Table />
        </div>
      </LayoutOne>
      
      
    </Fragment>
  );
};

historyOrder.propTypes = {
  addToCart: PropTypes.func,
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  decreaseQuantity: PropTypes.func,
  location: PropTypes.object,
  deleteAllFromCart: PropTypes.func,
  deleteFromCart: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

// const mapDispatchToProps = dispatch => {
//   return {
//     addToCart: (item, addToast, quantityCount) => {
//       dispatch(addToCart(item, addToast, quantityCount));
//     },
//     decreaseQuantity: (item, addToast) => {
//       dispatch(decreaseQuantity(item, addToast));
//     },
//     deleteFromCart: (item, addToast) => {
//       dispatch(deleteFromCart(item, addToast));
//     },
//     deleteAllFromCart: addToast => {
//       dispatch(deleteAllFromCart(addToast));
//     }
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
export default historyOrder
