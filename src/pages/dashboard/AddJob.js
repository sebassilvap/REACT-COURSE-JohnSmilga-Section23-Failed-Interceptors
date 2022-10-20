// **** imports
import { FormRow, FormRowSelect } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage'; // for the styles
import { useSelector, useDispatch } from 'react-redux'; // to comunicate with our slice
import { toast } from 'react-toastify'; // alerts
import {
  clearValues,
  handleChange,
  createJob,
  editJob, // and then dispatch this in the condition isEditing
} from '../../features/job/jobSlice'; // grab action from jobSlice
import { useEffect } from 'react';

// =================================================================================
const AddJob = () => {
  // **** grab the properties from the job slice
  // invoke the useSelector
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  // **** grab the user
  const { user } = useSelector((store) => store.user);

  // **** set up the dispatch
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ==> check for the empty values
    // these values are coming from the state
    // remember: for position & company -> we'll have default values
    if (!position || !company || !jobLocation) {
      toast.error('Please Fill Out All Fields');
      return;
    }

    // ==> SECOND CONDITION : if isEditing is TRUE
    if (isEditing) {
      dispatch(
        // dispatch editJob
        editJob({
          jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },
        })
      );
      return; // otherwise javascript keeps reading the code!
    }

    // ==>  this is our DEFAULT FUNCTIONALITY !!
    dispatch(createJob({ position, company, jobLocation, jobType, status })); // set up the object and pass in all the properties
  };

  // ==> when we type something in the inputs -> we'll trigger this function
  // this function will be passed to the form row and the select input component
  const handleJobInput = (e) => {
    // name & value from the inputs
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value); // TEST

    // dispatch the action
    dispatch(handleChange({ name, value })); // we'll be able to control the state every time we make some changed in our inputs - NOW: not only I dispatch the action, I also have the correct value in the state, and since I'm using that state value in my input as well, I'M PERSISTING THE VALUE!!
  };

  // ==> when we change the location : useEffect
  useEffect(() => {
    // eventually will check for isEditing
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
      // job location = user location => this makes sense, if you apply for a job in that area, you are in that area!!
    }
  }, []); // EMPTY DEPENDENCY ARRAY -> it will only run the first time!

  // **** RETURN
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>

        <div className='form-center'>
          {/* position FIELD */}
          <FormRow
            type='text'
            name='position'
            value={position} // value comes from the state -> slice
            handleChange={handleJobInput}
          />
          {/* company FIELD */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location FIELD */}
          <FormRow
            type='text'
            labelText='job location' // here labelText -> it is displayed on the screen!
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status FIELD */}
          {/* the code here was replaced by the use of FormRowSelect -> in components!! */}
          <FormRowSelect
            name='status' // MUST match exactly what we have on the state
            value={status} // default value
            handleChange={handleJobInput}
            list={statusOptions}
          />

          {/* job type FIELD */}
          <FormRowSelect
            name='jobType' // MUST match exactly what we have on the state
            labelText='job type'
            value={jobType} // default value
            handleChange={handleJobInput}
            list={jobTypeOptions}
          />

          {/* btn container */}
          {/* CLEAR & SUBMIT buttons !! */}
          <div className='btn-container'>
            {/* CLEAR BUTTON */}
            <button
              type='button' // IMPORTANT -> otherwise when we click, it will submit the values!
              className='btn btn-block clear-btn'
              //onClick={() => console.log('clear values')} // TEST // now with the action from reducer
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            {/* SUBMIT BUTTON */}
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading} // when loading, button disabled!
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddJob;
