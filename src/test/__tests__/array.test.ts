import { expressions } from '../../lib'

describe('Array', () => {
	
	test('arrow', () => {	
		let data:any = {"a":[1,2,3],"b":0}
		expressions.eval('a.foreach(p=>b=b+p)',data)
		expect(6).toBe(data['b']) 
		data = {"a":[1,2,3,4,5],"b":0}
		expressions.eval('a.filter(p=> p<5).foreach(p => b=b+p)',data)
		expect(10).toBe(data['b'],) 
		data = {"a":[1,2,3,4,5],"b":0}
		expect(2).toBe(expressions.eval('a.first(p => p%2==0)',data)) 
		data = {"a":[1,2,3,4,5],"b":0}
		expect(4).toBe(expressions.eval('a.last(p=> p%2==0)',data)) 
		data = {"a":[1,2,3,4,5],"b":0}
		expect([4, 6, 8]).toEqual(expressions.eval('a.filter(p=> p>1 && p<5).map(p=> p*2)',data))
		data = {"a":[1,2,3,4,5],"b":0}
		expect([4,3,2]).toEqual(expressions.eval('a.filter(p=> p>1 && p<5).reverse()',data))
		data = {"a":[1,2,3,4,5],"b":0}
		expect([8,6,4]).toEqual(expressions.eval('a.filter(p=> p>1 && p<5).map(p=> p*2).reverse()',data))
	})
})	