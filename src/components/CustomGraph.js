import { LineChart, Line, CartesianGrid, XAxis, YAxis, Legend, Tooltip} from 'recharts';
import "./CustomGraph.css"

const CustomGraph = (props) => {
    return <LineChart className="custom-graph" width={730} height={300} data={props.points} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="category" interval="preserveStartEnd" dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend verticalAlign="top" />
        <Line type="monotone" dataKey="confirmed" stroke="#8884d8" />
        <Line type="monotone" dataKey="recovered" stroke="#82ca9d" />
        <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
    </LineChart>
}

export default CustomGraph;