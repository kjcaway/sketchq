import React from 'react'
import CommonDialog from '../components/base/CommonDialog'
import CommonAlert from '../components/base/CommonAlert'
import CommonConfirm from '../components/base/CommonConfirm'

function Base() {
  return (
    <React.Fragment>
      <CommonDialog />
      <CommonAlert />
      <CommonConfirm />
    </React.Fragment>
  )
}

export default Base
