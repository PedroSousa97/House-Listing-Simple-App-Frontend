import React,{Component} from 'react'
import SweetAlert from 'sweetalert2-react';

import Filters from './filters'
import Properties from './properties'
import '../styles/list.css';

//This is the main component of the property listing. It will handle all the requests, filtering and listing functionality
//For that reason this component holds the main listing and filtering state and all the handlers

class List extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            message: "",    //Error or success messages
            properties: [], //properties to be rendered
            studio: false,  //Different boolean for the checkboxes of the child Filters component
            one: false,
            two: false,
            three: false,
            four: false,
            other: "",      //Value of the "Other Filter" 
            filterarray: [],    //Filters are saved in this array, and is then used to render the desired houses
            show: false     //Boolean used to trigger and close the SweetAlert alert boxes
         }
         this.handleOnDelete = this.handleOnDelete.bind(this)   //Bind of all methods
         this.handleOther = this.handleOther.bind(this)
         this.handleChange = this.handleChange.bind(this)
         this.handleClearFilters = this.handleClearFilters.bind(this)
         this.updateView = this.updateView.bind(this)
    }

    componentDidMount(){    //As soon as component mounts, get all properties
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
                this.setState({message: response.message,show:true}) //If an error occur then output using Sweetalert
            }else{
                this.setState({properties: response.properties})    //Otherwise update properties
            }
        })
    }

    updateView(){   //Function used to update view each time filters or delete is triggered
        if(this.state.filterarray.length >0){   //If there are filters then enter in this block
                
            if(this.state.filterarray.length===1){  //If there is only one filter, then request query equal url?filters[]=X
                let url = "http://localhost:3030/properties?filters[]=" + this.state.filterarray[0] //build query string
                let myHeaders = new Headers();

                let myInit = { method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' };

                let myRequest = new Request(url, myInit);

                fetch(myRequest)
                .then(response => response.json())
                .then(response => {
                    if(response.message){
                        this.setState({message: response.message,show:true})  //In case of error output it using Sweetalert
                    }else{
                        this.setState({properties: response.properties}) //otherwise update properties
                    }
                })
            }else{  //In case more than is more than one filter, build the new request query 
                let url = "http://localhost:3030/properties?"
                for(var interator =0;interator<this.state.filterarray.length;interator++){
                    if(interator === 0){
                        url = url + "filters[]=" + this.state.filterarray[interator]    //first filter case
                    }else{
                        url = url + "&filters[]=" + this.state.filterarray[interator]   //other filters. This is just the string concatenation
                    }
                }
                let myHeaders = new Headers();

                let myInit = { method: 'GET',
                    headers: myHeaders,
                    mode: 'cors',
                    cache: 'default' };

                let myRequest = new Request(url, myInit);

                fetch(myRequest)
                .then(response => response.json())
                .then(response => {
                    if(response.message){
                        this.setState({message: response.message,show:true}) //If an error occur output it using Sweet alert
                    }else{
                        this.setState({properties: response.properties})    //Otherwise update properties
                    }
                })
            }
        }else{  //If no filters are present then get all properties, no request query reqired
            let myHeaders = new Headers();

            let myInit = { method: 'GET',
                headers: myHeaders,
                mode: 'cors',
                cache: 'default' };

            let myRequest = new Request('http://localhost:3030/properties', myInit);

            fetch(myRequest)
            .then(response => response.json())
            .then(response => {
                if(response.message){
                    this.setState({message: response.message,show:true}) //If there is an error output it using Sweetalert
                }else{
                    this.setState({properties: response.properties})    //otherwise update properties
                }
            })
        }
    }

    handleClearFilters(){   //Handle Clear filters button
        this.setState({ //Reset all filter related variables then get all properties
            other: "",
            filterarray:[],
            studio: false,
            one: false,
            two: false,
            three: false,
            four: false,
        })
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
                this.setState({message: response.message,show:true}); //If an error occur then output it in sweet alert
            }else{
                this.setState({properties: response.properties}, () => {    //Update all properties, then use callback function to update view, only after state is updated
                    this.updateView()
                });
            }
        })
    }

    handleOther(receivedvalue){ //Handle the "Other Filter" input, also seen as custom filter
        if(receivedvalue.length === 0){ //If the button is clicked on an empty input, output this message using sweet alert
            this.setState({message: "You got to input the desired number",show:true})
        }
        else if(isNaN(receivedvalue)){  //If a NaN value is received, output this message
            this.setState({message: "You sent a non numeric value, that isn't possible",show:true})
        }
        else if(this.state.other.length>0){ //If there was already a custom filter added, then clean the previous filter from filter array, then add the new one
            var filtered = this.state.filterarray   //Old filter "cleaning"
            filtered = filtered.filter(item =>{ 
                return item !== parseInt(this.state.other,10);
            })
                filtered.push(parseInt(receivedvalue,10))
                this.setState({other: receivedvalue,filterarray:filtered}, () => {
                    this.updateView() //Add new filter to filter array (setState), and only after it is finished, update view with new filter values
                });
        }else{  //If no previous custom filter exist then I only need to push the new value and then update view
            var auxarray = this.state.filterarray
            auxarray.push(parseInt(receivedvalue,10))
            this.setState({other: receivedvalue,filterarray:auxarray}, () => {
                this.updateView()
            });
        }
    }

    handleChange(id,name){      //Handle all checkbax changes
        if(this.state[name] === true){  //If previous checkbox state is true, then the checkbox was unchecked and we need t remove the filter and update view
            var filtered = this.state.filterarray
            filtered = filtered.filter(item =>{ 
                return item !== parseInt(id,10);
            })
                this.setState({[name]: false,filterarray:filtered}, () => {
                    this.updateView()
                });
        }
        if(this.state[name] === false){ //Otherwise iif the filter was checked then add the new filter and update view
            var auxarray = this.state.filterarray
            auxarray.push(parseInt(id,10))
            this.setState({[name]: true,filterarray:auxarray}, () => {
                this.updateView()
            });
        }
    }

    handleOnDelete(key){ //Delete property handler

        let myInit = { 
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify({name: key})
            };

        let myRequest = new Request('http://localhost:3030/properties', myInit);

        fetch(myRequest)
        .then(response => response.json())
        .then(response => {
            this.setState({message: response.message,show:true}) //Show error or success message using sweetalert
                this.updateView() //After Delete, update view, if there are filters the updateView function will store them
        })
    }

    render() { //Render properties and filters, pass as props all the needed handlers and state variables
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
                            <Filters handleOther={this.handleOther} handleChange={this.handleChange} checkboxState={this.state} handleClearFilters={this.handleClearFilters}/>
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