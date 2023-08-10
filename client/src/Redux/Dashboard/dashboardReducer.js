import {
  FETCH_BILLS_REQUEST,
  FILTER_SALES_BY_PRODUCTS,
} from "./dashboardAction";

const initialState = {
  bills: [],
  billsProducts: [],

  loading: false,
  error: null,
};

const billReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BILLS_REQUEST:
      const billsCopy = [...action.payload];
      const filteredSales = billsCopy.map((bill) => {
        return {
          date: bill.date.slice(5, 7),
          amount: parseInt(bill.subtotal),
        };
      });

      return {
        ...state,
        bills: filteredSales,
      };

    case FILTER_SALES_BY_PRODUCTS:
      const billsRaw = [...action.payload];
      const filteredProducts = billsRaw.map((bill) => {
        const itemsSales = bill.ItemsBills.map((item) => ({
          date: bill.date.slice(5,7),
          amount: parseInt(item.totalPrice),
          typeProduct: item.typeProduct,
          title: item.title,
        }));

        return itemsSales;
      });

      const mergedItemsSales = [].concat(...filteredProducts);
      return {
        ...state,
        billsProducts: mergedItemsSales,
      };

    default:
      return { ...state };
  }
};

export default billReducer;
