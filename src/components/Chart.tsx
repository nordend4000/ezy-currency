import React, { FC } from "react"
import { IChartProps } from "../interfaces"
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts"

const Chart: FC<IChartProps> = ({ data, currency }) => {
	return (
		<ResponsiveContainer width='100%' height='100%'>
			<LineChart
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}>
				<CartesianGrid strokeDasharray='2 2' />
				<XAxis dataKey='date' />
				<YAxis type='number' domain={["min", "max"]} />
				<Tooltip />
				<Legend />
				<Line
					type='monotone'
					dataKey={currency}
					stroke='#8884d8'
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	)
}

export default Chart
