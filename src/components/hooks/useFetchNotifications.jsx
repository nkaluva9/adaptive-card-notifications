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

import { useQuery, gql } from '@apollo/client'

// GraphQL Query for list of notifications
export const GET_NOTIFICATIONS_QUERY = gql`
  query GetNotifications($spaceId: ID!, $cursor: String, $input: NotificationsInput!) {
    me {
      id
      space(spaceId: $spaceId) {
        notifications(first: 6, after: $cursor, input: $input) {
          edges {
            node {
              id
              view
              isDeletable
              location
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
`

export default function useFetchNotifications({ location = 'ALL' } = {}) {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTIFICATIONS_QUERY, {
    variables: {
      spaceId: process.env.REACT_APP_SPACE_ID,
      input: {
        location,
        filter: {
          orderBy: 'DATE',
        },
      },
    },
  })

  const notifications = data?.me?.space?.notifications
  const hasNextPage = data?.me?.space?.notifications?.pageInfo?.hasNextPage

  const fetchMoreNotifications = () => {
    if (notifications?.pageInfo?.hasNextPage) {
      fetchMore({ variables: { cursor: notifications.pageInfo.endCursor } })
    }
  }

  return [notifications?.edges || [], loading, error, hasNextPage, fetchMoreNotifications]
}
