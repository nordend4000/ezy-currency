import React, { FC } from "react"
import { ICurrencyTitleProps } from "../interfaces"
import { FaBitcoin } from "react-icons/fa"
import { AiOutlineGold } from "react-icons/ai"
import { AiTwotoneGold } from "react-icons/ai"

const CurrencyTitle: FC<ICurrencyTitleProps> = ({
	currency,
	currenciesName,
}) => {
	return (
		<div className='title-currency'>
			{currency === "BTC" && <FaBitcoin className='bitcoin-title' />}
			{currency === "XAU" && <AiOutlineGold className='bitcoin-title' />}
			{currency === "XAG" && <AiTwotoneGold className='bitcoin-title' />}
			{currency !== "BTC" && currency !== "XAU" && currency !== "XAG" && (
				<div
					className={`currency-flag currency-flag-xl currency-flag-${currency.toLowerCase()}`}></div>
			)}
			{currenciesName && <h3>{currenciesName[currency]}</h3>}
		</div>
	)
}

export default CurrencyTitle
