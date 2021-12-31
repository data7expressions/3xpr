/* eslint-disable space-before-function-paren */
const ConfigExtends = require('config-extends')
exports.apply = async function apply(callback:any) {
	await ConfigExtends.apply('src/dev/config/model.yaml', 'src/lib/parser/config.json')
	callback()
}
// apply(path.join(function () { console.log('end')})
