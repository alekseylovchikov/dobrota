const INIT_STATE = {
  adsList: [],
  loading: false,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'FETCH_ADS':
      return {
        ...state,
        adsList: action.payload,
      };
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'END_LOADING':
      return {
        ...state,
        loading: false,
      }; 
    default:
      return state;
  }
};
