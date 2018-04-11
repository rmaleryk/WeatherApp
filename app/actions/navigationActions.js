export const navigateTo = (screenName, navigation) => 
  (dispatch, getState) => {  
    navigation.navigate(screenName);
  };