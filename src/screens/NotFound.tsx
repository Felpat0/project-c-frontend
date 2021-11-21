import { Redirect } from "react-router";

const NotFound: React.FC = () => {
  console.log("Not found");
  return <Redirect to={"/"} />;
};

export default NotFound;
