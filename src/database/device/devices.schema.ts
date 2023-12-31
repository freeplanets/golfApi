import { Schema } from "dynamoose";
import mapLatLongSchema from "../common/mapLatLong.schema";

const DevicesSchema = new Schema({
  deviceid: {
    type: String,
    hashKey: true
  },
  deviceName: {
    type: String
  },
  deviceType: {
    type: String
  },
  status: {
    type: String,
    index: {
			type: 'global',
      // global: true
    }
  },
  siteid: {
    type: String,
    index: [
      {
        name: 'siteidGlobalIndex',
        type: 'global',
      },
      /*
      {
        name: 'siteidcartidGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'cartid'
      },
      */
      {
        name: 'siteidstatusGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'status'
      }
    ]
  },
  cartid: {
    type: String,
  },
  location: {
    type: Object,
    schema: mapLatLongSchema,
    required: false,
  },
	modifyid: {
		type: String,
		required: false,
	}
}, { timestamps: true, saveUnknown: false });
export default DevicesSchema;