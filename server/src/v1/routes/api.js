const express = require("express");
const router = express.Router();

const ZingController = require("../app/controllers/ZingController");

// getHome
router.get("/home", ZingController.getHome);

// getSong
router.get("/song/:id", ZingController.getSong);

// getSongInfo
router.get("/song/info/:id", ZingController.getSongInfo);

// getLyricSong
router.get("/song/lyric/:id", ZingController.getSongLyric);

//getChartHome
router.get("/chart/home", ZingController.getHomeChart);

//getNewReleaseChart
router.get("/chart/new-release", ZingController.getNewReleaseChart);

//getWeekChart
router.get("/chart/week/:id", ZingController.getWeekChart);

// getDetailPlaylist
router.get("/playlist/:id", ZingController.getPlaylist);

// getTop100
router.get("/top100", ZingController.getTop100);

// getDetailArtist
router.get("/artist", ZingController.getArtist);

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
router.get("/suggested-playlist/:id", ZingController.getSuggestedPlaylists);

// getSuggestionKeyword
router.get("/suggestion-keyword", ZingController.getSuggestionKeyword);

// getEvents
router.get("/events", ZingController.getEvents);

// getEventInfo
router.get("/events/:id", ZingController.getEventInfo);

// getRecommenedKeywords
router.get("/recommended-keyword", ZingController.getRecommenedKeyword);

module.exports = router;
