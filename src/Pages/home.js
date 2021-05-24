import React,{Component} from 'react'
import Landing from '../Components/landing'
import List from '../Components/list'


//Home component/page which holds the landing image and the properties listing and filtering features
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