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

import { useMutation, gql } from '@apollo/client'
import { useApolloClient } from '@apollo/client'
import deleteNotificationFromCache from './utils/deleteNotificationFromCache'

// GraphQL Mutation to action on a notification
const ACTION_NOTIFICATION_MUTATION = gql`
  mutation actionNotification($input: ActionNotificationInput!) {
    actionNotification(input: $input)
  }
`

export default function useActionNotification() {
  const client = useApolloClient()
  const [actionNotificationFunction, { loading, error }] = useMutation(ACTION_NOTIFICATION_MUTATION, {
    update(cache, mutationResult) {
      deleteNotificationFromCache(cache, mutationResult)
    },
    // On successful delete, clean up cache
    onCompleted() {
      client.cache.gc()
    },
  })

  return [actionNotificationFunction, loading, error]
}
