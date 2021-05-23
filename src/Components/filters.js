import React,{Component} from 'react'

class Filters extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    handleChange(id){

    }

    render() { 
        return ( 
            <div className="filter-board">
                <input type="checkbox" id="topping" name="topping" value="0" />Studio
                <input type="checkbox" id="topping" name="topping" value="1" />1 bedroom
                <input type="checkbox" id="topping" name="topping" value="2" />2 bedrooms
                <input type="checkbox" id="topping" name="topping" value="3" />3 bedrooms
                <input type="checkbox" id="topping" name="topping" value="4" />4 bedrooms
                <input type="nummber" id="topping" name="topping" value="Paneer" />Other
            </div>
        );
    }
}
 
export default Filters;