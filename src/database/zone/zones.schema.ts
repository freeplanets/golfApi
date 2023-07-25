import { Schema } from "dynamoose";

const ZonesSchema = new Schema({
  zoneid: {
    type: String,
    hashKey: true,
  },
  siteid: {
    type: String,
    index: {
			type: 'global',
      // global: true,
    }
  },
  name: {
    type: String,
  },
	modifyid: {
		type: String,
		required: false,
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
                schema: [
                  {
                    type: Object,
                    schema: {
                      name: {
                        type: String
                      },
                      type: {
                        type: String
                      },
                      show: {
                        type: Boolean
                      },
                      x: {
                        type: Number
                      },
                      y: {
                        type: Number
                      },
                      width: {
                        type: Number
                      },
                      height: {
                        type: Number
                      },
                      icon: {
                        type: String
                      },
                      color: {
                        type: String
                      },
                      bgColor: {
                        type: String
                      },
                      borderColor: {
                        type: String
                      },
                      font: {
                        type: String
                      },
                      image: {
                        type: String
                      },
                      label: {
                        type: String
                      },
                      circleRadius: {
                        type: Number
                      },
                      circleColor: {
                        type: String
                      },
                      circleDashline: {
                        type: Boolean
                      },
                      circleGap: {
                        type: Number
                      },
                      circleMax: {
                        type: Number
                      }
                    }
                  }
                ]
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
            schema: [
              {
                type: Object,
                schema: {
                  sno: {
                    type: String
                  },
                  topEdge: {
                    type: Number
                  },
                  leftEdge: {
                    type: Number
                  },
                  rightEdge: {
                    type: Number
                  },
                  bottomEdge: {
                    type: Number
                  },
                  assets: {
                    type: Array,
                    schema: [
                      {
                        type: Object,
                        schema: {
                          name: {
                            type: String
                          },
                          type: {
                            type: String
                          },
                          show: {
                            type: Boolean
                          },
                          x: {
                            type: Number
                          },
                          y: {
                            type: Number
                          },
                          width: {
                            type: Number
                          },
                          height: {
                            type: Number
                          },
                          icon: {
                            type: String
                          },
                          color: {
                            type: String
                          },
                          bgColor: {
                            type: String
                          },
                          borderColor: {
                            type: String
                          },
                          font: {
                            type: String
                          },
                          image: {
                            type: String
                          },
                          label: {
                            type: String
                          },
                          circleRadius: {
                            type: Number
                          },
                          circleColor: {
                            type: String
                          },
                          circleDashline: {
                            type: Boolean
                          },
                          circleGap: {
                            type: Number
                          },
                          circleMax: {
                            type: Number
                          }
                        }
                      }
                    ]
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
                  memo: {
                    type: String
                  }
                }
              }
            ]
          }
        }
      }
    ]
  }
}, { 
timestamps: true, 
saveUnknown: false })
export default ZonesSchema;