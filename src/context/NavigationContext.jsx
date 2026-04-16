import React, { useState, createContext, useContext } from 'react';

export const NavigationContext = createContext(null);

export function NavigationProvider({ children }) {
  const [path, setPath] = useState('/');
  const [params, setParams] = useState({});

  const navigate = (newPath) => {
    if (newPath.includes('?')) {
      const [p, q] = newPath.split('?');
      setPath(p);
      const parsedParams = {};
      new URLSearchParams(q).forEach((val, key) => { parsedParams[key] = val; });
      setParams(parsedParams);
    } else {
      setPath(newPath);
      setParams({});
    }
  };

  return (
    <NavigationContext.Provider value={{ path, params, navigate }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
