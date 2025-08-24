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

import { GET_NOTIFICATIONS_QUERY } from '../useFetchNotifications'

const deleteNotificationFromCache = (cache, mutationResult) => {
  const queryOptions = {
    query: GET_NOTIFICATIONS_QUERY,
    variables: {
      spaceId: process.env.REACT_APP_SPACE_ID,
      input: {
        location: 'TOKNOW',
        filter: {
          orderBy: 'DATE',
        },
      },
    },
  }

  // Query the cache directly to get existing notifications
  const cachedData = cache.readQuery(queryOptions)

  // Grab id of notification that was deleted
  const deletedId = mutationResult?.data?.deleteNotification || mutationResult?.data?.actionNotification

  // Re-write the cache without the deleted notification
  const data = {
    me: {
      ...cachedData.me,
      space: {
        ...cachedData.me.space,
        notifications: {
          ...cachedData.me.space.notifications,
          edges: cachedData.me.space.notifications.edges.filter((edge) => edge.node.id !== deletedId),
          pageInfo: cachedData.me.space.notifications.pageInfo,
        },
      },
    },
  }
  cache.writeQuery({ ...queryOptions, data })
}

export default deleteNotificationFromCache
