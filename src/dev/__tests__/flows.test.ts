import { expressions } from '../../lib'

describe('Block', () => {
	test('multiline', () => {
		const lines = `a=4; 
		b=a+2; 
	  output=a*b;`
		let data: any = {}
		expressions.eval(lines, data)
		expect(24).toBe(data.output)
		data = {}
		expressions.eval(`rectangle = {"x":50,"y":50,"width":80,"height":60}; 
		sleepSecs = 1;
		source=nvl(source,"data/source.jpg");`, data)
		expect(50).toBe(data.rectangle.x)
	})
})
