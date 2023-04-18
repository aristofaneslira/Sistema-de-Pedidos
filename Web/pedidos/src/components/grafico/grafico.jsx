import { Chart } from "react-google-charts";

function Grafico(props){

    const options = {
        legend: props.legenda ? { } : { position: "none" }
    }
    return <>
    <h3 className="text-secondary">{props.titulo}</h3>
        <Chart chartType={props.chartType}
                data={props.dados}
                width="100%"
                height="180px"
                options={options}
                legendToggle />
    </>
    
}

export default Grafico;