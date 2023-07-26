import * as React from "react"

const CloseIcon = (props) => (
  <svg
    fill="#FFF"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={85}
    height={85}
    {...props}
    onClick={props.onClick}
  >
    <path d="M4.707 3.293 3.293 4.707 10.586 12l-7.293 7.293 1.414 1.414L12 13.414l7.293 7.293 1.414-1.414L13.414 12l7.293-7.293-1.414-1.414L12 10.586 4.707 3.293z" />
  </svg>
)

export default CloseIcon
