/* eslint-disable no-unexpected-multiline */
import { expressions as exp, Helper, Schema } from '../../../../lib'
import yaml from 'js-yaml'

(async () => {
	try {
		// use case https://docs.aws.amazon.com/apigateway/latest/developerguide/example-invoice.html
		const content = await Helper.readFile('./src/dev/lab/schema/aws/invoices.json')
		if (content === null) {
			throw new Error('invalid file invoices.json')
		}
		const invoices = Helper.tryParse(content)

		const yamlSchema = await Helper.readFile('./src/dev/lab/schema/aws/schema.yaml')
		if (!yamlSchema) {
			throw new Error('invalid file inputSchema.yaml')
		}
		const schema = yaml.load(yamlSchema) as Schema
		exp.addSchema(schema)
		// validate input
		const validateInputResult = exp.validate(invoices, schema, 'inputInvoices')
		if (validateInputResult.result === 'error') {
			await Helper.writeFile('./src/dev/lab/schema/aws/validate-input-errors.json', JSON.stringify(validateInputResult, null, 2))
			return
		}
		console.log(`validate input ${validateInputResult.result}`)

		// transform
		const transformExpression = await Helper.readFile('./src/dev/lab/schema/aws/transform.txt')
		if (!transformExpression) {
			throw new Error('invalid file transform.txt')
		}
		const transformResult = exp.eval(transformExpression, invoices)
		await Helper.writeFile('./src/dev/lab/schema/aws/transformed.json', JSON.stringify(transformResult, null, 2))

		// validate output
		// const validateOutputResult = exp.validate({ '.': transformResult }, schema, 'inputInvoices')
		// if (validateOutputResult.result === 'error') {
		// await Helper.writeFile('./src/dev/lab/schema/aws/validate-output-errors.json', JSON.stringify(validateOutputResult, null, 2))
		// return
		// }
		// console.log(`validate input ${validateOutputResult.result}`)
	} catch (error:any) {
		console.error(error)
	}
})()
