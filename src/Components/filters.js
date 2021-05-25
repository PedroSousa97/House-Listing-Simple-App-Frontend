import React,{Component} from 'react'
import '../styles/filters.css';


//Simple component to hold the filter inputs
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
                <div className="inputs2">
                    <input type="checkbox" id="0" className="checkboxes" name="studio" value="0" checked={this.props.checkboxState.studio} onChange={() =>this.props.handleChange(0,"studio")}/><p className="labels">Studio</p>
                </div>
                <div className="inputs2">
                    <input type="checkbox" id="1" className="checkboxes" name="1" value="1" checked={this.props.checkboxState.one} onChange={() =>this.props.handleChange(1,"one")}/><p className="labels">1 Bedroom</p>
                </div>
                <div className="inputs2">
                    <input type="checkbox" id="2" className="checkboxes" name="2" value="2" checked={this.props.checkboxState.two} onChange={() =>this.props.handleChange(2,"two")}/><p className="labels">2 Bedrooms</p>
                </div>
                <div className="inputs2">
                    <input type="checkbox" id="3" className="checkboxes" name="3" value="3" checked={this.props.checkboxState.three} onChange={() =>this.props.handleChange(3,"three")}/><p className="labels">3 Bedrooms</p>
                </div>
                <div className="inputs2">
                    <input type="checkbox" id="4" className="checkboxes" name="4" value="4" checked={this.props.checkboxState.four} onChange={() =>this.props.handleChange(4,"four")}/><p className="labels">4 Bedrooms</p>
                </div>
                <div className="inputs2">
                    <input type="text" pattern="[0-9]*" id="other" name="other" className="other" placeholder="Other value" onChange={this.handleOtherChange}/>
                    <button className="filterButton" onClick={() => this.props.handleOther(this.state.otherValue)}>Filter Other</button>
                </div>
                <div className="inputs2">
                    <button className="filterButton" onClick={() => this.props.handleClearFilters()}>Clear Filters</button>
                </div>             
            </div>
        );
    }
}
 
export default Filters;