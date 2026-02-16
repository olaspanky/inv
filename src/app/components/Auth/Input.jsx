import React from 'react';

const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  error
}) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{color:"#000"}}>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: '100%',
        padding: '0.75rem',
        border: error ? '1px solid red' : '1px solid #ccc',
        borderRadius: 6
      }}
    />
    {error && <small style={{ color: 'red' }}>{error}</small>}
  </div>
);

export default Input;
