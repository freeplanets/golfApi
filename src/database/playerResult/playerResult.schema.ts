import { Schema } from "dynamoose";
import PlayScore from "./playScore.schema";

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
            {
                name: 'PRsiteidplayedHolesGlobalIndex',
                type: 'global',
                rangeKey: 'playedHoles'
            }            
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
        type: String,
    },
    gross: {
        type: Number,
    },
    playedHoles: {
        type: Number,
    },
    playerScoreKS: {
        type: Object,
        schema: PlayScore,
    }
})
export default PlayerResult;