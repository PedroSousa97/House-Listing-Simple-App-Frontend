import React, {Component} from 'react'
import SVG from '../Components/svg'
import '../styles/landing.css';

//Simple component to render the landing view
class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <section className="home">
                <div className="wrapper">
                    <div className="row text-center">
                        <div className="col-md-6 motto">
                            <h2>We help you find a place</h2>
                            <h3>you can call Home!</h3>
                        </div>
                        <div className="col-md-6 svg">
                            <SVG/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
 
export default Landing;