import {
  GET_CONJS,
  GET_APTOS,
  GET_TORRES,
  LOGIN_USER,
  INGRESO,
} from "./action-types";

const initialState = {
  conjs: [],
  torres: [],
  aptos: [],
  user: null,
  isAutenticated: false,
  ingresos: 0,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CONJS:
      return {
        ...state,
        conjs: payload,
      };
    case GET_TORRES:
      return {
        ...state,
        torres: payload,
      };
    case GET_APTOS:
      return {
        ...state,
        aptos: payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
      };
    case INGRESO:
      return {
        ...state,
        ingresos: ingresos + 1,
      };
    //  case SEARCH_COUNTRY:
    //    return {
    //      ...state,
    //      currentCountries: payload,
    //    };

    //  case RESET_SEARCH:
    //    return {
    //      ...state,
    //      currentCountries: state.allCountries,
    //      countryName: [],
    //    };

    //  case FILTER_ACTIVITY:
    //    return {
    //      ...state,
    //      filteredActivity: payload,
    //      currentCountries: payload,
    //      filtered: payload,
    //      currentPage: 1,
    //    };
    //  case FILTER_CONTINENT:
    //    return {
    //      ...state,
    //      filteredContinent: payload,
    //      currentCountries: payload,
    //      filtered: payload,
    //      currentPage: 1,
    //    };
    //  case CLEAR_FILTERS:
    //    return {
    //      ...state,
    //      filteredActivity: [],
    //      filteredContinent: [],
    //      currentCountries: payload,
    //    };
    //  case CLEAR_SORTS: {
    //    let newSort = [];
    //    if (state.filtered) {
    //      newSort = state.filtered;
    //    } else {
    //      newSort = payload;
    //    }
    //    return {
    //      ...state,
    //      sorted: [],
    //      currentCountries: newSort,
    default:
      return state;
  }
};

export default reducer;
