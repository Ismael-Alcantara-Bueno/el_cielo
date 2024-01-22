import React from "react";
import { Alert } from "react-bootstrap";
import { useRouteError } from "react-router-dom";

const Error = () => {
  const errors = useRouteError();
  return (
    <div className="container">
      <Alert variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{errors.statusText || errors.message}</p>
      </Alert>
    </div>
  );
};

export default Error;

