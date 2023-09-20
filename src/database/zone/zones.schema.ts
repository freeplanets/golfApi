import { Schema } from "dynamoose";
import mapAssetObjectSchema from "./common/mapAssetObject.schema";
import greenObjectSchema from "./fairway/greenObject.schema";

const ZonesSchema = new Schema({
  zoneid: {
    type: String,
    hashKey: true,
  },
  siteid: {
    type: String,
    index: {
      // name : 'siteidrefnoGlobalIndex',
			type: 'global',
      // rangeKey: 'refNo',
      // global: true,
    }
  },
  name: {
    type: String,
  },
  holes: {
    type: Number,
  },
  par: {
    type: Number,
  },
  tees: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          teeName: {
            type: String
          },
          teeColor: {
            type: String
          },
          distance: {
            type: Number
          }
        }
      }
    ]
  },
  fairways: {
    type: Array,
    schema: [
      {
        type: Object,
        schema: {
          fairwayno: {
            type: Number
          },
          tees: {
            type: Array,
            schema: [
              {
                type: Object,
                schema: {
                  teeName: {
                    type: String
                  },
                  teeColor: {
                    type: String
                  },
                  distance: {
                    type: Number
                  }
                }
              }
            ]
          },
          par: {
            type: Number
          },
          handicap: {
            type: Number
          },
          fairwayMap: {
            type: Object,
            schema: {
              image: {
                type: String
              },
              memo: {
                type: String
              },
              topLeft: {
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
              topRight: {
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
              bottomLeft: {
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
              bottomRight: {
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
              assets: {
                type: Array,
                schema: [mapAssetObjectSchema],
              },
              width: {
                type: Number
              },
              height: {
                type: Number
              },
              widthDistance: {
                type: Number
              },
              heading: {
                type: Number
              }
            }
          },
          greens: {
            type: Array,
            schema: [greenObjectSchema],
          }
        }
      }
    ]
  },
  refNo: {
    type: Number,
  },
  modifyid: {
		type: String,
		required: false,
	},
}, { 
timestamps: true, 
saveUnknown: false })
export default ZonesSchema;