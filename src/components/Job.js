// imports
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'; // icons
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useDispatch } from 'react-redux';
import JobInfo from './JobInfo'; // component for the Job info
import moment from 'moment'; // Moment.js for data format, this was installed! (npm install moment)
import { setEditJob, deleteJob } from '../features/job/jobSlice'; // functionality from jobSlice

// ====================================================================================

// right away -> get the PROPS we're interested
const Job = ({
  _id, // unique ID from Mongo DB
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  // *** set up the dispatch
  const dispatch = useDispatch(); // we'll dispatch a delete action

  // *** date variable
  //const date = createdAt; // property right from the server
  // ==> applying Moment.js
  const date = moment(createdAt).format('MMM Do, YYYY');

  // *** RETURN
  return (
    <Wrapper>
      {/* TITLE OF THE JOB */}
      <header>
        {/* as main icon -> the first letter of the company */}
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      {/* end of TITLE OF THE JOB */}

      <div className='content'>
        <div className='content-center'>
          {/* HERE WE'LL HAVE ANOTHER COMPONENT !! */}
          {/* <h4>more content</h4> */}
          <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
          <JobInfo icon={<FaCalendarAlt />} text={date} />
          <JobInfo icon={<FaBriefcase />} text={jobType} />
          {/*stats of the job, ex: pending, rejected*/}
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            {/* BTN - Edit Job */}
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => {
                //console.log('edit job'); // TEST

                // dispatch the action of setEdirJob from jobSlice reducer !!
                dispatch(
                  setEditJob({
                    editJobId: _id, // state value -> the only one different!
                    position,
                    company,
                    jobLocation,
                    jobType,
                    status,
                  })
                );
              }}
            >
              Edit
            </Link>
            {/* BTN - Delete Job */}
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => {
                //console.log('delete job'); // now apply functionality from jobSlice
                dispatch(deleteJob(_id)); // _id from Mongo DB
              }}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Job;
