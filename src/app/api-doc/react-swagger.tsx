'use client'

import dynamic from 'next/dynamic'

import 'swagger-ui-react/swagger-ui.css'

type Props = {
  spec: Record<string, any>
}

const DynamicSwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false })

function ReactSwagger({ spec }: Props) {
  return <DynamicSwaggerUI spec={spec} />
}

export default ReactSwagger
