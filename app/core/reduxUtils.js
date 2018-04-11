import { connect as reduxConnect } from "react-redux";
import { bindActionCreators } from "redux";

const mergeProps = (stateProps, dispatchProps) => {
  const navigateTo = (screen) => {
    dispatchProps.navigateTo && dispatchProps.navigateTo(screen, stateProps.navigation);
  };
  
  return Object.assign({},
    stateProps,
    dispatchProps,
    {
      navigateTo
    }
  );
};

export const connect = (mapStateToProps, actions, component) => reduxConnect(
  mapStateToProps,
  (dispatch) => bindActionCreators(
    actions,
    dispatch),
  mergeProps
  )(component);