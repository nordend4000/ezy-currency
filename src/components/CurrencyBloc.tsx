import React, { FC } from "react"
import { ICurrencyBlocProps } from "../interfaces"
import CurrencyInput from "./CurrencyInput"
import CurrencyFlags from "./CurrencyFlags"
import CurrencyTitle from "./CurrencyTitle"

const CurrencyBloc: FC<ICurrencyBlocProps> = ({
	currency,
	currenciesName,
	amount,
	rates,
	onAmountChange,
	onCurrencyChange,
	onFlagChange,
}) => {
	return (
		<div className='side'>
			{currenciesName && (
				<CurrencyTitle currenciesName={currenciesName} currency={currency} />
			)}
			<CurrencyInput
				rates={rates}
				amount={amount}
				currency={currency}
				onAmountChange={onAmountChange}
				onCurrencyChange={onCurrencyChange}
			/>
			<CurrencyFlags currency={currency} onFlagChange={onFlagChange} />
		</div>
	)
}

export default CurrencyBloc
