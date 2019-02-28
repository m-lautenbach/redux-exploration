import { always, T, view, toPairs, pipe, map, cond, append } from 'ramda'
import pages from '../components/pages'
import { lensRoute } from './lenses'
import pagePaths from './pagePaths'

export const getPageByRoute = pipe(
  toPairs,
  map(([page, route]) => [view(lensRoute(route)), always(pages[page])]),
  append([T, always(pages.NOT_FOUND)]),
  cond,
)(pagePaths)
