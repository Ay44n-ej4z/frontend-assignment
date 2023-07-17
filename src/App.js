import React, { useState } from 'react';
import "./App.css"
const AmazingForm = () => {
  const [password, setPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [errorMsg, setErrorMsg] = useState("")

  const MIN_LENGTH = 6;
  const MAX_LENGTH = 20;

  const stepsToMakePasswordStrong = (password) => {
    let steps = 0;

    if (password.length < MIN_LENGTH) {
      steps += MIN_LENGTH - password.length;
      setErrorMsg("Password is weak")
    } else if (password.length > MAX_LENGTH) {
      steps += password.length - MAX_LENGTH;
      setErrorMsg("Password is weak")
    } else {
      let hasLowercase = false;
      let hasUppercase = false;
      let hasDigit = false;

      for (let i = 0; i < password.length; i++) {
        const char = password.charAt(i);
        if (char >= 'a' && char <= 'z') {
          hasLowercase = true;
        } else if (char >= 'A' && char <= 'Z') {
          hasUppercase = true;
        } else if (char >= '0' && char <= '9') {
          hasDigit = true;
        }
      }

      if (!hasLowercase) {
        steps++;
        setErrorMsg("Password is weak")
      }
      if (!hasUppercase) {
        steps++;
        setErrorMsg("Password is weak")
      }
      if (!hasDigit) {
        steps++;
        setErrorMsg("Password is weak")
      }
    }

    for (let i = 0; i < password.length - 2; i++) {
      const char1 = password.charAt(i);
      const char2 = password.charAt(i + 1);
      const char3 = password.charAt(i + 2);

      if (char1 === char2 && char2 === char3) {
        steps++;
        break;
      }
    }
    if(steps === 0){
      setErrorMsg("Password is Strong")
    }
    return steps;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Display the response data
      } else {
        throw new Error('Error creating item');
      }
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };

  const handleChange = (e) => {
    setPassword(e.target.value);
    const strength = stepsToMakePasswordStrong(e.target.value);
    setPasswordStrength(strength);
  };

  return (
    <div className="container">
      <h1>Password Validation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="password-strength">
          Password Strength: {passwordStrength}
          <div>

          {errorMsg}
          
          </div>
        </div>
        {passwordStrength === 0 ? <button className='submit' type="submit">Submit</button> : <button className='no-submit' >Submit</button> }
      </form>
    </div>
  );
};

export default AmazingForm;
