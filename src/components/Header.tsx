import React, { FC, useState } from "react"
import { IHeaderProps } from "../interfaces"
import { BsCurrencyExchange } from "react-icons/bs"
import { RiBubbleChartLine } from "react-icons/ri"
import { AiOutlineHome } from "react-icons/ai"
import { MdAlternateEmail } from "react-icons/md"
import { GiChart } from "react-icons/gi"
import { BsLightbulbFill } from "react-icons/bs"
import { BsLightbulbOffFill } from "react-icons/bs"
import { TiWeatherPartlySunny } from "react-icons/ti"

const Header: FC<IHeaderProps> = ({ setPage }) => {
	const [darkMode, setDarkMode] = useState<boolean>(true)

	const toggleMode = () => {
		if (!darkMode) document.documentElement.setAttribute("data-theme", "light")
		if (darkMode) document.documentElement.setAttribute("data-theme", "dark")
		setDarkMode(!darkMode)
	}

	return (
		<header>
			<div className='logo-header-container' onClick={() => setPage("home")}>
				<RiBubbleChartLine className='logo-header' />
				<h2>EZY CURRENCY</h2>
			</div>
			<div className='link-header-container'>
				<div className='link-header' onClick={() => setPage("converter")}>
					<BsCurrencyExchange />
					<span>Converter</span>
				</div>
				<div className='link-header' onClick={() => setPage("historic")}>
					<GiChart />
					<span>Historic</span>
				</div>
				<a
					href='https://romaingioux.dev'
					className='link-header tooltip'
					target='_blank'
					rel='noreferrer'>
					<AiOutlineHome />
					<span className='tooltiptext'>Portfolio</span>
				</a>
				<a
					href='https://romaingioux.dev/contact'
					className='link-header tooltip'
					target='_blank'
					rel='noreferrer'>
					<MdAlternateEmail />
					<span className='tooltiptext'>Contact</span>
				</a>
				<a
					className='link-header tooltip'
					target='_blank'
					rel='noreferrer'
					href='https://ezy-weather.vercel.app'>
					<TiWeatherPartlySunny />
					<span className='tooltiptext'>EZYWeather</span>
				</a>
				{darkMode ? (
					<div className='link-header tooltip' onClick={() => toggleMode()}>
						<BsLightbulbFill />
						<span className='tooltiptext'>Light</span>
					</div>
				) : (
					<div className='link-header tooltip' onClick={() => toggleMode()}>
						<BsLightbulbOffFill />
						<span className='tooltiptext'>Dark</span>
					</div>
				)}
			</div>
		</header>
	)
}

export default Header
