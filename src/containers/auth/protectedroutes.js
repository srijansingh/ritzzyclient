import React from 'react'
import {Route, Redirect} from 'react-router-dom';
const ProtectedRoute = ({component: Component, ...rest}) => {
    const authToken = localStorage.getItem('token');
    return (
        <Route 
        {...rest} 
        render={
            (props)=> {
                if(authToken!== "undefined"){
                return <Component {...props}/>
                }
                else
                {
                    return <Redirect to={{
                        pathname : "/login",
                        state: {
                            from : props.location
                        }
                    }}/>
                }
            }
        }
        />
    )
}

export default ProtectedRoute;