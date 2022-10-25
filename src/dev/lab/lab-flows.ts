import { helper, expressions as exp } from '../../lib'
import { template } from '../test'

(async () => {
	const test = {
		name: 'flows',
		context: {
			devices: [
				{ type: 'phone', imei: '911784599437339', mac: '10:3d:1c:9b:7e:db' },
				{ type: 'computer', mac: '11:3d:1c:9b:7e:db' },
				{ type: 'robot', mac: '12:3d:1c:9b:7e:db' }
			]
		},
		cases: [{
			name: 'lab',
			func: (expression: any, context: any) => exp.eval(expression, context),
			tests: [
				` list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
				  total = 0;
				  for (i = 0; i < list.length(); i += 1) {
				    total += list[i]
				  }
				  total;
				`,
				`
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
				`,
				` list = [1, 2, 3, 4, 5, 6];
				  b = 1;
				  for (a in list) {
				    if (b < 10) {
				      b = a * b;
				    }
				  }
				  b;
				`,
				` rectangle = {"x":50,"y":50,"width":80,"height":60};
					sleepSecs = 1;
					source=nvl(source,"data/source.jpg");
				`,
				` rectangle = {
						"x":50,
						"y":50,
						"width":80,
						"height":60
					};
					sleepSecs = 1;
					source=nvl(source,"data/source.jpg");
				`,
				` devices.map(p => 
						concat(p.type,"-",
							if(p.type=="phone") {
								p.imei
							} else {
								p.mac
							}
						)
					)
				`,
				` devices.map(p=>
						switch (p.type) {
							case "phone": 1;
							case "robot": 2 ;
							default: 3;
						}
					)
				`,
				` while (p=devices.pop()) {
				    mac=p.mac;
				  }
				  mac;
				`
			]
		}]
	}
	const suite = helper.test.buildSuite(test)
	await helper.fs.write(`./src/dev/tests/${suite.name}.json`, JSON.stringify(suite, null, 2))
	const content = helper.test.build(suite, template)
	await helper.fs.write(`./src/test/__tests__/auto/${suite.name}.test.ts`, content)
})()
