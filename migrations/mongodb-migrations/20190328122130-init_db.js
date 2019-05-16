const createCollections = (db) => {
  db.createCollection("personProfiles", {
    validator: {
      $or: [{
          email: {
            $type: "string",
          }
        }, {
          firstName: {
            $type: "string",
          }
        }, {
          lastName: {
            $type: "string",
          }
        }, {
          photo: {
            $type: "string",
          }
        },
        {
          birthday: {
            $type: "date",
          }
        }, {
          phones: [{
            phone: {
              $type: "string"
            },
            type: {
              $type: "string"
            }
          }]
        }, {
          skills: [{
            name: {
              $type: "string",
            },
            level: {
              $type: "string"
            }
          }]
        }, {
          github: {
            $type: "string",
          }
        }, {
          localtion: {
            address: {
              $type: "string"
            },
            city: {
              $type: "string"
            },
            country: {
              $type: "string"
            },
          }
        }, {
          findJob: {
            $type: "bool",
          }
        }, {
          jobs: [{
            name: {
              $type: "string"
            },
            startDate: {
              $type: "date"
            },
            finishDate: {
              $type: "date"
            },
            position: {
              $type: "string"
            }
          }]
        }
      ],
    },
    validationAction: "warn",
    validationLevel: "moderate",
  })
  db.createCollection("works", {
    validator: {
      $or: [{
        title: {
          $type: "string",
        }
      }, {
        description: {
          $type: "string",
        }
      }, {
        logo: {
          $type: "string",
        }
      }, {
        skills: [{
          name: {
            $type: "string",
          },
          level: {
            $type: "string"
          }
        }]
      }, {
        localtion: {
          address: {
            $type: "string"
          },
          city: {
            $type: "string"
          },
          country: {
            $type: "string"
          },
        }
      }, {
        withoutExperience: {
          $type: "bool",
        }
      }, ],
    },
    validationAction: "warn",
    validationLevel: "moderate",
  })
}

module.exports = {
  up(db) {
    try {
      const col = db.listCollections({
        name: 'personProfiles',
      }).toArray();
      if (col.length > 0) {
        throw new Error('Collection personProfiles, works already exists in MongoDb. Exited...');
      } else {
        createCollections(db);
      }
    } catch (err) {
      throw err;
    }
  },
  down(db) {
    try {
      db.dropCollection('personProfiles');
      db.dropCollection('works');
    } catch (err) {
      throw err;
    }
  }
}