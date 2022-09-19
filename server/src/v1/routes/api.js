const express = require("express");
const router = express.Router();

const ZingController = require("../app/controllers/ZingController");

// getHome
router.get("/home", ZingController.getHome);

// getSong
router.get("/song/streaming", ZingController.getSong);

// getSongInfo
router.get("/song/info", ZingController.getSongInfo);

// getLyricSong
router.get("/song/lyric", ZingController.getSongLyric);

//getChartHome
router.get("/chart/home", ZingController.getHomeChart);

//getNewReleaseChart
router.get("/chart/new-release", ZingController.getNewReleaseChart);

//getWeekChart
router.get("/chart/week/:id", ZingController.getWeekChart);

// getDetailPlaylist
router.get("/playlist", ZingController.getPlaylist);

//getSectiononBottomPlaylist
router.get("/section-bottom", ZingController.getSectionBottomPlaylist);

// getTop100
router.get("/top100", ZingController.getTop100);

// getDetailArtist
router.get("/artist", ZingController.getArtist);

// getCardInfoArtist
router.get("/card-info", ZingController.getCardInfoArtist);

// getListArtistSong
router.get("/artist/song/:id", ZingController.getListArtistSong);

// Search all
router.get("/search", ZingController.SearchAll);

// Search by type
router.get("/search-by-type", ZingController.SearchByType);

// getMV
router.get("/mv/:id", ZingController.getMV);
// getListMV
router.get("/mv/list", ZingController.getListMV);

// getCategoryMV
router.get("/mv/category", ZingController.getCategoryMV);

// getRadio
router.get("/radio", ZingController.getRadio);

// getListByGenre
router.get("/list-by-genre/:id", ZingController.getListByGenre);

// getHubHome
router.get("/hub", ZingController.getHubHome);

// getHubDetail
router.get("/hub/:id", ZingController.getHubDetail);

// getSuggestedPlaylists
router.get("/suggested-playlist", ZingController.getSuggestedPlaylists);

// getSuggestionKeyword
router.get("/ac-suggestions", ZingController.getSuggestionKeyword);

// getEvents
router.get("/events", ZingController.getEvents);

// getEventInfo
router.get("/events/:id", ZingController.getEventInfo);

// getRecommenedKeywords
router.get("/recommended-keyword", ZingController.getRecommenedKeyword);

//getConfig
router.get("/config", ZingController.getConfig);

module.exports = router;
