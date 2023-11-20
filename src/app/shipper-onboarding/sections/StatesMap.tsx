import React from 'react'
import { Annotation, ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'

import { geoCentroid } from 'd3-geo'

import allStates from '@json/usaStates.json'

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
}

type Props = { selectedStates: string[]; onClick: (value: string) => void }
const StatesMap = ({ selectedStates, onClick }: Props) => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {({ geographies }) => (
          <>
            {geographies.map((geo) => {
              const cur = allStates.find((s) => s.val === geo.id)
              const isSelected = selectedStates.find((ss) => ss == cur?.name)
              return (
                cur && (
                  <Geography
                    key={geo.rsmKey}
                    onClick={() => onClick(cur?.name)}
                    stroke="#FFF"
                    opacity={0.7}
                    geography={geo}
                    fill={isSelected ? '#6463b4fd' : '#6463b4ad'}
                  />
                )
              )
            })}

            {geographies.map((geo) => {
              const centroid = geoCentroid(geo)
              const cur = allStates.find((s) => s.val === geo.id)
              return (
                <g key={geo.rsmKey + '-name'}>
                  {cur && centroid[0] > -160 && centroid[0] < -67 && (
                    <Marker coordinates={centroid}>
                      <text y="2" fontSize={11} style={{ fill: 'white', stroke: 'transparent' }} textAnchor="middle">
                        {cur.id}
                      </text>
                    </Marker>
                  )}
                </g>
              )
            })}
          </>
        )}
      </Geographies>
    </ComposableMap>
  )
}

export default StatesMap
