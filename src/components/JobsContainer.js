// imports
import { useEffect } from 'react'; // since eventually we'll fetch the jobs from the API
import Job from './Job'; // we'll iterate over a list of jobs
import Wrapper from '../assets/wrappers/JobsContainer'; // Wrapper, all the styles
import { useSelector, useDispatch } from 'react-redux'; // we'll grab jobs & isLoading from jobs list and we'll dispatch some actions
import Loading from './Loading'; // for Loading spinner
import { getAllJobs } from '../features/allJobs/allJobsSlice'; // fetch request from slice

// ==============================================================================
const JobsContainer = () => {
  // ** grab jobs & isLoading from the state-> specifically from the slice
  const { jobs, isLoading } = useSelector((store) => store.allJobs); // "grab our entire store, and then store.allJobs"
  // ** for dispatching actions
  const dispatch = useDispatch();

  // ==> useEffect when the component loads
  // to get all jobs
  useEffect(() => {
    dispatch(getAllJobs());
  }, []); // for now, when the component loads

  // =========================
  // **** CONDITIONAL RETURN
  // =========================
  // ==> if is loading
  // if I want to see that -> allJobsSlice, change isLoading to true
  if (isLoading) {
    // ** Initial setup of Loading without spinner!
    /*
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
    */
    // ** SPINNER
    // return <Loading /> // spinner NOT in the center !
    return <Loading center />; // center prop => spinner in the center!
  }

  // ==> if no jobs to display
  // or when the user is looking for something that does not exist in the database
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }

  // ==> if we are successful
  // once we have the proper request
  return (
    <Wrapper>
      <h5>jobs info</h5>
      <div className='jobs'>
        {/* iterate over the list of jobs */}
        {jobs.map((job) => {
          //console.log(job); // TEST
          return <Job key={job._id} {...job} />;
          // Mongo DB -> _id
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
