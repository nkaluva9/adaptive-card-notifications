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

import * as dotenv from "dotenv";
import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { relayStylePagination } from "@apollo/client/utilities";

import "./styles.css";

import App from "./App";

// Import environment variables
dotenv.config();

const cache = new InMemoryCache({
  typePolicies: {
    Space: {
      fields: {
        notifications: relayStylePagination()
      }
    }
  }
});

// Set up Auth link to add authorization header
const httpLink = createHttpLink({ uri: process.env.REACT_APP_GRAPHQL_URI });

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: process.env.REACT_APP_TOKEN
        ? `Bearer ${process.env.REACT_APP_TOKEN}`
        : ""
    }
  };
});

// Start the GraphQL client
const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink)
});

// Render App
const rootElement = document.getElementById("root");
ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  rootElement
);
