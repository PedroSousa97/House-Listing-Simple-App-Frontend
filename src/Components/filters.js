import React,{Component} from 'react'
import '../styles/filters.css';

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            otherValue: ""
         }
         this.handleOtherChange=this.handleOtherChange.bind(this)
    }

    handleOtherChange(event){
        this.setState({otherValue: event.target.value})
    }

    render() { 
        return ( 
            <div className="filter-board">
                <div className="inputs">
                    <input type="checkbox" id="1" name="studio" value="0" /><p className="labels">Studio</p>
                </div>
                <div className="inputs">
                    <input type="checkbox" id="2" name="1" value="1" /><p className="labels">1 Bedroom</p>
                </div>
                <div className="inputs">
                    <input type="checkbox" id="3" name="2" value="2" /><p className="labels">2 Bedrooms</p>
                </div>
                <div className="inputs">
                    <input type="checkbox" id="4" name="3" value="3" /><p className="labels">3 Bedrooms</p>
                </div>
                <div className="inputs">
                    <input type="checkbox" id="5" name="4" value="4" /><p className="labels">4 Bedrooms</p>
                </div>
                <div className="inputs">
                    <input type="text" pattern="[0-9]*" id="other" name="other" placeholder="Other value" onChange={this.handleOtherChange}/>
                    <button onClick={() => this.props.handleOther(this.state.otherValue)}>Filter Other</button>
                </div>
                <div className="inputs">
                    <p className="clearFilters">Clear Filters</p>
                </div>                
            </div>
        );
    }
}
 
export default Filters;