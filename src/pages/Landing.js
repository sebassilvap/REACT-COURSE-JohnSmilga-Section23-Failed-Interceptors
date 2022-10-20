//import React from 'react' // not neccessary to import!

// ===> import images -> logo & main from assets
//import logo from '../assets/images/logo.svg'; // replaced by Logo Component!
import main from '../assets/images/main.svg';

// ===> Import Components
//import Logo from '../components/Logo'; // this is changed by the index.js of the components folder
import { Logo } from '../components';

// ### Make a separate js file for the Styled Components!!
/*
// get styled components
//import styled from 'styled-components';
*/

// ===> Import from React Router Dom 6
import { Link } from 'react-router-dom';

// ===> Import the Wrapper from assets!
//import Wrapper from '../assets/wrappers/Testing'; // JUST FOR TEST!!
import Wrapper from '../assets/wrappers/LandingPage';

const Landing = () => {
  return (
    // instead of <main> tag we replace for Wrapper
    // we'll still have the main element, but with a unique class from the styled component
    <Wrapper>
      <nav>
        {/* We'll replace this for a Logo Component!!!  
        <img src={logo} alt='jobster logo' className='logo' />
        */}
        <Logo />
      </nav>
      <div className='container page'>
        {/* info */}
        <div className='info'>
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Saludos de Sebas! 🥰 Este es el proyecto final del curso React 2022
            de @JohnSmila. Jobster es una plataforma para poder controlar
            nuestras aplicaciones de trabajo de una manera adecuada. Se deberá
            crear un usuario (si es que lo desean), o también pueden usar la
            versión demo para familiarizarse con la aplicación. Muchas gracias
            de antemano. Un abrazo, Sebas 💝
          </p>
          {/* <button className='btn btn-hero'>Login/Register</button> */}
          {/* this will be replaced by the Link Component of React Router */}
          <Link to='/register' className='btn btn-hero'>
            Login/Register
          </Link>
        </div>
        <img src={main} alt='job hunt' className='img main-img' />
      </div>
    </Wrapper>
  );
};

// ### Make a separate js file for the Styled Components!!
/*
// Styled Component
const Wrapper = styled.main`
  nav {
    // this nav is going to be applied in this particular component
    // THEREFORE, do not worry about name collisions!!!
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center; // place vertically in the center
  }
  .page {
    // 100% of screen height - the height of the nav
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center; // items in the center of my page
    margin-top: -3rem; // lift the content a little bit
  }
  h1 {
    font-weight: 700; // font a little bit bolder

    // get me the span that is on the h1
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  // on small screen hide the image
  .main-img {
    display: none;
  }

  // media queries
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
*/

export default Landing;
