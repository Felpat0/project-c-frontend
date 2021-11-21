import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

import { Stores } from "../types";
import { StoresContext } from "../contexts";
import { SessionStore } from "../stores/Session";

import "../i18n";

import { PrivateRoute } from "../components/PrivateRoute";
import { RedirectToUserBoard } from "./RedirectToUserBoard";
import { observer } from "mobx-react";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { OAuthCallback } from "./OAuthCallback";
import { AppLayout } from "./AppLayout";

const Root: React.FC = observer((props) => {
  const [stores] = useState<Stores>(() => {
    const root: Stores = {} as Stores;

    root.session = new SessionStore(root);

    return root;
  });

  useEffect(() => {
    if (!stores.session.isInitialized) {
      stores.session.initialize();
    }
  }, [stores.session, stores.session.isInitialized]);

  if (!stores.session.isInitialized) {
    return <></>;
  }

  return (
    <StoresContext.Provider value={stores}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path={`/`} component={RedirectToUserBoard} />
            <Route path={"/login"} component={Login} />
            <Route path={"/signup"} component={Signup} />
            <Route path={"/auth/fail"} component={Login} />
            <Route path={"/auth/callback"} component={OAuthCallback} />
            <Route path={"/app"} component={AppLayout} />
            <PrivateRoute
              isAuthenticated={stores.session.isLogged}
              path={"/user/:uid"}
              component={AppLayout}
            />
          </Switch>
        </Router>
      </ChakraProvider>
    </StoresContext.Provider>
  );
});

export default Root;
