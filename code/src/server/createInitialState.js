import { compose, set } from 'ramda'
import { lensState as routingState } from '../shared/routing/lenses'
import locationToPersistable from '../shared/routing/locationToPersistable'

export default (location) =>
  compose(
    set(routingState, locationToPersistable(location)),
  )(undefined)
