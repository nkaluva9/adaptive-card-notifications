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

const hostConfig = {
  supportsInteractivity: true,
  spacing: {
    small: 3,
    default: 8,
    medium: 20,
    large: 30,
    extraLarge: 40,
    padding: 10
  },
  actions: {
    maxActions: 6,
    actionsOrientation: "horizontal",
    actionAlignment: "left",
    showCard: {
      actionMode: "popup",
      inlineTopMargin: 20
    }
  },
  containerStyles: {
    emphasis: {
      backgroundColor: "#F0F0F0",
      foregroundColors: {
        default: {
          default: "#000000",
          subtle: "#767676"
        }
      }
    }
  }
};

export default hostConfig;
