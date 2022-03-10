import React, { FC } from "react"
import { IChartFlagsProps } from "../interfaces"
import { AiOutlineGold } from "react-icons/ai"
import { FaBitcoin } from "react-icons/fa"
import { AiTwotoneGold } from "react-icons/ai"
import { MAIN_COUNTRY_CODE } from "../DATA"

const ChartFlags: FC<IChartFlagsProps> = ({
	allCurrencies,
	currency,
	handleCurrency1Flag,
	handleCurrency1Change,
}) => {
	return (
		<>
			<div className='bitcon-line'>
				<div className='chart-base'>
					Currency :
					<select
						value={currency}
						onChange={e => handleCurrency1Change(e.target.value)}>
						{allCurrencies &&
							allCurrencies.map(cur => (
								<option key={cur} value={cur}>
									{cur}
								</option>
							))}
					</select>
				</div>
				<div className='bitcoin'>
					<AiOutlineGold onClick={() => handleCurrency1Flag("XAU")} />
				</div>
				<div className='bitcoin'>
					<FaBitcoin
						className='bitcoin'
						onClick={() => handleCurrency1Flag("BTC")}
					/>
				</div>
				<div className='bitcoin'>
					<AiTwotoneGold
						className='bitcoin'
						onClick={() => handleCurrency1Flag("XAG")}
					/>
				</div>
			</div>
			<div className='flags'>
				{MAIN_COUNTRY_CODE.map(code => (
					<div
						key={code}
						onClick={() => handleCurrency1Flag(code)}
						className={
							currency === code.toUpperCase()
								? `currency-flag currency-flag-xl currency-flag-${code.toLowerCase()} active-flag`
								: `currency-flag currency-flag-xl currency-flag-${code.toLowerCase()} unactive-flag`
						}></div>
				))}
			</div>
		</>
	)
}

export default ChartFlags
