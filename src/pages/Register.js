// imports for this page:
import { useState, useEffect } from 'react'; // useEffect -> to navigate away from the page
import { Logo, FormRow } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage'; // for the styles
import { toast } from 'react-toastify'; // toast -> alert messages
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // for programmatically navigate to dashboard

// imports from userSlice
import { loginUser, registerUser } from '../features/user/userSlice';

// ===================================================================================
// **** initial state
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

const Register = () => {
  // **** state values
  const [values, setValues] = useState(initialState);

  // **** from the store get user & isLoading
  const { user, isLoading } = useSelector((store) => store.user);

  // **** set the dispatch
  const dispatch = useDispatch();

  // **** navigate from react router to go to a part of the page
  const navigate = useNavigate();

  // **** handleChange for the form
  const handleChange = (e) => {
    //console.log(e.target);
    const name = e.target.name;
    const value = e.target.value;
    //console.log(`${name}:${value}`); // name of the input : value // only one value!

    // setValues -> to change the values of the state
    setValues({ ...values, [name]: value }); // grab me that property here [] in the object and let's set it equal to whatever is the value
  };

  // **** onSubmit for the login form
  const onSubmit = (e) => {
    // this is a form -> prevent default
    e.preventDefault();
    //console.log(e.target); // TEST: just to showcase we access the form

    // state values -> destructure form the values
    const { name, email, password, isMember } = values;

    // if all values are missing -> please fill all the values
    if (!email || !password || (!isMember && !name)) {
      // if isMember is FALSE -> only then check for the name (login page)
      //console.log('Please fill out all fields');

      // *** TOAST ALERTS
      //toast('Please fill out all fields'); // the DEFAULT toast!
      //toast.warning('Please fill out all fields'); // WARNING alert message
      //toast.success('Please fill out all fields'); // SUCCESS alert message
      toast.error('Please fill out all fields'); // ERROR alert message
      return;
    }
    // if member -> dispatch login
    // if not member -> dispatch register
    // from userSlice.js
    if (isMember) {
      dispatch(loginUser({ email: email, password: password })); // long way
      return; // for avoinding javascript to keep on reading
    }
    dispatch(registerUser({ name, email, password })); // short hand!
  };

  // **** function to toggle from login to register
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  // **** useEffect when I log in to programmatically
  // go to the dashboard
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/'); // navigate to dashboard
      }, 2000);
    }
  }, [user]); // when the user changes

  // **** RETURN
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />

        {/* make decision -> based on if it is member -> isMember */}
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>

        {/* name field */}
        {/*
         * THIS PART WAS HERE HARD-CODED
         * Now it will be replaced in the FormRow.js Component
         */}

        {/* 
        <div className='form-row'>
          <label htmlFor='name' className='form-label'>
            name
          </label>
          <input
            type='text'
            name='name'
            // remember: values & onChange for controlled input
            value={values.name}
            onChange={handleChange}
            className='form-input'
          />
        </div>
        */}

        {/* Using the component */}
        {/* please make sure the names match to the names in initialState !! */}

        {/* display the name, only if 'isMember' is FALSE */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange} // this logic affects all of the inputs!
          />
        )}

        {/* email field */}
        <FormRow
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />

        {/* password field */}
        <FormRow
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />

        {/* submit button */}
        <button
          type='submit'
          className='btn btn-block'
          disabled={isLoading} // while loading, the user can't submit the form
        >
          {/* show loading when loading */}
          {isLoading ? 'loading...' : 'submit'}
        </button>

        {/* DEMO TEST VERSION */}
        <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() => {
            dispatch(
              loginUser({ email: 'testUser@test.com', password: 'secret' })
            );
          }}
        >
          {isLoading ? 'loading...' : 'demo'}
        </button>

        {/* Member information */}
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
