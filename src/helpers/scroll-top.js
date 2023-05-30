import { useEffect } from "react";
import { withRouter } from "react-router-dom";
// import {
//   useLocation,
//   useNavigate,
//   useParams,
// } from "react-router-dom";

// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     let location = useLocation();
//     let navigate = useNavigate();
//     let params = useParams();
//     return (
//       <Component
//         {...props}
//         router={{ location, navigate, params }}
//       />
//     );
//   }

//   return ComponentWithRouterProp;
// }

// import { useNavigate } from 'react-router';


// function withRouter(Component){
//     const Wrapper = (props) =>{
//         const history = useNavigate();
//         return <Component history={history} {...props}/> 
//     } 
//     return Wrapper;
// }

const ScrollToTop = props => {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return props.children;  
};

export default withRouter(ScrollToTop);
