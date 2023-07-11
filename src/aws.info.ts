import { DynamooseModuleOptions } from "nestjs-dynamoose"

const awsOptions: DynamooseModuleOptions = {
	aws: {
		accessKeyId: process.env.AWS_ACCESS_ID,
		secretAccessKey: process.env.AWS_ACCESS_KEY,
		region: process.env.AWS_REGION,
	}
}
export default awsOptions;