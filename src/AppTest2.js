// #### AppTest2.js -> for the explanantion of Styled Components

// ====================================================================================

// NOTE: The previous code by default has been removed!
//import React from 'react';

// import Landing page
import Landing from './pages/Landing';

// import styled components -> before: npm install styled-components
import styled from 'styled-components';

// *** EXAMPLE OF STYLED COMPONENTS!
const Button = styled.button`
  background: red;
  color: white;
  font-size: 2rem;
`;

const SecondButton = styled.button`
  background: blue;
  color: yellow;
  font-size: 3rem;
`;

const App = () => {
  return (
    <div>
      <Button>Click Me</Button>
      <SecondButton>Click Me</SecondButton>
      {/* every component gets a unique class! */}
      {/* since we have this class, we don't have to worry about name collisions */}
      <Landing />
    </div>
  );
};

export default App;
