const ZingMp3 = require("zingmp3-api");

class ZingController {
  getHome(req, res) {
    ZingMp3.getHome(1)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => console.log(error));
  }

  getFullInfo(req, res) {
    ZingMp3.getFullInfo(req.query.id)
      .then((data) => res.json(data))
      .catch((error) => console.log(error));
  }

  getDetailPlaylist(req, res) {
    ZingMp3.getDetailPlaylist(req.query.id).then((data) => {
      res.json(data);
    });
  }

  search(req, res) {
    ZingMp3.search(req.query.keyword).then((data) => {
      res.json(data);
    });
  }

  getChartHome(req, res) {
    ZingMp3.getChartHome().then((data) => {
      res.json(data);
    });
  }

  getNewReleaseChart(req, res) {
    ZingMp3.getNewReleaseChart().then((data) => {
      res.json(data);
    });
  }

  getTop100(req, res) {
    ZingMp3.getTop100().then((data) => {
      res.json(data);
    });
  }

  getWeekChart(req, res) {
    ZingMp3.getWeekChart(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getDetailArtist(req, res) {
    ZingMp3.getDetailArtist(req.query.name).then((data) => {
      res.json(data);
    });
  }
}

module.exports = new ZingController();
