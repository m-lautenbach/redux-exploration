import { compose, lens, lensProp } from 'ramda'
import { parse as qsParse, stringify as qsStringify } from 'query-string'
import Path from 'path-parser'

export const location = lensProp('location')
export const state = location

const _lensPath = testMethod => pattern => compose(
  location,
  lensProp('pathname'),
  lens(
    path => (new Path(pattern))[testMethod](path),
    params => (new Path(pattern)).build(params),
  ),
)

export const lensPath = _lensPath('test')
export const lensPathPartial = _lensPath('partialTest')

export const lensQuery = compose(
  location,
  lensProp('search'),
  lens(
    qsParse,
    qsStringify,
  ),
)
