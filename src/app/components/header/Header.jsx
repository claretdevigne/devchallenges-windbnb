import React, { useEffect } from 'react'
import '../../../styles/style.css'
import LOGO from '../../../images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import { SET_SHOW_MENU, SET_SHOW_SUBMENU, SET_CITIES, SET_CITY_SELECTED, SET_TOTAL_GUESTS, SET_ADULT_GUESTS, SET_CHILDREN_GUESTS, SET_DATA_FILTERED } from '../../reducer/slice'
import database from '../../../database/data'

export default function Header() {

	const data = useSelector(state => state.slice)
	const dispatch = useDispatch()

	const setCitiesFn = () => {
		const cities = []
		data.dataFiltered.map(i => {
			if (cities.includes(i.city) === false) {
				cities.push(i.city)
			}
		})
		dispatch(SET_CITIES(cities))
	}

	const handleGuests = (type, option) => {
		if (type === 'Adult') {
			dispatch(SET_ADULT_GUESTS(option))
		} else if (type === 'Children'){
			dispatch(SET_CHILDREN_GUESTS(option))
		}

		dispatch(SET_TOTAL_GUESTS())
	}

	const handleFilter = () => {

		dispatch(SET_SHOW_MENU())
		dispatch(SET_SHOW_SUBMENU('cities'))

		let tmp = database

		if (data.citySelected !== null) {
			tmp = tmp.filter(item => item.city === data.citySelected )
		}

		if (data.totalGuests > 0) {
			tmp = tmp.filter(item => data.totalGuests <= item.maxGuests)
		}

		console.log(tmp)

		dispatch(SET_DATA_FILTERED(tmp))
	}

	useEffect(() => {
		setCitiesFn()
	}, [])

  return (
	<div>
		{
			(data.showMenu) ?
			<div className='header-menu-container bg-white pt-3 m-0 w-100'>
				<div className='header-menu-container-cards d-flex mx-5'>
				  <div onClick={() => dispatch(SET_SHOW_SUBMENU('cities'))} className='header-menu-container-cards-container pointer col d-flex flex-column justify-content-center p-2 px-4 mb-0 border border-end-0 rounded-start-4'>
						<div className='header-menu-container-titles fw-bold'>Location</div>
						<div className='text-muted'> { data.citySelected === null ? 'Add a city' : data.citySelected }</div>
					</div>
					<div onClick={() => dispatch(SET_SHOW_SUBMENU('guest'))} className='header-menu-container-cards-container col pointer d-flex flex-column justify-content-center p-2 px-4 mb-0 border border-end-0'>
						<div className='header-menu-container-titles fw-bold'>Guests</div>
						<div className='text-muted'> { (data.adultGuests === 0 && data.childrenGuests === 0) ? 'How many guests?' : data.totalGuests + ' guests' }</div>
					</div>
				  <div className='col d-flex p-2 border rounded-end-4'>
						<div className='col d-flex justify-content-center align-items-center'>
							<button onClick={() => handleFilter()} className='btn btn-primary btn-tomato border-0'>Search</button>
						</div>
					</div>
				</div>
				{
					(data.showSubmenu === 'cities') ? 
					<div>
						<div className='d-flex mx-5'>
							<div className='col py-3 text-muted'>
								{
									data.cities.map((city, key) => (
										<div onClick={() => dispatch(SET_CITY_SELECTED(city))} key={key} className='mx-2 d-flex gap-2 mb-3 pointer'>
											<i className="bi bi-geo-alt-fill"></i>
											{ city }
										</div>
									))
								}
							</div>	
							<div className='col'></div>	
							<div className='col'></div>	
						</div>
					</div>
					:
					<div>
						<div className='d-flex mx-5'>
							<div className='col'></div>	
							<div className='col py-3 d-flex flex-column gap-3'>
								<div className='d-flex flex-column'>
									<span className='fw-bold'>Adults</span>
									<span className='header-menu-container-guests-description text-muted'>Ages 13 or above</span>
									<div className='d-flex gap-2 align-items-center'>
										<i onClick={ () => handleGuests('Adult', 'INCREASE') } className="bi bi-plus-circle fs-5 pointer"></i>
										<span>{ data.adultGuests }</span>
										<i onClick={ () => handleGuests('Adult', 'DECREASE') } className="bi bi-dash-circle fs-5 pointer"></i>
									</div>
								</div>
								<div className='d-flex flex-column'>
									<span className='fw-bold'>Children</span>
									<span className='header-menu-container-guests-description text-muted'>Ages 2-12</span>
									<div className='d-flex gap-2 align-items-center'>
										<i onClick={ () => handleGuests('Children', 'INCREASE') } className="bi bi-plus-circle fs-5 pointer"></i>
										<span>{ data.childrenGuests }</span>
										<i onClick={ () => handleGuests('Children', 'DECREASE') } className="bi bi-dash-circle fs-5 pointer"></i>
									</div>
								</div>
							</div>	
							<div className='col'></div>	
						</div>
					</div>
				}

			</div> 
			:
			<div></div>
		}

		<div className='header-bar-container row mx-5 d-flex aling-items-center mt-3'>
			<div className='col'>
				<img src={LOGO} alt="logo" />
			</div>
			<div className='header-bar-container-search-container col d-flex justify-content-end'>
				<div className='header-bar-container-search-container d-flex shadow'>
					<div className='border border-end-0 py-2 px-3 rounded-start-2'>{ (data.citySelected === null ) ? 'Finland' : `${data.citySelected}, Finland` }</div>
					<div className='border py-2 px-2 d-flex align-content-center'>
						<input className='header-bar-container-input' onClick={() => dispatch(SET_SHOW_MENU(true))} type="text" placeholder='Add guest'/>
					</div>
					<div className='header-menu-container-cards-search-ico-container border border-start-0 py-2 px-3 rounded-end-2'>
						<i className="bi bi-search"></i>
					</div>
				</div>
				
			</div>
		</div>
	</div> 
  )
}
