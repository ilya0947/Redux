import React from 'react';
import RestoServiceContext from '../resto-service-context';

const WithRestoService = () => (Wrap) => {
    return (props) => {
        return (
            <RestoServiceContext.Consumer>
                {
                    (restoService) => {
                        return <Wrap {...props} RestoService={restoService}/>
                    }
                }
            </RestoServiceContext.Consumer>
        )
    }
};

export default WithRestoService;