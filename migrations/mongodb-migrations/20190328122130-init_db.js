const createCollection = (db) => {
  db.createCollection("personprofiles", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["PersonID", "PersonName", "Gender", "DOB"],
        properties: {
          PersonID: {
            bsonType: "number",
            description: "must be an integer and is required"
          },
          PersonName: {
            bsonType: "string",
            description: "must be an string and is required"
          },
          Gender: {
            enum: ["Male", "Female"],
            description: "can only be one of the enum values"
          },
          DOB: {
            bsonType: "date",
            description: "must be an date and is required"
          },
          Addresses: {
            bsonType: "array",
            description: "must be an array and is required",
            required: ["AddressID", "AddressType", "AddressLine1", "AddressLine2", "Area", "Locality", "City", "State", "Country", "PostalCode"],
            properties: {
              AddressID: {
                bsonType: "number",
                description: "must be an integer and is required"
              },
              AddressType: {
                enum: ["Permanent", "Temporary", "Correspondence", "Office"],
                description: "can only be one of the enum values"
              },
              AddressLine1: {
                bsonType: "string",
                description: "must be an string and is  required"
              },
              AddressLine2: {
                bsonType: "string",
                description: "must be an string and is required"
              },
              Area: {
                bsonType: "string",
                description: "must be an string and is  required"
              },
              Locality: {
                bsonType: "string",
                description: "must be an string and is  required"
              },
              City: {
                bsonType: "string",
                description: "must be an string and isrequired"
              },
              State: {
                bsonType: "string",
                description: "must be an string and is required"
              },
              Country: {
                bsonType: "string",
                description: "must be an string and is required"
              },
              PostalCode: {
                bsonType: "string",
                description: "must be an string and is required"
              }
            }
          },
          ContactNumbers: {
            bsonType: "array",
            description: "must be an array and is required",
            required: ["ContactID", "ContactType"],
            properties: {
              ContactID: {
                bsonType: "number",
                description: "must be an integer and is required"
              },
              ContactType: {
                enum: ["Home", "Mobile", "Office", "CareOf", "Emergency"],
                description: "can only be one of the enum values and is required"
              },
              ContactNumber: {
                bsonType: "object",
                description: "must be an string and is required",
                required: ["CountryCode", "RegionCode", "PhoneNumber"],
                properties: {
                  CountryCode: {
                    bsonType: "string",
                    pattern: "^[+0-9]{2,4}$",
                    description: "must be an string and is required"
                  },
                  RegionCode: {
                    bsonType: "string",
                    pattern: "^[0-9]{3}$",
                    description: "must be an string and is required"
                  },
                  PhoneNumber:
                  {
                    bsonType: "string",
                    pattern: "^[0-9]{10}$",
                    description: "must be an string and is required"
                  }
                }
              }
            }
          },
          Emails: {
            bsonType: "array",
            description: "must be an array and is required",
            required: ["EmailID", "EmailType"],
            properties: {
              EmailID: {
                bsonType: "number",
                description: "must be an integer and is required"
              },
              EmailType: {
                bsonType: "string",
                pattern: "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$",
                description: "must be a string and match regular expression pattern"
              }
            }
          },
          Skills: {
            bsonType: "array",
            description: "must be an array and is required",
            required: ["SkillId", "SkillName", "SkillLevel"],
            properties: {
              SkillId: {
                bsonType: "number",
                description: "must be an integer and is required"
              },
              SkillName: {
                bsonType: "string",
                description: "must be a string and is required"
              },
              SkillLevel: {
                enum: ["High", "Medium", "Low"],
                description: "can only be one of the enum values"
              }
            }
          },
          Educations: {
            bsonType: "array",
            description: "must be an array and is required",
            required: ["EducationId", "Name", "StartDate", "FinishDate", "ProfessionName"],
            properties: {
              EducationId: {
                bsonType: "number",
                description: "must be an integer and is required"
              },
              Name: {
                bsonType: "string",
                description: "must be an string and is required"
              },
              StartDate: {
                bsonType: "date",
                description: "must be date and is required"
              },
              FinishDate: {
                bsonType: "date",
                description: "must be date and is required"
              },
              ProfessionName: {
                bsonType: "string",
                description: "must be a string and is required"
              }
            }
          },
          SocialNetworks: {
            bsonType: "array",
            description: "must be an array and is required",
            required: ["SocialId", "Name", "Login"],
            properties: {
              SocialId: {
                bsonType: "number",
                description: "must be an integer and is required"
              },
              Name: {
                bsonType: "string",
                description: "must be an string and is required"
              },
              Login: {
                bsonType: "string",
                description: "must be a string and is required"
              }
            }
          }
        }
      }
    }
  })
}

module.exports = {
  up(db) {
    try {
      const col = db.listCollections({ name: 'userProfiles' }).toArray();
      if (col.length > 0) {
        throw new Error('Collection userProfiles already exists in MongoDb. Exited...');
      }
      else {
        createCollection(db);
      }
    }
    catch (err) {
      throw err;
    }
  },
  down(db) {
    try {
      db.dropCollection('userProfiles');
    }
    catch (err) {
      throw err;
    }
  }
}