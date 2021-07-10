import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import "./CustomGraph.css"

const CustomGraph = (props) => {
    return <LineChart className="custom-graph" width={600} height={300} data={props.points}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
    </LineChart>
}

export default CustomGraph;