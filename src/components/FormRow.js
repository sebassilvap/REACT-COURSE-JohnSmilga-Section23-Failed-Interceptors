const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {/* if labelText is present, use that, if not -> name !! */}
        {labelText || name}
      </label>
      <input
        id={name} // what we pass from label, needs to match the id
        type={type}
        name={name}
        // remember: values & onChange for controlled input
        value={value}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  );
};

export default FormRow;
