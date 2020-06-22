import React from 'react';
import Aux from '../higher';
import Modal from '../../components/UI/Modal/Modal';
const WithErrorHandler = (Wrappedcomponent,axios)=>{
    return class extends React.Component {

        state={
            error:null,
        }
        componentDidMount(){
            // so whenever we make a req we don't 
            // have any previous error set up 
            // otherwise this will show up the modal
            this.reqInterceptors=axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            })
            this.resInterceptors=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
                Promise.reject(error);  
            })
        }

        // when we have multipage applications 
        // use withErrorHandler at multiple places 
        // multiple interceptros will be created which are of no use 
        // so once we are done with a pariticular component we 
        // remove the interceptors attached to it 
        // to free the memeory and optimize the code
        componentWillUpdate(){

            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorConfirmedHandler=()=>{
            this.setState({error:null});
        }
        render(){
            return(
                <Aux>
                    <Modal show = {this.state.error} 
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error?this.state.error.message:null}
                    </Modal>
                    <Wrappedcomponent {...this.props}/>
                </Aux>
            )
        }
    }
}


export default WithErrorHandler;