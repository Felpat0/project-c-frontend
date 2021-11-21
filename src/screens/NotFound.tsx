import { Redirect } from "react-router";

const NotFound = () => {
  console.log("Not found");
  return <Redirect to={"/"} />;
};

export default NotFound;
