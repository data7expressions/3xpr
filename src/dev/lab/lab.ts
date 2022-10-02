import { expressions as exp } from '../../lib'
(async () => {
	const parameters = exp.parameters('a + 1')
	console.log(JSON.stringify(parameters))
})()
