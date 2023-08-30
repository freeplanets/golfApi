import { Schema } from "dynamoose";

const DeviceHistorySchema = new Schema({
  historyid: {
    type: String,
    hashKey: true
  },
  deviceid: {
    type: String,
    index: [
      {
        name: 'deviceidtsGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'ts'
      }
    ]
  },
  location: {
    type: Object,
    schema: {
      longitude: {
        type: Number
      },
      latitude: {
        type: Number
      }
    }
  },
  ts: {
    type: Number
  }
}, { timestamps: true, saveUnknown: false, validate: (obj) => (new Date().getTime() - obj.ts) > 604800000 });
export default DeviceHistorySchema;