import React, { FC, useState, useEffect } from "react"
import axios from "axios"
import { IRates, ICurrenciesName, IHistoric, IDataChart } from "./interfaces"
import "./App.css"
import "currency-flags/dist/currency-flags.css"
import CurrencyBloc from "./components/CurrencyBloc"
import { FiRefreshCcw } from "react-icons/fi"
import { CURRENCIES_NAME } from "./DATA"
import ChartBloc from "./components/ChartBloc"
import {
	format,
	startOfToday,
	subDays,
	addDays,
	getYear,
	getMonth,
	getDate,
} from "date-fns"
import Header from "./components/Header"
import Footer from "./components/Footer"

const App: FC = () => {
	const [page, setPage] = useState<"home" | "converter" | "historic">("home")
	const [timestamp, setTimestamp] = useState<string | null>(null)
	const [render, setRender] = useState<number>(0)
	const [amount1, setAmount1] = useState<number>(1)
	const [amount2, setAmount2] = useState<number>(1)
	const [currency1, setCurrency1] = useState<string>("CHF")
	const [currency2, setCurrency2] = useState<string>("EUR")
	const [rates, setRates] = useState<IRates | null>(null)
	const [allCurrencies, setAllCurrencies] = useState<string[] | null>(null)
	const [variation, setVariation] = useState<number | null>(null)
	const [min, setMin] = useState<number | null>(null)
	const [max, setMax] = useState<number | null>(null)
	const [historic, setHistoric] = useState<IHistoric[] | null>(null)
	const [base, setBase] = useState<string>("EUR")
	const [chartPeriod, setChartPeriod] = useState<"week" | "month" | "year">(
		"week",
	)
	const [currenciesName, setCurrenciesName] = useState<ICurrenciesName | null>(
		null,
	)

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [page])

	useEffect(() => {
		getHistoricData()
		// eslint-disable-next-line
	}, [base, chartPeriod, currency1])

	useEffect(() => {
		fetchData()
		setCurrenciesName(CURRENCIES_NAME)
		// eslint-disable-next-line
	}, [render])

	useEffect(() => {
		if (rates) handleAmount1Change(1)
		// eslint-disable-next-line
	}, [rates])

	const fetchData = () => {
		axios
			.get(`https://api.exchangerate.host/latest&base=${base}`)
			.then(response => {
				setRates(response.data.rates)
				setAllCurrencies(Object.keys(response.data.rates))
				setTimestamp(response.data.date)
			})
			.catch(error => {
				console.log("ERROR FETCH : " + error.message)
			})
	}
	//CONVERTER FUNCTIONS
	const formatRate = (number: number): number => {
		return parseFloat(number.toFixed(4))
	}
	const handleAmount1Change = (amount1: number) => {
		if (rates) {
			setAmount2(formatRate((amount1 * rates[currency2]) / rates[currency1]))
			setAmount1(amount1)
		}
	}
	const handleCurrency1Change = (currency1: string) => {
		if (rates) {
			setAmount2(formatRate((amount1 * rates[currency2]) / rates[currency1]))
			setCurrency1(currency1)
		}
	}
	const handleAmount2Change = (amount2: number) => {
		if (rates) {
			setAmount1(formatRate((amount2 * rates[currency1]) / rates[currency2]))
			setAmount2(amount2)
		}
	}
	const handleCurrency2Change = (currency2: string) => {
		if (rates) {
			setAmount1(formatRate((amount2 * rates[currency1]) / rates[currency2]))
			setCurrency2(currency2)
		}
	}
	const handleCurrency1Flag = (flag: string) => {
		if (rates) {
			setCurrency1(flag.toUpperCase())
			setAmount1(1)
			setAmount2(formatRate((1 * rates[currency2]) / rates[flag.toUpperCase()]))
		}
	}
	const handleCurrency2Flag = (flag: string) => {
		if (rates) {
			setCurrency2(flag.toUpperCase())
			setAmount2(1)
			setAmount1(formatRate((1 * rates[currency1]) / rates[flag.toUpperCase()]))
		}
	}
	// CHART FUNCTIONS
	const formatDate = (date: Date): string => {
		let month, day
		if (getMonth(date) + 1 < 10) {
			month = `0${getMonth(date) + 1}`
		} else {
			month = `${getMonth(date) + 1}`
		}
		if (getDate(date) < 10) {
			day = `0${getDate(date)}`
		} else {
			day = `${getDate(date)}`
		}
		return `${getYear(date)}-${month}-${day}`
	}
	const getHistoricData = () => {
		const today = startOfToday()
		const dateToHistoric = formatDate(startOfToday())
		let dateFromHistoric = ""
		if (chartPeriod === "week") {
			dateFromHistoric = formatDate(subDays(today, 8))
		}
		if (chartPeriod === "month") {
			dateFromHistoric = formatDate(subDays(today, 31))
		}
		if (chartPeriod === "year") {
			dateFromHistoric = formatDate(subDays(today, 365))
		}
		axios
			.get(
				`https://api.exchangerate.host/timeseries?start_date=${dateFromHistoric}&end_date=${dateToHistoric}&symbols=${currency1}&base=${base}`,
			)
			.then(response => {
				const arr = []
				arr.push(response.data.rates)
				const arr1: string[] = Object.keys(arr[0])
				const arr2: IDataChart[] = Object.values(arr[0])
				const arr3: IHistoric[] = []
				arr1.forEach((el, index) => {
					const formatedMonth = format(new Date(el), "LLL")
					const formatedDate = format(new Date(el), "d")
					const date = `${formatedMonth} ${formatedDate}`
					arr3.push({ date: date, [currency1]: arr2[index][currency1] })
				})
				setHistoric(arr3)
				let max = 0
				let min = 10000000000000000000000
				arr2.forEach(el => {
					if (el[currency1] > max) max = Number(el[currency1])
					if (el[currency1] < min) min = Number(el[currency1])
				})
				setMin(min)
				setMax(max)
			})
			.catch(error => {
				console.log(error)
			})
		axios
			.get(
				`https://api.exchangerate.host/fluctuation?start_date=${dateFromHistoric}&end_date=${dateToHistoric}&symbols=${currency1}&base=${base}`,
			)
			.then(response => {
				setVariation(response.data.rates[currency1].change)
			})
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<div className='App'>
			<Header setPage={setPage} />
			{page === "home" && <h1>Currency Converter & Historic</h1>}
			{page === "converter" && <h1>Currency Converter</h1>}
			{page === "historic" && <h1>Currency Historic</h1>}
			<div className='timestamp'>
				<p>{timestamp && format(addDays(new Date(timestamp), 1), "PPPP")}</p>
				<FiRefreshCcw
					className='refresh'
					onClick={() => setRender(render + 1)}
				/>
			</div>
			{(page === "converter" || page === "home") && currenciesName && (
				<div className='input-container'>
					<CurrencyBloc
						currenciesName={currenciesName}
						currency={currency1}
						rates={allCurrencies}
						amount={amount1}
						onAmountChange={handleAmount1Change}
						onCurrencyChange={handleCurrency1Change}
						onFlagChange={handleCurrency1Flag}
					/>
					<CurrencyBloc
						currenciesName={currenciesName}
						currency={currency2}
						rates={allCurrencies}
						amount={amount2}
						onAmountChange={handleAmount2Change}
						onCurrencyChange={handleCurrency2Change}
						onFlagChange={handleCurrency2Flag}
					/>
				</div>
			)}
			<ChartBloc
				base={base}
				setBase={setBase}
				allCurrencies={allCurrencies}
				chartPeriod={chartPeriod}
				setChartPeriod={setChartPeriod}
				currenciesName={currenciesName}
				variation={variation}
				currency={currency1}
				max={max}
				min={min}
				historic={historic}
				handleCurrency1Flag={handleCurrency1Flag}
				handleCurrency1Change={handleCurrency1Change}
			/>
			<Footer setPage={setPage} />
		</div>
	)
}

export default App
