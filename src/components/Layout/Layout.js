import React,{Component} from 'react';

import './Layout.css';
import NavBar from '../Navigation/NavigationItems/NavigationItems';

class Layout extends Component{


    render(){
        return(
            <React.Fragment>
                <NavBar />
                <main>
                    {this.props.children}
                </main>
            </React.Fragment>
        );
        
    }

}

export default Layout;