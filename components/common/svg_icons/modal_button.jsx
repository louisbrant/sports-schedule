import * as React from "react"

const ModalButton = (props) => (
  <svg
    width={85}
    height={85}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    onClick={props.onClick}
    style={{cursor: 'pointer'}}
  >
    <g filter="url(#a)">
      <circle
        cx={42.5}
        cy={38.5}
        r={24.5}
        fill="#EE2E2A"
        fillOpacity={1}
        shapeRendering="crispEdges"
      />
    </g>
    <path
      d="M36 35h14m-14 0a2 2 0 0 1 0-4h14a2 2 0 0 1 0 4m-14 0v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V35m-9 4h4"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <filter
        id="a"
        x={0}
        y={0}
        width={85}
        height={85}
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy={4} />
        <feGaussianBlur stdDeviation={9} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0.933333 0 0 0 0 0.180392 0 0 0 0 0.164706 0 0 0 0.08 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_65_43" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow_65_43"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)

export default ModalButton
