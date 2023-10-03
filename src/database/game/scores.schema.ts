import { Schema } from "dynamoose";

const ScoresSchema = new Schema({
	scoreid: {
		type: String,
		hashKey: true,
	},
	gameid: {
		type: String,
	},
	gameTitle: {
		type: String,
		index: [
      {
        name: 'gametitleGlobalIndex',
				type: 'global',
      },
      {
        name: 'gametitleesttimatedstarttimeGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'esttimatedStartTime',
      },
		]
	},
	courseid: {
		type: String,
	},
	courseName: {
		type: String,
	},
	playerName: {
		type: String,
		index: [
      {
        name: 'playernameesttimatedstarttimeGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'esttimatedStartTime',
      },
		]
	},
	memberId: {
		type: String,
	},
	checkInId: {
		type: String,
	},
	gross: {
		type: Number,
	},
	hcp: {
		type: Number,
	},
	scores: {
		type: Array,
		schema: [Number],
	},
	esttimatedStartTime: {
		type: Number
	}
});
export default ScoresSchema;