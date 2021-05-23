import React,{Component} from 'react'
import Landing from '../Components/landing'
import List from '../Components/list'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <>
                <Landing/>
                <List/>
            </> 
        );
    }
}
 
export default Home;