import PropTypes from "prop-types";
import React, {useRef, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import ProductgridList from "./ProductgridList_2";
import { useSelector, useDispatch,connect } from "react-redux";

import { useToasts } from 'react-toast-notifications';


import { create_gift } from "../../redux/actions/newGiftActions";


import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

const ShopProducts = ({ products, layout, Gift,quantityGift, message_for_created_gift }) => {

  const formCreateGift = useRef();
  const checkBtnCreateGift = useRef();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const { addToast } = useToasts();
  let history =  useHistory()

  const credentials = useSelector(state=>state.giftData[0])

  console.log(credentials)

  const handleCreateGift = (e) => {
    e.preventDefault();


    console.log(credentials)


    setLoading(true);

    formCreateGift.current.validateAll(); 


    if (checkBtnCreateGift.current.context._errors.length === 0) {
      dispatch(create_gift(credentials))
        .then(() => {
          addToast("Bravo votre cadeau est validé !!!", { appearance: 'success', autoDismiss:true });

          history.push("/mes-cadeaux");
          window.location.reload();
        })
        .catch(() => {
          addToast("Aucun produit ajouté au cadeau", { appearance: 'error', autoDismiss:true });
          setLoading(false);
        });

        
    } else {
      setLoading(false);
    }
  };

  return (
    
    <div className="shop-bottom-area mt-35">

          <>
            <div className='container' >
              <div className="row">
                <div className="col-lg-12">
                  <div className="cart-shiping-update-wrapper">
                    <div className="cart-shiping-update">
                      <Form onSubmit={handleCreateGift} ref={formCreateGift}>
                        

                          {/* <button type="submit" style={ {border: "none"} } >
                            <span>Voir mon cadeau</span>
                          </button> */}

                      <button type="submit" class="btn btn-labeled btn-success" >
                        <span class="btn-label"><i class="fa fa-check"></i></span>Valider mon cadeau
                      </button>

                        <CheckButton style={{ display: "none" }} ref={checkBtnCreateGift} /> 

                      </Form>
                      
                      {/* <Link
                        to={process.env.PUBLIC_URL + "/product/"}
                      >
                        Voir mon cadeau 
                      </Link> */}
                    </div>
                    {/* <div className="cart-clear">
                      <button onClick={() => deleteAllFromCart(addToast)}>
                        Effacer Panier
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>

          </>,
      
      <div className={`row ${layout ? layout : ""}`}>
        <ProductgridList products={products} Gift={Gift}  quantityGift={quantityGift} spaceBottomClass="mb-25" />
      </div>
    </div>
  );
};

ShopProducts.propTypes = {
  layout: PropTypes.string,
  products: PropTypes.array,
  Gift: PropTypes.array,
  quantityGift: PropTypes.string,
  products_for_personnalized: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {

  return {
 
    message_for_created_gift: state.message.message_for_created_gift
}

};

export default connect(mapStateToProps)(ShopProducts)
