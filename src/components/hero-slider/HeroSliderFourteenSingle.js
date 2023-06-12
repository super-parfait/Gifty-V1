import PropTypes from "prop-types";
import React from "react";
import {useHistory  } from "react-router-dom";
import { connect } from 'react-redux'

import { getProducts } from "../../redux/actions/productActions";

const HeroSliderFourteenSingle = ({ data, sliderClassName, query, onInputChange }) => {


  var history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    history.push("/gift");
  } 


  return (
    <div
      className={`slider-height-5 d-flex align-items-center bg-img ${
        sliderClassName ? sliderClassName : ""
      }`}
      // style={{ backgroundImage: `url(${process.env.PUBLIC_URL + data.image})` }}
    >
      <video style={{width:"100%",height:"100vh", objectFit: "cover" }} autoPlay loop muted src={process.env.PUBLIC_URL+ "assets/animation/4.mp4"}></video>

      <div className="container" style={{width:"100%", position: 'absolute'}}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="slider-content-6 slider-animated-1 text-center">
              <h2 className="animated" style={{color:"#000", fontSize:"20px"}}>Cherchez-vous le cadeau idéal ? </h2>
              <h1 style={{color: "#000"}} className="animated">Essayez <span style={{color: "red", fontWeight: "bold"}}>GIFTY</span></h1>
              {/* <p className="animated"></p> */}


              

              <div className="row justify-content-center">
                  <div className="col-12 col-md-12 col-lg-12">
                      <form className="card card-sm" onSubmit={handleOnSubmit} >
                          <div className="card-body row no-gutters align-items-center">
                              {/* <div className="col-auto">
                                  <i className="fas fa-search h4 text-body"></i>
                              </div> */}
                              
                              <div className="col">
                                  <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Chercher un cadeau" style={{fontSize:`20px`}} onChange={(e) => onInputChange(e.target.value)} value={query} />
                              </div>
                              
                              <div className="col-auto " >
                                  <button className="btn btn-lg" style={{backgroundColor:`#ff1e1e`, color:`white`}} type="submit"><i className="pe-7s-search" ></i></button>
                              </div>
                              
                          </div>
                      </form>
                  </div>
                  
              </div>


              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

HeroSliderFourteenSingle.propTypes = {
  data: PropTypes.object,
  sliderClassName: PropTypes.string
};


const mapStateToProps = state => ({
  query: state.product
})

const mapDispatchToProps = dispatch => ({
  onInputChange : (query) => dispatch(getProducts(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeroSliderFourteenSingle);


// export default HeroSliderFourteenSingle;
