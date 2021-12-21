import { expressions } from '../../lib'

(async () => {
	const result = expressions.eval('"a"<"b"')
	console.log(result)
})()
