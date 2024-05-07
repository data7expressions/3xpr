/* eslint-disable no-template-curly-in-string */
import { expressions as exp } from '../../../lib'

describe('flows', () => {
	const context = JSON.parse('{"devices":[{"type":"phone","imei":"911784599437339","mac":"10:3d:1c:9b:7e:db"},{"type":"computer","mac":"11:3d:1c:9b:7e:db"},{"type":"robot","mac":"12:3d:1c:9b:7e:db"}]}')
	test('lab', () => {
		expect(exp.eval(` list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
					total = 0;
					for (i = 0; i < list.length(); i += 1) {
						total += list[i]
					}
					total;
					`, context)).toStrictEqual(45)
		expect(exp.eval(`
						device = devices[0];
						switch (device.type) {
							case "phone":
								key = device.imei;
							case "computer":
								key = device.mac;
							default:
								if (isNotNull(device.imei)) {
									key = device.imei;
								} else {
									key = device.mac;
								}
						}
						id= concat(device.type,"-",key);
					`, context)).toStrictEqual('phone-911784599437339')
		expect(exp.eval(` list = [1, 2, 3, 4, 5, 6];
					b = 1;
					for (a in list) {
						if (b < 10) {
						b = a * b;
						}
					}
					b;
					`, context)).toStrictEqual(24)
		expect(exp.eval(` rectangle = {"x":50,"y":50,"width":80,"height":60};
						sleepSecs = 1;
						source=nvl(source,"data/source.jpg");
					`, context)).toStrictEqual('data/source.jpg')
		expect(exp.eval(` rectangle = {
							"x":50,
							"y":50,
							"width":80,
							"height":60
						};
						sleepSecs = 1;
						source=nvl(source,"data/source.jpg");
					`, context)).toStrictEqual('data/source.jpg')
		expect(exp.eval(` devices.map(p => 
							concat(p.type,"-",
								if(p.type=="phone") {
									p.imei
								} else {
									p.mac
								}
							)
						)
					`, context)).toStrictEqual(['phone-911784599437339', 'computer-11:3d:1c:9b:7e:db', 'robot-12:3d:1c:9b:7e:db'])
		expect(exp.eval(` devices.map(p=>
							switch (p.type) {
								case "phone": 1;
								case "robot": 2 ;
								default: 3;
							}
						)
					`, context)).toStrictEqual([1, 3, 2])
		expect(exp.eval(` while (p=devices.pop()) {
						mac=p.mac;
					}
					mac;
					`, context)).toStrictEqual('10:3d:1c:9b:7e:db')
	})
})
