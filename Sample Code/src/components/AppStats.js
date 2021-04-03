import React, { useEffect, useState} from 'react'
import '../App.css';
import moment from "moment";

export default function AppStats() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [stats, setStats] = useState({});
    const [error, setError] = useState(null);
    const current_time = Date.now()
    
    // eslint-disable-next-line
	const getStats = () => {
	
        fetch(`http://acit3855.westus2.cloudapp.azure.com:8100/stats`)
            .then(res => res.json())
            .then((result)=>{
				console.log("Received Stats")
                setStats(result);
                setIsLoaded(true);
            },(error) =>{
                setError(error)
                setIsLoaded(true);
            })
          
    };


    useEffect(() => {
		const interval = setInterval(() => getStats(), 2000); // Update every 2 seconds
		return() => clearInterval(interval);

    }, [getStats]);

    if (error){
        return (<div className={"error"}>Error found when fetching from API</div>)
    } else if (isLoaded === false){
        return(<div>Loading...</div>)
    } else if (isLoaded === true){
        return(
            <div>
                <h1>Latest Stats</h1>
                <table className={"StatsTable"}>
					<tbody>
						<tr>
							<th>Immediate Hotel Reservations</th>
							<th>Scheduled Hotel Reservations</th>
						</tr>
						<tr>
							<td># IH: {stats['num_imm_requests']}</td>
							<td># SH: {stats['num_sch_requests']}</td>
						</tr>
					</tbody>
                </table>
                <h3>Last Updated: {stats['last_updated']} {moment(current_time).format("YYYY-MM-DDThh:mm:ss")} </h3>

            </div>
        )
    }
}
