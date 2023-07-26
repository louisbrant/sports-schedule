import * as React from "react"

const FacilityIcon = (props) => (
  <svg
    width={16}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 0a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2H5ZM2 4a1 1 0 0 1 1-1h10a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1ZM0 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8Z"
      fill={props.color}
    />
  </svg>
)

export default FacilityIcon
