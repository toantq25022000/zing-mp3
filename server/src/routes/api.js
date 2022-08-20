const express = require("express");
const router = express.Router();

const ZingController = require("../app/controllers/ZingController");
const ZingFullController = require("../app/controllers/ZingFullController");

// getFullInfo
router.get("/song", ZingFullController.getSong);

// getDetailPlaylist
router.get("/detail-playlist", ZingController.getDetailPlaylist);

// getHome
router.get("/home", ZingController.getHome);

// getTop100
router.get("/top100", ZingController.getTop100);

// getChartHome
router.get("/chart-home", ZingController.getChartHome);

// getNewReleaseChart
router.get("/new-release-chart", ZingController.getNewReleaseChart);

// getWeekChart
router.get("/get-week-chart", ZingController.getWeekChart);

// getArtist
router.get("/detail-artist", ZingController.getDetailArtist);

// getArtistSong
router.get("/artist-song", ZingFullController.getArtistSong);

// getLyric
router.get("/lyric", ZingFullController.getLyric);

// search
router.get("/search", ZingController.search);

// getListMV
router.get("/list-mv", ZingFullController.getListMV);

// getCategoryMV
router.get("/category-mv", ZingFullController.getCategoryMV);

// getVideo
router.get("/video", ZingFullController.getVideo);

module.exports = router;
