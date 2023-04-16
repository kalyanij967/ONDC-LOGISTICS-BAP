import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './sign-up.styles.css'
// import axios
const SignUp = () => {
    useEffect(() => {
        document.title='Sign Up'
    })
    const navigate = useNavigate();
    const [signUpDetails, setSignUpDetails] = useState({
        displayName:'',
        email:'',
        contact:'',
        password:'',
        confirmPassword:''
    })
    const [address,setAddress] = useState({
      door:'',
      name:'',
      building:'',
      street:'',
      locality:'',
      ward:'',
      city:'',
      state:'',
      country:'',
      area_code:''
    })


    const handleChange = (event) => {
        setSignUpDetails({ ...signUpDetails, [event.target.name]: event.target.value });
    };

    const handleAddress = (event) => {
      setAddress({ ...address, [event.target.name]: event.target.value });
    };
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(signUpDetails)
        try {
			let res = await fetch("http://localhost:8000/signup", {
				method: "post",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
          signUpDetails,
          address
					// name:signUpDetails.displayName,
					// email: signUpDetails.email,
					// password:signUpDetails.password,
          //           Contact : signUpDetails.contact
				}),
			})
			let data = await res.json();

			if (data.error) {
				alert(data.error);
			} else {
				// alert(data.message);
        
        navigate('/signin')
			}
		}
		catch(err){
			console.log("There is some error", err);
		}
    }
    
    return (
      <div className="forms mt-3">
        <Form>
          <div className='form container'> 
            <div className='row'>

              <div className="col">
                <div className="form-heading">Sign Up</div>
                <div className="form-subheading">Sign up with your email and password</div>
            
                <Form.Group className="mb-3" controlId="signUpFormName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                      name="displayName"
                      type="text" 
                      placeholder="Enter name" 
                      required
                      value={signUpDetails.displayName}
                      onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signUpFormBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                      name="email"
                      type="email" 
                      placeholder="Enter email" 
                      required
                      value={signUpDetails.email}
                      onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="signUpFormContact">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                      name="contact"
                      type="text" 
                      placeholder="Enter contact" 
                      required
                      value={signUpDetails.contact}
                      onChange={handleChange}
                  />
                    <Form.Text className="text-muted">
                    We'll never share your contact with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="signUpFormBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                      name="password"
                      type="password" 
                      placeholder="Password" 
                      required
                      value={signUpDetails.password}
                      onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="signUpFormConfirmBasicPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                      name="confirmPassword"
                      type="password" 
                      placeholder="Confirm Password" 
                      required
                      value={signUpDetails.confirmPassword}
                      onChange={handleChange}
                    />
                </Form.Group>

                </div>
                <div className="col">
                  <div className="form-subheading">Address Details</div>
                  <Form.Group className="mb-3" controlId="signUpFormAddDoor">
                      <Form.Label>Door Number</Form.Label>
                      <Form.Control 
                        name="door"
                        type="text" 
                        placeholder="Door Number" 
                        required
                        value={address.door}
                        onChange={handleAddress}
                      />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="signUpFormAddStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control 
                      name="street"
                      type="text" 
                      placeholder="Enter Street" 
                      required
                      value={address.street}
                      onChange={handleAddress}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpFormAreaCode">
                    <Form.Label>Area Code</Form.Label>
                    <Form.Control 
                      name="area_code"
                      type="text" 
                      placeholder="Enter Area Code" 
                      required
                      value={address.area_code}
                      onChange={handleAddress}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpFormCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control 
                      name="city"
                      type="text" 
                      placeholder="Enter city" 
                      required
                      value={address.city}
                      onChange={handleAddress}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="signUpFormState">
                    <Form.Label>State</Form.Label>
                    <Form.Control 
                      name="state"
                      type="text" 
                      placeholder="Enter State" 
                      required
                      value={address.state}
                      onChange={handleAddress}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="signUpFormCountry">
                    <Form.Label>Country</Form.Label>
                    <Form.Control 
                      name="country"
                      type="text" 
                      placeholder="Enter country" 
                      required
                      value={address.country}
                      onChange={handleAddress}
                    />
                </Form.Group>
                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                      Sign Up
                  </Button>
                </div>
                
            </div>
          </div>
        </Form> 
      </div>
  )
}

export default SignUp;