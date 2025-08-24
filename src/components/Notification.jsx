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

import { useState, useEffect } from 'react'
import { AdaptiveCardUsingHostConfigContext } from 'adaptivecards-react'
import Modal from './Modal'
import useModal from './hooks/useModal'
import useFetchNotification from './hooks/useFetchNotification'

export default function Notification({ node, onDeleteHandler, onActionHandler }) {
  const [isOpen, handleOpenModal, handleCloseModal] = useModal(false)
  const [payload, setPayload] = useState(undefined)
  const [getNotification, loading, card] = useFetchNotification()

  useEffect(() => {
    if (!loading && card) {
      const payload = JSON.parse(JSON.stringify(card))
      setPayload(payload)
    }
  }, [loading, card])

  // Handler for any actions being triggered
  const handleOnExecuteAction = (e) => {
    if (e._propertyBag.type === 'Action.ShowCard') {
      const payload = JSON.parse(JSON.stringify(e.card))
      setPayload(payload)
      handleOpenModal()
    } else if (e._propertyBag.type === 'Action.Execute') {
      // Check the verb associated to the action
      if (e.verb === 'dynamicDetail') {
        onExecuteHandler(node.id)
        handleOpenModal()
      } else {
        onActionHandler(node.id, e.data)
        handleCloseModal()
      }
    }
  }

  const onExecuteHandler = (id) => {
    getNotification({
      variables: {
        spaceId: process.env.REACT_APP_SPACE_ID,
        id,
      },
    })
  }

  const onCloseHandler = () => {
    handleCloseModal()
    setPayload(undefined)
  }

  // Render nothing if there is no payload
  if (!node.view) return <div></div>

  return (
    <div
      style={{
        width: '400px',
        boxShadow: 'rgb(0 0 0 / 25%) 0px 1px 5px 0px',
        margin: '15px 0',
        padding: '10px',
      }}
    >
      <Modal open={isOpen} handleClose={onCloseHandler}>
        {payload && <AdaptiveCardUsingHostConfigContext payload={payload} onExecuteAction={handleOnExecuteAction} />}
      </Modal>
      <AdaptiveCardUsingHostConfigContext payload={node.view} onExecuteAction={handleOnExecuteAction} />
      {node.isDeletable ? (
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <button className="deleteButton" onClick={() => onDeleteHandler(node.id)}>
            ✕
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
