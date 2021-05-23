import React,{Component} from 'react'
import SweetAlert from 'sweetalert2-react';

import Filters from './filters'
import Properties from './properties'
import '../styles/list.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: "",
            properties: [],
            filters: {
                studio: false,
                one: false,
                two: false,
                three: false,
                four: false,
                other: "",
            },
            query: "?",
            show: false
         }
         this.handleOnDelete = this.handleOnDelete.bind(this)
         this.handleOther = this.handleOther.bind(this)
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

    handleOther(value){
        this.setState({filters:{other: value}})
    }

    handleOnDelete(key){

        const myInit = { 
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
                    },
                    body: JSON.stringify({name: key}) // We send data in JSON format
            };

        var myRequest = new Request('http://localhost:3030/properties', myInit);

        fetch(myRequest)
        .then(response => response.json())
        .then(response => {
            this.setState({message: response.message,show:true})
            if(this.state.filters.length >0){

            }else{
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
        })
    }

    render() { 
        return ( 
            <section className="listprops">
                    <div className="narrow text-center" >
                        <div className="col-12">
                            <h2 className="section-heading">Our Properties</h2>
                            <div className="heading-underline"></div>
                        </div>
                    </div>
                    <div className="row text-center">
                        <div className="col-md-4 filters">
                            <h3 className="Filtersec">Filter number of bedrooms:</h3>
                            <Filters handleOther={this.handleOther} other={this.state.filters.other}/>
                        </div>
                        <div className="col-md-8 listing">
                            <Properties data={this.state.properties} deleteHandler={this.handleOnDelete}/>
                        </div>
                    </div>
                    <SweetAlert
                        show={this.state.show}
                        text={this.state.message}
                        onConfirm={() => this.setState({ show: false })}
                    />
            </section>
        );
    }
}
 
export default List;