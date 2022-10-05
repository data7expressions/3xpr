import { expressions as exp } from '../../lib'
(async () => {
	exp.addFunction((n1: number, n2: number): number => n1 % n2, 'xxx(n1:number,n2:number):number')
	console.log(exp.eval('xxx(7,2)'))
})()
