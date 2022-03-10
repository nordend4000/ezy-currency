import React, { FC } from "react"
import { ICurrencyInputProps } from "../interfaces"

const CurrencyInput: FC<ICurrencyInputProps> = ({
	rates,
	currency,
	amount,
	onAmountChange,
	onCurrencyChange,
}) => {
	return (
		<div className='group'>
			{" "}
			<input
				type='text'
				value={amount}
				onChange={e =>
					onAmountChange(
						e.target.value === "" ? parseInt("0") : parseInt(e.target.value),
					)
				}
			/>
			<select value={currency} onChange={e => onCurrencyChange(e.target.value)}>
				{rates &&
					rates.map(currency => (
						<option key={currency} value={currency}>
							{currency}
						</option>
					))}
			</select>
		</div>
	)
}

export default CurrencyInput
