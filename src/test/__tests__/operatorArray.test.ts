import { expressions } from '../../lib'

describe('Operator Array', () => {
	test('labs', () => {	
		const context = { musicians: ['Charly Garcia', 'Fito Paez', 'Luiz Alberto Spinetta'] }

		expect('Charly Garcia').toBe(expressions.eval('musicians[0]',context))
		expect(undefined).toBe(expressions.eval('musicians[3]',context))
		
	})
})	