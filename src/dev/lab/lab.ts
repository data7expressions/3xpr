import { test } from './util'

(async () => {
	const file = './data/orders.json'
	// await test('.map(p=>p.customer.firstName)', file)
	// await test('.map(p=>[p.customer.firstName,p.customer.lastName])', file)
	// await test('.map(p=>{customer:concatenate(p.customer.firstName," ",p.customer.lastName),total:p.total})', file)
	// await test('.details.map(p=>{article:p.article,count: count(1),total:sum(p.qty * p.unitPrice)})', file)
	// await test('.details.map(p=>{article:p.article,result: round(max(p.qty * p.unitPrice) - avg(p.qty * p.unitPrice),2)})', file)
	await test('.details.distinct(p=>p.article)', file)
	await test('.details.distinct(p=>{article:p.article,qty:p.qty})', file)
	await test('{total:.[0].details.sum(p=>p.qty * p.unitPrice)}', file)
	await test('.map(p=>{customer:concatenate(p.customer.firstName," ",p.customer.lastName),total:p.details.sum(q=>q.qty * q.unitPrice)})', file)
})()
