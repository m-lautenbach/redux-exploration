import { allPass, cond, equals, flip, nthArg, pipe, path, prop, set, T, useWith, identity } from 'ramda'
import { lensLocation, lensPath } from '../lenses'
import pagePaths from '../pageRoutes'

const action = nthArg(0)
const state = nthArg(1)

const hasType = type => pipe(action, prop('type'), equals(type))
const updateState = (fnState, fnAction) => useWith(fnState, [fnAction, identity])

export default cond([
  [hasType('USER_NAVIGATION'), updateState(set(lensLocation), path(['payload', 'newLocation']))],
  [
    allPass([hasType('NAVIGATE_TO'), pipe(action, path(['payload', 'type']), equals('page'))]),
    updateState(set(lensPath), pipe(path(['payload', 'page']), flip(prop)(pagePaths))),
  ],
  [T, state],
])
