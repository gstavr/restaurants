import React, { useState } from 'react';

function Login(props) {
  const initialUserState = {
    name: '',
    id: '',
  };

  const [user, setUser] = useState(initialUserState);

  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user);
    //props.history.push('/');
  };

  return (
    <div className='submit-form'>
      <div>
        <div className='form-group'>
          <label htmlFor='user'>Username</label>
          <input type={'text'} className='form-control' id='name' required value={user.name} onChange={handlerInputChange} name='name' />
        </div>

        <div className='form-group'>
          <label htmlFor='user'>ID</label>
          <input type={'text'} className='form-control' id='id' required value={user.id} onChange={handlerInputChange} name='id' />
        </div>

        <button onClick={login} className='btn btn-success'>
          LogIn
        </button>
      </div>
    </div>
  );
}

export default Login;
