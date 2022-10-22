import { expressions as exp, helper } from '../../lib'
import crypto from 'crypto'

const hashCode = (str:string):number => {
	let hash = 0
	if (str.length === 0) return hash
	for (let i = 0; i < str.length; i++) {
		const chr = str.charCodeAt(i)
		hash = ((hash << 5) - hash) + chr
		hash |= 0 // Convert to 32bit integer
	}
	return hash
}

(async () => {
	exp.addFunction('xxx(n1:number,n2:number):number', (n1: number, n2: number): number => n1 + n2)
	console.log(exp.eval('xxx(7,2)'))

	const text = 'adsas34893849348394839483948b fdsfjdkfjdfjkdsdksldksldksld  fdfddskldksldksfdfdsldksdlsd'
	console.log(hashCode(text))
	console.log(hashCode(text))
	console.log(hashCode('adsas34893849348394839483948bfdsfjdkfjdfjkdsdksldksldksld  fdfddskldksldksfdfdsldksdlsd'))
	console.log(hashCode(text))

	console.log(crypto.createHash('sha256').update(text).digest('base64'))
	console.log(crypto.createHash('sha256').update(text).digest('base64'))
	console.log(crypto.createHash('sha256').update(text).digest('base64'))

	const content = await helper.fs.read('./src/dev/config/model.yaml')
	if (content) {
		console.log(hashCode(content))
		console.log(hashCode(content))
		console.log(crypto.createHash('sha256').update(content).digest('base64'))
	}
})()

// https://www.geeksforgeeks.org/node-js-hash-digest-method/
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
// https://www.freecodecamp.org/espanol/news/tabla-hash-en-javascript-hash-de-arreglo-asociativo-en-js/z
