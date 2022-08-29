const { ZingMp3 } = require("zingmp3-api-full");
const { zing } = require("zingmp3-api-next");

class ZingController {
  //
  getHome(req, res) {
    zing.get_home().then((data) => {
      res.json(data);
    });
  }

  getSong(req, res) {
    zing.get_song(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getSongInfo(req, res) {
    zing.get_song_info(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getSongLyric(req, res) {
    zing.get_song_lyric(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getHomeChart(req, res) {
    zing.get_home_chart().then((data) => {
      res.json(data);
    });
  }

  getNewReleaseChart(req, res) {
    zing.get_new_release_chart().then((data) => {
      res.json(data);
    });
  }

  getWeekChart(req, res) {
    zing.get_week_chart(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getRadio(req, res) {
    zing.get_radio().then((data) => {
      res.json(data);
    });
  }

  getListByGenre(req, res) {
    zing.get_list_by_genre(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getListArtistSong(req, res) {
    ZingMp3.getListArtistSong(
      req.query.id,
      req.query.page,
      req.query.count
    ).then((data) => {
      res.json(data);
    });
  }

  getArtist(req, res) {
    zing.get_artist(req.query.name).then((data) => {
      res.json(data);
    });
  }

  getListMV(req, res) {
    zing
      .get_list_mv(req.query.id, req.query.page, req.query.count)
      .then((data) => {
        res.json(data);
      });
  }

  getCategoryMV(req, res) {
    zing.get_category_mv(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getMV(req, res) {
    zing.get_mv(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getHubHome(req, res) {
    zing.get_hub_home().then((data) => {
      res.json(data);
    });
  }

  getHubDetail(req, res) {
    zing.get_hub_detail(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getTop100(req, res) {
    zing.get_top_100().then((data) => {
      res.json(data);
    });
  }

  getPlaylist(req, res) {
    zing.get_playlist(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getSuggestedPlaylists(req, res) {
    zing.get_suggested_playlists(req.params.id).then((data) => {
      res.json(data);
    });
  }

  getEvents(req, res) {
    zing.get_events().then((data) => {
      res.json(data);
    });
  }

  getEventInfo(req, res) {
    zing.get_event_info(req.params.id).then((data) => {
      res.json(data);
    });
  }

  SearchAll(req, res) {
    zing.search_all(req.query.keyword).then((data) => {
      res.json(data);
    });
  }

  SearchByType(req, res) {
    zing.search_by_type(req.query.keyword, req.query.type).then((data) => {
      res.json(data);
    });
  }

  getRecommenedKeyword(req, res) {
    zing.get_recommend_keyword().then((data) => {
      res.json(data);
    });
  }

  getSuggestionKeyword(req, res) {
    zing.get_suggestion_keyword().then((data) => {
      res.json(data);
    });
  }
}

module.exports = new ZingController();
