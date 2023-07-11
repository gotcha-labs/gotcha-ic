import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SVG from 'react-inlinesvg';

import Logo from "../../../assets/images/GotCHA_Logo.svg";
import Animation from "../../../assets/images/GotCHA_Gif.gif";
import "./landingPageStyles.css";
import useAuth from "../../../hooks/useAuth";

import { loginOnClick } from "./icp";

function LandingPage() {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  if (loginOnClick == true) {
    navigate(
      `/dashboard/?canisterId=${process.env.GOTCHA2_FRONTEND_CANISTER_ID}`
    );
  }

  return (
    <div className="Wrapper">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iNjAiPjxnIGRhdGEtbmFtZT0iVmVjdG9yIFNtYXJ0IE9iamVjdDIiPjxnIGRhdGEtbmFtZT0iR3JvdXAgMTUyNyI+PHBhdGggZGF0YS1uYW1lPSJQYXRoIDE3MDk5IiBkPSJNMzYuMzAxIDQ5Ljk4MWEyMS42MTkgMjEuNjE5IDAgMTE0My4yMzggMHoiIGZpbGw9IiNlYWYwZjQiLz48cGF0aCBkYXRhLW5hbWU9IlBhdGggMTcxMDAiIGQ9Ik02OS40NzMgNDkuOTgxYTQ4LjU0NCA0OC41NDQgMCAxMTk3LjA4NiAweiIgZmlsbD0iI2VhZjBmNCIvPjxwYXRoIGRhdGEtbmFtZT0iUGF0aCAxNzEwMSIgZD0iTTEzNS4zNDcgNDkuOTgzYTMzLjI0MiAzMy4yNDIgMCAwMTYzLjg3My0xMy4xNzUgMTcuMzA3IDE3LjMwNyAwIDAxMTEuNTQxLTQuMzkyIDE3LjUwOCAxNy41MDggMCAwMTE3LjQ1MSAxNy41Njd6IiBmaWxsPSIjZWFmMGY0Ii8+PHBhdGggZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjgxNSIgZmlsbD0iI2QwZDllMiIgZD0iTTAgNDguODc3aDIzNS4zNnYyLjIwOEgweiIvPjxwYXRoIGRhdGEtbmFtZT0iUGF0aCAxNzEwMiIgZD0iTTY1Ljk1MSA0OS45ODFoLTIuMTkzYTIwLjUyMyAyMC41MjMgMCAxMC00MS4wNDUgMEgyMC41MmEyMi43MTYgMjIuNzE2IDAgMTE0NS40MzEgMHoiIGZpbGw9IiNkMGQ5ZTIiLz48cGF0aCBkYXRhLW5hbWU9IlBhdGggMTcxMDMiIGQ9Ik0xNTIuOTcxIDQ5Ljk4MWgtMi4xOTNhNDcuNDQ4IDQ3LjQ0OCAwIDEwLTk0Ljg5MyAwaC0yLjE5M2E0OS42NDEgNDkuNjQxIDAgMTE5OS4yNzkgMHoiIGZpbGw9IiNkMGQ5ZTIiLz48cGF0aCBkYXRhLW5hbWU9IlBhdGggMTcxMDQiIGQ9Ik0yMTQuNjIgNDkuOTgzaC0yLjE5M2ExNi4zMjkgMTYuMzI5IDAgMDAtMjcuMTY2LTEyLjM0OGwtMS4xMzcgMS4wMTEtLjYtMS40YTMyLjE0NiAzMi4xNDYgMCAwMC02MS43NjcgMTIuNzQxaC0yLjE5M2EzNC4zMzUgMzQuMzM1IDAgMDE2NS4zODMtMTQuOTQzIDE4LjQ0MiAxOC40NDIgMCAwMTExLjEzLTMuNzM1IDE4LjYyOSAxOC42MjkgMCAwMTE4LjU0MyAxOC42NzR6IiBmaWxsPSIjZDBkOWUyIi8+PHBhdGggZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjgxNiIgZmlsbD0iI2QwZDllMiIgZD0iTTgwLjQ2NCA1Ny43OTJoMTc1LjUzNVY2MEg4MC40NjR6Ii8+PC9nPjwvZz48L3N2Zz4="
        alt="cloud"
        className="clouds cloud1"
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTUiIGhlaWdodD0iNTAiPjxnIGRhdGEtbmFtZT0iVmVjdG9yIFNtYXJ0IE9iamVjdDQiPjxnIGRhdGEtbmFtZT0iR3JvdXAgMTUyOSI+PHBhdGggZGF0YS1uYW1lPSJQYXRoIDE3MTExIiBkPSJNNTMuNTUxIDM4LjU3NWEyMC41NDggMjAuNTQ4IDAgMDEyMC40LTIwLjY5MyAyMC4wNTkgMjAuMDU5IDAgMDE4Ljg4OCAyLjA2NCAzMi4yMjUgMzIuMjI1IDAgMDE1Ny43ODQgOS4zNjYgMzMuMjY0IDMzLjI2NCAwIDAxMS4zMDUgOS4yNjN6IiBmaWxsPSIjZWFmMGY0Ii8+PHBhdGggZGF0YS1uYW1lPSJQYXRoIDE3MTEyIiBkPSJNMTI1LjIzIDQxLjAxOEgyOC40NTR2LTEuMjY2YTI1LjM0NyAyNS4zNDcgMCAwMTI1LjEzNi0yNS41IDI0LjU3MiAyNC41NzIgMCAwMTkuOTg2IDIuMDkzQTM5LjAzNyAzOS4wMzcgMCAwMTk1LjI1MyAwYTM5LjQ1MiAzOS40NTIgMCAwMTM3LjA4MyAyNi44ODEgMTQuNjQxIDE0LjY0MSAwIDAxNy43OC0yLjIzMUExNS4wMSAxNS4wMSAwIDAxMTU1IDM5Ljc1djEuMjY5em05LjE4NS0yLjUzN2gxOC4wMmExMi40NyAxMi40NyAwIDAwLTEyLjMyLTExLjI5MyAxMi4xOTMgMTIuMTkzIDAgMDAtNy4wMjEgMi4yMTkgNDAuMjY4IDQwLjI2OCAwIDAxMS4zMjEgOS4wNzR6bS02LjYyMSAwaDQuMTE4YTM3LjcyOCAzNy43MjggMCAwMC0uOTMzLTcuMiAxMi42MDcgMTIuNjA3IDAgMDAtMy4xODUgNy4yem0tOTYuOCAwaDk0LjI5M2ExNS4xNTIgMTUuMTUyIDAgMDE0LjkzOC0xMEEzNi45NCAzNi45NCAwIDAwOTUuMjU3IDIuNTRhMzYuNTY1IDM2LjU2NSAwIDAwLTMwLjIzNCAxNi4xMTJsLS42MS45LS45NjctLjQ3NmEyMi4xMTcgMjIuMTE3IDAgMDAtOS44Ni0yLjI4OUEyMi44MDYgMjIuODA2IDAgMDAzMC45OSAzOC40OHoiIGZpbGw9IiNkMGQ5ZTIiLz48cGF0aCBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyODE5IiBmaWxsPSIjZDBkOWUyIiBkPSJNMCA0Ny40NjNoMTE1LjA4NFY1MEgweiIvPjwvZz48L2c+PC9zdmc+"
        alt="cloud"
        className="clouds cloud2"
      />
      <img
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMTciIGhlaWdodD0iNzAiPjxnIGRhdGEtbmFtZT0iVmVjdG9yIFNtYXJ0IE9iamVjdDMiPjxwYXRoIGRhdGEtbmFtZT0iUGF0aCAxNzEwNSIgZD0iTTQzLjY2NyA1Ni43NzZhMTguODI0IDE4LjgyNCAwIDExMzcuNjQ3IDB6IiBmaWxsPSIjZWFmMGY0Ii8+PHBhdGggZGF0YS1uYW1lPSJQYXRoIDE3MTA2IiBkPSJNMjIxLjQzMiA1Ni43NzZhMTkuNzQxIDE5Ljc0MSAwIDExMzkuNDggMHoiIGZpbGw9IiNlYWYwZjQiLz48cGF0aCBkYXRhLW5hbWU9IlBhdGggMTcxMDciIGQ9Ik04MS4zMTQgNTYuNzc2YTM0LjY4OSAzNC42ODkgMCAwMTM0LjU4My0zNC43OTQgMzQuMjMzIDM0LjIzMyAwIDAxMTUuMDY3IDMuNDcgNTQuOCA1NC44IDAgMDE5Ny45NjMgMTUuNzUgNTUuNTI4IDU1LjUyOCAwIDAxMi4yMTEgMTUuNTc1eiIgZmlsbD0iI2VhZjBmNCIvPjxnIGRhdGEtbmFtZT0iR3JvdXAgMTUyOCIgZmlsbD0iI2QwZDllMiI+PHBhdGggZGF0YS1uYW1lPSJSZWN0YW5nbGUgMjgxNyIgZD0iTTAgNTUuMjYzaDI2Ni4yOTF2My4wMjdIMHoiLz48cGF0aCBkYXRhLW5hbWU9IlBhdGggMTcxMDgiIGQ9Ik02My40OTcgNTYuNzc2aC0zLjAwOWExNy4zMiAxNy4zMiAwIDEwLTM0LjYzOSAwaC0zLjAxMmEyMC4zMjggMjAuMzI4IDAgMTE0MC42NTYgMHoiLz48cGF0aCBkYXRhLW5hbWU9IlBhdGggMTcxMDkiIGQ9Ik0yNDMuMDkgNTYuNzc2aC0zLjAwOWExOC4yMzYgMTguMjM2IDAgMTAtMzYuNDcxIDBoLTMuMDEzYTIxLjI0NCAyMS4yNDQgMCAxMTQyLjQ4OCAweiIvPjxwYXRoIGRhdGEtbmFtZT0iUGF0aCAxNzExMCIgZD0iTTIxMy4zMTUgNTYuNzc2aC0zLjAwOWE1My42NCA1My42NCAwIDAwLTUzLjQxNC01My43NDcgNTMuMzczIDUzLjM3MyAwIDAwLTQ0LjAxNyAyMy4yODNsLS43MzMgMS4wNy0xLjE2My0uNTY4YTMyLjU0OSAzMi41NDkgMCAwMC0xNC40MS0zLjMxOCAzMy4yMTcgMzMuMjE3IDAgMDAtMzMuMDcyIDMzLjI4aC0zLjAwOWEzNi4yMzggMzYuMjM4IDAgMDEzNi4wODUtMzYuMzA4IDM1LjUxMyAzNS41MTMgMCAwMTE0LjU2MiAzLjA3OSA1Ni4zIDU2LjMgMCAwMTk5LjkxMSAxNy4yMjggNTcuMDg3IDU3LjA4NyAwIDAxMi4yNjkgMTYuMDAxeiIvPjwvZz48cGF0aCBkYXRhLW5hbWU9IlJlY3RhbmdsZSAyODE4IiBmaWxsPSIjZDBkOWUyIiBkPSJNMTExLjYzNiA2Ni45NzNoMjA1LjM2M1Y3MEgxMTEuNjM2eiIvPjwvZz48L3N2Zz4="
        alt="cloud"
        className="clouds cloud3"
      />
      <div className="section-container">
        <Container>
          <Row>
            <Col xs={10} md={6}>
              <div className="inner-section">
                {/* <img src={Logo} alt="logo" /> */}
                <SVG className="svg-img" src={Logo} al />
                <h2>Stop Bots, have fun! We'll launch soon, stay tuned!</h2>
              </div>
              <div className="btns-group">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="login-btn"
                  onClick={login}
                >
                  Login
                </Button>
                <Button
                  variant="info"
                  size="lg"
                  className="register-btn"
                  onClick={register}
                >
                  Sign up
                </Button>
              </div>
            </Col>
            <Col xs={10} md={6}>
              <div className="brand-img">
                <img
                  src={Animation}
                  alt="Animation"
                  className="brand-animation"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="landing-footer">
        {/* <ul className="social-icons">
                  <li className="social_profile_item">List item</li>
                  <li className="social_profile_item">List item</li>
                  <li className="social_profile_item">List item</li>
                </ul> */}

        <p>Copyright 2023 by GotCHA. All rights reserved</p>
      </div>
    </div>
  );
}

export default LandingPage;
