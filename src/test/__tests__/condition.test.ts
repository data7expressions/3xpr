import { expressions } from '../../lib'

describe('Condition', () => {
	test('labs', () => {	
		const context = { devices: ['phone', 'computer', 'robot'], pi: 3.141516 }

		expect(true).toBe(expressions.eval('includes("phone",devices)',context))
		expect(false).toBe(expressions.eval('includes("other",devices)',context))
		expect(false).toBe(expressions.eval('in("other",devices)',context))
		expect(true).toBe(expressions.eval('between(12,10,20)',context))
		expect(false).toBe(expressions.eval('between(2,10,20)',context))
		expect(true).toBe(expressions.eval('between(pi,1,5)',context))
		
	})
})	