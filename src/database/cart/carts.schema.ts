import { Schema } from "dynamoose";

const CartsSchema = new Schema({
  cartid: {
    type: String,
    hashKey: true
  },
  cartName: {
    type: String
  },
  siteid: {
    type: String,
    index: [
      {
        name: 'siteiddeviceidGlobalIndex',
				type: 'global',
        rangeKey: 'deviceid'
      },
      {
        name: 'siteidcartidGlobalIndex',
				type: 'global',
        rangeKey: 'cartid'
      },
      {
        name: 'siteidstatusGlobalIndex',
				type: 'global',
        rangeKey: 'status'
      }
    ]
  },
  zoneid: {
    type: String,
    index: [
      {
        name: 'zoneidfairwaynoGlobalIndex',
        type: 'global',
        // global: true,
        rangeKey: 'fairwayno'
      }
    ]
  },
  fairwayno: {
    type: Number,
    index: {
      type: 'global',
    }
  },
  status: {
    type: String,
    index: {
			type: 'global',
      // global: true
    }
  },
  location: {
    type: Object,
    schema: {
      longitude: {
        type: Number,
      },
      latitude: {
        type: Number,
      }
    }
  },
  distance: {
    type: Number,
  },
  loctm: {
    type: Number,
  },
  deviceid: {
    type: String,
    index: {
			type: 'global',
      // global: true
    }
  },
  deviceName: {
    type: String
  },
  deviceType: {
    type: String
  },
	modifyid: {
		type: String,
		required: false,
	}
}, { timestamps: true, saveUnknown: false });
export default CartsSchema;