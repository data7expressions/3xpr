import { expressions as exp } from '../../lib'

describe('Enums', () => {
	test('create', () => {			
		exp.addEnum('ColorConversion', { BGR2GRAY: 6, BGR2HSV: 40, BGR2RGB: 4, GRAY2BGR: 8, HSV2BGR: 54, HSV2RGB: 55, RGB2GRAY: 7, RGB2HSV: 41 })
		exp.addEnum('Color', { RED: 1, GREEN: 2, BLUE: 3 })
		expect(8).toBe(exp.eval('ColorConversion.GRAY2BGR'))
    expect(2).toBe(exp.eval('Color.GREEN')) 
	})
})	