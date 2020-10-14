import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Landing from "./screen/Landing";
import OrphanageMaps from "./screen/OrphanageMaps";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanageMaps} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
