import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { Button, Card, Form, Col, Container, Row, Nav, ListGroup, Navbar, NavDropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import httpClient from '../services/httpClient';
import { HiOutlinePresentationChartBar } from "react-icons/hi";
import { BsLayoutWtf } from "react-icons/bs";
import { IoPricetagOutline } from "react-icons/io5";
import { FaAward } from "react-icons/fa";
import Events from './Events';
import Dashboard from './Dashboard';
import Membership from './Membership';
import Clubs from './Clubs';
import { isTemplateExpression } from 'typescript';
import { directive } from '@babel/types';

export default function DashInitialState() {

  return (
  <Router>
    <div id="wrapper">
      <div id="sideBar-wrapper">

        <div className="sideBar-header">
          <div className='circular'>
            S
          </div>
        </div>

        <div className="sideBar-fullContainer">
          <Link to="/dashboard">
            <div className="sideBar-container">
              <div className="icon-container">
                < HiOutlinePresentationChartBar className="dashInitialIcon" />
              </div>
              <div className="iconText-container">
                Dashboard
              </div>
            </div>
          </Link>
          <Link to="/clubs">
            <div className="sideBar-container">
              <div className="icon-container">
                < BsLayoutWtf className="dashInitialIcon" />
              </div>
              <div className="iconText-container">
                Clubs
              </div>
            </div>
          </Link>
          <Link to="/membership">
            <div className="sideBar-container">
              <div className="icon-container">
                < IoPricetagOutline className="dashInitialIcon" />
              </div>
              <div className="iconText-container">
                Membership
              </div>
            </div>
          </Link>
          <Link to="/events">
            <div className="sideBar-container">
              <div className="icon-container">
                < FaAward className="dashInitialIcon" />
              </div>
              <div className="iconText-container">
                Events
              </div>
            </div>
          </Link>
        </div>

      </div>
      <div className="page-content-wrapper">
        <Route exact path='/dashboard'><Dashboard /></Route>
        <Route exact path='/clubs'><Clubs /></Route>
        <Route exact path='/events'><Events /></Route>
        <Route exact path='/membership'><Membership /></Route>
      </div>
    </div>
  </Router>

  )

}
