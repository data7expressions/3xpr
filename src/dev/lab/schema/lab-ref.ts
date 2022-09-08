/* eslint-disable no-unexpected-multiline */
import { expressions as exp, Helper } from '../../../lib'

(async () => {
	try {
		// const dataUri = 'https://raw.githubusercontent.com/FlavioLionelRita/test-data/main/json-schema/arrays.json'
		// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
		// const content = await Helper.get(dataUri)
		// const data = Helper.tryParse(content)

		const data = {
			fruits: ['apple', 'orange', 'pear'],
			vegetables: [
				{
					veggieName: 'potato',
					veggieLike: true
				},
				{
					veggieName: 'broccoli',
					veggieLike: false
				}
			]
		}
		const schemaUri = 'https://raw.githubusercontent.com/FlavioLionelRita/test-data/main/json-schema/arrays.schema.json'
		const validateInputResult = await exp.validate(schemaUri, data)
		if (validateInputResult.result === 'error') {
			await Helper.writeFile('./src/dev/lab/schema/aws/validate-input-errors.json', JSON.stringify(validateInputResult, null, 2))
			return
		}
		console.log(`validate input ${validateInputResult.result}`)
	} catch (error:any) {
		console.error(error)
	}
})()
