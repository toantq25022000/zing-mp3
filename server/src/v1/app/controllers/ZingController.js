const { ZingMp3 } = require("zingmp3-api-full");
const { zing } = require("zingmp3-api-next");
const dataConfig = require("../../data/settingClient.json");

class ZingController {
  //
  getHome(req, res) {
    zing.get_home().then((data) => {
      res.json(data);
    });
  }

  getSong(req, res) {
    zing.get_song(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getSongInfo(req, res) {
    zing.get_song_info(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getSongLyric(req, res) {
    zing.get_song_lyric(req.query.id).then((data) => {
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
    zing.get_artist(req.query.alias).then((data) => {
      res.json(data);
    });
  }

  getCardInfoArtist(req, res) {
    zing.get_artist(req.query.alias).then((response) => {
      const { data } = response;
      const cardInfo = {
        ...response,
        data: {
          album: data.sections.find(
            (section) => section.itemType === "release-date"
          )?.items,
          alias: data.alias,
          awards: data.awards,
          id: data.id,
          isOA: data.hasOA,
          isOABrand: data.isOABrand,
          link: data.link,
          name: data.name,
          playlistId: data.playlistId,
          sortBiography: data.sortBiography,
          spotlight: data.spotlight,
          thumbnail: data.thumbnail,
          thumbnailM: data.thumbnailM,
          totalFollow: data.totalFollow,
        },
      };
      res.json(cardInfo);
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
    zing.get_playlist(req.query.id).then((data) => {
      res.json(data);
    });
  }

  getSectionBottomPlaylist(req, res) {
    zing.get_playlist(req.query.id).then((response) => {
      const { data } = response;
      const artists = data.song.items
        .reduce(
          (prev, current) => {
            current?.album?.artists.forEach((item) => {
              if (!item.playlistId) {
                item = { ...item, playlistId: req.query.id };
              }
              prev.push(item);
            });
            return prev;
          },

          []
        )
        .reduce((prev, current) => {
          const findArist = prev?.find((art) => art?.id === current.id);
          if (!findArist) {
            prev = [...prev, current];
          }
          return prev;
        }, []);
      res.json({ ...response, data: artists });
    });
  }

  getSuggestedPlaylists(req, res) {
    zing.get_suggested_playlists(req.query.id).then((data) => {
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
    zing.get_suggestion_keyword(req.query.q).then((data) => {
      res.json(data);
    });
  }

  getConfig(req, res) {
    const data = dataConfig;
    res.json({
      err: 0,
      msg: "success",
      data,
    });
  }
}

module.exports = new ZingController();
