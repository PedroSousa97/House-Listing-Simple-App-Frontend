import React,{Component} from 'react'
import home from '../imgs/home.jpg'
import '../styles/properties.css';


class Properties extends Component {
    constructor(props) {
        super(props);
        this.state = { }
        this.countUnits = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    }


    render() { 
        return (
            <>  
                {this.props.data.map(({name,units})=>(
                    <div className="maincard">
                        <div className="homesec">
                            <img src={home} alt="" width="200" height="100" className='houseimg'/>
                        </div>
                        <div className="data">
                            <h3 key={name}>{name}</h3>
                            <h4 className="heading">This property has the following units:</h4>
                            <div className="units">
                                <p className="unit" key={Math.floor(Math.random() * 1212210)}> {this.countUnits(units,"bathroom")} Bathrooms</p>
                                <p className="unit" key={Math.floor(Math.random() * 1212210)}> {this.countUnits(units,"bedroom")} Bedrooms</p>
                                <p className="unit" key={Math.floor(Math.random() * 1212210)}> {this.countUnits(units,"kitchen")} kitchens</p>
                                <p className="unit" key={Math.floor(Math.random() * 1212210)}> {this.countUnits(units,"living-room")} Living-rooms</p>
                            </div>
                        </div>
                    </div>
                ))}
            </> 
        );
    }
}
 
export default Properties;