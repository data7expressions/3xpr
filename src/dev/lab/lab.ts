import { expressions } from '../../lib'

(async () => {
	const data:any = {}
	expressions.eval(`for(i=0;i<=6;i=i+1){
		output=i*2;
	}`, data)
	console.log(data.output)
})()
