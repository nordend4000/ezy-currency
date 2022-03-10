import React, { FC } from "react"
import { ICurrencyFlagsProps } from "../interfaces"
import { FaBitcoin } from "react-icons/fa"
import { AiOutlineGold } from "react-icons/ai"
import { AiTwotoneGold } from "react-icons/ai"
import { MAIN_COUNTRY_CODE } from "../DATA"

const Flags: FC<ICurrencyFlagsProps> = ({ currency, onFlagChange }) => {
	return (
		<div>
			{" "}
			<div className='bitcon-line'>
				<div className='bitcoin'>
					<AiOutlineGold onClick={() => onFlagChange("XAU")} />
				</div>
				<div className='bitcoin'>
					<FaBitcoin className='bitcoin' onClick={() => onFlagChange("BTC")} />
				</div>
				<div className='bitcoin'>
					<AiTwotoneGold
						className='bitcoin'
						onClick={() => onFlagChange("XAG")}
					/>
				</div>
			</div>
			<div className='flags'>
				{MAIN_COUNTRY_CODE.map(code => (
					<div
						key={code}
						onClick={() => onFlagChange(code)}
						className={
							currency === code.toUpperCase()
								? `currency-flag currency-flag-xl currency-flag-${code.toLowerCase()} active-flag`
								: `currency-flag currency-flag-xl currency-flag-${code.toLowerCase()} unactive-flag`
						}></div>
				))}
			</div>
		</div>
	)
}

export default Flags
