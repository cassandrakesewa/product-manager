import React, {Component} from 'react';
import axios from '../../axios';
import { connect } from 'react-redux'
import moment  from 'moment';

import ProductItem from '../../components/ProductItem/ProductItem';
import * as actions from '../../store/actions/index';
import Button from '@material-ui/core/Button';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Modal from '../../components/Modal/Modal';


class ProductListing extends Component{
    state={
        openModal:false
    }

    componentWillMount(){
        this.props.onProductFetch();
    }

    onDeleteHandler = (index) => {
        
        this.props.onDeleteProduct(index);
        console.log(this.props.products);
        
    }

    handleModalClickOpen = () => {
        console.log("modal", this.state.openModal)
      this.setState({
          openModal:true
      })
    }

    handleModalClickClose = () => {
        this.setState({
            openModal:false
        })
    }
  


    render(){
        let productData = <p>Products Loading..... </p>
       
        
        if (!this.props.loading && this.props.products) {
            
            const products = this.props.products.map((product,index) => {
                // Using bubble sorting algorithm 
                const recentPrice = product.prices.sort((a, b) => {
                    const aDate = new Date(a.date);
                    const bDate = new Date(b.date);
                    return bDate - aDate;
                })[0];
                let date = moment(recentPrice.date).format('MM/DD/YYYY');
                return (
                    <TableRow key={product.id}>
                        <TableCell align="center">{product.id}</TableCell>
                        <TableCell align="right">{product.name}</TableCell>
                        <TableCell align="right">{recentPrice.price}</TableCell>
                        <TableCell align="left">{date}</TableCell>
                        <TableCell align="center"><Button color="primary" style={{fontSize:'11px'}} onClick={this.handleModalClickOpen}> View </Button></TableCell>
                        <TableCell align="center"><Button color="primary" style={{fontSize:'11px'}}> Edit </Button></TableCell>
                        <TableCell align="right"><Button color="secondary" style={{fontSize:'11px'}} onClick={()=>this.onDeleteHandler(index)}> Delete </Button></TableCell>
                    </TableRow> 
                );
            });

            productData = (<ProductItem> {products} </ProductItem>);
            
        }
        

        return (
            <React.Fragment>
                <h1>Drug Listings with Current Prices</h1>
                {productData}
                <Modal open={this.state.openModal} close={this.handleModalClickClose}/>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>{
    return{
        products:state.products,
        prices:state.prices,
        loading:state.loading
    }
    
}

const mapDispatchToProps = dispatch => {
    return{
        onProductFetch: () => dispatch(actions.fetchProducts()),
        onDeleteProduct: (index) => dispatch(actions.deleteProduct(index)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductListing);