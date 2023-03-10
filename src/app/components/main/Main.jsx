import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ADULT_GUESTS, SET_CHILDREN_GUESTS, SET_CITY_SELECTED, SET_DATA_FILTERED, SET_TOTAL_GUESTS } from '../../reducer/slice'
import '../../../styles/style.css'

export default function Main() {

  const data = useSelector(store => store.slice)
  const dispatch = useDispatch()
  const [pagination, setPagination] = useState(6)

  const handlePagination = () => {
    if ( pagination >= data.dataFiltered.length) {
      setPagination(6)
    } else {
      setPagination( pagination + 6)
    }
  }

  const handleClearFilters = () => {
    dispatch(SET_ADULT_GUESTS())
    dispatch(SET_CHILDREN_GUESTS())
    dispatch(SET_TOTAL_GUESTS())
    dispatch(SET_CITY_SELECTED(null))
    dispatch(SET_DATA_FILTERED('reset'))
  }

  return (
    <div className='mx-5 mt-4'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='fw-bold fs-5'>Stays in Finland</div>
        <div className='d-flex gap-2'>
          {
            (data.citySelected !== null || data.totalGuests > 0) ?
            <div onClick={ () => handleClearFilters() } className='pointer'>Clear filter</div> :
            <div className='d-none'></div>
          }
          {
            (data.dataFiltered.length > 6 && (data.citySelected !== null || data.totalGuests > 0)) ?
            <div>{ ' - ' }</div> :
            <div className='d-none'></div>
          }
          {
            (data.dataFiltered.length > 6) ?
              <div onClick={ () => handlePagination() } className='pointer'>{ (data.dataFiltered.length - pagination > 0) ? data.dataFiltered.length - pagination + '+ stays' : 'Show less'}</div>
              :
              <div className='d-none'></div>
          }
          
        </div>
      </div>

      <div className='d-flex flex-wrap justify-content-center mt-4 gap-4'>
      {
        data.dataFiltered.map((item, key) => (

           (key < pagination) ?
            <div className='d-flex flex-column'>
              <img className='main-container-image rounded-4' loading='lazy' src={ item.photo } />
              <div className='d-flex justify-content-between'>
                <div key={key} className='d-flex gap-2 align-items-center mt-3'>
                  {
                    (item.superHost) ? 
                    <div className='border py-1 px-2 rounded-5 main-container-cards-superhost'>SUPER HOST</div> :
                    <div className='d-none'></div>
                  }
                  
                  <span>{ item.type }</span>
                  <span>{ (item.beds !== null) ? (item.beds > 1) ? ` - ${item.beds} beds` : ` - ${item.beds} bed` : '' }</span>
                </div>
                <div className='d-flex gap-2 align-items-center mt-3'>
                  <i className="bi bi-star-fill"></i>
                  <div>{ item.rating }</div>
                </div>
              </div>
              <div className='fw-bold'>{ item.title }</div>
            </div>
            :
            <div className='d-none'></div>
        ))
      }
      </div>

      <div className='my-4 text-center'>Created by - CLARET DEVIGNE</div>
    </div>
  )
}
