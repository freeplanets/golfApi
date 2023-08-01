import { Schema } from "dynamoose";

const CartHistorySchema = new Schema({
  carthistoryid: {
    type: String,
    hashKey: true
  },
  cartid: {
    type: String,
    index: [
      {
        name: 'cartidtsGlobalIndex',
				type: 'global',
        // global: true,
        rangeKey: 'ts'
      }
    ]
  },
  status: {
    type: String
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
}, { timestamps: true, saveUnknown: false });
export default CartHistorySchema;