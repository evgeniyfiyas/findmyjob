const mongoose = require('mongoose');

let profileSchema = mongoose.Schema({
  email: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  photo: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  phones: [{
    phone: {
      type: String
    },
    type: {
      type: String
    }
  }],
  skills: [{
    name: {
      type: String,
    },
    level: {
      $type: String
    }
  }],
  github: {
    type: String,
  },
  localtion: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
  },
  findJob: {
    type: Boolean,
  },
  jobs: [{
    name: {
      type: String
    },
    startDate: {
      type: Date
    },
    finishDate: {
      type: Date
    },
    position: {
      type: String
    }
  }]
});
profileSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});


let workSchema = mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  logo: {
    type: String,
  },
  skills: [{
    name: {
      type: String,
    },
    level: {
      $type: String
    }
  }],
  localtion: {
    address: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    },
  }, 
  withoutExperience: {
    type: Boolean,
  },
});

let Profiles = mongoose.model('personProfiles', profileSchema);
let Works = mongoose.model('works', workSchema);

module.exports = {
  Profiles,
  Works
}