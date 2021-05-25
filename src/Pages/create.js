import React,{Component} from 'react'
import SweetAlert from 'sweetalert2-react'
import '../styles/create.css'


//Simple property creation page/component
class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,   //error boolean to know if the request is canceled due to bad request parameters, before sending to backend
            message: "",    //message that will hold success or error in creation messages
            name: "",       //property name
            bathroom: "",   //property number of each unit
            bedroom: "",
            kitchen: "",
            livingroom: "",
            show: false,    //boolen to trigger sweetalert
            unitsArray: []  //Array of units
        }
        this.handleChange = this.handleChange.bind(this)    //handlers
        this.handleSubmit = this.handleSubmit.bind(this)
        this.resolveUnits = this.resolveUnits.bind(this)
    }

    async resolveUnits (){  //Async function to resolve the different unit number in array pushes
        if(isNaN(parseInt(this.state.bathroom)) || isNaN(parseInt(this.state.bedroom)) || isNaN(parseInt(this.state.kitchen)) || isNaN(parseInt(this.state.livingroom))){
            this.setState({message: "Unit numbers, should be in fact a number",show:true,error:true})
            return this.state.error //if any of the unit numbers are invalid, return and output erro. Also cancel request on the handle submit using the error boolean
        }else{  //If all values are valid then for each, get the value for each unit, and add the unit name as many times as the number of that unit in the house
            var Arraybuilder = this.state.unitsArray
            if(parseInt(this.state.bathroom)>0){
                for( let i =0; i<this.state.bathroom;i++){
                    Arraybuilder.push("bathroom")
                }
            }
            if(parseInt(this.state.bedroom)>0){
                for( let i =0; i<this.state.bedroom;i++){
                    Arraybuilder.push("bedroom")
                }
            }
            if(parseInt(this.state.kitchen)>0){
                for( let i =0; i<this.state.kitchen;i++){
                    Arraybuilder.push("kitchen")
                }
            }
            if(parseInt(this.state.livingroom)>0){
                for( let i =0; i<this.state.livingroom;i++){
                    Arraybuilder.push("living-room")
                }
            }
            this.setState({unitsArray: Arraybuilder})   //Set the new array

            return this.state.error
        }

    }

    handleChange(event){    //on change of the inputs simply update component state
        const {name,value}=event.target
        this.setState({[name]:value})
    }

    handleSubmit(){ //handle update function 
        this.resolveUnits().then(()=>{  //resolve the number of units, and then:
            if(this.state.error === true){
                this.setState({error: false})   //check to see if erro = true, if it is cancel request and output message, otherwise POST request
                return
            }else{
                let cleanName = this.state.name.replace(/[|&;$%@"<>()+,]/g, ""); //Regex on the house name, I know this is a simple UI and overall app, but still, good practice
                let myRequestBody ={name: cleanName,units: this.state.unitsArray}   //Build request body

                let myInit = { 
                    method: 'POST', //Set request parameters
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    },
                    body: JSON.stringify(myRequestBody)
                };
        
                let myRequest = new Request('http://localhost:3030/properties', myInit);    //Build request and then fetch
        
                fetch(myRequest)
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        message: response.message,  //Output message using sweetalert, whether success or error message from backend
                        show:true,
                        name: "",   //Reset Component Sate
                        bathroom: "",
                        bedroom: "",
                        kitchen: "",
                        livingroom: "",
                        unitsArray: []
                    })
                })

            }
        })
    }
    //Render the form basically
    render() { 
        return ( 
            <div className="pageContainer">
                <div className="formContainer">
                    <div className="forminputs">
                        <h3>List Your Own Property</h3>
                        <div className="theForm">
                            <form>
                                <div className="namecontainer">
                                    <p>What do you want to name your property?</p>
                                    <input type="text" id="name" name="name" placeholder="Property Name" value={this.state.name} className="nameInput" onChange={this.handleChange}/>
                                </div>
                                <div className="unitsSection">
                                    <p>For each of this units, tell us how many your property has:</p>
                                    <div className="inputs">
                                        <input type="text" id="bathroom" name="bathroom" placeholder="How many" value={this.state.bathroom} className="unitsInputs" onChange={this.handleChange}/>
                                        <p>Bathrooms</p>
                                    </div>
                                    <div className="inputs">
                                        <input type="text" id="bedroom" name="bedroom" placeholder="How many" value={this.state.bedroom} className="unitsInputs" onChange={this.handleChange}/>
                                        <p>Bedrooms</p>
                                    </div>
                                    <div className="inputs">
                                        <input type="text" id="kitchen" name="kitchen" placeholder="How many" value={this.state.kitchen} className="unitsInputs" onChange={this.handleChange}/>
                                        <p>Kitchens</p>
                                    </div>
                                    <div className="inputs">
                                        <input type="text" id="livingroom" name="livingroom" placeholder="How many" value={this.state.livingroom} className="unitsInputs" onChange={this.handleChange}/>
                                        <p>Living-Rooms</p>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <button className="createButton" onClick={this.handleSubmit}>Create Property</button>
                    </div>
                </div>
                <SweetAlert
                        show={this.state.show}
                        text={this.state.message}
                        onConfirm={() => this.setState({ show: false })}
                    />
            </div>
        );
    }
}
 
export default Create;