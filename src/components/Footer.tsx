import React, { FC } from "react"
import { IHeaderProps } from "../interfaces"
import { RiBubbleChartLine } from "react-icons/ri"
import { GiChart } from "react-icons/gi"
import { BsCurrencyExchange } from "react-icons/bs"
import { AiOutlineHome } from "react-icons/ai"

const Footer: FC<IHeaderProps> = ({ setPage }) => {
	return (
		<>
			<div className='credit'>
				Source API :
				<a href='https://exchangerate.host' target='_blank' rel='noreferrer'>
					{" "}
					Exchange Rate
				</a>
			</div>
			<footer>
				<div className='footer-left'>
					<span>
						<RiBubbleChartLine className='footer-left-title' />
						EZY CURRENCY
					</span>
					2022 - &copy; All right reserved
					<a className='footer-link' href='https://romaingioux.dev'>
						RG Web Developer
					</a>
				</div>
				<div className='footer-right'>
					<div className='footer-link' onClick={() => setPage("home")}>
						<AiOutlineHome className='footer-left-title' />
						Home
					</div>
					<div className='footer-link' onClick={() => setPage("converter")}>
						<BsCurrencyExchange className='footer-left-title' />
						Converter
					</div>
					<div className='footer-link' onClick={() => setPage("historic")}>
						<GiChart className='footer-left-title' />
						Historic
					</div>
				</div>
			</footer>
		</>
	)
}

export default Footer
