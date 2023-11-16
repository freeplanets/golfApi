import { Schema } from "dynamoose";

const PlayerResult = new Schema({
    resultid: {
        type: String,
        hashKey: true,
    },
    siteid: {
        type: String,
        index: [
            {
                name: 'PRsiteidesttimatedstarttimeGlobalIndex',
                type: 'global',
                rangeKey: 'esttimatedStartTime',
            },
            {
                name: 'PRsiteidplayerNameGlobalIndex',
                type: 'global',
                rangeKey: 'playerName',
            },
            {
                name: 'PRsiteidmemberIDGlobalIndex',
                type: 'global',
                rangeKey: 'memberID',
            },
            {
                name: 'PRsiteidcourseNameGlobalIndex',
                type: 'global',
                rangeKey: 'courseName',
            },
            {
                name: 'PRsiteidgameidGlobalIndex',
                type: 'global',
                rangeKey: 'gameid',
            },
            {
                name: 'PRsiteidgameTitleGlobalIndex',
                type: 'global',
                rangeKey: 'gameTitle',
            },            
        ]
    },
    gameid: {
        type: String,
    },
    esttimatedStartTime: {
        type: Number,
    },
    gameTitle: {
        type: String,
    },
    memberID: {
        type: String,
    },
    courseName: {
        type: String,
    },
    playerName: {
        type: String,
    },
    hcp: {
        type: String
    },
    gross: {
        type: Number
    },
})
export default PlayerResult;