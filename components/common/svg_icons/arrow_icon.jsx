import * as React from "react"

const ArrowIcon = ({isMobileCard}, props) => (
  <svg
    width={11}
    height={10}
    fill="none"
    style={isMobileCard ? {position: 'relative', left: 10} : {position: 'relative', left: 6}}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 4.75H1M6.25 1 10 4.75 6.25 1ZM10 4.75 6.25 8.5 10 4.75Z"
      stroke="#EE2E2A"
      strokeOpacity={0.8}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default ArrowIcon
