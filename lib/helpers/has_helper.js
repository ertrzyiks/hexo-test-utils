import {getHelper} from './get_helper'

export function hasHelper(ctx, name) {
  return typeof getHelper(ctx, name) !== 'undefined'
}
