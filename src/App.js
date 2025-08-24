/**
 * Copyright 2022 Workgrid Software
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import { ProvidesHostConfigContext } from "adaptivecards-react";
import Notifications from "./components/Notifications";
import hostConfig from "./hostConfig";

// The ProvidesHostConfigContext allows a global hostConfig to be applied to all cards across the application

export default function App() {
  return (
    <ProvidesHostConfigContext hostConfig={hostConfig}>
      <Notifications />
    </ProvidesHostConfigContext>
  );
}
