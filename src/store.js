import React, { useState, createContext } from "react";
 
export const PinContext = createContext(null);
 
export const PinContextProvider = props => {
    const [pins, setPins] = useState(0);
    const [dm, setDm] = useState(false);

    return (
      <PinContext.Provider value={{pins, setPins, dm, setDm}}>
        {props.children}
      </PinContext.Provider>
    );
};