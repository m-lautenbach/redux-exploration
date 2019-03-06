import { compose, set } from 'ramda'
import { lensState as routingState } from '../routing/lenses'
import locationToPersistable from '../routing/locationToPersistable'

export default (location) =>
  compose(
    set(routingState, locationToPersistable(location)),
  )(undefined)
