import React, { FC } from "react"
import { IChartBlocProps } from "../interfaces"
import Chart from "./Chart"
import CurrencyTitle from "./CurrencyTitle"
import ChartFlags from "./ChartFlags"
import { BiTrendingDown } from "react-icons/bi"
import { BiTrendingUp } from "react-icons/bi"

const ChartBloc: FC<IChartBlocProps> = ({
	base,
	setBase,
	allCurrencies,
	chartPeriod,
	setChartPeriod,
	currenciesName,
	variation,
	currency,
	max,
	min,
	historic,
	handleCurrency1Flag,
	handleCurrency1Change,
}) => {
	return (
		<>
			<div className='chart'>
				<div className='chart-header'>
					<div className='chart-base'>
						Base Currency :
						<select value={base} onChange={e => setBase(e.target.value)}>
							{allCurrencies &&
								allCurrencies.map(cur => (
									<option key={cur} value={cur}>
										{cur}
									</option>
								))}
						</select>
					</div>
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
					<div className='chart-period'>
						<div
							className={
								chartPeriod === "week"
									? "chart-period-btn chart-period-btn-active "
									: "chart-period-btn "
							}
							onClick={() => setChartPeriod("week")}>
							Week
						</div>
						<div
							className={
								chartPeriod === "month"
									? "chart-period-btn chart-period-btn-active "
									: "chart-period-btn "
							}
							onClick={() => setChartPeriod("month")}>
							Month
						</div>
						<div
							className={
								chartPeriod === "year"
									? "chart-period-btn chart-period-btn-active "
									: "chart-period-btn "
							}
							onClick={() => setChartPeriod("year")}>
							Year
						</div>
					</div>
				</div>
				<div className='chart-title'>
					<div className='chart-name'>
						{currenciesName && (
							<CurrencyTitle
								currenciesName={currenciesName}
								currency={currency}
							/>
						)}
					</div>
					<div className='chart-figure'>
						<div className='variation'>
							{variation && variation > 0 ? (
								<BiTrendingUp className='trend' />
							) : (
								<BiTrendingDown className='trend' />
							)}
							{variation && variation > 0 ? `+ ${variation}` : `${variation}`}
						</div>
						{max && (
							<div className='max-min'>
								Max : <span className='max-min-span'>{max}</span>
							</div>
						)}
						{min && (
							<div className='max-min'>
								Min : <span className='max-min-span'>{min}</span>
							</div>
						)}
					</div>
				</div>
				<div className='rechart-container'>
					{historic && <Chart data={historic} currency={currency} />}
				</div>
			</div>
			<ChartFlags
				allCurrencies={allCurrencies}
				currency={currency}
				handleCurrency1Flag={handleCurrency1Flag}
				handleCurrency1Change={handleCurrency1Change}
			/>
		</>
	)
}

export default ChartBloc
