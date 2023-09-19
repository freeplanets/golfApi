import { Schema } from "dynamoose";

const SideGamesSchema = new Schema(
	{
		sidegameid: {
			type: String,
			hashKey: true,
		},
		gameid: {
			type: String,
			index: true,
		},
		sideGameName: {
			type: String
		},
		format: {
			type: String
		},
		wager: {
			type: Number
		},
		wagerMax: {
			type: Number,
			required: false,
		},
		carryOver: {
			type: Boolean,
			required: false,
		},
		hcpType: {
			type: String
		},
		playerGameData: {
			type: Array,
			schema: [
				{
					type: Object,
					schema: {
						selected: {
							type: Boolean
						},
						playerName: {
							type: String
						},
						hcp: {
							type: String
						},
						betterballGroup: {
							type: String
						},
						points: {
							type: Number,
						},
						playOrder: {
							type: Number,
						},
						holes: {
							type: Array,
							schema: [
								{
									type: Object,
									schema: {
										holeNo: {
											type: Number
										},
										zoneid: {
											type: String
										},
										fairwayno: {
											type: Number
										},
										gross: {
											type: Number
										},
										extraInfo: {
											type: Object
										}
									}
								}
							]
						},
						extraInfo: {
							type: Object,
						}
					}
				}
			]
		},
		extraInfo: {
			type: Object,
		}
	}, {saveUnknown: true}
);
export default SideGamesSchema;