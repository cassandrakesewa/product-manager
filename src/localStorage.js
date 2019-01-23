export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
        return {};
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return {};
    }
  }; 



  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch(err) {
    //   console.log(err)
    }
  };