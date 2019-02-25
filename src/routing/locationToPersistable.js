import { pick } from 'ramda'

export default pick(['host', 'hostname', 'origin', 'pathname', 'port', 'protocol', 'search'])
