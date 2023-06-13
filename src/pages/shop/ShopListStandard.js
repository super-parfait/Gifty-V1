import PropTypes from "prop-types";
import React, { Fragment, useState, useMemo } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import MetaTags from "react-meta-tags";
// import React, { useState, useMemo } from 'react';
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProduct_3";



const PageSize = 12;
const ShopListStandard = ({ location, giftPersonnalized, allGift }) => {

  // Je fais un brassage afin de recuperer les cadeaux avec les differents produits a l'interieur

  if(allGift.length >0 && giftPersonnalized.length > 0){
    var cadeaux_personnalized = allGift.filter(objet1 =>
      giftPersonnalized.some(objet2 => objet2.gift.id === objet1.gift.id)
    );
  }

  const [layout, setLayout] = useState("grid three-column");


  const [currentPage, setCurrentPage] = useState(1);

  const products = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return cadeaux_personnalized.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);



  // const pageLimit = 15;
  const { pathname } = location;

  // console.log(allGift)
  console.log(cadeaux_personnalized)
  console.log(giftPersonnalized)
  console.log(products)



  
  
  // console.log(cadeaux_personnalized);

  const getLayout = layout => {
    setLayout(layout);
  };


  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Mes cadeaux</title>
        <meta
          name="description"
          content="  Votre application de cadeau, qui vous apporte du sourire."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Mes cadeaux personalisé(s)
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
          {cadeaux_personnalized && cadeaux_personnalized.length >= 1 ? (
            <div className="row">
              {/* <div className="col-lg-3 order-2 order-lg-1">
               
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                />
              </div> */}
              <div className="col-lg-12">
                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  // getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={cadeaux_personnalized.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={products} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">

                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={cadeaux_personnalized.length}
                  pageSize={PageSize}
                  onPageChange={page => setCurrentPage(page)}
                />
                </div>
              </div>
            </div>
           ):(
            <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-box1"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Aucun élement dans la boite à cadeaux <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/gift"}>
                        Ajouter
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
          )} 
          </div>
        </div>
        
      </LayoutOne>
    </Fragment>
  );
};

ShopListStandard.propTypes = {
  location: PropTypes.object,
  products: PropTypes.array
};

const mapStateToProps = state => {
  return {
    allGift: state.allGift,
    // products: state.productData.products,
    giftPersonnalized: state.giftPersonnalized
  };
};

export default connect(mapStateToProps)(ShopListStandard);
