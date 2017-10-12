import 'whatwg-fetch'
import 'es6-promise'
import { api } from '@config'
import { selfJsonp } from 'util'

export function get(url) {
	let headers = new Headers({
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'text/plain; application/json; charset=utf8'
	})
  let result = fetch(api.base + url, {
		headers
  })

  return result
}

export function getByJsonp(url, cb='cb') {
	// alert(url)
	return new Promise((resolve, reject)=>{
		selfJsonp(url, (data)=>{
			resolve(data)
		}, cb)
	})
}