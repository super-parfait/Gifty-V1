import PropTypes from "prop-types";
import React, { Fragment, useState, useMemo, Link } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { connect } from "react-redux";
import LayoutOne from "../../layouts/LayoutOne";
import Pagination from "../../components/pagination/Pagination";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";


const PageSize = 12;
const ShopGridNoSidebar = ({ location, recommandation }) => {



 
  const [layout, setLayout] = useState("grid three-column");

  const [currentPage, setCurrentPage] = useState(1);

  const products = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return recommandation.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);



  console.log(products)

  const { pathname } = location;

  const getLayout = layout => {
    setLayout(layout);
  };


  return (
    <Fragment>
      <MetaTags>
        <title>Gifty | Packs Cadeaux</title>
        <meta
          name="description"
          content="Gifty App"
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Accueil</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Packs Cadeaux
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
          {recommandation && recommandation.length >= 1 ? (

            <div className="row">
              <div className="col-lg-12">
              
              

                {/* shop topbar default */}
                <ShopTopbar
                  getLayout={getLayout}
                  // getFilterSortParams={getFilterSortParams}
                  productCount={products.length}
                  sortedProductCount={products.length}
                />

                {/* shop page content default */}
                <ShopProducts layout={layout} products={products} />

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={recommandation.length}
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
                      Veuillez recommancer la recherche de votre cadeau <br />{" "}
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

ShopGridNoSidebar.propTypes = {
  location: PropTypes.object,
  recommandation: PropTypes.array
};

const mapStateToProps = state => {
  return {
    recommandation: state.productData.data
  };
};

export default connect(mapStateToProps)(ShopGridNoSidebar);
