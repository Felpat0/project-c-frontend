import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useStores } from "../hooks/useStores";
import { Redirect, useHistory } from "react-router-dom";

export const RedirectToUserBoard: React.FC = observer(() => {
  const { session } = useStores();
  const history = useHistory();

  useEffect(() => {
    if (session.isLogged && session.user) {
      // @ts-ignore
      history.push(`/user/${session.user.id}/`);
    }
  }, [session, history, session.user]);

  if (session.isLogged && session.user) {
    return (
      // @ts-ignore
      <Redirect to={`/user/${session.user.id}/`} />
    );
  }

  return <Redirect to={`/login`} />;
});
