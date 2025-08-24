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

import React from 'react'
import Modal from 'react-modal'

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '700px',
    transform: 'translate(-50%, -50%)',
  },
}

Modal.setAppElement('#root')

export default function BasicModal({ open, handleClose, children }) {
  return (
    <Modal isOpen={open} onRequestClose={handleClose} style={modalStyle} contentLabel="Example Modal">
      {children}
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        <button className="ac-pushButton" onClick={handleClose}>
          Close
        </button>
      </div>
    </Modal>
  )
}
