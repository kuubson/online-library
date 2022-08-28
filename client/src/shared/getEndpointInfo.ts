import swagger from './swagger.json'

export type Endpoint = keyof typeof swagger['paths']

export const getEndpointInfo = <E extends Endpoint>(endpoint: E) => swagger['paths'][endpoint]
