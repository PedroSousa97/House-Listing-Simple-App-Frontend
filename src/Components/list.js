import React,{Component} from 'react'
import Filters from './filters'
import Properties from './properties'
import '../styles/list.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: "",
            properties: [],
            filters: [],
            query: "?"
         }
    }

    componentDidMount(){
        const myHeaders = new Headers();

        const myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

        var myRequest = new Request('http://localhost:3030/properties', myInit);

        fetch(myRequest)
        .then(response => response.json())
        .then(response => {
            if(response.message){
                this.setState({message: response.message})
            }else{
                this.setState({properties: response.properties})
            }
        })
    }

    render() { 
        return ( 
            <section className="listprops">
                    <div className="row text-center">
                        <div className="col-md-4 filters">
                            <Filters/>
                        </div>
                        <div className="col-md-8 listing">
                            <Properties data={this.state.properties}/>
                        </div>
                    </div>
            </section>
        );
    }
}
 
export default List;