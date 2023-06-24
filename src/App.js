import React from 'react';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
// // import CompA from './components/reactUse/CompA';
// // import CompB from './components/reactUse/CompB';
// import Api from './components/reactUse/Api';
// import LoginApi from './components/reactUse/LoginApi';
// import UseReducer from './components/reactUse/UseReducer';


function App() {

  // const callback=(items)=>{
  //   return <h1>{items}</h1>
  // };


  return (
    <>
      {/* <CompB handleCallback={callback}/>
      <CompA handleCallback={callback}/> */}
      <Header />
      <Body />
      {/* <Api /> */}
      {/* <LoginApi /> */}
      {/* <UseReducer /> */}

    </>
  );
}

export default App;
