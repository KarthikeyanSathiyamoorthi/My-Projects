import react, { useState } from 'react';
import URLs from "../common/URLs";
import { Button, Card, Form, Col, Container, Row, InputGroup } from 'react-bootstrap';
import httpClient from '../services/httpClient';
import { updateTenant, updateTenantToken } from '../redux/actions/commonStateActions';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useHistory } from 'react-router-dom';


export default function SignIn() {

  const [emailStatus, setEmailStatus] = useState(true);
  const [passwordStatus, setPasswordStatus] = useState(true);
  const [isValidEmail, setisValidEmail] = useState(true);
  const [isValidPassword, setisValidPassword] = useState(true);


  const [tenantEmail, setTenantEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const history = useHistory();



  console.log("URLs.tenants.tenantLogin", URLs.tenants.tenantLogin);

  useSelector((state: any) => state.token);
  const dispatch = useDispatch();
  const initialstate = useSelector((state: any) => state.commonStateReducer)
  console.log("initialstate", initialstate);

  const clickHandler = (e) => {

    e.preventDefault();

    console.log("onClick");
    console.log("tenantEmail", tenantEmail);
    console.log("password", password);

    if (!tenantEmail || !password) {
      if (!tenantEmail) {
        setEmailStatus(false);
      }
      if (!password) {
        setPasswordStatus(false);

      }


    } else {


      httpClient.httpPost(URLs.tenants.tenantLogin(), {

        email: tenantEmail, password: password

      }, function (err: any, response: any) {
        if (err) {
          console.log('err', err);
          const ERROR = JSON.stringify(err)
          console.log('Received Error', ERROR)

          if (err.response.data.message === 'Username not found') {
            console.log("error username message ", err.response.data.message);
            setisValidEmail(!isValidEmail);
          }
          if (err.response.data.message === 'Authentication failed : Password mismatch') {
            console.log("error password message", err.response.data.message);
            setisValidPassword(!isValidPassword)
          }
        }
        else {
          console.log('Response', response);
          console.log('Response', JSON.stringify(response));

          if (response.status == 'success') {
            console.log(response.result.tenant)
            dispatch(updateTenant(response.result.tenant));
            dispatch(updateTenantToken(response.result.token));
            history.push('/otpverification');
          }
        }

      });
    }


  }
  const changeEmail = (event) => {

    setEmailStatus(true);
    setisValidEmail(true);

    event.preventDefault();
    setTenantEmail(event.target.value);
  }
  console.log("tenantEmail outside", tenantEmail);

  const changePassword = (event) => {

    setPasswordStatus(true);

    event.preventDefault();
    setPassword(event.target.value);
  }
  console.log("password outside", password);

  const emailValidate = (text) => {

    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      console.log("Email is Not Correct");

      return false;
    }
    else {
      return true;
    }
  };
  return (

    <div className="background-image" style={{ backgroundImage: "url(/images/web_login_bg.png)" }} >
      <div className='color-overlay' />

      <Container className="signInContainer">
        <Row className="signInRow">
          <Col xl={4} lg={5} md={6} sm={8} xs={10} className='signIncol' >
            <Card className='signIncard'>

              <div className='grid'>
                <h6 className='vanakkam'>Vanakkam!</h6>
                <h5 className='signIn'>Please sign in to access to your dashboard</h5>
              </div>

              <Form className='signInForm' onSubmit={clickHandler}>

                <Form.Group>
                  <InputGroup >
                    <InputGroup.Prepend>
                      <InputGroup.Text>@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control className={emailStatus ? "signInInput" : 'signInInput is-invalid'} type='email' placeholder='Username'
                      onChange={changeEmail}></Form.Control>


                    <Form.Text className="invalid-feedback">Please Enter your Email!</Form.Text>

                    {isValidEmail ? null : <Form.Text className="isValidEmail" >Please Enter your valid Email!</Form.Text>}

                  </InputGroup>

                </Form.Group>

                <Form.Group>

                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text><RiLockPasswordLine className="riLockIconStyle" /></InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control className={passwordStatus ? "signInInput" : 'signInInput is-invalid'} type='password' placeholder='Password' onChange={changePassword}></Form.Control>

                    <Form.Text className="invalid-feedback">Please Enter your password!</Form.Text>

                    {isValidPassword ? null : <Form.Text className="isValidEmail">Please Enter your valid Password!</Form.Text>}
                  </InputGroup>
                </Form.Group>


                <div className='forgotPassword-container'>
                  <h6 className="forgotpassword">Forgot password?</h6>
                </div>
               

                <div className="d-grid gap-2">
                <Button type="submit" 
                className="btn btn-primary btn-block"
                 onClick={clickHandler} >
                Login
              </Button> 
              </div>


              </Form>

            </Card>
          </Col>
        </Row>
      </Container>

    </div >



  )
}