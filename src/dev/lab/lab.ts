import { test } from './util'

(async () => {
	const file = './data/orders.json'
	await test('.details.len()', file)
	await test('.details.slice(1,3)', file)
	await test('.details.page(2,3)', file)
	await test('.details.len()', file)
	await test('.details.slice(1,3)', file)
	await test('.details.page(2,3)', file)
})()
