// Loading spinner defined in css file

const Loading = ({ center }) => {
  // if there's a center prop -> spinner in the center
  return <div className={center ? 'loading loading-center' : 'loading'}></div>;
};

export default Loading;
