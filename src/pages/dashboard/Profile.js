// **** imports for profile page
import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { useDispatch, useSelector } from 'react-redux'; // we'll have a state value we're looking for, in this case 'user' - we'll have a HTTP request back to the server - we'll update this with an API, not only with some local data
import { toast } from 'react-toastify'; // just in case we have some errors
import { updateUser } from '../../features/user/userSlice'; // updateUser functionality from the userSlice

// ============================================================

const Profile = () => {
  // **** grab isLoading & user
  // why are we loading? -> to disable the button
  const { isLoading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  // **** set up user data
  // take values from the user object in my state
  // at this point the user has already logged in
  // if we're in dashboard => we already have a USER OBJECT
  // everywhere where we access the user values -> inputs, buttons -> new values will be displayed
  // ?. ==> optional chaining
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  });

  // **** handleSubmit functionality
  // check for empty values
  const handleSubmit = (e) => {
    e.preventDefault();

    // destructure properties from userData
    const { name, email, lastName, location } = userData;

    // if some value empty -> error toast
    if (!name || !email || !lastName || !location) {
      toast.error('Please Fill Out All Fields');
      return;
    }

    // dispatch the functionality of updateUser
    dispatch(updateUser({ name, email, lastName, location }));
  };

  // **** handleChange functionality
  // the one that we pass to the form
  // looks for event object
  // ...userData -> copy all the values and update the specific one -> [name]:value
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  // **** RETURN
  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>

        <div className='form-center'>
          {/* name field */}
          <FormRow
            type='text'
            name='name'
            value={userData.name} // state value
            handleChange={handleChange}
          />

          {/* last name field */}
          <FormRow
            type='text'
            //labelText='lastName' -> to display on the labe, what we have on labelText property!
            labelText='last name'
            name='lastName'
            value={userData.lastName}
            handleChange={handleChange}
          />

          {/* email field */}
          <FormRow
            type='email'
            name='email'
            value={userData.email}
            handleChange={handleChange}
          />

          {/* location field */}
          <FormRow
            type='text'
            name='location'
            value={userData.location}
            handleChange={handleChange}
          />

          {/* BUTTON - save changes - update form */}
          {/* if isLoading is TRUE => the button to save changes is DISABLED! */}
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
