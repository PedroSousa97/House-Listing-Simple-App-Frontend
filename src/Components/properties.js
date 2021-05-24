import React,{Component} from 'react'
import home from '../imgs/home.jpg'
import noContent from '../imgs/noContent.png'
import '../styles/properties.css';


class Properties extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.countUnits = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0); //Simple function to count how many of each unit the property has
    }

//This component will render the property list, for each house a default image is rendered, plus name and how many units it has
    render() { 
        return (
            <>  
                {this.props.data.length>0? //If the properties array (data) has properties, the render properties
                this.props.data.map(({name,units})=>(
                    <div className="maincard">
                        <div className="homesec">
                            <img src={home} alt="" width="200" height="100" className='houseimg'/>
                        </div>
                        <div className="data">
                            <h3 key={name}>{name}</h3>
                            <h4 className="heading">This property has the following units:</h4>
                            <div className="units">
                                <p className="unit"> {this.countUnits(units,"bathroom")} Bathrooms</p>
                                <p className="unit"> {this.countUnits(units,"bedroom")} Bedrooms</p>
                                <p className="unit"> {this.countUnits(units,"kitchen")} kitchens</p>
                                <p className="unit"> {this.countUnits(units,"living-room")} Living-rooms</p>
                            </div>
                        </div>
                        <div className="deleteButton">
                            <i key={name} className="fas fa-trash-alt" onClick={() => this.props.deleteHandler(name)}></i>
                        </div>
                    </div>
                ))
                :   //If the list of properties is empty, render a cool message to the user
                    <div className="emptyProp">
                        <h3>Sorry, we still have no properties to be displayed.</h3>
                        <h4>Add your own!</h4>
                        <img src={noContent} alt="" className='noContent'/>
                    </div>
                }
            </> 
        );
    }
}
 
export default Properties;