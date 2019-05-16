const mongoose = require('mongoose');
const Technology = require('../../models/mongo-models/technology');

module.exports = {
  up: (req, res) => {
    // Array of doctors to be stored in MongoDB
    let technologies = [
        { name: '.Net' },
        { name: 'Java' },
        { name: 'Android' },
        { name: 'iOS' },
        { name: 'Node.JS' },
        { name: 'Python' },
        { name: 'PHP' },
        { name: 'Ruby' }
    ];

    for (var i = 0; i < technologies.length; i++) {
      let technology = new Technology({
        _id: new mongoose.Types.ObjectId(),
        name: technologies[i].name,
      });
      technology.save();
    };

    return res.status(200).json({ msg: 'demo-technologies seeder UP' });
  },

  down: (req, res) => {
    Technology.deleteMany().then();

    return res.status(200).json({ msg: 'demo-technologies seeder DOWN' });
  },
};
