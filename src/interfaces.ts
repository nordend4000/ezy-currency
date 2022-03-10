import React, { Dispatch, SetStateAction } from "react"

export interface IRates {
	[index: string]: number
}

export interface ICurrenciesName {
	[index: string]: string
}

export interface ICurrencyBlocProps {
	rates: string[] | null
	currenciesName: ICurrenciesName
	currency: string
	amount: number
	onAmountChange: (val: number) => void
	onCurrencyChange: (val: string) => void
	onFlagChange: (val: string) => void
}

export interface IHeaderProps {
	setPage: Dispatch<SetStateAction<"home" | "converter" | "historic">>
}

export interface ICurrencyInputProps {
	rates: string[] | null
	currency: string
	amount: number
	onAmountChange: (val: number) => void
	onCurrencyChange: (val: string) => void
}

export interface ICurrencyTitleProps {
	currency: string
	currenciesName: ICurrenciesName
}

export interface ICurrencyFlagsProps {
	currency: string
	onFlagChange: (val: string) => void
}

export interface IChartBlocProps {
	base: string
	setBase: Dispatch<SetStateAction<string>>
	allCurrencies: string[] | null
	chartPeriod: "week" | "month" | "year"
	setChartPeriod: Dispatch<SetStateAction<"week" | "month" | "year">>
	currenciesName: ICurrenciesName | null
	variation: number | null
	currency: string
	max: number | null
	min: number | null
	historic: IHistoric[] | null
	handleCurrency1Flag: (val: string) => void
	handleCurrency1Change: (val: string) => void
}

export interface IChartProps {
	data: IDataChart[]
	currency: string
}

export interface IChartFlagsProps {
	currency: string
	allCurrencies: string[] | null
	handleCurrency1Flag: (val: string) => void
	handleCurrency1Change: (val: string) => void
}

export interface IDataChart {
	[key: string]: number | string
}

export interface IHistoric {
	date: string
	[key: string]: number | string
}
