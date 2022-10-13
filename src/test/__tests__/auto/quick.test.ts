/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'
describe('quick', () => {
	const context = JSON.parse('{"name":"Spain","region":"Europe","phoneCode":"34","timezones":[],"list":[1,2,3,4,5,6,7,8,9],"total":45,"i":9}')
	test('lab', () => {
		expect(exp.eval('5*(7+9)==(5*7+5*9)', context)).toStrictEqual(true)
		expect(exp.eval('toNumber(phoneCode) <= 30', context)).toStrictEqual(false)
		expect(exp.eval('`${name} belongs to ${region}`', context)).toStrictEqual('Spain belongs to Europe')
		expect(exp.eval('timezones.filter(p => substring(p.name,0,1)=="C")', context)).toStrictEqual([{'name':'Ceuta','offset':1,'pos':{'lat':35.89,'log':-5.32}},{'name':'Canary','offset':0,'pos':{'lat':28.12,'log':-15.43}}])
		expect(exp.eval('timezones.filter(p => p.offset == 1).sort(p => p.pos.lat).name', context)).toStrictEqual(['Ceuta','Madrid'])
		expect(exp.eval('stringify(timezones.first(p => p.name == "Madrid").pos)', context)).toStrictEqual('{"lat":40.4165,"log":-3.70256}')
		expect(exp.eval('timezones.filter(p => p.pos.lat > 30 && p.pos.log > -4).pos.lat', context)).toStrictEqual([40.4165])
		expect(exp.eval('sort(timezones.name)', context)).toStrictEqual(['Canary','Ceuta','Madrid'])
		expect(exp.eval('timezones[0].name', context)).toStrictEqual('Madrid')
		expect(exp.eval('round(timezones.first(p=> p.name =="Madrid").pos.lat - timezones.first(p=> p.name =="Ceuta").pos.lat,2)', context)).toStrictEqual(4.53)
		expect(exp.eval('timezones.each(p => p.pos={lat:round(p.pos.lat,2),log:round(p.pos.log,2)}).map(p=> stringify(p))', context)).toStrictEqual(['{\'name\':\'Madrid\',\'offset\':1,\'pos\':{\'lat\':40.42,\'log\':-3.7}}','{\'name\':\'Ceuta\',\'offset\':1,\'pos\':{\'lat\':35.89,\'log\':-5.32}}','{\'name\':\'Canary\',\'offset\':0,\'pos\':{\'lat\':28.12,\'log\':-15.43}}'])
	})
})
