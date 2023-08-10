import {
  FETCH_PACKAGES,
  ADD_PACKAGE,
  GET_PACKAGE_BY_ID,
  SEARCH_PACKAGES,
  CLEAR_PACKAGE_DETAILS,
  SET_CITY_FILTER,
  SET_DURATION_FILTER,
  SET_PRICE_FILTER,
  CLEAR_SEARCH_VIEW,
  SET_PRICE_RANGE_FILTER,
  SET_CLEAR_PRICE_RANGE_FILTER,
  SET_ORIGIN_CITY_FILTER,
  FETCH_ORIGIN_CITIES,
  RESET
} from "./packagesActions";



const initialState = {
  allPackages:[],
  packagesList: [],
  packagesSearch: [],
  packagesFiltered: [],
  packageDetails: {},
  originCitiesList:[],
  filters: {
  cityFilter: "Todos",
  durationFilter: "Todos",
  priceFilter: "precios",
  originCityFilter:"Todos",
  ranPriceFilter:[0.0, 10000.0],
    }
  
};


const packagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PACKAGES:
      return {
        ...state,
        packagesList: action.payload,
        packagesFiltered: action.payload,
        allPackages:action.payload,
        packagesSearch:action.payload
      };
      case FETCH_ORIGIN_CITIES:
      return {
        ...state,
        originCitiesList: action.payload,
      }
    case ADD_PACKAGE:
      return {
        ...state,
      };
    case GET_PACKAGE_BY_ID:
      return {
        ...state,
        packageDetails: action.payload,
      };
      
      case SEARCH_PACKAGES:
      if (state.filters.cityFilter === "Todos") {
        return {
          ...state,
          packagesList: action.payload,
          packagesSearch: action.payload,
          packagesFiltered: action.payload,
        };
      } else {
        const filteredByCity = state.allPackages.filter((el) => el.City.name === state.filters.cityFilter);
        return {
          ...state,
          packagesList: action.payload,
          packagesSearch: action.payload,
          packagesFiltered: filteredByCity,
        };
      }

    case CLEAR_PACKAGE_DETAILS:
      return {
        ...state,
        packageDetails: {},
      };

      case CLEAR_SEARCH_VIEW:
        return{
          ...state,
          packagesFiltered:[],
          packagesSearch:[],
          packagesList:[]
        }


        case SET_CITY_FILTER:
          const selectedCityName = action.payload;
          let filteredByCity;
    
          if (selectedCityName !== "Todos") {
            filteredByCity = state.allPackages.filter((el) => el.City.name === selectedCityName);
          } else {
            filteredByCity = state.allPackages;
          }
    
          // Aplicar el filtro de ciudad de origen si es diferente de "Todos"
          if (state.filters.originCityFilter !== "Todos") {
            filteredByCity = filteredByCity.filter((pkg) => pkg.originCity === state.filters.originCityFilter);
          }
    
          return {
            ...state,
            packagesList: filteredByCity,
            packagesSearch: filteredByCity,
            packagesFiltered: filteredByCity,
            filters: {
              ...state.filters,
              cityFilter: action.payload,
            },
          };

          case SET_ORIGIN_CITY_FILTER:
            const selectedOriginCityName = action.payload;
            let filteredByOriginCity;
          
            if (selectedOriginCityName !== "Todos") {
              const selectedOriginCity = state.originCitiesList.find((city) => city.name === selectedOriginCityName);
              const selectedOriginCityId = selectedOriginCity ? selectedOriginCity.id : null;
          
              // Aplicar el filtro de ciudad de origen sobre los países filtrados previamente (packagesFiltered)
              filteredByOriginCity = state.packagesFiltered.filter((pkg) => pkg.originCity === selectedOriginCityId);
            } else {
              // Si se selecciona "Todos", mantener el filtro de ciudad de destino si existe
              filteredByOriginCity = state.packagesFiltered;
            }
          
            // Combinar el filtro de ciudad de destino si existe
            if (state.filters.cityFilter !== "Todos") {
              filteredByOriginCity = filteredByOriginCity.filter((pkg) => pkg.City.name === state.filters.cityFilter);
            }
          
            return {
              ...state,
              packagesList: filteredByOriginCity,
              packagesSearch: filteredByOriginCity,
              filters: {
                ...state.filters,
                originCityFilter: action.payload,
              },
            };
    
  //         case SET_ORIGIN_CITY_FILTER:
  // const selectedOriginCityName = action.payload;
  // const cityFilter = state.filters.cityFilter;

  // if (selectedOriginCityName === "Todos") {
  //   // Si se selecciona "Todos" en el filtro de ciudad de origen
  //   // Mostramos los paquetes filtrados previamente por ciudad de destino (cityFilter)
  //   const filteredByCity = cityFilter === "Todos"
  //     ? state.allPackages // Si también se selecciona "Todos" en el filtro de ciudad de destino, mostramos todos los paquetes
  //     : state.allPackages.filter((pkg) => pkg.City.name === cityFilter);

  //   return {
  //     ...state,
  //     packagesFiltered: filteredByCity,
  //     filters: {
  //       ...state.filters,
  //       originCityFilter: action.payload,
  //     },
  //   };
  // } else {
  //   const selectedOriginCity = state.originCitiesList.find((city) => city.name === selectedOriginCityName);
  //   const selectedOriginCityId = selectedOriginCity ? selectedOriginCity.id : null;

  //   // Aplicamos el filtro de ciudad de origen y ciudad de destino (si no es "Todos")
  //   const filteredByOriginCity = cityFilter === "Todos"
  //     ? state.allPackages.filter((pkg) => pkg.originCity === selectedOriginCityId)
  //     : state.allPackages.filter((pkg) => pkg.originCity === selectedOriginCityId && pkg.City.name === cityFilter);

  //   return {
  //     ...state,
  //     packagesFiltered: filteredByOriginCity,
  //     filters: {
  //       ...state.filters,
  //       originCityFilter: action.payload,
  //     },
  //   };
  // }
      
    case SET_DURATION_FILTER:
      let orderDuration;
      if (state.filters.cityFilter === "Todos") {
        orderDuration = state.packagesFiltered.slice().sort((a, b) => {
          if (a.duration < b.duration) {
            return action.payload === "Menor-Mayor" ? 1 : -1;
          }
          if (a.duration > b.duration) {
            return action.payload === "Menor-Mayor" ? -1 : 1;
          }
          return 0;
        });
      } else {
        orderDuration = state.packagesFiltered.slice().sort((a, b) => {
          if (a.duration < b.duration) {
            return action.payload === "Menor-Mayor" ? 1 : -1;
          }
          if (a.duration > b.duration) {
            return action.payload === "Menor-Mayor" ? -1 : 1;
          }
          return 0;
        });
      }
      return {
        ...state,
        packagesList: action.payload === "Todos" ? state.packagesFiltered : orderDuration,
        packagesSearch: action.payload === "Todos" ? state.packagesFiltered : orderDuration,
        packagesFiltered: action.payload === "Todos" ? state.packagesFiltered : orderDuration,
      };
      case SET_PRICE_FILTER:
        let orderPrice;
        const packagesFilteredCopy = [...state.packagesFiltered]; // Copia del array para no modificar el estado original
  
        if (action.payload === "MenorPrecio") {
          orderPrice = packagesFilteredCopy.sort((a, b) => a.standarPrice - b.standarPrice);
        } else if (action.payload === "MayorPrecio") {
          orderPrice = packagesFilteredCopy.sort((a, b) => b.standarPrice - a.standarPrice);
        } else {
          orderPrice = packagesFilteredCopy;
        }
  
        return {
          ...state,
          packagesList: action.payload === "precios" ? orderPrice : packagesFilteredCopy,
          packagesSearch: action.payload === "precios" ? orderPrice : packagesFilteredCopy,
          packagesFiltered: orderPrice,
        };

      case SET_PRICE_RANGE_FILTER:
        const priceRangeFilter = action.payload;
        let filteredByPrice;
  
        if (state.filters.cityFilter === "Todos") {
          // Si el filtro de ciudad es "Todos", aplicar el filtro de precio desde todos los paquetes
          filteredByPrice = state.packagesSearch.filter((pkg) => {
            const packagePrice = parseFloat(pkg.standarPrice);
            return packagePrice >= priceRangeFilter[0] && packagePrice <= priceRangeFilter[1];
          });
  
          if (filteredByPrice.length === 0) {
            alert("No hay paquetes en el presupuesto elegido para la ciudad seleccionada.");
          }
  
          return {
            ...state,
            filters: {
              ...state.filters,
              priceRangeFilter: priceRangeFilter,
            },
            packagesSearch: filteredByPrice,
            packagesFiltered: filteredByPrice,
          };
        } else {
          // Si hay un filtro de ciudad aplicado, aplicar el filtro de precio desde los paquetes filtrados por ciudad
          filteredByPrice = state.packagesFiltered.filter((pkg) => {
            const packagePrice = parseFloat(pkg.standarPrice);
            return packagePrice >= priceRangeFilter[0] && packagePrice <= priceRangeFilter[1];
          });
  
          if (filteredByPrice.length === 0) {
            alert("No hay paquetes en el presupuesto elegido para la ciudad seleccionada.");
          }
  
          return {
            ...state,
            filters: {
              ...state.filters,
              priceRangeFilter: priceRangeFilter,
            },
            packagesSearch: filteredByPrice,
            packagesFiltered: filteredByPrice,
          };
        }
  
  
    case SET_CLEAR_PRICE_RANGE_FILTER:
  return {
    ...state,
    filters: {
      ...state.filters,
      priceRangeFilter: [0.0, 10000.0], // Restablecer el valor inicial del rango de precios
    },
    packagesSearch: state.filters.cityFilter // Aplicar el filtro de ciudad nuevamente
      ? state.allPackages.filter((el) => el.City.name === state.filters.cityFilter)
      : state.allPackages,
    packagesFiltered: state.filters.cityFilter // Aplicar el filtro de ciudad nuevamente
      ? state.allPackages.filter((el) => el.City.name === state.filters.cityFilter)
      : state.allPackages,
  };

  case RESET:
    return {
      ...state,
      packagesList: state.allPackages,
      packagesFiltered: state.allPackages,
      packagesSearch:state.allPackages,

      filters: {
        cityFilter: "",
        durationFilter: "Todos",
        priceFilter: "precios",
        originCityFilter:"Todos",
        ranPriceFilter: [0.0, 10000.0]
      }
    };
   
    default:
      return state;
  }
};


export default packagesReducer;