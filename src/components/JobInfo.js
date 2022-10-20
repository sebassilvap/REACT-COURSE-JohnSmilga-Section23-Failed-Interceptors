// import
import Wrapper from '../assets/wrappers/JobInfo';

// the component looks for 2 props -> icon & text
const JobInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  );
};

export default JobInfo;
