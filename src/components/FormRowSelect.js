const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  // list -> because we want to iterate over

  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {/* labelText if provided, if not -> name */}
        {labelText || name}
      </label>

      {/*SELECT element*/}
      <select
        name={name} // need to match to what we have on the state -> in this case 'status'
        value={value} // remember, here we have default value!
        id={name}
        onChange={handleChange}
        className='form-select'
      >
        {/* for whatever list we pass -> set the options with .map ! */}
        {/*
         * we iterate over list
         * for every item, we return an option
         */}
        {list.map((itemValue, index) => {
          return (
            // value = whatever it is on the itemValue in the array!
            <option key={index} value={itemValue}>
              {itemValue}
            </option>
          );
        })}
      </select>
      {/*end of SELECT element*/}
    </div>
  );
};

export default FormRowSelect;
