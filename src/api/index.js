import { API_ROOT } from '../config'

export const root = async () => {
  try {
    let res = await fetch(`${API_ROOT}/`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const dicts = async () => {
  try {
    let res = await fetch(`${API_ROOT}/dicts`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const context = async (id, nameSpace = 'public') => {
  try {
    let res = await fetch(`${API_ROOT}/${nameSpace}/contexts/${id}`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const elements = async (ids, nameSpace = 'public') => {
  if (!(ids instanceof Array)) throw new Error('Ids must be an array')
  try {
    let res = await fetch(`${API_ROOT}/${nameSpace}/elements?ids=${ids.join(',')}`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const element = async (id, nameSpace = 'public') => {
  try {
    let res = await fetch(`${API_ROOT}/${nameSpace}/elements/${id}`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const shapes = async (ids, nameSpace = 'public') => {
  if (!(ids instanceof Array)) throw new Error('Ids must be an array')
  try {
    let res = await fetch(`${API_ROOT}/${nameSpace}/shapes?ids=${ids.join(',')}`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const shape = async (id, nameSpace = 'public') => {
  try {
    let res = await fetch(`${API_ROOT}/${nameSpace}/shapes/${id}`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export const scenario = async (name, nameSpace = 'public') => {
  try {
    let res = await fetch(`${API_ROOT}/${nameSpace}/scenarios/${name}`)
    return await res.json()
  } catch (err) {
    console.log(err)
  }
}

export default {
  root,
  dicts,
  context,
  element,
  elements,
  shape,
  shapes,
  scenario
}
