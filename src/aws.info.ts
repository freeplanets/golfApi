import { DynamooseModuleOptions } from "nestjs-dynamoose"

/*
const tableOptions:TableOptions = {
	create: true,
	prefix: `golf-${process.env.Stage}-`,
	suffix: '',
	throughput: 'ON_DEMAND',
	waitForActive: false,
	update: true,
	expires: null,
	tags: {},
	tableClass: TableClass.standard,
	initialize: true,
	populate: '',
}
*/

const awsOptions: DynamooseModuleOptions = {
	aws: {
		accessKeyId: process.env.AWS_ACCESS_ID,
		secretAccessKey: process.env.AWS_ACCESS_KEY,
		region: process.env.AWS_REGION,
	},
	table: {
		create: true,
		prefix: `golf-${process.env.STAGE}-`,
		suffix: '',
		// throughput: 'ON_DEMAND',
	}
}
export default awsOptions;