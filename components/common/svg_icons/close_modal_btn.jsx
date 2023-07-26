import * as React from "react"

const ModalCloseBtn = (props) => (
  <svg
    width={16}
    height={16}
    style={{cursor: "pointer"}}
    onClick={props.onClick}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m2 2 12 12M2 14 14 2 2 14Z"
      stroke="#243358"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ModalCloseBtn
