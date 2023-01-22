import { createSlice } from "@reduxjs/toolkit";
import data from "../../database/data";

const initialState = {
  showMenu: false,
  showSubmenu: 'cities',
  cities: [],
  citySelected: null,
  adultGuests: 0,
  childrenGuests: 0,
  totalGuests: 0,
  dataFiltered: data
}

export const Slice = createSlice({
  name: 'windbnb',
  initialState,
  reducers: {
    SET_SHOW_MENU: (state, action) => {
      state.showMenu = action.payload
    },

    SET_SHOW_SUBMENU: (state, action) => {
      state.showSubmenu = action.payload
    },

    SET_CITIES: (state, action) => {
      state.cities = action.payload
    },

    SET_CITY_SELECTED: (state, action) => {
      state.citySelected = action.payload
    },

    SET_ADULT_GUESTS: (state, action) => {
      if (action.payload === 'INCREASE') {
        state.adultGuests = state.adultGuests + 1
      } else if (action.payload === 'DECREASE') {
        if ( state.adultGuests > 0) {
          state.adultGuests = state.adultGuests - 1
        }
      } else {
        state.adultGuests = 0
      }
    },

    SET_CHILDREN_GUESTS: (state, action) => {
      if (action.payload === 'INCREASE') {
        state.childrenGuests = state.childrenGuests + 1
      } else if (action.payload === 'DECREASE') {
        if ( state.childrenGuests > 0) {
          state.childrenGuests = state.childrenGuests - 1
        }
      } else {
        state.childrenGuests = 0
      }
    },

    SET_TOTAL_GUESTS: (state) => {
      state.totalGuests = state.adultGuests + state.childrenGuests
    },

    SET_DATA_FILTERED: (state, action) => {
      if (action.payload === 'reset') {
        state.dataFiltered = data
      } else {
        state.dataFiltered = action.payload
      }
    }
    
  }
})

export const { SET_TOTAL_GUESTS, SET_ADULT_GUESTS, SET_CHILDREN_GUESTS, SET_CITIES, SET_CITY_SELECTED, SET_DATA_FILTERED, SET_SHOW_MENU, SET_SHOW_SUBMENU } = Slice.actions
export default Slice.reducer