// imports
import { Link } from 'react-router-dom';
import img from '../assets/images/not-found.svg'; // img from assets
import Wrapper from '../assets/wrappers/ErrorPage';

const Error = () => {
  return (
    <Wrapper className='full-page'>
      {/* this class .full-page from index.css */}
      <div>
        <img src={img} alt='not found' />
        <h3>ohh! sorry! Page not found!</h3>
        <p>We can't seem to find the page you're looking for, sorry ah! 😢</p>
        {/* link back to home page, but with the component */}
        <Link to='/'>back to the home page!</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
