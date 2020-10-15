import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"

import Landing from "./screen/Landing";
import OrphanageMaps from "./screen/OrphanageMaps";
import Orphanage from "./screen/Orphanage";
import CreateOrphanage from "./screen/CreateOrphanage";

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanageMaps} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
