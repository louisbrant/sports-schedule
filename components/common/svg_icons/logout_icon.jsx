import * as React from "react"

const LogoutIcon = (props) => (
  <svg
    width={18}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M9.833 11.333v.834a2.5 2.5 0 0 1-2.5 2.5H4a2.5 2.5 0 0 1-2.5-2.5V3.833a2.5 2.5 0 0 1 2.5-2.5h3.333a2.5 2.5 0 0 1 2.5 2.5v.834m3.334 6.666L16.5 8l-3.333 3.333ZM16.5 8l-3.333-3.333L16.5 8Zm0 0H4.833 16.5Z"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default LogoutIcon
