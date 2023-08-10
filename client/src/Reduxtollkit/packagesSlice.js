import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk action para obtener packages del servidor
export const fetchPackages = createAsyncThunk(
  "packages/fetchPackages",
  async () => {
    const response = await axios.get("http://localhost:3002/packages");
    return response.data;
  }
);

export const addPackages = createAsyncThunk(
  "packages/addPackages",
  async (newPackage) => {
    const response = await axios.post(
      "http://localhost:3002/packages",
      newPackage
    );
    return response.data;
  }
);

// Thunk action para obtener un package específico del servidor
export const getPackageById = createAsyncThunk(
  "packages/getPackageById",
  async (id) => {
    const response = await axios.get(`http://localhost:3002/packages/${id}`);
    return response.data;
  }
);

export const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    packagesList: [],
    status: "idle",
    error: null,
    packageData: {},
    loading: false,
    errorId: null,
  },
  reducers: {
    // Agrega un nuevo package al estado inicial
    addPackage: (state, action) => {
      state.packagesList.push(action.payload);
    },
    addDetail: (state, action) => {
      state.packageData.push(action.payload);
    },
    clearPackageDetails: (state) => {
      state.packageData = {};
      state.loading = false;
      state.errorId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPackages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPackages.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Agrega los packages al estado inicial
        state.packagesList = action.payload;
      })
      .addCase(fetchPackages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addPackages.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPackages.fulfilled, (state, action) => {
        state.loading = false;
        // Añade el nuevo package a la lista de packages
        state.packagesList.push(action.payload);
      })
      .addCase(addPackages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getPackageById.pending, (state) => {
        state.loading = true;
        state.errorId = null;
      })
      .addCase(getPackageById.fulfilled, (state, action) => {
        state.loading = false;
        // Actualiza packageData con los datos del package obtenido
        state.packageData = action.payload;
      })
      .addCase(getPackageById.rejected, (state, action) => {
        state.loading = false;
        state.errorId = action.error.message;
      });
      
  },
});

export const { addPackage, addDetail, clearPackageDetails } =
  packagesSlice.actions;

export const searchPackagesAsync = createAsyncThunk(
  "packages/searchPackages",
  async (word, { getState }) => {
    const { packagesList } = getState().packages;
    const normalizedSearchTerm = normalizeText(word);
    const filteredPackages = packagesList.filter((tour) =>
      normalizeText(tour.title).includes(normalizedSearchTerm)
    );
    return filteredPackages;
  }
);

// Función de utilidad para normalizar el texto eliminando tildes y convirtiendo a minúsculas
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

export const searchSlice = createSlice({
  name: "search",
  initialState: { searchResults: [], status: "idle", error: null },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPackagesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPackagesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchPackagesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchResults } = searchSlice.actions;


export const packagesReducer = packagesSlice.reducer;
export const searchReducer = searchSlice.reducer;

export default packagesReducer;
export const selectPackages = (state) => state.packages.packagesList;
export const selectPackagesStatus = (state) => state.packages.status;
