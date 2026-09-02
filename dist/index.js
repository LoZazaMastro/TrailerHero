const manifest = {"name":"TrailerHero"};
const API_VERSION = 2;
const internalAPIConnection = window.__DECKY_SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED_deckyLoaderAPIInit;
if (!internalAPIConnection) {
    throw new Error('[@decky/api]: Failed to connect to the loader as as the loader API was not initialized. This is likely a bug in Decky Loader.');
}
let api;
try {
    api = internalAPIConnection.connect(API_VERSION, manifest.name);
}
catch {
    api = internalAPIConnection.connect(1, manifest.name);
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version 1. Some features may not work.`);
}
if (api._version != API_VERSION) {
    console.warn(`[@decky/api] Requested API version ${API_VERSION} but the running loader only supports version ${api._version}. Some features may not work.`);
}
const callable = api.callable;
const routerHook = api.routerHook;
const openFilePicker = api.openFilePicker;
const toaster = api.toaster;
const definePlugin = (fn) => {
    return (...args) => {
        return fn(...args);
    };
};

var DefaultContext = {
  color: undefined,
  size: undefined,
  className: undefined,
  style: undefined,
  attr: undefined
};
var IconContext = SP_REACT.createContext && /*#__PURE__*/SP_REACT.createContext(DefaultContext);

var _excluded = ["attr", "size", "title"];
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function Tree2Element(tree) {
  return tree && tree.map((node, i) => /*#__PURE__*/SP_REACT.createElement(node.tag, _objectSpread({
    key: i
  }, node.attr), Tree2Element(node.child)));
}
function GenIcon(data) {
  return props => /*#__PURE__*/SP_REACT.createElement(IconBase, _extends({
    attr: _objectSpread({}, data.attr)
  }, props), Tree2Element(data.child));
}
function IconBase(props) {
  var elem = conf => {
    var {
        attr,
        size,
        title
      } = props,
      svgProps = _objectWithoutProperties(props, _excluded);
    var computedSize = size || conf.size || "1em";
    var className;
    if (conf.className) className = conf.className;
    if (props.className) className = (className ? className + " " : "") + props.className;
    return /*#__PURE__*/SP_REACT.createElement("svg", _extends({
      stroke: "currentColor",
      fill: "currentColor",
      strokeWidth: "0"
    }, conf.attr, attr, svgProps, {
      className: className,
      style: _objectSpread(_objectSpread({
        color: props.color || conf.color
      }, conf.style), props.style),
      height: computedSize,
      width: computedSize,
      xmlns: "http://www.w3.org/2000/svg"
    }), title && /*#__PURE__*/SP_REACT.createElement("title", null, title), props.children);
  };
  return IconContext !== undefined ? /*#__PURE__*/SP_REACT.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
}

// THIS FILE IS AUTO GENERATED
function FaArrowLeft (props) {
  return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"},"child":[]}]})(props);
}
function FaFilm (props) {
  return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"},"child":[]}]})(props);
}
function FaDownload (props) { return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24z"},"child":[]}]})(props); }
function FaFolder (props) { return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M464 128H272l-64-64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V176c0-26.51-21.49-48-48-48z"},"child":[]}]})(props); }
function FaPlay (props) { return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"},"child":[]}]})(props); }
function FaPause (props) { return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 448 512"},"child":[{"tag":"path","attr":{"d":"M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"},"child":[]}]})(props); }
function FaCheck (props) { return GenIcon({"tag":"svg","attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"},"child":[]}]})(props); }

const SETTINGS_KEY = "trailerhero.settings.v1";
const DEFAULT_SETTINGS = {
    settingsVersion: 13,
    enabled: true,
    delaySeconds: 3,
    opacity: 1,
    qualityHeight: 2160,
    blockedApps: [],
    logoAssistEnabled: true,
    stopOnLaunchEnabled: true,
    crtLowResEnabled: true,
    youtubeEnabled: true,
    youtubeAutoSearch: true,
    youtubePlaybackMode: "direct",
    defaultAudio: "theme",
    preferredSources: {},
    steamAppOverrides: {},
    steamMovieOverrides: {},
    trimStartOverrides: {},
    trimEndOverrides: {},
    crtOverrides: {},
    youtubeVideos: {},
    youtubeQueries: {}
};
const DEFAULT_TRIM_START_SECONDS = 4;
const DEFAULT_TRIM_END_SECONDS = 5;
const OPACITY_OPTIONS = [0.65, 0.8, 0.92, 1];
const QUALITY_OPTIONS = [720, 1080, 1440, 2160];
const SOURCE_OPTIONS = ["auto", "steam", "youtube", "local"];
const CRT_OPTIONS = ["auto", "on", "off"];
const BACKEND_TIMEOUT_MS = 18000;
const RUNTIME_MISSING_SCRIPT = "window.__trailerHeroRuntime?.snapshot?.() ?? { status: 'TrailerHero runtime missing', runtimeMissing: true }";
const FORCE_SCAN_SCRIPT = "window.__trailerHeroRuntime?.forceScan?.() ?? { status: 'TrailerHero runtime missing', runtimeMissing: true }";
const evalInBigPicture = callable("eval_in_big_picture");
const resolveSteamAppId = callable("resolve_steam_app_id");
const searchYouTubeTrailer = callable("search_youtube_trailer");
const searchYouTubeVideos = callable("search_youtube_videos");
const resolveYouTubeStreams = callable("resolve_youtube_streams");
const getSteamTrailer = callable("get_steam_trailer");
const getLocalTrailer = callable("get_local_trailer");
const getSteamTrailerPreview = callable("get_steam_trailer_preview");
const getSteamTrailerPreviewStatus = callable("get_steam_trailer_preview_status");
const getYouTubeTrailerPreview = callable("get_youtube_trailer_preview");
const importLocalTrailer = callable("import_local_trailer");
const startTrailerDownload = callable("start_trailer_download");
const startBulkDownload = callable("start_bulk_download");
const getTrailerJob = callable("get_trailer_job");
const cancelTrailerJob = callable("cancel_trailer_job");
const deleteLocalTrailer = callable("delete_local_trailer");
const deleteAllLocalTrailers = callable("delete_all_local_trailers");
const cleanupUnassignedTrailers = callable("cleanup_unassigned_trailers");
function parseSettings() {
    try {
        const raw = localStorage.getItem(SETTINGS_KEY);
        if (!raw) {
            return DEFAULT_SETTINGS;
        }
        const parsed = JSON.parse(raw);
        const parsedVersion = typeof parsed.settingsVersion === "number" ? parsed.settingsVersion : 1;
        return {
            settingsVersion: DEFAULT_SETTINGS.settingsVersion,
            enabled: typeof parsed.enabled === "boolean" ? parsed.enabled : DEFAULT_SETTINGS.enabled,
            delaySeconds: DEFAULT_SETTINGS.delaySeconds,
            opacity: 1,
            qualityHeight: parsedVersion >= 4 && QUALITY_OPTIONS.includes(parsed.qualityHeight ?? 0)
                ? parsed.qualityHeight ?? DEFAULT_SETTINGS.qualityHeight
                : DEFAULT_SETTINGS.qualityHeight,
            blockedApps: Array.isArray(parsed.blockedApps)
                ? parsed.blockedApps.filter((appid) => Number.isInteger(appid))
                : [],
            logoAssistEnabled: typeof parsed.logoAssistEnabled === "boolean"
                ? parsed.logoAssistEnabled
                : DEFAULT_SETTINGS.logoAssistEnabled,
            stopOnLaunchEnabled: typeof parsed.stopOnLaunchEnabled === "boolean"
                ? parsed.stopOnLaunchEnabled
                : DEFAULT_SETTINGS.stopOnLaunchEnabled,
            crtLowResEnabled: parsedVersion >= 2 && typeof parsed.crtLowResEnabled === "boolean"
                ? parsed.crtLowResEnabled
                : DEFAULT_SETTINGS.crtLowResEnabled,
            youtubeEnabled: typeof parsed.youtubeEnabled === "boolean"
                ? parsed.youtubeEnabled
                : DEFAULT_SETTINGS.youtubeEnabled,
            youtubeAutoSearch: typeof parsed.youtubeAutoSearch === "boolean"
                ? parsed.youtubeAutoSearch
                : DEFAULT_SETTINGS.youtubeAutoSearch,
            youtubePlaybackMode: DEFAULT_SETTINGS.youtubePlaybackMode,
            defaultAudio: parsed.defaultAudio === "trailer" ? "trailer" : "theme",
            preferredSources: parsed.preferredSources && typeof parsed.preferredSources === "object"
                ? Object.fromEntries(Object.entries(parsed.preferredSources)
                    .filter(([appid, source]) => (/^\d+$/.test(appid) &&
                    (source === "auto" || source === "steam" || source === "youtube" || source === "local"))))
                : {},
            steamAppOverrides: parsed.steamAppOverrides && typeof parsed.steamAppOverrides === "object"
                ? Object.fromEntries(Object.entries(parsed.steamAppOverrides)
                    .filter(([appid, steamAppId]) => /^\d+$/.test(appid) && Number.isInteger(steamAppId)))
                : {},
            steamMovieOverrides: parsed.steamMovieOverrides && typeof parsed.steamMovieOverrides === "object"
                ? Object.fromEntries(Object.entries(parsed.steamMovieOverrides)
                    .filter(([appid, movieId]) => /^\d+$/.test(appid) && typeof movieId === "string"))
                : {},
            trimStartOverrides: parsed.trimStartOverrides && typeof parsed.trimStartOverrides === "object"
                ? Object.fromEntries(Object.entries(parsed.trimStartOverrides)
                    .filter(([appid, seconds]) => /^\d+$/.test(appid) && typeof seconds === "number" && seconds >= 0 && seconds <= 60))
                : {},
            trimEndOverrides: parsed.trimEndOverrides && typeof parsed.trimEndOverrides === "object"
                ? Object.fromEntries(Object.entries(parsed.trimEndOverrides)
                    .filter(([appid, seconds]) => /^\d+$/.test(appid) && typeof seconds === "number" && seconds >= 0 && seconds <= 60))
                : {},
            crtOverrides: parsed.crtOverrides && typeof parsed.crtOverrides === "object"
                ? Object.fromEntries(Object.entries(parsed.crtOverrides)
                    .filter(([appid, preference]) => (/^\d+$/.test(appid) &&
                    (preference === "auto" || preference === "on" || preference === "off"))))
                : {},
            youtubeVideos: parsed.youtubeVideos && typeof parsed.youtubeVideos === "object"
                ? Object.fromEntries(Object.entries(parsed.youtubeVideos)
                    .filter(([appid, videoId]) => /^\d+$/.test(appid) && typeof videoId === "string"))
                : {},
            youtubeQueries: parsed.youtubeQueries && typeof parsed.youtubeQueries === "object"
                ? Object.fromEntries(Object.entries(parsed.youtubeQueries)
                    .filter(([appid, query]) => /^\d+$/.test(appid) && typeof query === "string"))
                : {}
        };
    }
    catch {
        return DEFAULT_SETTINGS;
    }
}
function saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}
const TRANSLATIONS = {
    en: {
        active: "Enabled",
        activeSteamVideoPrefix: "Active: ",
        addYouTubeLink: "add a YouTube link",
        auto: "Auto",
        autoplayBlocked: "Autoplay blocked by Steam",
        cannotReachBigPicture: "I cannot reach the Big Picture tab",
        clearYouTubeLink: "Clear YouTube link",
        connectedToTab: "Connected to {tab}",
        connectingSteamDebugger: "Connecting through the Steam debugger...",
        connectingToTab: "Connecting to {tab}...",
        crtAutomatic: "Automatic CRT",
        crtGame: "Game CRT: {value}",
        defaultAudio: "Default audio",
        defaultAudioTheme: "Game music theme",
        defaultAudioTrailer: "Trailer audio",
        back: "Back",
        globalSettings: "Global settings",
        gameOptions: "Game options",
        localLibrary: "Trailer mode",
        maintenance: "Maintenance",
        refreshPreview: "Restart preview",
        noPreview: "No trailer preview is available for this game.",
        downloadProgress: "Downloaded {current}/{total}",
        preparingDownload: "Preparing trailer…",
        downloadingPercent: "Downloading: {percent}%",
        processingDownload: "Processing video…",
        play: "Play",
        pause: "Pause",
        downloadStarted: "Download started: {title}",
        downloadAssigned: "Downloaded and assigned: {title}",
        importAssigned: "Imported and assigned: {title}",
        localDeleted: "Saved trailer deleted: {title}",
        bulkDone: "Bulk complete — succeeded: {ok}, skipped: {skipped}, failed: {failed}",
        cancelDownload: "Cancel download",
        cancel: "Cancel",
        confirm: "Confirm",
        delay: "Delay: {seconds}s",
        disabled: "Disabled",
        disabledForCurrentGame: "Disabled for this game",
        emptyYouTubeQuery: "Empty YouTube query",
        forceCrt: "Force CRT",
        game: "Game: {title}",
        youtubeGlobal: "Enable YouTube videos",
        youtubeSearchQuery: "YouTube search query",
        searchYouTube: "Search YouTube",
        search: "Search",
        youtubeResults: "YouTube results",
        useSelectedYouTubeResult: "Use selected YouTube result",
        selectTrailer: "Select",
        selectedTrailer: "Selected",
        download: "Download",
        invalidSteamAppId: "Invalid Steam AppID",
        invalidTrims: "Valid trims: 0-60 seconds",
        invalidYouTubeLink: "Invalid YouTube link",
        loadingYouTubeTrailer: "Loading YouTube trailer",
        logoAssist: "Game page logo",
        logoAssistHelp: "When the trailer starts on a game page, move the Steam logo to the bottom-left and restore it when you leave.",
        stopOnLaunch: "Stop trailer on Play",
        stoppedForLaunch: "Trailer stopped for launch",
        mediaSourceUnavailable: "MediaSource is not available",
        resolvingYouTubeDirect: "Resolving direct YouTube stream",
        noGameRecognized: "No game recognized",
        noReadableYouTubeResults: "No readable YouTube results",
        noSteamTrailer: "No Steam trailer found",
        noTrailerForApp: "No trailer for app {appId}",
        noCrt: "No CRT",
        originalAppId: "Use original AppID",
        retryNow: "Try again now",
        saveSteamAppId: "Save Steam AppID",
        saveTrims: "Save video trims",
        saveYouTubeLink: "Save YouTube link",
        searchTrailerForApp: "Searching trailer for app {appId}",
        searchingSteamStore: "Searching Steam trailer for {title}",
        searchingYouTube: "Searching YouTube for {title}",
        searchingYouTubeTrailer: "Searching YouTube trailer: {title}",
        source: "Source: {value}",
        sourceAuto: "Automatic",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        sourceLocal: "Local trailer",
        steamAppIdSource: "Steam AppID source",
        steamQuality: "Quality: {quality}p",
        steamTrailer: "Steam trailer",
        steamTrailerAuto: "Automatic Steam video",
        steamAutoFound: "Steam found: {title}",
        steamAutoNoMatch: "Steam auto: no reliable trailer found",
        steamTrailerNoPlayableId: "Trailer found, but without a playable id",
        steamTrailerNotPlayable: "Trailer not playable",
        steamVideosAvailable: "{count} Steam videos available. Select one to save it for this game.",
        statusAppBlocked: "App {appId} disabled",
        statusHeroNotFound: "App {appId}: hero not found",
        title: "TrailerHero",
        trailerActive: "Trailer active",
        trailerSource: "Trailer source",
        downloadActiveTrailer: "Download active trailer",
        localFile: "Local file",
        trailerAudio: "Trailer audio",
        themeDeckAudio: "Game music theme",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Trim end sec",
        trimStart: "Trim start sec",
        waitingGamePage: "Waiting for a game page",
        youtubeAutoFound: "YouTube found: {title}",
        youtubeAutoNoTrailer: "YouTube auto: no trailer found",
        youtubeAutoSearch: "Auto YouTube search",
        youtubeFallback: "YouTube fallback",
        youtubeDirectUnavailable: "Direct YouTube stream unavailable; using iframe fallback",
        youtubeForGame: "Custom YouTube link",
        youtubeSearchError: "YouTube search error",
        youtubeTrailer: "YouTube trailer",
        youtubeTrailerActive: "YouTube trailer active",
        youtubeQuality: "YouTube quality: {value}",
        youtubeBulkReassign: "Reassign YouTube links for all non-Steam games",
        youtubeBulkConfirm: "Reassign YouTube links for every non-Steam game?",
        youtubeBulkNoGames: "No non-Steam games found.",
        youtubeBulkProgress: "Reassigning YouTube links {current}/{total}: {title}",
        youtubeBulkDone: "YouTube reassigned: {assigned}/{total}. Failed: {failed}",
        gameSettings: "Trailer settings",
        gameSettingsHint: "Choose, preview or save the trailer for this game.",
        streaming: "Streaming",
        savedLocal: "Saved locally",
        previewTrailer: "Preview trailer",
        useStreaming: "Use streaming trailer",
        downloadTrailer: "Download and use this trailer",
        importTrailer: "Import a video file",
        deleteLocalTrailer: "Delete saved trailer",
        deleteFile: "Delete file",
        downloadAll: "Download all trailers",
        deleteAll: "Delete all saved trailers",
        cleanupTrailers: "Delete unassigned trailer files",
        currentStorage: "Storage: {value}",
        qualityPreset: "Download quality: {quality}p",
        downloadRunning: "Downloading trailers...",
        noGameForSettings: "Open these settings from a game's Options menu.",
        operationComplete: "Operation completed",
        confirmDeleteAll: "Delete every trailer saved by TrailerHero?",
        confirmCleanup: "Delete local trailer files that are not assigned to a game?"
        ,confirmDeleteLocal: "Delete the saved trailer for this game?"
    },
    it: {
        active: "Attivo",
        activeSteamVideoPrefix: "Attivo: ",
        addYouTubeLink: "aggiungi link YouTube",
        auto: "Auto",
        autoplayBlocked: "Autoplay bloccato da Steam",
        cannotReachBigPicture: "Non riesco a raggiungere la tab Big Picture",
        clearYouTubeLink: "Cancella link YouTube",
        connectedToTab: "Collegato a {tab}",
        connectingSteamDebugger: "Collegamento via debugger Steam...",
        connectingToTab: "Collegamento a {tab}...",
        crtAutomatic: "CRT automatico",
        crtGame: "CRT gioco: {value}",
        defaultAudio: "Audio predefinito",
        defaultAudioTheme: "Tema musicale del gioco",
        defaultAudioTrailer: "Audio del trailer",
        back: "Indietro",
        globalSettings: "Impostazioni globali",
        gameOptions: "Opzioni del gioco",
        localLibrary: "Modalità trailer",
        maintenance: "Manutenzione",
        refreshPreview: "Riavvia anteprima",
        noPreview: "Nessuna anteprima trailer disponibile per questo gioco.",
        downloadProgress: "Scaricati {current}/{total}",
        preparingDownload: "Preparazione trailer…",
        downloadingPercent: "Download: {percent}%",
        processingDownload: "Elaborazione video…",
        play: "Riproduci",
        pause: "Pausa",
        downloadStarted: "Download avviato: {title}",
        downloadAssigned: "Scaricato e assegnato: {title}",
        importAssigned: "Importato e assegnato: {title}",
        localDeleted: "Trailer locale eliminato: {title}",
        bulkDone: "Operazione completata — riusciti: {ok}, saltati: {skipped}, falliti: {failed}",
        cancelDownload: "Annulla download",
        cancel: "Annulla",
        confirm: "Conferma",
        delay: "Delay: {seconds}s",
        disabled: "Disattivato",
        disabledForCurrentGame: "Disattivato per questo gioco",
        emptyYouTubeQuery: "Query YouTube vuota",
        forceCrt: "Forza CRT",
        game: "Gioco: {title}",
        youtubeGlobal: "Abilita video YouTube",
        youtubeSearchQuery: "Query ricerca YouTube",
        searchYouTube: "Cerca su YouTube",
        search: "Cerca",
        youtubeResults: "Risultati YouTube",
        useSelectedYouTubeResult: "Usa risultato YouTube selezionato",
        invalidSteamAppId: "Steam AppID non valido",
        invalidTrims: "Tagli validi: 0-60 secondi",
        invalidYouTubeLink: "Link YouTube non valido",
        loadingYouTubeTrailer: "Carico trailer YouTube",
        logoAssist: "Logo pagina gioco",
        logoAssistHelp: "Quando parte il trailer nella pagina gioco, sposta il logo Steam in basso a sinistra e lo ripristina uscendo.",
        stopOnLaunch: "Ferma su Gioca",
        stoppedForLaunch: "Trailer fermato per l'avvio",
        mediaSourceUnavailable: "MediaSource non disponibile",
        resolvingYouTubeDirect: "Risolvo stream YouTube diretto",
        noGameRecognized: "Nessun gioco riconosciuto",
        noReadableYouTubeResults: "Nessun risultato YouTube leggibile",
        noSteamTrailer: "Nessun trailer Steam trovato",
        noTrailerForApp: "Nessun trailer per app {appId}",
        noCrt: "Senza CRT",
        originalAppId: "Usa AppID originale",
        retryNow: "Riprova ora",
        saveSteamAppId: "Salva Steam AppID",
        saveTrims: "Salva tagli video",
        saveYouTubeLink: "Salva link YouTube",
        searchTrailerForApp: "Cerco trailer per app {appId}",
        searchingSteamStore: "Cerco trailer Steam per {title}",
        searchingYouTube: "Cerco YouTube per {title}",
        searchingYouTubeTrailer: "Cerco trailer YouTube: {title}",
        source: "Sorgente: {value}",
        sourceAuto: "Automatico",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        sourceLocal: "Trailer locale",
        steamAppIdSource: "Steam AppID sorgente",
        steamQuality: "Qualità: {quality}p",
        steamTrailer: "Steam trailer",
        steamTrailerAuto: "Video Steam automatico",
        steamAutoFound: "Steam trovato: {title}",
        steamAutoNoMatch: "Steam auto: nessun trailer affidabile trovato",
        steamTrailerNoPlayableId: "Trailer trovato, ma senza id riproducibile",
        steamTrailerNotPlayable: "Trailer non riproducibile",
        steamVideosAvailable: "Video Steam disponibili: {count}. Selezionane uno per salvarlo su questo gioco.",
        statusAppBlocked: "App {appId} disattivata",
        statusHeroNotFound: "App {appId}: hero non trovata",
        title: "TrailerHero",
        trailerActive: "Trailer attivo",
        trailerSource: "Sorgente del trailer",
        downloadActiveTrailer: "Scarica trailer attivo",
        localFile: "File locale",
        selectTrailer: "Seleziona",
        selectedTrailer: "Selezionato",
        download: "Scarica",
        trailerAudio: "Audio trailer",
        themeDeckAudio: "Tema musicale del gioco",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Taglio fine sec",
        trimStart: "Taglio inizio sec",
        waitingGamePage: "In attesa di una pagina gioco",
        youtubeAutoFound: "YouTube trovato: {title}",
        youtubeAutoNoTrailer: "YouTube auto: nessun trailer trovato",
        youtubeAutoSearch: "Ricerca YouTube auto",
        youtubeFallback: "YouTube fallback",
        youtubeDirectUnavailable: "Stream YouTube diretto non disponibile; uso fallback iframe",
        youtubeForGame: "Link YouTube personalizzato",
        youtubeSearchError: "Errore ricerca YouTube",
        youtubeTrailer: "YouTube trailer",
        youtubeTrailerActive: "Trailer YouTube attivo",
        youtubeQuality: "Qualità YouTube: {value}",
        youtubeBulkReassign: "Riassegna link YouTube a tutti i giochi non-Steam",
        youtubeBulkConfirm: "Riassegnare i link YouTube a tutti i giochi non-Steam?",
        youtubeBulkNoGames: "Nessun gioco non-Steam trovato.",
        youtubeBulkProgress: "Riassegno link YouTube {current}/{total}: {title}",
        youtubeBulkDone: "YouTube riassegnati: {assigned}/{total}. Falliti: {failed}",
        gameSettings: "Impostazioni trailer",
        gameSettingsHint: "Scegli, prova o salva il trailer di questo gioco.",
        streaming: "Streaming",
        savedLocal: "Salvato in locale",
        previewTrailer: "Anteprima trailer",
        useStreaming: "Usa il trailer in streaming",
        downloadTrailer: "Scarica e usa questo trailer",
        importTrailer: "Importa un file video",
        deleteLocalTrailer: "Elimina il trailer salvato",
        deleteFile: "Elimina file",
        downloadAll: "Scarica tutti i trailer",
        deleteAll: "Elimina tutti i trailer salvati",
        cleanupTrailers: "Elimina i trailer non assegnati",
        currentStorage: "Archiviazione: {value}",
        qualityPreset: "Qualità download: {quality}p",
        downloadRunning: "Download dei trailer in corso...",
        noGameForSettings: "Apri queste impostazioni dal menu Opzioni di un gioco.",
        operationComplete: "Operazione completata",
        confirmDeleteAll: "Eliminare tutti i trailer salvati da TrailerHero?",
        confirmCleanup: "Eliminare i file trailer locali non assegnati ad alcun gioco?"
        ,confirmDeleteLocal: "Eliminare il trailer salvato per questo gioco?"
    },
    fr: {
        active: "Activé",
        activeSteamVideoPrefix: "Actif : ",
        addYouTubeLink: "ajoutez un lien YouTube",
        auto: "Auto",
        autoplayBlocked: "Lecture auto bloquée par Steam",
        cannotReachBigPicture: "Impossible de joindre l'onglet Big Picture",
        clearYouTubeLink: "Effacer le lien YouTube",
        connectedToTab: "Connecté à {tab}",
        connectingSteamDebugger: "Connexion via le débogueur Steam...",
        connectingToTab: "Connexion à {tab}...",
        crtAutomatic: "CRT automatique",
        crtGame: "CRT du jeu : {value}",
        delay: "Délai : {seconds}s",
        disabled: "Désactivé",
        disabledForCurrentGame: "Désactivé pour ce jeu",
        emptyYouTubeQuery: "Recherche YouTube vide",
        forceCrt: "Forcer CRT",
        game: "Jeu : {title}",
        invalidSteamAppId: "Steam AppID invalide",
        invalidTrims: "Découpes valides : 0-60 secondes",
        invalidYouTubeLink: "Lien YouTube invalide",
        loadingYouTubeTrailer: "Chargement du trailer YouTube",
        logoAssist: "Logo page jeu",
        logoAssistHelp: "Quand le trailer démarre sur une page jeu, déplace le logo Steam en bas à gauche puis le restaure en quittant.",
        stopOnLaunch: "Arrêter au lancement",
        stoppedForLaunch: "Trailer arrêté pour le lancement",
        mediaSourceUnavailable: "MediaSource indisponible",
        noGameRecognized: "Aucun jeu reconnu",
        noReadableYouTubeResults: "Aucun résultat YouTube lisible",
        noSteamTrailer: "Aucun trailer Steam trouvé",
        noTrailerForApp: "Aucun trailer pour l'app {appId}",
        noCrt: "Sans CRT",
        originalAppId: "Utiliser l'AppID original",
        retryNow: "Réessayer maintenant",
        saveSteamAppId: "Enregistrer le Steam AppID",
        saveTrims: "Enregistrer les découpes",
        saveYouTubeLink: "Enregistrer le lien YouTube",
        searchTrailerForApp: "Recherche du trailer pour l'app {appId}",
        searchingYouTube: "Recherche YouTube pour {title}",
        searchingYouTubeTrailer: "Recherche du trailer YouTube : {title}",
        source: "Source : {value}",
        sourceAuto: "Automatique",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID source",
        steamQuality: "Qualité : {quality}p",
        steamTrailer: "Trailer Steam",
        steamTrailerAuto: "Vidéo Steam automatique",
        steamTrailerNoPlayableId: "Trailer trouvé, mais sans id lisible",
        steamTrailerNotPlayable: "Trailer non lisible",
        steamVideosAvailable: "{count} vidéos Steam disponibles. Sélectionnez-en une pour ce jeu.",
        statusAppBlocked: "App {appId} désactivée",
        statusHeroNotFound: "App {appId} : hero introuvable",
        title: "TrailerHero",
        trailerActive: "Trailer actif",
        trailerAudio: "Audio du trailer",
        themeDeckAudio: "Thème musical du jeu",
        trailerLabel: "Trailer : {name}",
        trimEnd: "Découpe fin sec",
        trimStart: "Découpe début sec",
        waitingGamePage: "En attente d'une page jeu",
        youtubeAutoFound: "YouTube trouvé : {title}",
        youtubeAutoNoTrailer: "YouTube auto : aucun trailer trouvé",
        youtubeAutoSearch: "Recherche YouTube auto",
        youtubeFallback: "Fallback YouTube",
        youtubeForGame: "Lien YouTube personnalisé",
        youtubeSearchError: "Erreur de recherche YouTube",
        youtubeTrailer: "Trailer YouTube",
        youtubeTrailerActive: "Trailer YouTube actif",
        youtubeQuality: "Qualité YouTube : {value}",
        defaultAudio: "Audio par défaut",
        defaultAudioTheme: "Musique du jeu",
        defaultAudioTrailer: "Audio du trailer",
        back: "Retour",
        globalSettings: "Paramètres généraux",
        gameOptions: "Options du jeu",
        localLibrary: "Mode du trailer",
        maintenance: "Maintenance",
        refreshPreview: "Relancer l'aperçu",
        noPreview: "Aucun aperçu n'est disponible pour ce jeu.",
        downloadProgress: "Téléchargés : {current}/{total}",
        cancelDownload: "Annuler le téléchargement",
        cancel: "Annuler",
        confirm: "Confirmer",
        youtubeGlobal: "Activer les vidéos YouTube",
        youtubeSearchQuery: "Recherche YouTube",
        searchYouTube: "Rechercher sur YouTube",
        youtubeResults: "Résultats YouTube",
        useSelectedYouTubeResult: "Utiliser le résultat YouTube sélectionné",
        resolvingYouTubeDirect: "Préparation du flux YouTube direct",
        searchingSteamStore: "Recherche d'un trailer Steam pour {title}",
        sourceLocal: "Trailer local",
        steamAutoFound: "Steam trouvé : {title}",
        steamAutoNoMatch: "Recherche Steam automatique : aucun trailer fiable",
        youtubeDirectUnavailable: "Flux YouTube direct indisponible ; utilisation du lecteur intégré",
        youtubeBulkReassign: "Réattribuer les liens YouTube des jeux non-Steam",
        youtubeBulkConfirm: "Réattribuer les liens YouTube de tous les jeux non-Steam ?",
        youtubeBulkNoGames: "Aucun jeu non-Steam trouvé.",
        youtubeBulkProgress: "Réattribution des liens YouTube {current}/{total} : {title}",
        youtubeBulkDone: "Liens YouTube réattribués : {assigned}/{total}. Échecs : {failed}",
        gameSettings: "Paramètres du trailer",
        gameSettingsHint: "Choisissez, prévisualisez ou enregistrez le trailer de ce jeu.",
        streaming: "Lecture en ligne",
        savedLocal: "Enregistré en local",
        previewTrailer: "Aperçu du trailer",
        useStreaming: "Utiliser le trailer en ligne",
        downloadTrailer: "Télécharger et utiliser ce trailer",
        importTrailer: "Importer un fichier vidéo",
        deleteLocalTrailer: "Supprimer le trailer enregistré",
        downloadAll: "Télécharger tous les trailers",
        deleteAll: "Supprimer tous les trailers enregistrés",
        cleanupTrailers: "Supprimer les fichiers non attribués",
        currentStorage: "Stockage : {value}",
        qualityPreset: "Qualité du téléchargement : {quality}p",
        downloadRunning: "Téléchargement des trailers...",
        noGameForSettings: "Ouvrez ces paramètres depuis le menu Options d'un jeu.",
        operationComplete: "Opération terminée",
        confirmDeleteAll: "Supprimer tous les trailers enregistrés par TrailerHero ?",
        confirmCleanup: "Supprimer les fichiers locaux qui ne sont attribués à aucun jeu ?"
    },
    es: {
        active: "Activo",
        activeSteamVideoPrefix: "Activo: ",
        addYouTubeLink: "añade un enlace de YouTube",
        auto: "Auto",
        autoplayBlocked: "Autoplay bloqueado por Steam",
        cannotReachBigPicture: "No puedo llegar a la pestaña Big Picture",
        clearYouTubeLink: "Borrar enlace de YouTube",
        connectedToTab: "Conectado a {tab}",
        connectingSteamDebugger: "Conectando con el depurador de Steam...",
        connectingToTab: "Conectando a {tab}...",
        crtAutomatic: "CRT automático",
        crtGame: "CRT del juego: {value}",
        delay: "Retraso: {seconds}s",
        disabled: "Desactivado",
        disabledForCurrentGame: "Desactivado para este juego",
        emptyYouTubeQuery: "Búsqueda de YouTube vacía",
        forceCrt: "Forzar CRT",
        game: "Juego: {title}",
        invalidSteamAppId: "Steam AppID no válido",
        invalidTrims: "Recortes válidos: 0-60 segundos",
        invalidYouTubeLink: "Enlace de YouTube no válido",
        loadingYouTubeTrailer: "Cargando tráiler de YouTube",
        logoAssist: "Logo página del juego",
        logoAssistHelp: "Cuando empieza el tráiler en una página de juego, mueve el logo de Steam abajo a la izquierda y lo restaura al salir.",
        stopOnLaunch: "Detener al jugar",
        stoppedForLaunch: "Tráiler detenido para iniciar",
        mediaSourceUnavailable: "MediaSource no disponible",
        noGameRecognized: "No se reconoció ningún juego",
        noReadableYouTubeResults: "No hay resultados legibles de YouTube",
        noSteamTrailer: "No se encontró tráiler de Steam",
        noTrailerForApp: "No hay tráiler para la app {appId}",
        noCrt: "Sin CRT",
        originalAppId: "Usar AppID original",
        retryNow: "Reintentar ahora",
        saveSteamAppId: "Guardar Steam AppID",
        saveTrims: "Guardar recortes",
        saveYouTubeLink: "Guardar enlace de YouTube",
        searchTrailerForApp: "Buscando tráiler para la app {appId}",
        searchingYouTube: "Buscando en YouTube para {title}",
        searchingYouTubeTrailer: "Buscando tráiler en YouTube: {title}",
        source: "Fuente: {value}",
        sourceAuto: "Automática",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID fuente",
        steamQuality: "Calidad: {quality}p",
        steamTrailer: "Tráiler de Steam",
        steamTrailerAuto: "Vídeo Steam automático",
        steamTrailerNoPlayableId: "Tráiler encontrado, pero sin id reproducible",
        steamTrailerNotPlayable: "Tráiler no reproducible",
        steamVideosAvailable: "{count} vídeos de Steam disponibles. Elige uno para guardarlo en este juego.",
        statusAppBlocked: "App {appId} desactivada",
        statusHeroNotFound: "App {appId}: hero no encontrada",
        title: "TrailerHero",
        trailerActive: "Tráiler activo",
        trailerAudio: "Audio del tráiler",
        themeDeckAudio: "Tema musical del juego",
        trailerLabel: "Tráiler: {name}",
        trimEnd: "Recorte final seg",
        trimStart: "Recorte inicio seg",
        waitingGamePage: "Esperando una página de juego",
        youtubeAutoFound: "YouTube encontrado: {title}",
        youtubeAutoNoTrailer: "YouTube auto: no se encontró tráiler",
        youtubeAutoSearch: "Búsqueda YouTube auto",
        youtubeFallback: "Fallback YouTube",
        youtubeForGame: "Enlace de YouTube personalizado",
        youtubeSearchError: "Error de búsqueda en YouTube",
        youtubeTrailer: "Tráiler de YouTube",
        youtubeTrailerActive: "Tráiler YouTube activo",
        youtubeQuality: "Calidad YouTube: {value}",
        defaultAudio: "Audio predeterminado",
        defaultAudioTheme: "Música del juego",
        defaultAudioTrailer: "Audio del tráiler",
        back: "Atrás",
        globalSettings: "Ajustes generales",
        gameOptions: "Opciones del juego",
        localLibrary: "Modo del tráiler",
        maintenance: "Mantenimiento",
        refreshPreview: "Reiniciar vista previa",
        noPreview: "No hay vista previa disponible para este juego.",
        downloadProgress: "Descargados {current}/{total}",
        cancelDownload: "Cancelar descarga",
        cancel: "Cancelar",
        confirm: "Confirmar",
        youtubeGlobal: "Activar vídeos de YouTube",
        youtubeSearchQuery: "Búsqueda de YouTube",
        searchYouTube: "Buscar en YouTube",
        youtubeResults: "Resultados de YouTube",
        useSelectedYouTubeResult: "Usar el resultado de YouTube seleccionado",
        resolvingYouTubeDirect: "Preparando la emisión directa de YouTube",
        searchingSteamStore: "Buscando tráiler de Steam para {title}",
        sourceLocal: "Tráiler local",
        steamAutoFound: "Steam encontrado: {title}",
        steamAutoNoMatch: "Búsqueda automática de Steam: no se encontró un tráiler fiable",
        youtubeDirectUnavailable: "La emisión directa de YouTube no está disponible; se usará el reproductor integrado",
        youtubeBulkReassign: "Reasignar enlaces de YouTube para juegos que no son de Steam",
        youtubeBulkConfirm: "¿Reasignar los enlaces de YouTube de todos los juegos que no son de Steam?",
        youtubeBulkNoGames: "No se encontraron juegos que no sean de Steam.",
        youtubeBulkProgress: "Reasignando enlaces de YouTube {current}/{total}: {title}",
        youtubeBulkDone: "YouTube reasignado: {assigned}/{total}. Fallidos: {failed}",
        gameSettings: "Ajustes del tráiler",
        gameSettingsHint: "Elige, previsualiza o guarda el tráiler de este juego.",
        streaming: "Streaming",
        savedLocal: "Guardado localmente",
        previewTrailer: "Vista previa del tráiler",
        useStreaming: "Usar el tráiler en streaming",
        downloadTrailer: "Descargar y usar este tráiler",
        importTrailer: "Importar un archivo de vídeo",
        deleteLocalTrailer: "Eliminar el tráiler guardado",
        downloadAll: "Descargar todos los tráileres",
        deleteAll: "Eliminar todos los tráileres guardados",
        cleanupTrailers: "Eliminar archivos de tráiler sin asignar",
        currentStorage: "Almacenamiento: {value}",
        qualityPreset: "Calidad de descarga: {quality}p",
        downloadRunning: "Descargando tráileres...",
        noGameForSettings: "Abre estos ajustes desde el menú Opciones de un juego.",
        operationComplete: "Operación completada",
        confirmDeleteAll: "¿Eliminar todos los tráileres guardados por TrailerHero?",
        confirmCleanup: "¿Eliminar los archivos locales que no estén asignados a ningún juego?"
    },
    pt: {
        active: "Ativo",
        activeSteamVideoPrefix: "Ativo: ",
        addYouTubeLink: "adicione um link do YouTube",
        auto: "Auto",
        autoplayBlocked: "Reprodução automática bloqueada pelo Steam",
        cannotReachBigPicture: "Não consigo alcançar o separador Big Picture",
        clearYouTubeLink: "Limpar link do YouTube",
        connectedToTab: "Ligado a {tab}",
        connectingSteamDebugger: "A ligar pelo depurador do Steam...",
        connectingToTab: "A ligar a {tab}...",
        crtAutomatic: "CRT automático",
        crtGame: "CRT do jogo: {value}",
        delay: "Atraso: {seconds}s",
        disabled: "Desativado",
        disabledForCurrentGame: "Desativado para este jogo",
        emptyYouTubeQuery: "Pesquisa YouTube vazia",
        forceCrt: "Forçar CRT",
        game: "Jogo: {title}",
        invalidSteamAppId: "Steam AppID inválido",
        invalidTrims: "Cortes válidos: 0-60 segundos",
        invalidYouTubeLink: "Link do YouTube inválido",
        loadingYouTubeTrailer: "A carregar trailer do YouTube",
        logoAssist: "Logo da página do jogo",
        logoAssistHelp: "Quando o trailer começa numa página de jogo, move o logo Steam para baixo à esquerda e restaura ao sair.",
        stopOnLaunch: "Parar ao jogar",
        stoppedForLaunch: "Trailer parado para iniciar",
        mediaSourceUnavailable: "MediaSource indisponível",
        noGameRecognized: "Nenhum jogo reconhecido",
        noReadableYouTubeResults: "Nenhum resultado legível do YouTube",
        noSteamTrailer: "Nenhum trailer Steam encontrado",
        noTrailerForApp: "Nenhum trailer para a app {appId}",
        noCrt: "Sem CRT",
        originalAppId: "Usar AppID original",
        retryNow: "Tentar novamente",
        saveSteamAppId: "Guardar Steam AppID",
        saveTrims: "Guardar cortes",
        saveYouTubeLink: "Guardar link do YouTube",
        searchTrailerForApp: "A procurar trailer para a app {appId}",
        searchingYouTube: "A procurar no YouTube por {title}",
        searchingYouTubeTrailer: "A procurar trailer no YouTube: {title}",
        source: "Fonte: {value}",
        sourceAuto: "Automática",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID fonte",
        steamQuality: "Qualidade: {quality}p",
        steamTrailer: "Trailer Steam",
        steamTrailerAuto: "Vídeo Steam automático",
        steamTrailerNoPlayableId: "Trailer encontrado, mas sem id reproduzível",
        steamTrailerNotPlayable: "Trailer não reproduzível",
        steamVideosAvailable: "{count} vídeos Steam disponíveis. Escolha um para guardar neste jogo.",
        statusAppBlocked: "App {appId} desativada",
        statusHeroNotFound: "App {appId}: hero não encontrada",
        title: "TrailerHero",
        trailerActive: "Trailer ativo",
        trailerAudio: "Áudio do trailer",
        themeDeckAudio: "Tema musical do jogo",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Corte final seg",
        trimStart: "Corte inicial seg",
        waitingGamePage: "À espera de uma página de jogo",
        youtubeAutoFound: "YouTube encontrado: {title}",
        youtubeAutoNoTrailer: "YouTube auto: nenhum trailer encontrado",
        youtubeAutoSearch: "Pesquisa YouTube auto",
        youtubeFallback: "Fallback YouTube",
        youtubeForGame: "Link YouTube personalizado",
        youtubeSearchError: "Erro na pesquisa do YouTube",
        youtubeTrailer: "Trailer YouTube",
        youtubeTrailerActive: "Trailer YouTube ativo",
        youtubeQuality: "Qualidade YouTube: {value}",
        defaultAudio: "Áudio predefinido",
        defaultAudioTheme: "Música do jogo",
        defaultAudioTrailer: "Áudio do trailer",
        back: "Voltar",
        globalSettings: "Definições gerais",
        gameOptions: "Opções do jogo",
        localLibrary: "Modo do trailer",
        maintenance: "Manutenção",
        refreshPreview: "Reiniciar pré-visualização",
        noPreview: "Não está disponível uma pré-visualização para este jogo.",
        downloadProgress: "Transferidos {current}/{total}",
        cancelDownload: "Cancelar transferência",
        cancel: "Cancelar",
        confirm: "Confirmar",
        youtubeGlobal: "Ativar vídeos do YouTube",
        youtubeSearchQuery: "Pesquisa no YouTube",
        searchYouTube: "Pesquisar no YouTube",
        youtubeResults: "Resultados do YouTube",
        useSelectedYouTubeResult: "Usar o resultado do YouTube selecionado",
        resolvingYouTubeDirect: "A preparar a transmissão direta do YouTube",
        searchingSteamStore: "A pesquisar trailer Steam para {title}",
        sourceLocal: "Trailer local",
        steamAutoFound: "Steam encontrado: {title}",
        steamAutoNoMatch: "Pesquisa automática Steam: nenhum trailer fiável encontrado",
        youtubeDirectUnavailable: "Transmissão direta do YouTube indisponível; será usado o leitor incorporado",
        youtubeBulkReassign: "Reatribuir ligações do YouTube a jogos que não são Steam",
        youtubeBulkConfirm: "Reatribuir as ligações do YouTube de todos os jogos que não são Steam?",
        youtubeBulkNoGames: "Não foram encontrados jogos que não sejam Steam.",
        youtubeBulkProgress: "A reatribuir ligações do YouTube {current}/{total}: {title}",
        youtubeBulkDone: "YouTube reatribuído: {assigned}/{total}. Falhas: {failed}",
        gameSettings: "Definições do trailer",
        gameSettingsHint: "Escolha, pré-visualize ou guarde o trailer deste jogo.",
        streaming: "Transmissão",
        savedLocal: "Guardado localmente",
        previewTrailer: "Pré-visualizar trailer",
        useStreaming: "Usar o trailer em transmissão",
        downloadTrailer: "Transferir e usar este trailer",
        importTrailer: "Importar um ficheiro de vídeo",
        deleteLocalTrailer: "Eliminar o trailer guardado",
        downloadAll: "Transferir todos os trailers",
        deleteAll: "Eliminar todos os trailers guardados",
        cleanupTrailers: "Eliminar ficheiros de trailer não atribuídos",
        currentStorage: "Armazenamento: {value}",
        qualityPreset: "Qualidade da transferência: {quality}p",
        downloadRunning: "A transferir trailers...",
        noGameForSettings: "Abra estas definições no menu Opções de um jogo.",
        operationComplete: "Operação concluída",
        confirmDeleteAll: "Eliminar todos os trailers guardados pelo TrailerHero?",
        confirmCleanup: "Eliminar os ficheiros locais que não estão atribuídos a nenhum jogo?"
    },
    ptBR: {
        active: "Ativo",
        activeSteamVideoPrefix: "Ativo: ",
        addYouTubeLink: "adicione um link do YouTube",
        auto: "Auto",
        autoplayBlocked: "Reprodução automática bloqueada pelo Steam",
        cannotReachBigPicture: "Não consigo acessar a aba Big Picture",
        clearYouTubeLink: "Remover link do YouTube",
        connectedToTab: "Conectado a {tab}",
        connectingSteamDebugger: "Conectando pelo depurador do Steam...",
        connectingToTab: "Conectando a {tab}...",
        crtAutomatic: "CRT automático",
        crtGame: "CRT do jogo: {value}",
        delay: "Atraso: {seconds}s",
        disabled: "Desativado",
        disabledForCurrentGame: "Desativado para este jogo",
        emptyYouTubeQuery: "Busca do YouTube vazia",
        forceCrt: "Forçar CRT",
        game: "Jogo: {title}",
        invalidSteamAppId: "Steam AppID inválido",
        invalidTrims: "Cortes válidos: 0-60 segundos",
        invalidYouTubeLink: "Link do YouTube inválido",
        loadingYouTubeTrailer: "Carregando trailer do YouTube",
        logoAssist: "Logo da página do jogo",
        logoAssistHelp: "Quando o trailer começa na página do jogo, move o logo Steam para baixo à esquerda e restaura ao sair.",
        stopOnLaunch: "Parar ao jogar",
        stoppedForLaunch: "Trailer parado para iniciar",
        mediaSourceUnavailable: "MediaSource indisponível",
        noGameRecognized: "Nenhum jogo reconhecido",
        noReadableYouTubeResults: "Nenhum resultado legível do YouTube",
        noSteamTrailer: "Nenhum trailer Steam encontrado",
        noTrailerForApp: "Nenhum trailer para o app {appId}",
        noCrt: "Sem CRT",
        originalAppId: "Usar AppID original",
        retryNow: "Tentar de novo agora",
        saveSteamAppId: "Salvar Steam AppID",
        saveTrims: "Salvar cortes do vídeo",
        saveYouTubeLink: "Salvar link do YouTube",
        searchTrailerForApp: "Buscando trailer para o app {appId}",
        searchingYouTube: "Buscando no YouTube por {title}",
        searchingYouTubeTrailer: "Buscando trailer no YouTube: {title}",
        source: "Fonte: {value}",
        sourceAuto: "Automática",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID fonte",
        steamQuality: "Qualidade: {quality}p",
        steamTrailer: "Trailer Steam",
        steamTrailerAuto: "Vídeo Steam automático",
        steamTrailerNoPlayableId: "Trailer encontrado, mas sem id reproduzível",
        steamTrailerNotPlayable: "Trailer não reproduzível",
        steamVideosAvailable: "{count} vídeos Steam disponíveis. Escolha um para salvar neste jogo.",
        statusAppBlocked: "App {appId} desativado",
        statusHeroNotFound: "App {appId}: hero não encontrada",
        title: "TrailerHero",
        trailerActive: "Trailer ativo",
        trailerAudio: "Áudio do trailer",
        themeDeckAudio: "Tema musical do jogo",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Corte final seg",
        trimStart: "Corte inicial seg",
        waitingGamePage: "Aguardando uma página de jogo",
        youtubeAutoFound: "YouTube encontrado: {title}",
        youtubeAutoNoTrailer: "YouTube auto: nenhum trailer encontrado",
        youtubeAutoSearch: "Busca YouTube auto",
        youtubeFallback: "Fallback YouTube",
        youtubeForGame: "Link YouTube personalizado",
        youtubeSearchError: "Erro na busca do YouTube",
        youtubeTrailer: "Trailer YouTube",
        youtubeTrailerActive: "Trailer YouTube ativo",
        youtubeQuality: "Qualidade YouTube: {value}",
        defaultAudio: "Áudio padrão",
        defaultAudioTheme: "Música do jogo",
        defaultAudioTrailer: "Áudio do trailer",
        back: "Voltar",
        globalSettings: "Configurações gerais",
        gameOptions: "Opções do jogo",
        localLibrary: "Modo do trailer",
        maintenance: "Manutenção",
        refreshPreview: "Reiniciar prévia",
        noPreview: "Não há prévia disponível para este jogo.",
        downloadProgress: "Baixados {current}/{total}",
        cancelDownload: "Cancelar download",
        cancel: "Cancelar",
        confirm: "Confirmar",
        youtubeGlobal: "Ativar vídeos do YouTube",
        youtubeSearchQuery: "Pesquisa no YouTube",
        searchYouTube: "Pesquisar no YouTube",
        youtubeResults: "Resultados do YouTube",
        useSelectedYouTubeResult: "Usar o resultado do YouTube selecionado",
        resolvingYouTubeDirect: "Preparando a transmissão direta do YouTube",
        searchingSteamStore: "Procurando trailer da Steam para {title}",
        sourceLocal: "Trailer local",
        steamAutoFound: "Steam encontrado: {title}",
        steamAutoNoMatch: "Busca automática na Steam: nenhum trailer confiável encontrado",
        youtubeDirectUnavailable: "Transmissão direta do YouTube indisponível; será usado o player incorporado",
        youtubeBulkReassign: "Reatribuir links do YouTube aos jogos que não são da Steam",
        youtubeBulkConfirm: "Reatribuir os links do YouTube de todos os jogos que não são da Steam?",
        youtubeBulkNoGames: "Nenhum jogo que não seja da Steam foi encontrado.",
        youtubeBulkProgress: "Reatribuindo links do YouTube {current}/{total}: {title}",
        youtubeBulkDone: "YouTube reatribuído: {assigned}/{total}. Falhas: {failed}",
        gameSettings: "Configurações do trailer",
        gameSettingsHint: "Escolha, visualize ou salve o trailer deste jogo.",
        streaming: "Streaming",
        savedLocal: "Salvo localmente",
        previewTrailer: "Prévia do trailer",
        useStreaming: "Usar o trailer por streaming",
        downloadTrailer: "Baixar e usar este trailer",
        importTrailer: "Importar um arquivo de vídeo",
        deleteLocalTrailer: "Excluir o trailer salvo",
        downloadAll: "Baixar todos os trailers",
        deleteAll: "Excluir todos os trailers salvos",
        cleanupTrailers: "Excluir arquivos de trailer não atribuídos",
        currentStorage: "Armazenamento: {value}",
        qualityPreset: "Qualidade do download: {quality}p",
        downloadRunning: "Baixando trailers...",
        noGameForSettings: "Abra estas configurações no menu Opções de um jogo.",
        operationComplete: "Operação concluída",
        confirmDeleteAll: "Excluir todos os trailers salvos pelo TrailerHero?",
        confirmCleanup: "Excluir os arquivos locais que não estão atribuídos a nenhum jogo?"
    },
    de: {
        active: "Aktiviert",
        activeSteamVideoPrefix: "Aktiv: ",
        addYouTubeLink: "YouTube-Link hinzufügen",
        auto: "Auto",
        autoplayBlocked: "Autoplay wurde von Steam blockiert",
        cannotReachBigPicture: "Big-Picture-Tab nicht erreichbar",
        clearYouTubeLink: "YouTube-Link löschen",
        connectedToTab: "Verbunden mit {tab}",
        connectingSteamDebugger: "Verbinde über den Steam-Debugger...",
        connectingToTab: "Verbinde mit {tab}...",
        crtAutomatic: "Automatisches CRT",
        crtGame: "Spiel-CRT: {value}",
        delay: "Verzögerung: {seconds}s",
        disabled: "Deaktiviert",
        disabledForCurrentGame: "Für dieses Spiel deaktiviert",
        emptyYouTubeQuery: "Leere YouTube-Suche",
        forceCrt: "CRT erzwingen",
        game: "Spiel: {title}",
        invalidSteamAppId: "Ungültige Steam AppID",
        invalidTrims: "Gültige Schnitte: 0-60 Sekunden",
        invalidYouTubeLink: "Ungültiger YouTube-Link",
        loadingYouTubeTrailer: "YouTube-Trailer wird geladen",
        logoAssist: "Logo auf Spielseite",
        logoAssistHelp: "Wenn der Trailer auf einer Spielseite startet, wird das Steam-Logo nach unten links verschoben und beim Verlassen wiederhergestellt.",
        stopOnLaunch: "Trailer beim Spielen stoppen",
        stoppedForLaunch: "Trailer zum Start gestoppt",
        mediaSourceUnavailable: "MediaSource nicht verfügbar",
        noGameRecognized: "Kein Spiel erkannt",
        noReadableYouTubeResults: "Keine lesbaren YouTube-Ergebnisse",
        noSteamTrailer: "Kein Steam-Trailer gefunden",
        noTrailerForApp: "Kein Trailer für App {appId}",
        noCrt: "Ohne CRT",
        originalAppId: "Originale AppID verwenden",
        retryNow: "Jetzt erneut versuchen",
        saveSteamAppId: "Steam AppID speichern",
        saveTrims: "Videoschnitte speichern",
        saveYouTubeLink: "YouTube-Link speichern",
        searchTrailerForApp: "Suche Trailer für App {appId}",
        searchingYouTube: "Suche YouTube nach {title}",
        searchingYouTubeTrailer: "Suche YouTube-Trailer: {title}",
        source: "Quelle: {value}",
        sourceAuto: "Automatisch",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID Quelle",
        steamQuality: "Qualität: {quality}p",
        steamTrailer: "Steam-Trailer",
        steamTrailerAuto: "Automatisches Steam-Video",
        steamTrailerNoPlayableId: "Trailer gefunden, aber ohne abspielbare ID",
        steamTrailerNotPlayable: "Trailer nicht abspielbar",
        steamVideosAvailable: "{count} Steam-Videos verfügbar. Wähle eines für dieses Spiel aus.",
        statusAppBlocked: "App {appId} deaktiviert",
        statusHeroNotFound: "App {appId}: Hero nicht gefunden",
        title: "TrailerHero",
        trailerActive: "Trailer aktiv",
        trailerAudio: "Trailer-Audio",
        themeDeckAudio: "Musikthema des Spiels",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Ende schneiden Sek.",
        trimStart: "Start schneiden Sek.",
        waitingGamePage: "Warte auf eine Spielseite",
        youtubeAutoFound: "YouTube gefunden: {title}",
        youtubeAutoNoTrailer: "YouTube Auto: kein Trailer gefunden",
        youtubeAutoSearch: "Automatische YouTube-Suche",
        youtubeFallback: "YouTube-Fallback",
        youtubeForGame: "Eigener YouTube-Link",
        youtubeSearchError: "Fehler bei der YouTube-Suche",
        youtubeTrailer: "YouTube-Trailer",
        youtubeTrailerActive: "YouTube-Trailer aktiv",
        youtubeQuality: "YouTube-Qualität: {value}",
        defaultAudio: "Standardaudio",
        defaultAudioTheme: "Spielmusik",
        defaultAudioTrailer: "Trailer-Audio",
        back: "Zurück",
        globalSettings: "Allgemeine Einstellungen",
        gameOptions: "Spieloptionen",
        localLibrary: "Trailer-Modus",
        maintenance: "Wartung",
        refreshPreview: "Vorschau neu starten",
        noPreview: "Für dieses Spiel ist keine Vorschau verfügbar.",
        downloadProgress: "Heruntergeladen: {current}/{total}",
        cancelDownload: "Download abbrechen",
        cancel: "Abbrechen",
        confirm: "Bestätigen",
        youtubeGlobal: "YouTube-Videos aktivieren",
        youtubeSearchQuery: "YouTube-Suche",
        searchYouTube: "Auf YouTube suchen",
        youtubeResults: "YouTube-Ergebnisse",
        useSelectedYouTubeResult: "Ausgewähltes YouTube-Ergebnis verwenden",
        resolvingYouTubeDirect: "Direkten YouTube-Stream vorbereiten",
        searchingSteamStore: "Steam-Trailer für {title} wird gesucht",
        sourceLocal: "Lokaler Trailer",
        steamAutoFound: "Steam gefunden: {title}",
        steamAutoNoMatch: "Automatische Steam-Suche: kein verlässlicher Trailer gefunden",
        youtubeDirectUnavailable: "Direkter YouTube-Stream nicht verfügbar; der eingebettete Player wird verwendet",
        youtubeBulkReassign: "YouTube-Links für Nicht-Steam-Spiele neu zuweisen",
        youtubeBulkConfirm: "YouTube-Links für alle Nicht-Steam-Spiele neu zuweisen?",
        youtubeBulkNoGames: "Keine Nicht-Steam-Spiele gefunden.",
        youtubeBulkProgress: "YouTube-Links werden neu zugewiesen {current}/{total}: {title}",
        youtubeBulkDone: "YouTube neu zugewiesen: {assigned}/{total}. Fehlgeschlagen: {failed}",
        gameSettings: "Trailer-Einstellungen",
        gameSettingsHint: "Trailer für dieses Spiel auswählen, ansehen oder speichern.",
        streaming: "Streaming",
        savedLocal: "Lokal gespeichert",
        previewTrailer: "Trailer-Vorschau",
        useStreaming: "Streaming-Trailer verwenden",
        downloadTrailer: "Diesen Trailer herunterladen und verwenden",
        importTrailer: "Videodatei importieren",
        deleteLocalTrailer: "Gespeicherten Trailer löschen",
        downloadAll: "Alle Trailer herunterladen",
        deleteAll: "Alle gespeicherten Trailer löschen",
        cleanupTrailers: "Nicht zugewiesene Trailer-Dateien löschen",
        currentStorage: "Speicher: {value}",
        qualityPreset: "Download-Qualität: {quality}p",
        downloadRunning: "Trailer werden heruntergeladen...",
        noGameForSettings: "Öffne diese Einstellungen über das Optionsmenü eines Spiels.",
        operationComplete: "Vorgang abgeschlossen",
        confirmDeleteAll: "Alle von TrailerHero gespeicherten Trailer löschen?",
        confirmCleanup: "Lokale Trailer-Dateien löschen, die keinem Spiel zugewiesen sind?"
    },
    nl: {
        active: "Ingeschakeld",
        activeSteamVideoPrefix: "Actief: ",
        addYouTubeLink: "voeg een YouTube-link toe",
        auto: "Auto",
        autoplayBlocked: "Autoplay geblokkeerd door Steam",
        cannotReachBigPicture: "Kan de Big Picture-tab niet bereiken",
        clearYouTubeLink: "YouTube-link wissen",
        connectedToTab: "Verbonden met {tab}",
        connectingSteamDebugger: "Verbinden via Steam-debugger...",
        connectingToTab: "Verbinden met {tab}...",
        crtAutomatic: "Automatische CRT",
        crtGame: "Game CRT: {value}",
        delay: "Vertraging: {seconds}s",
        disabled: "Uitgeschakeld",
        disabledForCurrentGame: "Uitgeschakeld voor deze game",
        emptyYouTubeQuery: "Lege YouTube-zoekopdracht",
        forceCrt: "CRT forceren",
        game: "Game: {title}",
        invalidSteamAppId: "Ongeldige Steam AppID",
        invalidTrims: "Geldige trims: 0-60 seconden",
        invalidYouTubeLink: "Ongeldige YouTube-link",
        loadingYouTubeTrailer: "YouTube-trailer laden",
        logoAssist: "Logo gamepagina",
        logoAssistHelp: "Wanneer de trailer op een gamepagina start, wordt het Steam-logo linksonder gezet en bij verlaten hersteld.",
        stopOnLaunch: "Stop trailer bij spelen",
        stoppedForLaunch: "Trailer gestopt voor starten",
        mediaSourceUnavailable: "MediaSource niet beschikbaar",
        noGameRecognized: "Geen game herkend",
        noReadableYouTubeResults: "Geen leesbare YouTube-resultaten",
        noSteamTrailer: "Geen Steam-trailer gevonden",
        noTrailerForApp: "Geen trailer voor app {appId}",
        noCrt: "Geen CRT",
        originalAppId: "Originele AppID gebruiken",
        retryNow: "Nu opnieuw proberen",
        saveSteamAppId: "Steam AppID opslaan",
        saveTrims: "Videotrims opslaan",
        saveYouTubeLink: "YouTube-link opslaan",
        searchTrailerForApp: "Trailer zoeken voor app {appId}",
        searchingYouTube: "YouTube zoeken naar {title}",
        searchingYouTubeTrailer: "YouTube-trailer zoeken: {title}",
        source: "Bron: {value}",
        sourceAuto: "Automatisch",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID bron",
        steamQuality: "Kwaliteit: {quality}p",
        steamTrailer: "Steam-trailer",
        steamTrailerAuto: "Automatische Steam-video",
        steamTrailerNoPlayableId: "Trailer gevonden, maar zonder afspeelbare id",
        steamTrailerNotPlayable: "Trailer niet afspeelbaar",
        steamVideosAvailable: "{count} Steam-video's beschikbaar. Selecteer er een voor deze game.",
        statusAppBlocked: "App {appId} uitgeschakeld",
        statusHeroNotFound: "App {appId}: hero niet gevonden",
        title: "TrailerHero",
        trailerActive: "Trailer actief",
        trailerAudio: "Traileraudio",
        themeDeckAudio: "Muziekthema van de game",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Trim einde sec",
        trimStart: "Trim begin sec",
        waitingGamePage: "Wachten op een gamepagina",
        youtubeAutoFound: "YouTube gevonden: {title}",
        youtubeAutoNoTrailer: "YouTube auto: geen trailer gevonden",
        youtubeAutoSearch: "Automatisch YouTube zoeken",
        youtubeFallback: "YouTube fallback",
        youtubeForGame: "Aangepaste YouTube-link",
        youtubeSearchError: "YouTube-zoekfout",
        youtubeTrailer: "YouTube-trailer",
        youtubeTrailerActive: "YouTube-trailer actief",
        youtubeQuality: "YouTube-kwaliteit: {value}",
        defaultAudio: "Standaardaudio",
        defaultAudioTheme: "Gamemuziek",
        defaultAudioTrailer: "Traileraudio",
        back: "Terug",
        globalSettings: "Algemene instellingen",
        gameOptions: "Game-opties",
        localLibrary: "Trailermodus",
        maintenance: "Onderhoud",
        refreshPreview: "Voorbeeld opnieuw starten",
        noPreview: "Voor deze game is geen voorbeeld beschikbaar.",
        downloadProgress: "Gedownload {current}/{total}",
        cancelDownload: "Download annuleren",
        cancel: "Annuleren",
        confirm: "Bevestigen",
        youtubeGlobal: "YouTube-video's inschakelen",
        youtubeSearchQuery: "Zoekopdracht voor YouTube",
        searchYouTube: "Zoeken op YouTube",
        youtubeResults: "YouTube-resultaten",
        useSelectedYouTubeResult: "Geselecteerd YouTube-resultaat gebruiken",
        resolvingYouTubeDirect: "Directe YouTube-stream voorbereiden",
        searchingSteamStore: "Steam-trailer zoeken voor {title}",
        sourceLocal: "Lokale trailer",
        steamAutoFound: "Steam gevonden: {title}",
        steamAutoNoMatch: "Automatisch zoeken op Steam: geen betrouwbare trailer gevonden",
        youtubeDirectUnavailable: "Directe YouTube-stream niet beschikbaar; de ingebouwde speler wordt gebruikt",
        youtubeBulkReassign: "YouTube-links opnieuw toewijzen aan niet-Steam-games",
        youtubeBulkConfirm: "YouTube-links van alle niet-Steam-games opnieuw toewijzen?",
        youtubeBulkNoGames: "Geen niet-Steam-games gevonden.",
        youtubeBulkProgress: "YouTube-links opnieuw toewijzen {current}/{total}: {title}",
        youtubeBulkDone: "YouTube opnieuw toegewezen: {assigned}/{total}. Mislukt: {failed}",
        gameSettings: "Trailerinstellingen",
        gameSettingsHint: "Kies, bekijk of bewaar de trailer voor deze game.",
        streaming: "Streaming",
        savedLocal: "Lokaal opgeslagen",
        previewTrailer: "Trailervoorbeeld",
        useStreaming: "Streamingtrailer gebruiken",
        downloadTrailer: "Deze trailer downloaden en gebruiken",
        importTrailer: "Een videobestand importeren",
        deleteLocalTrailer: "Opgeslagen trailer verwijderen",
        downloadAll: "Alle trailers downloaden",
        deleteAll: "Alle opgeslagen trailers verwijderen",
        cleanupTrailers: "Niet-toegewezen trailerbestanden verwijderen",
        currentStorage: "Opslag: {value}",
        qualityPreset: "Downloadkwaliteit: {quality}p",
        downloadRunning: "Trailers downloaden...",
        noGameForSettings: "Open deze instellingen via het menu Opties van een game.",
        operationComplete: "Bewerking voltooid",
        confirmDeleteAll: "Alle door TrailerHero opgeslagen trailers verwijderen?",
        confirmCleanup: "Lokale trailerbestanden verwijderen die niet aan een game zijn toegewezen?"
    },
    uk: {
        active: "Увімкнено",
        activeSteamVideoPrefix: "Активне: ",
        addYouTubeLink: "додайте посилання YouTube",
        auto: "Авто",
        autoplayBlocked: "Автовідтворення заблоковано Steam",
        cannotReachBigPicture: "Не вдається підключитися до вкладки Big Picture",
        clearYouTubeLink: "Очистити посилання YouTube",
        connectedToTab: "Підключено до {tab}",
        connectingSteamDebugger: "Підключення через налагоджувач Steam...",
        connectingToTab: "Підключення до {tab}...",
        crtAutomatic: "Автоматичний CRT",
        crtGame: "CRT гри: {value}",
        delay: "Затримка: {seconds}с",
        disabled: "Вимкнено",
        disabledForCurrentGame: "Вимкнено для цієї гри",
        emptyYouTubeQuery: "Порожній пошук YouTube",
        forceCrt: "Увімкнути CRT",
        game: "Гра: {title}",
        invalidSteamAppId: "Недійсний Steam AppID",
        invalidTrims: "Допустимі обрізки: 0-60 секунд",
        invalidYouTubeLink: "Недійсне посилання YouTube",
        loadingYouTubeTrailer: "Завантаження трейлера YouTube",
        logoAssist: "Логотип сторінки гри",
        logoAssistHelp: "Коли трейлер запускається на сторінці гри, логотип Steam переноситься вниз ліворуч і відновлюється після виходу.",
        stopOnLaunch: "Зупиняти трейлер під час запуску",
        stoppedForLaunch: "Трейлер зупинено для запуску",
        mediaSourceUnavailable: "MediaSource недоступний",
        noGameRecognized: "Гру не розпізнано",
        noReadableYouTubeResults: "Немає придатних результатів YouTube",
        noSteamTrailer: "Трейлер Steam не знайдено",
        noTrailerForApp: "Немає трейлера для app {appId}",
        noCrt: "Без CRT",
        originalAppId: "Використати оригінальний AppID",
        retryNow: "Спробувати знову",
        saveSteamAppId: "Зберегти Steam AppID",
        saveTrims: "Зберегти обрізку відео",
        saveYouTubeLink: "Зберегти посилання YouTube",
        searchTrailerForApp: "Пошук трейлера для app {appId}",
        searchingYouTube: "Пошук YouTube для {title}",
        searchingYouTubeTrailer: "Пошук трейлера YouTube: {title}",
        source: "Джерело: {value}",
        sourceAuto: "Автоматично",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Джерело Steam AppID",
        steamQuality: "Якість: {quality}p",
        steamTrailer: "Трейлер Steam",
        steamTrailerAuto: "Автоматичне відео Steam",
        steamTrailerNoPlayableId: "Трейлер знайдено, але без відтворюваного id",
        steamTrailerNotPlayable: "Трейлер не відтворюється",
        steamVideosAvailable: "Доступно відео Steam: {count}. Виберіть одне для цієї гри.",
        statusAppBlocked: "App {appId} вимкнено",
        statusHeroNotFound: "App {appId}: hero не знайдено",
        title: "TrailerHero",
        trailerActive: "Трейлер активний",
        trailerAudio: "Аудіо трейлера",
        themeDeckAudio: "Музична тема гри",
        trailerLabel: "Трейлер: {name}",
        trimEnd: "Обрізка кінця, сек",
        trimStart: "Обрізка початку, сек",
        waitingGamePage: "Очікування сторінки гри",
        youtubeAutoFound: "YouTube знайдено: {title}",
        youtubeAutoNoTrailer: "YouTube auto: трейлер не знайдено",
        youtubeAutoSearch: "Автопошук YouTube",
        youtubeFallback: "Резерв YouTube",
        youtubeForGame: "Власне посилання YouTube",
        youtubeSearchError: "Помилка пошуку YouTube",
        youtubeTrailer: "Трейлер YouTube",
        youtubeTrailerActive: "Трейлер YouTube активний",
        youtubeQuality: "Якість YouTube: {value}",
        defaultAudio: "Типове аудіо",
        defaultAudioTheme: "Музична тема гри",
        defaultAudioTrailer: "Аудіо трейлера",
        back: "Назад",
        globalSettings: "Загальні налаштування",
        gameOptions: "Параметри гри",
        localLibrary: "Режим трейлера",
        maintenance: "Обслуговування",
        refreshPreview: "Перезапустити перегляд",
        noPreview: "Для цієї гри немає доступного перегляду.",
        downloadProgress: "Завантажено {current}/{total}",
        cancelDownload: "Скасувати завантаження",
        cancel: "Скасувати",
        confirm: "Підтвердити",
        youtubeGlobal: "Увімкнути відео YouTube",
        youtubeSearchQuery: "Пошуковий запит YouTube",
        searchYouTube: "Шукати на YouTube",
        youtubeResults: "Результати YouTube",
        useSelectedYouTubeResult: "Використати вибраний результат YouTube",
        resolvingYouTubeDirect: "Підготовка прямого потоку YouTube",
        searchingSteamStore: "Пошук трейлера Steam для {title}",
        sourceLocal: "Локальний трейлер",
        steamAutoFound: "Знайдено у Steam: {title}",
        steamAutoNoMatch: "Автопошук Steam: надійного трейлера не знайдено",
        youtubeDirectUnavailable: "Прямий потік YouTube недоступний; використовується вбудований програвач",
        youtubeBulkReassign: "Перепризначити посилання YouTube для ігор не зі Steam",
        youtubeBulkConfirm: "Перепризначити посилання YouTube для всіх ігор не зі Steam?",
        youtubeBulkNoGames: "Ігор не зі Steam не знайдено.",
        youtubeBulkProgress: "Перепризначення посилань YouTube {current}/{total}: {title}",
        youtubeBulkDone: "YouTube перепризначено: {assigned}/{total}. Помилок: {failed}",
        gameSettings: "Налаштування трейлера",
        gameSettingsHint: "Виберіть, перегляньте або збережіть трейлер цієї гри.",
        streaming: "Потокове відтворення",
        savedLocal: "Збережено локально",
        previewTrailer: "Перегляд трейлера",
        useStreaming: "Використати потоковий трейлер",
        downloadTrailer: "Завантажити й використати цей трейлер",
        importTrailer: "Імпортувати відеофайл",
        deleteLocalTrailer: "Видалити збережений трейлер",
        downloadAll: "Завантажити всі трейлери",
        deleteAll: "Видалити всі збережені трейлери",
        cleanupTrailers: "Видалити непризначені файли трейлерів",
        currentStorage: "Сховище: {value}",
        qualityPreset: "Якість завантаження: {quality}p",
        downloadRunning: "Завантаження трейлерів...",
        noGameForSettings: "Відкрийте ці налаштування з меню Параметри гри.",
        operationComplete: "Операцію завершено",
        confirmDeleteAll: "Видалити всі трейлери, збережені TrailerHero?",
        confirmCleanup: "Видалити локальні файли трейлерів, які не призначені жодній грі?"
    },
    zhCN: {
        active: "启用",
        activeSteamVideoPrefix: "当前：",
        addYouTubeLink: "添加 YouTube 链接",
        auto: "自动",
        autoplayBlocked: "Steam 阻止了自动播放",
        cannotReachBigPicture: "无法连接到 Big Picture 标签页",
        clearYouTubeLink: "清除 YouTube 链接",
        connectedToTab: "已连接到 {tab}",
        connectingSteamDebugger: "正在通过 Steam 调试器连接...",
        connectingToTab: "正在连接到 {tab}...",
        crtAutomatic: "自动 CRT",
        crtGame: "游戏 CRT：{value}",
        delay: "延迟：{seconds}秒",
        disabled: "已禁用",
        disabledForCurrentGame: "对此游戏禁用",
        emptyYouTubeQuery: "YouTube 搜索为空",
        forceCrt: "强制 CRT",
        game: "游戏：{title}",
        invalidSteamAppId: "Steam AppID 无效",
        invalidTrims: "有效裁剪：0-60 秒",
        invalidYouTubeLink: "YouTube 链接无效",
        loadingYouTubeTrailer: "正在加载 YouTube 预告片",
        logoAssist: "游戏页 Logo",
        logoAssistHelp: "游戏页预告片开始时，将 Steam Logo 移到左下角，并在离开时恢复。",
        stopOnLaunch: "启动时停止预告片",
        stoppedForLaunch: "预告片已为启动停止",
        mediaSourceUnavailable: "MediaSource 不可用",
        noGameRecognized: "未识别到游戏",
        noReadableYouTubeResults: "没有可读取的 YouTube 结果",
        noSteamTrailer: "未找到 Steam 预告片",
        noTrailerForApp: "App {appId} 没有预告片",
        noCrt: "无 CRT",
        originalAppId: "使用原始 AppID",
        retryNow: "立即重试",
        saveSteamAppId: "保存 Steam AppID",
        saveTrims: "保存视频裁剪",
        saveYouTubeLink: "保存 YouTube 链接",
        searchTrailerForApp: "正在搜索 app {appId} 的预告片",
        searchingYouTube: "正在 YouTube 搜索 {title}",
        searchingYouTubeTrailer: "正在搜索 YouTube 预告片：{title}",
        source: "来源：{value}",
        sourceAuto: "自动",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID 来源",
        steamQuality: "质量：{quality}p",
        steamTrailer: "Steam 预告片",
        steamTrailerAuto: "自动 Steam 视频",
        steamTrailerNoPlayableId: "找到了预告片，但没有可播放 id",
        steamTrailerNotPlayable: "预告片无法播放",
        steamVideosAvailable: "可用 Steam 视频：{count}。选择一个保存到此游戏。",
        statusAppBlocked: "App {appId} 已禁用",
        statusHeroNotFound: "App {appId}：未找到 hero",
        title: "TrailerHero",
        trailerActive: "预告片已启用",
        trailerAudio: "预告片音频",
        themeDeckAudio: "游戏音乐主题",
        trailerLabel: "预告片：{name}",
        trimEnd: "结尾裁剪秒数",
        trimStart: "开头裁剪秒数",
        waitingGamePage: "等待游戏页面",
        youtubeAutoFound: "已找到 YouTube：{title}",
        youtubeAutoNoTrailer: "YouTube 自动：未找到预告片",
        youtubeAutoSearch: "自动搜索 YouTube",
        youtubeFallback: "YouTube 备用",
        youtubeForGame: "自定义 YouTube 链接",
        youtubeSearchError: "YouTube 搜索错误",
        youtubeTrailer: "YouTube 预告片",
        youtubeTrailerActive: "YouTube 预告片已启用",
        youtubeQuality: "YouTube 质量：{value}",
        defaultAudio: "默认音频",
        defaultAudioTheme: "游戏音乐",
        defaultAudioTrailer: "预告片音频",
        back: "返回",
        globalSettings: "全局设置",
        gameOptions: "游戏选项",
        localLibrary: "预告片模式",
        maintenance: "维护",
        refreshPreview: "重新播放预览",
        noPreview: "此游戏没有可用的预告片预览。",
        downloadProgress: "已下载 {current}/{total}",
        cancelDownload: "取消下载",
        cancel: "取消",
        confirm: "确认",
        youtubeGlobal: "启用 YouTube 视频",
        youtubeSearchQuery: "YouTube 搜索关键词",
        searchYouTube: "搜索 YouTube",
        youtubeResults: "YouTube 搜索结果",
        useSelectedYouTubeResult: "使用选中的 YouTube 结果",
        resolvingYouTubeDirect: "正在准备 YouTube 直连视频流",
        searchingSteamStore: "正在为 {title} 搜索 Steam 预告片",
        sourceLocal: "本地预告片",
        steamAutoFound: "已在 Steam 找到：{title}",
        steamAutoNoMatch: "Steam 自动搜索：未找到可靠的预告片",
        youtubeDirectUnavailable: "YouTube 直连视频流不可用；将使用内嵌播放器",
        youtubeBulkReassign: "为非 Steam 游戏重新分配 YouTube 链接",
        youtubeBulkConfirm: "要为所有非 Steam 游戏重新分配 YouTube 链接吗？",
        youtubeBulkNoGames: "未找到非 Steam 游戏。",
        youtubeBulkProgress: "正在重新分配 YouTube 链接 {current}/{total}：{title}",
        youtubeBulkDone: "YouTube 链接已重新分配：{assigned}/{total}。失败：{failed}",
        gameSettings: "预告片设置",
        gameSettingsHint: "选择、预览或保存此游戏的预告片。",
        streaming: "在线播放",
        savedLocal: "已保存到本地",
        previewTrailer: "预览预告片",
        useStreaming: "使用在线预告片",
        downloadTrailer: "下载并使用此预告片",
        importTrailer: "导入视频文件",
        deleteLocalTrailer: "删除已保存的预告片",
        downloadAll: "下载所有预告片",
        deleteAll: "删除所有已保存的预告片",
        cleanupTrailers: "删除未分配的预告片文件",
        currentStorage: "存储空间：{value}",
        qualityPreset: "下载质量：{quality}p",
        downloadRunning: "正在下载预告片...",
        noGameForSettings: "请从游戏的选项菜单打开这些设置。",
        operationComplete: "操作完成",
        confirmDeleteAll: "删除 TrailerHero 保存的所有预告片吗？",
        confirmCleanup: "删除未分配给任何游戏的本地预告片文件吗？"
    },
    ja: {
        active: "有効",
        activeSteamVideoPrefix: "使用中: ",
        addYouTubeLink: "YouTube リンクを追加",
        auto: "自動",
        autoplayBlocked: "Steam により自動再生がブロックされました",
        cannotReachBigPicture: "Big Picture タブに接続できません",
        clearYouTubeLink: "YouTube リンクを削除",
        connectedToTab: "{tab} に接続しました",
        connectingSteamDebugger: "Steam デバッガーで接続中...",
        connectingToTab: "{tab} に接続中...",
        crtAutomatic: "自動 CRT",
        crtGame: "ゲーム CRT: {value}",
        delay: "遅延: {seconds}秒",
        disabled: "無効",
        disabledForCurrentGame: "このゲームでは無効",
        emptyYouTubeQuery: "YouTube 検索が空です",
        forceCrt: "CRT を強制",
        game: "ゲーム: {title}",
        invalidSteamAppId: "Steam AppID が無効です",
        invalidTrims: "有効なトリム: 0-60 秒",
        invalidYouTubeLink: "YouTube リンクが無効です",
        loadingYouTubeTrailer: "YouTube トレーラーを読み込み中",
        logoAssist: "ゲームページのロゴ",
        logoAssistHelp: "ゲームページでトレーラーが始まると Steam ロゴを左下へ移動し、ページを離れると元に戻します。",
        stopOnLaunch: "プレイ時にトレーラーを停止",
        stoppedForLaunch: "起動のためトレーラーを停止しました",
        mediaSourceUnavailable: "MediaSource は利用できません",
        noGameRecognized: "ゲームを認識できません",
        noReadableYouTubeResults: "読み取れる YouTube 結果がありません",
        noSteamTrailer: "Steam トレーラーが見つかりません",
        noTrailerForApp: "App {appId} のトレーラーがありません",
        noCrt: "CRT なし",
        originalAppId: "元の AppID を使う",
        retryNow: "今すぐ再試行",
        saveSteamAppId: "Steam AppID を保存",
        saveTrims: "動画トリムを保存",
        saveYouTubeLink: "YouTube リンクを保存",
        searchTrailerForApp: "App {appId} のトレーラーを検索中",
        searchingYouTube: "{title} を YouTube で検索中",
        searchingYouTubeTrailer: "YouTube トレーラーを検索中: {title}",
        source: "ソース: {value}",
        sourceAuto: "自動",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID ソース",
        steamQuality: "品質: {quality}p",
        steamTrailer: "Steam トレーラー",
        steamTrailerAuto: "自動 Steam 動画",
        steamTrailerNoPlayableId: "トレーラーは見つかりましたが再生可能な id がありません",
        steamTrailerNotPlayable: "トレーラーを再生できません",
        steamVideosAvailable: "{count} 件の Steam 動画があります。このゲームに保存する動画を選んでください。",
        statusAppBlocked: "App {appId} は無効",
        statusHeroNotFound: "App {appId}: hero が見つかりません",
        title: "TrailerHero",
        trailerActive: "トレーラー有効",
        trailerAudio: "トレーラー音声",
        themeDeckAudio: "ゲームの音楽テーマ",
        trailerLabel: "トレーラー: {name}",
        trimEnd: "終了トリム 秒",
        trimStart: "開始トリム 秒",
        waitingGamePage: "ゲームページを待機中",
        youtubeAutoFound: "YouTube が見つかりました: {title}",
        youtubeAutoNoTrailer: "YouTube 自動: トレーラーが見つかりません",
        youtubeAutoSearch: "YouTube 自動検索",
        youtubeFallback: "YouTube フォールバック",
        youtubeForGame: "カスタム YouTube リンク",
        youtubeSearchError: "YouTube 検索エラー",
        youtubeTrailer: "YouTube トレーラー",
        youtubeTrailerActive: "YouTube トレーラー有効",
        youtubeQuality: "YouTube 品質: {value}",
        defaultAudio: "デフォルト音声",
        defaultAudioTheme: "ゲームの音楽",
        defaultAudioTrailer: "トレーラー音声",
        back: "戻る",
        globalSettings: "全般設定",
        gameOptions: "ゲームオプション",
        localLibrary: "トレーラーモード",
        maintenance: "メンテナンス",
        refreshPreview: "プレビューを再開",
        noPreview: "このゲームではトレーラーをプレビューできません。",
        downloadProgress: "ダウンロード済み {current}/{total}",
        cancelDownload: "ダウンロードをキャンセル",
        cancel: "キャンセル",
        confirm: "確認",
        youtubeGlobal: "YouTube 動画を有効にする",
        youtubeSearchQuery: "YouTube 検索キーワード",
        searchYouTube: "YouTube を検索",
        youtubeResults: "YouTube の検索結果",
        useSelectedYouTubeResult: "選択した YouTube の結果を使用",
        resolvingYouTubeDirect: "YouTube の直接ストリームを準備中",
        searchingSteamStore: "{title} の Steam トレーラーを検索中",
        sourceLocal: "ローカルトレーラー",
        steamAutoFound: "Steam で見つかりました: {title}",
        steamAutoNoMatch: "Steam 自動検索: 信頼できるトレーラーが見つかりません",
        youtubeDirectUnavailable: "YouTube の直接ストリームを利用できないため、埋め込みプレイヤーを使用します",
        youtubeBulkReassign: "非 Steam ゲームの YouTube リンクを再割り当て",
        youtubeBulkConfirm: "すべての非 Steam ゲームの YouTube リンクを再割り当てしますか？",
        youtubeBulkNoGames: "非 Steam ゲームが見つかりません。",
        youtubeBulkProgress: "YouTube リンクを再割り当て中 {current}/{total}: {title}",
        youtubeBulkDone: "YouTube の再割り当て: {assigned}/{total}。失敗: {failed}",
        gameSettings: "トレーラー設定",
        gameSettingsHint: "このゲームのトレーラーを選択、プレビュー、保存できます。",
        streaming: "ストリーミング",
        savedLocal: "ローカルに保存済み",
        previewTrailer: "トレーラーをプレビュー",
        useStreaming: "ストリーミングトレーラーを使用",
        downloadTrailer: "このトレーラーをダウンロードして使用",
        importTrailer: "動画ファイルをインポート",
        deleteLocalTrailer: "保存済みトレーラーを削除",
        downloadAll: "すべてのトレーラーをダウンロード",
        deleteAll: "保存済みトレーラーをすべて削除",
        cleanupTrailers: "未割り当てのトレーラーファイルを削除",
        currentStorage: "ストレージ: {value}",
        qualityPreset: "ダウンロード品質: {quality}p",
        downloadRunning: "トレーラーをダウンロード中...",
        noGameForSettings: "ゲームのオプションメニューからこの設定を開いてください。",
        operationComplete: "操作が完了しました",
        confirmDeleteAll: "TrailerHero が保存したすべてのトレーラーを削除しますか？",
        confirmCleanup: "どのゲームにも割り当てられていないローカルトレーラーファイルを削除しますか？"
    }
};
function normalizeLocale(value) {
    const code = value?.trim().replace("_", "-").toLowerCase();
    if (!code) {
        return undefined;
    }
    if (code.includes("brazilian") || code === "br" || code.startsWith("pt-br")) {
        return "ptBR";
    }
    if (code.includes("schinese") || code.includes("tchinese") || code.startsWith("zh")) {
        return "zhCN";
    }
    if (code.includes("italian") || code.startsWith("it")) {
        return "it";
    }
    if (code.includes("french") || code.startsWith("fr")) {
        return "fr";
    }
    if (code.includes("spanish") || code.startsWith("es")) {
        return "es";
    }
    if (code.includes("portuguese") || code.startsWith("pt")) {
        return "pt";
    }
    if (code.includes("german") || code.startsWith("de")) {
        return "de";
    }
    if (code.includes("dutch") || code.startsWith("nl")) {
        return "nl";
    }
    if (code.includes("ukrainian") || code.startsWith("uk")) {
        return "uk";
    }
    if (code.includes("japanese") || code.startsWith("ja")) {
        return "ja";
    }
    if (code.includes("english") || code.startsWith("en")) {
        return "en";
    }
    return undefined;
}
function detectLocale() {
    const sources = [];
    try {
        const url = new URL(window.location.href);
        sources.push(url.searchParams.get("LANGUAGE"));
        sources.push(url.searchParams.get("language"));
        sources.push(url.searchParams.get("lang"));
    }
    catch {
        // Ignore malformed host URLs.
    }
    sources.push(document.documentElement.lang);
    sources.push(...(navigator.languages ?? []));
    sources.push(navigator.language);
    for (const source of sources) {
        const locale = normalizeLocale(source);
        if (locale) {
            return locale;
        }
    }
    return "en";
}
function formatMessage(template, vars = {}) {
    return template.replace(/\{(\w+)\}/g, (_match, key) => String(vars[key] ?? ""));
}
function tr(key, vars) {
    const locale = detectLocale();
    const template = TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS.en[key];
    return formatMessage(template, vars);
}
function getNextOption(options, current) {
    const index = options.indexOf(current);
    return options[(index + 1) % options.length] ?? options[0];
}
function getCrtPreferenceLabel(preference) {
    if (preference === "on") {
        return tr("forceCrt");
    }
    if (preference === "off") {
        return tr("noCrt");
    }
    return tr("auto");
}
function getSourceLabel(source) {
    if (source === "steam") {
        return tr("sourceSteam");
    }
    if (source === "youtube") {
        return tr("sourceYouTube");
    }
    if (source === "local") {
        return tr("sourceLocal");
    }
    return tr("sourceAuto");
}
function extractYouTubeId(value) {
    const trimmed = value.trim();
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/,
        /^([A-Za-z0-9_-]{11})$/
    ];
    for (const pattern of patterns) {
        const match = trimmed.match(pattern);
        if (match?.[1]) {
            return match[1];
        }
    }
    return undefined;
}
function normalizeSteamLookupTitle(value) {
    const roman = {
        i: "1",
        ii: "2",
        iii: "3",
        iv: "4",
        v: "5",
        vi: "6",
        vii: "7",
        viii: "8",
        ix: "9",
        x: "10"
    };
    return String(value || "")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[®©™]/g, "")
        .replace(/&/g, " and ")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, " ")
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((token) => roman[token] ?? token)
        .join("");
}
function isLikelyNonSteamShortcutAppId(appId) {
    return Number.isInteger(appId) && appId >= 2147483648;
}
function isRuntimeSnapshot(value) {
    return Boolean(value &&
        typeof value === "object" &&
        "status" in value &&
        typeof value.status === "string");
}
function trailerHeroRuntimeFactory(nextSettings, injectedTranslations) {
    const runtimeKey = "__trailerHeroRuntime";
    const runtimeVersion = "1.5.0.0";
    const styleId = "trailerhero-style";
    const videoClass = "trailerhero-video";
    const audioClass = "trailerhero-audio";
    const youtubeClass = "trailerhero-youtube";
    const youtubeMaskClass = "trailerhero-youtube-mask";
    const logoClass = "trailerhero-logo";
    const nativeLogoClass = "trailerhero-native-logo";
    const crtClass = "trailerhero-crt";
    const hostClass = "trailerhero-host";
    const targetClass = "trailerhero-target";
    const readyClass = "trailerhero-ready";
    const visibleClass = "trailerhero-visible";
    const audioHintId = "trailerhero-audio-hint";
    const themeDeckActivityEvent = "playhub:now-playing-activity";
    const themeDeckActivityGlobal = "__playhubNowPlayingActivity";
    const defaultTrimStartSeconds = 4;
    const defaultTrimEndSeconds = 5;
    const scanIntervalMs = 2400;
    const scanQueueDelayMs = 360;
    const launchSuppressionMs = 22000;
    const youtubeUiSettleMs = 3200;
    const translations = injectedTranslations;
    function normalizeRuntimeLocale(value) {
        const code = value?.trim().replace("_", "-").toLowerCase();
        if (!code) {
            return undefined;
        }
        if (code.includes("brazilian") || code === "br" || code.startsWith("pt-br")) {
            return "ptBR";
        }
        if (code.includes("schinese") || code.includes("tchinese") || code.startsWith("zh")) {
            return "zhCN";
        }
        if (code.includes("italian") || code.startsWith("it")) {
            return "it";
        }
        if (code.includes("french") || code.startsWith("fr")) {
            return "fr";
        }
        if (code.includes("spanish") || code.startsWith("es")) {
            return "es";
        }
        if (code.includes("portuguese") || code.startsWith("pt")) {
            return "pt";
        }
        if (code.includes("german") || code.startsWith("de")) {
            return "de";
        }
        if (code.includes("dutch") || code.startsWith("nl")) {
            return "nl";
        }
        if (code.includes("ukrainian") || code.startsWith("uk")) {
            return "uk";
        }
        if (code.includes("japanese") || code.startsWith("ja")) {
            return "ja";
        }
        if (code.includes("english") || code.startsWith("en")) {
            return "en";
        }
        return undefined;
    }
    function detectRuntimeLocale() {
        const sources = [];
        try {
            const url = new URL(window.location.href);
            sources.push(url.searchParams.get("LANGUAGE"));
            sources.push(url.searchParams.get("language"));
            sources.push(url.searchParams.get("lang"));
        }
        catch {
            // Ignore malformed host URLs.
        }
        sources.push(document.documentElement.lang);
        sources.push(...(navigator.languages ?? []));
        sources.push(navigator.language);
        for (const source of sources) {
            const locale = normalizeRuntimeLocale(source);
            if (locale) {
                return locale;
            }
        }
        return "en";
    }
    function rt(key, vars = {}) {
        const locale = detectRuntimeLocale();
        const template = translations[locale]?.[key] ?? translations.en[key];
        return template.replace(/\{(\w+)\}/g, (_match, varKey) => String(vars[varKey] ?? ""));
    }
    function normalizeSteamLookupTitle(value) {
        const roman = {
            i: "1",
            ii: "2",
            iii: "3",
            iv: "4",
            v: "5",
            vi: "6",
            vii: "7",
            viii: "8",
            ix: "9",
            x: "10"
        };
        return String(value || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[®©™]/g, "")
            .replace(/&/g, " and ")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, " ")
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .map((token) => roman[token] ?? token)
            .join("");
    }
    function isLikelyNonSteamShortcutAppId(appId) {
        return Number.isInteger(appId) && appId >= 2147483648;
    }
    function extractAppIdFromText(value) {
        const patterns = [
            /(?:library|games?|app)\/(?:app\/)?(\d{2,8})(?:[/?#]|$)/i,
            /steam:\/\/(?:nav\/games\/details|rungameid|store)\/(\d{2,8})/i,
            /[?&#](?:appid|appId|app_id)=(\d{2,8})(?:[&#]|$)/i,
            /(?:steam\/apps|store_item_assets\/steam\/apps|steamcommunity\/public\/images\/apps|\/assets)\/(\d{2,10})(?:\/|$)/i,
            /(?:config\/grid|config\\grid|\/grid\/|\\grid\\)(\d{2,10})(?:[._a-z-]|$)/i,
            /\/customimages\/(\d{2,10})(?:[a-z_]*)(?:[._/?#-]|$)/i
        ];
        for (const pattern of patterns) {
            const match = value.match(pattern);
            if (match?.[1]) {
                return Number(match[1]);
            }
        }
        return undefined;
    }
    function getOpenerRouteText() {
        try {
            const opener = window.opener;
            if (!opener?.location) {
                return "";
            }
            const routeText = [
                opener.location.href,
                opener.location.pathname,
                opener.location.hash,
                opener.document?.URL
            ].filter(Boolean).join(" ").toLowerCase();
            return routeText.includes("steamloopback.host/routes/") ? routeText : "";
        }
        catch {
            return "";
        }
    }
    function getLocalRouteText() {
        return [
            window.location.href,
            window.location.pathname,
            window.location.hash,
            document.URL
        ].join(" ").toLowerCase();
    }
    function detectLocationAppId() {
        const sources = [
            getOpenerRouteText(),
            window.location.href,
            window.location.pathname,
            window.location.hash,
            document.URL
        ];
        for (const source of sources) {
            const appId = extractAppIdFromText(source);
            if (appId) {
                return appId;
            }
        }
        return undefined;
    }
    function getElementAssetText(element) {
        return [
            element.getAttribute("style") ?? "",
            element.getAttribute("src") ?? "",
            element.getAttribute("href") ?? "",
            getComputedStyle(element).backgroundImage
        ].join(" ");
    }
    function isUsableRect(rect) {
        const minWidth = Math.min(420, window.innerWidth * 0.35);
        const minHeight = Math.min(180, window.innerHeight * 0.28);
        return (rect.width >= minWidth &&
            rect.height >= minHeight &&
            rect.bottom > 0 &&
            rect.right > 0 &&
            rect.top < window.innerHeight &&
            rect.left < window.innerWidth);
    }
    function scoreHeroElement(element, assetText) {
        const rect = element.getBoundingClientRect();
        if (!isUsableRect(rect)) {
            return 0;
        }
        const classText = `${element.className}`.toLowerCase();
        const assetLower = assetText.toLowerCase();
        if (assetLower.includes("movie") || assetLower.includes("trailer")) {
            return 0;
        }
        const areaScore = Math.min(900, (rect.width * rect.height) / 900);
        const topBias = Math.max(0, 260 - Math.abs(rect.top)) / 2;
        const heroBias = assetLower.includes("library_hero") || classText.includes("hero") ? 500 : 0;
        const customHeroBias = assetLower.includes("/customimages/") && assetLower.includes("_hero") ? 700 : 0;
        const backgroundBias = classText.includes("background") || assetLower.includes("page_bg") ? 180 : 0;
        const smallMediaPenalty = element.tagName === "IMG" && rect.height < window.innerHeight * 0.32 ? 350 : 0;
        const offscreenPenalty = Math.max(0, Math.abs(rect.left) - 4) * 4 + Math.max(0, Math.abs(rect.top) - 8) * 4;
        return areaScore + topBias + heroBias + customHeroBias + backgroundBias - smallMediaPenalty - offscreenPenalty;
    }
    function findHeroCandidate() {
        const nodes = Array.from(document.querySelectorAll([
            "[style*='steam/apps']",
            "[style*='store_item_assets']",
            "[style*='/assets/']",
            "[style*='/customimages/']",
            "[style*='library_hero']",
            "img[src*='steam/apps']",
            "img[src*='store_item_assets']",
            "img[src*='/assets/']",
            "img[src*='/customimages/']",
            "img[src*='library_hero']",
            "a[href*='/app/']"
        ].join(","))).slice(0, 900);
        let best;
        for (const node of nodes) {
            const assetText = getElementAssetText(node);
            const appId = extractAppIdFromText(assetText);
            if (!appId) {
                continue;
            }
            const target = node.tagName === "IMG" ? node.parentElement : node;
            if (!(target instanceof HTMLElement)) {
                continue;
            }
            const score = scoreHeroElement(target, assetText);
            if (score <= 0) {
                continue;
            }
            if (!best || score > best.score) {
                best = { appId, element: target, score, assetText };
            }
        }
        return best;
    }
    function coerceAppId(value) {
        const appId = typeof value === "number"
            ? value
            : typeof value === "string"
                ? Number.parseInt(value, 10)
                : Number.NaN;
        return Number.isInteger(appId) && appId > 0 ? appId : undefined;
    }
    function hasGameDetailsSignals(bodyText) {
        const hasActionText = /\b(play|launch|install|resume|update|stream|gioca|avvia|installa|riprendi|aggiorna|jouer|lancer|installer|reprendre|jugar|iniciar|instalar|reanudar|jogar|continuar|spielen|installieren|fortsetzen)\b/.test(bodyText) ||
            ["开始游戏", "开始", "安装", "继续", "更新", "プレイ", "起動", "インストール", "再開"].some((word) => bodyText.includes(word));
        const hasSpecificDetailsText = (/\b(achievements?|activity|dlc|community|controller|last played|play time|game info|friends who play)\b/.test(bodyText) ||
            /\b(obiettivi?|attivit[aà]|ultimo avvio|ultimo lancio|tempo di gioco|informazioni sul gioco|amici che giocano)\b/.test(bodyText) ||
            /\b(succ[eè]s|activit[eé]|dernier lancement|temps de jeu|informations sur le jeu)\b/.test(bodyText) ||
            /\b(logros?|actividad|último inicio|tiempo de juego|información del juego)\b/.test(bodyText));
        return hasActionText && hasSpecificDetailsText;
    }
    function isLibraryOverviewRoute(routeText) {
        return (routeText.includes("/routes/library/home") ||
            routeText.includes("/library/home") ||
            routeText.includes("library_home") ||
            routeText.includes("libraryhome"));
    }
    function isGameDetailsRoute(routeText) {
        return (/\/(?:routes\/)?library\/(?:app\/)?\d+(?:[/?#]|$)/i.test(routeText) ||
            /\/routes\/library\/app\/\d+/i.test(routeText));
    }
    function hasLibraryOverviewText(bodyText) {
        return (bodyText.includes("vedi altri giochi nella libreria") ||
            bodyText.includes("see more games in your library") ||
            bodyText.includes("recent games") ||
            bodyText.includes("giochi recenti"));
    }
    function getVisibleLibraryTileCount() {
        return Array.from(document.querySelectorAll("img[src*='/customimages/'], img[src*='library_capsule'], img[src*='header_image'], [style*='/customimages/'], [style*='library_capsule'], [style*='header_image']")).filter((element) => {
            const assetText = getElementAssetText(element).toLowerCase();
            if (assetText.includes("library_hero") || assetText.includes("_hero")) {
                return false;
            }
            const rect = element.getBoundingClientRect();
            return (rect.width >= 90 &&
                rect.height >= 90 &&
                rect.top > window.innerHeight * 0.3 &&
                rect.top < window.innerHeight * 0.98 &&
                rect.bottom > 0 &&
                rect.right > 0);
        }).length;
    }
    function isLibraryOverviewSurface(bodyText, routeText) {
        if (isLibraryOverviewRoute(routeText) && hasLibraryOverviewText(bodyText)) {
            return true;
        }
        if (hasLibraryOverviewText(bodyText)) {
            return true;
        }
        if (getVisibleLibraryTileCount() < 3) {
            return false;
        }
        const hasBigPictureChrome = /\b(menu|opzioni|options|seleziona|select|indietro|back)\b/.test(bodyText);
        return hasBigPictureChrome;
    }
    function isProbablyGameDetailsPage() {
        if (!document.body) {
            return false;
        }
        const bodyText = document.body.innerText?.slice(0, 9000).toLowerCase() ?? "";
        const hero = findHeroCandidate();
        const openerRouteText = getOpenerRouteText();
        if (openerRouteText) {
            if (isLibraryOverviewRoute(openerRouteText)) {
                return false;
            }
            if (isGameDetailsRoute(openerRouteText)) {
                return Boolean(hero && hasGameDetailsSignals(bodyText));
            }
        }
        const routeText = getLocalRouteText();
        if (hasLibraryOverviewText(bodyText)) {
            return false;
        }
        if (isLibraryOverviewRoute(routeText)) {
            return false;
        }
        if (detectLocationAppId()) {
            return Boolean(hero && hasGameDetailsSignals(bodyText));
        }
        if (isLibraryOverviewSurface(bodyText, routeText)) {
            return false;
        }
        if (!hero) {
            return false;
        }
        return hasGameDetailsSignals(bodyText);
    }
    function normalizeActionText(value) {
        return value
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, " ")
            .trim()
            .toLowerCase();
    }
    function isLaunchActionElement(target) {
        const control = target.closest("button, a, [role='button'], [tabindex], [class*='Button'], [class*='button']");
        if (!control) {
            return false;
        }
        const rect = control.getBoundingClientRect();
        if (rect.width < 44 || rect.height < 28 || rect.bottom < 0 || rect.top > window.innerHeight) {
            return false;
        }
        const text = normalizeActionText([
            control.innerText,
            control.textContent,
            control.getAttribute("aria-label"),
            control.getAttribute("title")
        ].filter(Boolean).join(" "));
        if (!text || text.length > 96) {
            return false;
        }
        const actionPattern = /\b(play|launch|install|resume|update|stream|gioca|avvia|installa|riprendi|aggiorna|jouer|lancer|installer|reprendre|mettre a jour|jugar|iniciar|instalar|reanudar|actualizar|jogar|continuar|atualizar|spielen|installieren|fortsetzen|aktualisieren|spelen|installeren|hervatten|bijwerken|грати|запустити|встановити|продовжити|оновити)\b/;
        if (actionPattern.test(text)) {
            return true;
        }
        return [
            "开始游戏",
            "开始",
            "安装",
            "继续",
            "更新",
            "プレイ",
            "起動",
            "インストール",
            "再開"
        ].some((word) => text.includes(word));
    }
    function detectGameTitle(appId) {
        const cleanTitle = (value) => {
            let text = String(value || "")
                .replace(/\s+/g, " ")
                .replace(/[®©]/g, "")
                .trim();
            if (!text) {
                return "";
            }
            const stripSteamUiPrefixes = () => {
                const before = text;
                text = text
                    .replace(/^(?:play|launch|install|resume|update|stream|gioca|avvia|installa|riprendi|aggiorna|jouer|lancer|installer|reprendre|jugar|iniciar|instalar|reanudar|jogar|continuar|spielen|installieren|fortsetzen)\b\s*/i, "")
                    .replace(/\b(?:ultimo avvio|ultimo lancio|last played|last launched|last launch|last run)\b\s*(?:oggi|ieri|today|yesterday|mai|never|[0-3]?\d(?:[\s/.-]+[a-zà-ÿ]+)?(?:[\s/.-]+\d{2,4})?)?/gi, " ")
                    .replace(/\b(?:tempo di gioco|tempo giocato|play time|time played|playtime)\b\s*(?:nessun tempo di gioco|ne un tempo di gioco|no playtime|none|[\d.,]+\s*(?:secondi?|seconds?|sec|s|minuti?|minutes?|mins?|min|ore|hours?|hrs?|h))?/gi, " ")
                    .replace(/\b(?:achievement|achievements|obiettivo|obiettivi|attivita|attività|activity|community|comunità|informazioni sul gioco|game info|i tuoi articoli|your stuff)\b/gi, " ")
                    .replace(/\s+/g, " ")
                    .trim();
                return text !== before;
            };
            for (let pass = 0; pass < 4 && stripSteamUiPrefixes(); pass += 1) {
                // Keep stripping only the repeated Steam UI metadata around the title.
            }
            for (let length = Math.floor(text.length / 2); length >= 3; length -= 1) {
                const first = text.slice(0, length).trim();
                const second = text.slice(length, length + first.length).trim();
                if (first && second && first.toLowerCase() === second.toLowerCase()) {
                    text = first;
                    break;
                }
            }
            return text.replace(/\s+([:;,.!?])/g, "$1").trim();
        };
        const blocked = new Set([
            "play",
            "install",
            "resume",
            "update",
            "gioca",
            "avvia",
            "installa",
            "riprendi",
            "aggiorna",
            "store",
            "libreria",
            "library",
            "community",
            "attivita",
            "attività",
            "controller",
            "achievements",
            "obiettivi",
            "ultimo avvio",
            "tempo di gioco",
            "visualizza notifiche",
            "view notifications",
            "notifications",
            "notifiche",
            "cerca",
            "search",
            "visualizza profilo",
            "view profile",
            "menu",
            "seleziona",
            "indietro",
            "select",
            "back"
        ]);
        const isBadGameTitle = (value) => {
            const text = cleanTitle(String(value || ""));
            const lower = text.toLowerCase();
            const uiPhraseHit = Array.from(blocked).some((phrase) => phrase.length >= 5 && (lower === phrase || lower.startsWith(`${phrase} `) || lower.includes(` ${phrase} `)));
            return (!text ||
                text.length < 2 ||
                text.length > 90 ||
                blocked.has(lower) ||
                uiPhraseHit ||
                /^\d{1,2}:\d{2}(?::\d{2})?$/.test(text) ||
                /^\d+(?:[.,]\d+)?\s*(?:h|hrs?|hours?|ore|min|mins?|minutes?|secondi?|seconds?)$/i.test(text) ||
                /^(?:a|b|x|y|lb|rb|lt|rt|menu|steam|select|back|ok|yes|no)$/i.test(text));
        };
        const collectTitleCandidates = (source, candidates, depth = 0, seen = new Set()) => {
            if (!source || depth > 1 || seen.has(source)) {
                return;
            }
            seen.add(source);
            const push = (value) => {
                if (typeof value === "string") {
                    candidates.push(value);
                }
            };
            for (const key of [
                "display_name",
                "localized_name",
                "name",
                "title",
                "m_strDisplayName",
                "strDisplayName",
                "m_strName",
                "strName",
                "m_displayName",
                "displayName"
            ]) {
                try {
                    push(source[key]);
                }
                catch {
                    // Ignore Steam observable getter failures.
                }
            }
            for (const getter of [
                "GetDisplayName",
                "GetName",
                "GetStoreName",
                "GetTitle"
            ]) {
                try {
                    const fn = source[getter];
                    if (typeof fn === "function") {
                        push(fn.call(source));
                    }
                }
                catch {
                    // Ignore Steam internals.
                }
            }
            for (const key of ["data", "app", "overview", "details", "m_data"]) {
                try {
                    const nested = source[key];
                    if (nested && typeof nested === "object") {
                        collectTitleCandidates(nested, candidates, depth + 1, seen);
                    }
                }
                catch {
                    // Ignore Steam internals.
                }
            }
        };
        const readSteamTitle = () => {
            const candidates = [];
            const addObject = (value) => collectTitleCandidates(value, candidates);
            const windows = [];
            const addWindow = (value) => {
                if (!value || windows.includes(value)) {
                    return;
                }
                windows.push(value);
            };
            try { addWindow(window); } catch { }
            try { addWindow(globalThis); } catch { }
            try { addWindow(window.top); } catch { }
            try { addWindow(window.parent); } catch { }
            try { addWindow(window.opener); } catch { }
            try { addWindow(window.Router?.WindowStore?.GamepadUIMainWindowInstance?.BrowserWindow); } catch { }
            try { addWindow(globalThis.Router?.WindowStore?.GamepadUIMainWindowInstance?.BrowserWindow); } catch { }
            for (const steamWindow of windows) {
                try {
                    addObject(steamWindow.appStore?.GetAppOverviewByAppID?.(appId));
                    addObject(steamWindow.appStore?.GetAppOverviewByGameID?.(appId));
                }
                catch {
                    // Steam internals are best-effort.
                }
                try {
                    addObject(steamWindow.appDetailsStore?.GetAppDetails?.(appId));
                }
                catch {
                    // Steam internals are best-effort.
                }
                for (const maybeMap of [
                    steamWindow.appStore?.m_mapAppOverview,
                    steamWindow.appStore?.m_mapApps,
                    steamWindow.appStore?.m_mapAppInfo,
                    steamWindow.appDetailsStore?.m_mapAppDetails
                ]) {
                    try {
                        if (maybeMap?.get) {
                            addObject(maybeMap.get(Number(appId)) ?? maybeMap.get(String(appId)));
                        }
                    }
                    catch {
                        // Steam internals are best-effort.
                    }
                }
                try {
                    const allApps = steamWindow.appStore?.allApps;
                    const iterable = Array.isArray(allApps)
                        ? allApps
                        : (allApps?.values ? Array.from(allApps.values()) : []);
                    const match = iterable.find((app) => Number(app?.appid ?? app?.app_id ?? app?.unAppID ?? app?.nAppID ?? app?.m_unAppID) === Number(appId));
                    addObject(match);
                }
                catch {
                    // Steam internals are best-effort.
                }
            }
            for (const candidate of candidates) {
                const title = cleanTitle(candidate);
                if (!isBadGameTitle(title)) {
                    return title;
                }
            }
            return "";
        };
        const steamTitle = readSteamTitle();
        if (steamTitle) {
            return steamTitle;
        }
        const heroImages = Array.from(document.querySelectorAll(`img[src*="/${appId}/"], img[src*="/${appId}_hero"], img[src*="/customimages/${appId}"]`));
        const capsuleTitles = heroImages
            .filter((image) => !(image.getAttribute("src") ?? "").includes("_hero"))
            .map((image) => {
            const root = image.closest("[class*='Panel']") ?? image.parentElement;
            return cleanTitle(image.getAttribute("aria-label") ??
                image.getAttribute("alt") ??
                image.getAttribute("title") ??
                root?.innerText ??
                root?.textContent ??
                "");
        })
            .filter((text) => text.length >= 2 && text.length <= 70 && !isBadGameTitle(text));
        if (capsuleTitles[0]) {
            return capsuleTitles[0];
        }
        const roots = heroImages
            .map((image) => image.closest("[class*='BasicUI']") ?? image.closest("[class*='Game']") ?? image.closest("[class*='Panel']") ?? image.parentElement)
            .filter((element) => Boolean(element));
        const scopedElements = roots.flatMap((root) => Array.from(root.querySelectorAll("h1, h2, h3, img[alt], [aria-label], [title]")));
        const candidates = scopedElements
            .filter((element) => !element.closest("button, [role='button'], [class*='TopBar'], [class*='Header'], [class*='Notification'], [class*='Footer']"))
            .map((element) => {
            const tag = element.tagName?.toLowerCase?.() || "";
            const text = cleanTitle((tag === "img" ? element.getAttribute("alt") : "") || element.getAttribute("aria-label") || element.getAttribute("title") || element.innerText || element.textContent || "");
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            const fontSize = Number.parseFloat(style.fontSize) || 0;
            return { text, rect, fontSize };
        })
            .filter(({ text, rect }) => {
            const lower = text.toLowerCase();
            return (!isBadGameTitle(text) &&
                !lower.includes("\n") &&
                rect.width > 20 &&
                rect.height > 8 &&
                rect.bottom > 0 &&
                rect.top < window.innerHeight * 0.72);
        })
            .sort((left, right) => {
            const leftScore = left.fontSize * 2 - Math.abs(left.rect.top - 190) / 20;
            const rightScore = right.fontSize * 2 - Math.abs(right.rect.top - 190) / 20;
            return rightScore - leftScore;
        });
        return candidates[0]?.text || "";
    }
    function getImageSource(image) {
        return image.currentSrc || image.src || image.getAttribute("src") || "";
    }
    function extractCssUrl(value) {
        const match = value.match(/url\((['"]?)(.*?)\1\)/i);
        return match?.[2] ?? "";
    }
    function getElementLogoSource(element) {
        if (element instanceof HTMLImageElement) {
            return getImageSource(element);
        }
        return (extractCssUrl(element.getAttribute("style") ?? "") ||
            extractCssUrl(getComputedStyle(element).backgroundImage) ||
            element.getAttribute("src") ||
            "");
    }
    function elementLooksLikeGameLogo(element, appId) {
        if (element.classList.contains(logoClass)) {
            return false;
        }
        const source = getElementLogoSource(element).toLowerCase();
        const appIdText = String(appId);
        const metadata = [
            source,
            element.getAttribute("alt") ?? "",
            element.getAttribute("aria-label") ?? "",
            element.getAttribute("title") ?? "",
            element.getAttribute("style") ?? "",
            getComputedStyle(element).backgroundImage,
            `${element.className}`,
            `${element.parentElement?.className ?? ""}`
        ].join(" ").toLowerCase();
        const hasAppReference = (metadata.includes(appIdText) ||
            source.includes(`/customimages/${appIdText}`) ||
            source.includes(`\\grid\\${appIdText}`) ||
            source.includes(`/grid/${appIdText}`) ||
            source.includes(`/${appIdText}_`) ||
            source.includes(`\\${appIdText}_`) ||
            source.includes(`/assets/${appIdText}/`) ||
            source.includes(`/apps/${appIdText}/`) ||
            source.includes(`/steam/apps/${appIdText}/`) ||
            source.includes(`/${appIdText}/`));
        const hasLogoHint = (metadata.includes("logo") ||
            source.includes("_logo") ||
            source.includes("steamgriddb") ||
            source.includes("sgdb") ||
            source.includes("/grid/") ||
            source.includes("\\grid\\") ||
            source.includes("/logos/") ||
            source.includes("/logo/"));
        return hasAppReference && hasLogoHint && Boolean(source);
    }
    function isLogoSmallEnoughForAssist(element) {
        const rect = element.getBoundingClientRect();
        const naturalArea = element instanceof HTMLImageElement
            ? (element.naturalWidth || 0) * (element.naturalHeight || 0)
            : 1;
        if (rect.width <= 1 || rect.height <= 1) {
            return naturalArea > 0;
        }
        return rect.width <= 240 || rect.height <= 92 || rect.width * rect.height <= 20000;
    }
    function findTinyGameLogoSource(appId) {
        const selector = [
            "img",
            "[class*='Logo']",
            "[class*='logo']",
            "[style*='Logo']",
            "[style*='logo']",
            "[style*='/customimages/']",
            "[style*='SteamGridDB']",
            "[style*='steamgriddb']",
            "[style*='sgdb']",
            "[style*='config/grid']",
            "[style*='config\\\\grid']",
            "[style*='steamcommunity/public/images/apps']",
            "[style*='/steam/apps/']"
        ].join(",");
        const seen = new Set();
        const candidates = Array.from(document.querySelectorAll(selector))
            .map((element) => {
            const source = getElementLogoSource(element);
            if (!source || seen.has(source)) {
                return undefined;
            }
            seen.add(source);
            if (!elementLooksLikeGameLogo(element, appId) || !isLogoSmallEnoughForAssist(element)) {
                return undefined;
            }
            const rect = element.getBoundingClientRect();
            const lower = source.toLowerCase();
            const area = Math.max(1, rect.width * rect.height);
            const sourceBias = lower.includes("_logo") || lower.includes("/logos/") ? 1000 : 0;
            const visibilityBias = rect.width > 1 && rect.height > 1 ? 300 : 0;
            const sizeBias = Math.min(240, area / 100);
            return { source, score: sourceBias + visibilityBias + sizeBias };
        })
            .filter((candidate) => Boolean(candidate))
            .sort((left, right) => right.score - left.score);
        return candidates[0]?.source;
    }
    function findNativeGameTitleElement(appId) {
        const title = detectGameTitle(appId).trim().toLowerCase();
        if (!title) {
            return undefined;
        }
        return Array.from(document.querySelectorAll("h1, h2, h3, [class]"))
            .filter((element) => !element.closest(`.${logoClass}, .${videoClass}, button, [role='button']`))
            .map((element) => {
            const text = (element.textContent ?? "").replace(/\s+/g, " ").trim().toLowerCase();
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            const transitionBias = style.transitionProperty.includes("opacity") || style.transition.includes("opacity") ? 10000 : 0;
            const area = Math.max(1, rect.width * rect.height);
            return { element, text, rect, score: transitionBias - area };
        })
            .filter(({ text, rect }) => (text === title &&
            rect.width > 20 &&
            rect.height > 8 &&
            rect.bottom > 0 &&
            rect.top < window.innerHeight * 0.72))
            .sort((left, right) => right.score - left.score)[0]?.element;
    }
    function isLogoPosition(value) {
        if (!value || typeof value !== "object") {
            return false;
        }
        const candidate = value;
        const validPins = ["BottomLeft", "UpperLeft", "CenterCenter", "UpperCenter", "BottomCenter"];
        return (Boolean(candidate.pinnedPosition && validPins.includes(candidate.pinnedPosition)) &&
            typeof candidate.nWidthPct === "number" &&
            Number.isFinite(candidate.nWidthPct) &&
            typeof candidate.nHeightPct === "number" &&
            Number.isFinite(candidate.nHeightPct));
    }
    async function waitForValue(read, timeoutMs, intervalMs) {
        const startedAt = Date.now();
        while (Date.now() - startedAt <= timeoutMs) {
            const value = read();
            if (value !== undefined) {
                return value;
            }
            await new Promise((resolve) => window.setTimeout(resolve, intervalMs));
        }
        return undefined;
    }
    function normalizeLogoUrl(value) {
        const trimmed = value?.trim();
        return trimmed || undefined;
    }
    async function getSteamAppOverview(appId) {
        const steamWindow = window;
        return waitForValue(() => steamWindow.appStore?.GetAppOverviewByAppID?.(appId) ?? undefined, 1800, 150);
    }
    function readSteamCustomLogoPosition(overview) {
        const steamWindow = window;
        try {
            const customPosition = steamWindow.appDetailsStore?.GetCustomLogoPosition?.(overview);
            return isLogoPosition(customPosition) ? customPosition : undefined;
        }
        catch {
            return undefined;
        }
    }
    async function saveSteamLogoPosition(overview, position) {
        const steamWindow = window;
        const savePosition = steamWindow.appDetailsStore?.SaveCustomLogoPosition;
        if (!savePosition) {
            return false;
        }
        try {
            await savePosition(overview, position);
            return true;
        }
        catch {
            return false;
        }
    }
    async function clearSteamLogoPosition(appId, overview) {
        const steamWindow = window;
        const clearPosition = steamWindow.appDetailsStore?.ClearCustomLogoPosition;
        try {
            if (clearPosition) {
                await clearPosition(overview);
                return;
            }
        }
        catch {
            // Fall back to SteamClient below.
        }
        try {
            await steamWindow.SteamClient?.Apps?.ClearCustomLogoPositionForApp?.(appId);
        }
        catch {
            // Best-effort restore; Steam may not expose the same method on every build.
        }
    }
    async function getSteamLogoMetadata(appId) {
        const steamWindow = window;
        const overview = await getSteamAppOverview(appId);
        const urls = [];
        let position;
        if (overview) {
            position = readSteamCustomLogoPosition(overview);
            try {
                for (const url of steamWindow.appStore?.GetCustomLogoImageURLs?.(overview) ?? []) {
                    const normalized = normalizeLogoUrl(url);
                    if (normalized && !urls.includes(normalized)) {
                        urls.push(normalized);
                    }
                }
            }
            catch {
                // Custom artwork access is best-effort.
            }
        }
        try {
            const details = steamWindow.appDetailsStore?.GetAppDetails?.(appId);
            const defaultPosition = details?.libraryAssets?.logoPosition;
            if (!position && isLogoPosition(defaultPosition)) {
                position = defaultPosition;
            }
            const defaultLogo = normalizeLogoUrl(details?.libraryAssets?.strLogoImage);
            if (defaultLogo && !urls.includes(defaultLogo)) {
                urls.push(defaultLogo);
            }
        }
        catch {
            // Some Steam builds expose app details lazily.
        }
        return { position, urls };
    }
    function createStyle(settings) {
        return `
      .${targetClass} {
        position: relative !important;
        overflow: hidden !important;
        isolation: isolate !important;
      }

      .${hostClass} {
        position: relative !important;
        overflow: hidden !important;
        isolation: isolate !important;
        pointer-events: none !important;
        z-index: 1 !important;
        contain: layout paint style !important;
        right: auto !important;
        bottom: auto !important;
      }


      .${videoClass} {
        position: absolute !important;
        inset: 0 !important;
        width: 100% !important;
        height: 100% !important;
        object-fit: cover !important;
        pointer-events: none !important;
        opacity: 0 !important;
        transform: scale(1.015) !important;
        transition: opacity 1200ms ease, transform 7000ms ease !important;
        z-index: 1 !important;
        background: #000 !important;
      }

      .${videoClass}.${visibleClass} {
        opacity: ${settings.opacity} !important;
        transform: scale(1.04) !important;
      }

      .${videoClass}.${crtClass} {
        filter: contrast(1.2) saturate(1.12) brightness(0.92) !important;
      }

      .${videoClass}.${youtubeClass} {
        inset: auto !important;
        left: -11% !important;
        top: 50% !important;
        width: 122% !important;
        height: max(138%, 68.625vw) !important;
        transform: translateY(-50%) scale(1.02) !important;
      }

      .${videoClass}.${youtubeClass}.${visibleClass} {
        opacity: ${settings.opacity} !important;
        transform: translateY(-50%) scale(1.06) !important;
      }

      .${targetClass}.${readyClass}::after {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 2;
        opacity: 0.38;
        background:
          linear-gradient(90deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.18) 48%, rgba(0, 0, 0, 0.52)),
          linear-gradient(0deg, rgba(0, 0, 0, 0.72), rgba(0, 0, 0, 0.04) 42%);
      }

      .${targetClass}.${crtClass}::before {
        content: "";
        position: absolute;
        inset: 0;
        pointer-events: none;
        z-index: 3;
        opacity: 0.28;
        mix-blend-mode: soft-light;
        background:
          repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, 0.22) 0,
            rgba(255, 255, 255, 0.22) 1px,
            rgba(0, 0, 0, 0.4) 2px,
            rgba(0, 0, 0, 0.4) 4px
          ),
          radial-gradient(circle at center, transparent 42%, rgba(0, 0, 0, 0.32) 100%);
      }

      .${logoClass} {
        position: absolute !important;
        left: clamp(36px, 5vw, 76px) !important;
        bottom: clamp(44px, 8vh, 96px) !important;
        width: min(420px, 34vw) !important;
        height: auto !important;
        max-height: min(156px, 22vh) !important;
        object-fit: contain !important;
        object-position: left bottom !important;
        pointer-events: none !important;
        opacity: 0 !important;
        transform: translateY(8px) scale(0.98) !important;
        transition: opacity 1100ms ease, transform 1100ms ease !important;
        z-index: 5 !important;
        filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.62)) !important;
      }

      .${logoClass}.${visibleClass} {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
      }

      .${nativeLogoClass} {
        opacity: 0 !important;
        transition: none !important;
      }

      .${nativeLogoClass}.${visibleClass} {
        opacity: 1 !important;
        transition: opacity 1100ms ease !important;
      }
    `;
    }
    function extractYouTubeId(value) {
        const trimmed = value.trim();
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube-nocookie\.com\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{11})/,
            /^([A-Za-z0-9_-]{11})$/
        ];
        for (const pattern of patterns) {
            const match = trimmed.match(pattern);
            if (match?.[1]) {
                return match[1];
            }
        }
        return undefined;
    }
    class Runtime {
        constructor(settings) {
            this.version = runtimeVersion;
            this.preferredSource = "auto";
            this.steamMovies = [];
            this.needsSteamAppSearch = false;
            this.needsYouTubeSearch = false;
            this.status = rt("waitingGamePage");
            this.requestToken = 0;
            this.trailerCache = new Map();
            this.scanQueued = false;
            this.launchSuppressedUntil = 0;
            this.trailerAudioEnabled = settings.defaultAudio === "trailer";
            this.lastSecondaryPressAt = 0;
            this.handleRouteChange = () => {
                this.launchSuppressedUntil = 0;
                this.cleanupVideo(true);
                this.queueScan();
            };
            this.handleBeforeUnload = () => {
                void this.restoreSteamLogoPosition();
            };
            this.handleVisibilityChange = () => {
                if (!document.hidden) {
                    this.queueScan();
                }
            };
            this.handleLaunchIntent = (event) => {
                this.stopTrailerForLaunch(event.target);
            };
            this.handleLaunchKeyDown = (event) => {
                if ((event.code === "KeyX" || event.key?.toLowerCase?.() === "x") &&
                    !(event.target instanceof HTMLInputElement) &&
                    !(event.target instanceof HTMLTextAreaElement) &&
                    this.toggleTrailerAudio()) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }
                if (event.key !== "Enter" && event.key !== " ") {
                    return;
                }
                this.stopTrailerForLaunch(event.target ?? document.activeElement);
            };
            this.handleGamepadButtonDown = (event) => {
                if (Number(event?.detail?.button) !== 3 || event?.detail?.is_repeat) {
                    return;
                }
                const now = Date.now();
                if (now - this.lastSecondaryPressAt < 350) {
                    return;
                }
                if (!this.toggleTrailerAudio()) {
                    return;
                }
                this.lastSecondaryPressAt = now;
                event.preventDefault?.();
                event.stopPropagation?.();
                event.stopImmediatePropagation?.();
            };
            this.settings = settings;
        }
        mount() {
            this.installStyle();
            this.cleanupVideo();
            if (this.settings.youtubeEnabled) {
                this.ensureYouTubePreconnect();
            }
            this.observer = new MutationObserver((mutations) => {
                if (mutations.some((mutation) => this.shouldQueueScanForMutation(mutation))) {
                    this.queueScan();
                }
            });
            this.observer.observe(document.body, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ["style", "src", "href", "class"]
            });
            document.addEventListener("pointerdown", this.handleLaunchIntent, true);
            document.addEventListener("click", this.handleLaunchIntent, true);
            document.addEventListener("keydown", this.handleLaunchKeyDown, true);
            document.addEventListener("vgp_onbuttondown", this.handleGamepadButtonDown, true);
            window.addEventListener("hashchange", this.handleRouteChange);
            window.addEventListener("popstate", this.handleRouteChange);
            window.addEventListener("beforeunload", this.handleBeforeUnload);
            document.addEventListener("visibilitychange", this.handleVisibilityChange);
            this.scanTimer = setInterval(() => {
                if (!document.hidden) {
                    this.scan();
                }
            }, scanIntervalMs);
            this.scan();
        }
        update(settings) {
            const previousSettings = this.settings;
            this.settings = settings;
            this.installStyle();
            if (settings.youtubeEnabled) {
                this.ensureYouTubePreconnect();
            }
            if (previousSettings.defaultAudio !== settings.defaultAudio) {
                this.setTrailerAudioEnabled(settings.defaultAudio === "trailer");
            }
            if (!settings.enabled) {
                this.cleanupVideo(true);
                this.status = rt("disabled");
                return this.snapshot();
            }
            const youtubeDirectStreamsChanged = JSON.stringify(previousSettings.youtubeDirectStreams) !== JSON.stringify(settings.youtubeDirectStreams);
            const youtubePlaybackModeChanged = previousSettings.youtubePlaybackMode !== settings.youtubePlaybackMode;
            const directYouTubeChangeAffectsCurrentMedia = Boolean(this.currentYouTubeVideoId) &&
                (youtubeDirectStreamsChanged || youtubePlaybackModeChanged);
            if (previousSettings.qualityHeight !== settings.qualityHeight ||
                previousSettings.logoAssistEnabled !== settings.logoAssistEnabled ||
                previousSettings.crtLowResEnabled !== settings.crtLowResEnabled ||
                previousSettings.youtubeEnabled !== settings.youtubeEnabled ||
                previousSettings.youtubeAutoSearch !== settings.youtubeAutoSearch ||
                directYouTubeChangeAffectsCurrentMedia ||
                JSON.stringify(previousSettings.preferredSources) !== JSON.stringify(settings.preferredSources) ||
                JSON.stringify(previousSettings.steamAppOverrides) !== JSON.stringify(settings.steamAppOverrides) ||
                JSON.stringify(previousSettings.steamMovieOverrides) !== JSON.stringify(settings.steamMovieOverrides) ||
                JSON.stringify(previousSettings.trimStartOverrides) !== JSON.stringify(settings.trimStartOverrides) ||
                JSON.stringify(previousSettings.trimEndOverrides) !== JSON.stringify(settings.trimEndOverrides) ||
                JSON.stringify(previousSettings.crtOverrides) !== JSON.stringify(settings.crtOverrides) ||
                JSON.stringify(previousSettings.youtubeVideos) !== JSON.stringify(settings.youtubeVideos) ||
                JSON.stringify(previousSettings.youtubeQueries) !== JSON.stringify(settings.youtubeQueries) ||
                JSON.stringify(previousSettings.localTrailers) !== JSON.stringify(settings.localTrailers)) {
                this.trailerCache.clear();
                this.cleanupVideo(true);
            }
            this.scan();
            return this.snapshot();
        }
        forceScan() {
            this.trailerCache.clear();
            this.cleanupVideo(true);
            this.scan();
            return this.snapshot();
        }
        snapshot() {
            return {
                appId: this.currentAppId,
                status: this.status,
                trailerName: this.currentTrailerName,
                gameTitle: this.currentGameTitle,
                needsSteamAppSearch: this.needsSteamAppSearch,
                steamAppSearchTitle: this.currentSteamAppSearchTitle,
                needsYouTubeSearch: this.needsYouTubeSearch,
                needsYouTubeDirectResolve: this.needsYouTubeDirectResolve,
                youtubeDirectResolveKey: this.youtubeDirectResolveKey,
                youtubeVideoId: this.currentYouTubeVideoId,
                preferredSource: this.preferredSource,
                sourceAppId: this.currentSourceAppId,
                selectedSteamMovieId: this.selectedSteamMovieId,
                steamMovies: this.steamMovies,
                lastPlaybackError: this.lastPlaybackError,
                candidateIndex: this.currentCandidateIndex,
                candidateCount: this.currentCandidateCount,
                trailerAudioEnabled: this.trailerAudioEnabled,
                trimStartSeconds: this.currentAppId ? this.getTrimStart(this.currentAppId) : defaultTrimStartSeconds,
                trimEndSeconds: this.currentAppId ? this.getTrimEnd(this.currentAppId) : defaultTrimEndSeconds
            };
        }
        destroy() {
            this.requestToken += 1;
            this.observer?.disconnect();
            if (this.scanTimer) {
                clearInterval(this.scanTimer);
            }
            window.removeEventListener("hashchange", this.handleRouteChange);
            window.removeEventListener("popstate", this.handleRouteChange);
            window.removeEventListener("beforeunload", this.handleBeforeUnload);
            document.removeEventListener("pointerdown", this.handleLaunchIntent, true);
            document.removeEventListener("click", this.handleLaunchIntent, true);
            document.removeEventListener("keydown", this.handleLaunchKeyDown, true);
            document.removeEventListener("vgp_onbuttondown", this.handleGamepadButtonDown, true);
            document.removeEventListener("visibilitychange", this.handleVisibilityChange);
            this.cleanupVideo();
            document.getElementById(styleId)?.remove();
        }
        installStyle() {
            let style = document.getElementById(styleId);
            if (!style) {
                style = document.createElement("style");
                style.id = styleId;
                document.head.appendChild(style);
            }
            style.textContent = createStyle(this.settings);
        }
        shouldQueueScanForMutation(mutation) {
            const target = mutation.target instanceof HTMLElement ? mutation.target : undefined;
            if (target?.closest(`.${videoClass}, .${youtubeMaskClass}, .${logoClass}`)) {
                return false;
            }
            if (mutation.type === "attributes" && target) {
                const assetText = getElementAssetText(target).toLowerCase();
                return (assetText.includes("library_hero") ||
                    assetText.includes("_hero") ||
                    assetText.includes("customimages"));
            }
            return true;
        }
        stopTrailerForLaunch(target) {
            if (!this.settings.stopOnLaunchEnabled ||
                !this.currentAppId ||
                !(target instanceof HTMLElement) ||
                !isLaunchActionElement(target)) {
                return;
            }
            this.launchSuppressedUntil = Date.now() + launchSuppressionMs;
            this.cleanupVideo(true);
            this.status = rt("stoppedForLaunch");
        }
        getActivityWindows() {
            const targets = [window];
            try {
                if (window.opener && !targets.includes(window.opener)) {
                    targets.push(window.opener);
                }
            }
            catch {
            }
            return targets;
        }
        publishTrailerAudioActivity(active) {
            const signal = {
                active,
                status: active ? "Playing" : "Paused",
                source: "trailerhero",
                player: "TrailerHero",
                updatedAt: Date.now()
            };
            for (const target of this.getActivityWindows()) {
                try {
                    const current = target[themeDeckActivityGlobal];
                    if (active || !current || current.source === "trailerhero") {
                        target[themeDeckActivityGlobal] = signal;
                    }
                    target.dispatchEvent(new target.CustomEvent(themeDeckActivityEvent, { detail: signal }));
                }
                catch {
                }
            }
        }
        applyCurrentMediaAudioState() {
            const enabled = this.trailerAudioEnabled;
            if (this.currentVideo) {
                const separateAudio = Boolean(this.currentAudio?.isConnected);
                this.currentVideo.muted = !enabled || separateAudio;
                this.currentVideo.defaultMuted = !enabled || separateAudio;
                this.currentVideo.volume = enabled && !separateAudio ? 1 : 0;
                if (enabled && this.currentVideo.paused) {
                    this.currentVideo.play().catch(() => undefined);
                }
            }
            if (this.currentAudio) {
                this.currentAudio.muted = !enabled;
                this.currentAudio.defaultMuted = !enabled;
                this.currentAudio.volume = enabled ? 1 : 0;
                if (enabled) {
                    this.syncAudioTrack();
                    this.currentAudio.play().catch(() => undefined);
                }
            }
            if (this.currentFrame?.contentWindow) {
                for (const command of enabled
                    ? [{ event: "command", func: "setVolume", args: [100] }, { event: "command", func: "unMute", args: [] }]
                    : [{ event: "command", func: "mute", args: [] }]) {
                    try {
                        this.currentFrame.contentWindow.postMessage(JSON.stringify(command), "*");
                    }
                    catch {
                    }
                }
            }
        }
        setTrailerAudioEnabled(enabled) {
            const hasVideo = Boolean(this.currentVideo?.isConnected);
            const hasFrame = Boolean(this.currentFrame?.isConnected);
            if (enabled && !hasVideo && !hasFrame) {
                return false;
            }
            if (this.trailerAudioEnabled === enabled) {
                this.updateAudioHint();
                return hasVideo || hasFrame;
            }
            this.trailerAudioEnabled = enabled;
            this.applyCurrentMediaAudioState();
            if (this.audioActivityTimer) {
                clearInterval(this.audioActivityTimer);
                this.audioActivityTimer = undefined;
            }
            for (const timer of this.audioActivityWarmupTimers ?? []) {
                clearTimeout(timer);
            }
            this.audioActivityWarmupTimers = [];
            this.publishTrailerAudioActivity(enabled);
            if (enabled) {
                this.audioActivityWarmupTimers = [120, 450, 900].map((delay) => setTimeout(() => {
                    if (this.trailerAudioEnabled) {
                        this.applyCurrentMediaAudioState();
                        this.publishTrailerAudioActivity(true);
                    }
                }, delay));
                this.audioActivityTimer = setInterval(() => {
                    if (!this.trailerAudioEnabled ||
                        (!this.currentVideo?.isConnected && !this.currentFrame?.isConnected) ||
                        !isProbablyGameDetailsPage()) {
                        this.setTrailerAudioEnabled(false);
                        return;
                    }
                    this.applyCurrentMediaAudioState();
                    this.publishTrailerAudioActivity(true);
                }, 2000);
            }
            this.updateAudioHint();
            return true;
        }
        toggleTrailerAudio() {
            if (!isProbablyGameDetailsPage()) {
                return false;
            }
            return this.setTrailerAudioEnabled(!this.trailerAudioEnabled);
        }
        removeAudioHint() {
            document.getElementById(audioHintId)?.remove();
        }
        updateAudioHint(gameDetails = isProbablyGameDetailsPage()) {
            const hasMedia = Boolean(this.currentVideo?.isConnected || this.currentFrame?.isConnected);
            if (!gameDetails || !hasMedia) {
                this.removeAudioHint();
                return;
            }
            const footer = document.querySelector("#Footer > div");
            if (!(footer instanceof HTMLElement)) {
                return;
            }
            let hint = document.getElementById(audioHintId);
            if (!hint || hint.parentElement !== footer) {
                hint?.remove();
                const template = Array.from(footer.children).find((element) => element.querySelector("img[src*='shared_button_a'], img[src*='shared_button_b']")) ??
                    Array.from(footer.children).find((element) => element.querySelector("img"));
                if (!(template instanceof HTMLElement)) {
                    return;
                }
                hint = template.cloneNode(true);
                hint.id = audioHintId;
                const firstAction = Array.from(footer.children).find((element) => element !== hint && element.querySelector("img[src*='shared_button_a']"));
                footer.insertBefore(hint, firstAction ?? null);
            }
            const glyph = hint.querySelector("img");
            if (glyph) {
                glyph.src = "/steaminputglyphs/shared_button_x.svg";
                glyph.alt = "";
            }
            const label = Array.from(hint.querySelectorAll("div")).find((element) => !element.querySelector("img") && element.children.length === 0);
            if (label) {
                label.textContent = rt(this.trailerAudioEnabled ? "themeDeckAudio" : "trailerAudio");
            }
        }
        queueScan() {
            if (this.scanQueued) {
                return;
            }
            this.scanQueued = true;
            window.setTimeout(() => {
                this.scanQueued = false;
                this.scan();
            }, scanQueueDelayMs);
        }
        async scan() {
            if (!this.settings.enabled || document.hidden) {
                return;
            }
            if (this.settings.stopOnLaunchEnabled && Date.now() < this.launchSuppressedUntil) {
                if (this.currentVideo?.isConnected || this.currentFrame?.isConnected || this.pendingAppId) {
                    this.cleanupVideo(true);
                }
                this.status = rt("stoppedForLaunch");
                return;
            }
            const isGameDetails = isProbablyGameDetailsPage();
            this.updateAudioHint(isGameDetails);
            if (!document.body || !isGameDetails) {
                this.currentAppId = undefined;
                this.currentSourceAppId = undefined;
                this.currentTrailerName = undefined;
                this.currentGameTitle = undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.preferredSource = "auto";
                this.needsSteamAppSearch = false;
                this.currentSteamAppSearchTitle = undefined;
                this.needsYouTubeSearch = false;
                this.cleanupVideo(true);
                this.status = rt("waitingGamePage");
                return;
            }
            const locationAppId = detectLocationAppId();
            const hero = findHeroCandidate();
            const appId = locationAppId ?? hero?.appId;
            if (!appId || !hero) {
                this.currentAppId = appId;
                this.currentSourceAppId = appId ? this.getSourceAppId(appId) : undefined;
                this.currentTrailerName = undefined;
                this.currentGameTitle = appId ? detectGameTitle(appId) : undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.preferredSource = appId ? this.getPreferredSource(appId) : "auto";
                this.needsSteamAppSearch = false;
                this.currentSteamAppSearchTitle = undefined;
                this.needsYouTubeSearch = false;
                this.needsYouTubeDirectResolve = false;
                this.youtubeDirectResolveKey = undefined;
                this.currentYouTubeVideoId = undefined;
                this.cleanupVideo(true);
                this.status = appId ? rt("statusHeroNotFound", { appId }) : rt("noGameRecognized");
                return;
            }
            this.currentAppId = appId;
            this.currentSourceAppId = this.getSourceAppId(appId);
            this.preferredSource = this.getPreferredSource(appId);
            this.currentGameTitle = detectGameTitle(appId);
            this.needsSteamAppSearch = false;
            this.currentSteamAppSearchTitle = undefined;
            this.needsYouTubeSearch = false;
            const desiredMediaSignature = this.getDesiredMediaSignature(appId);
            if (this.settings.blockedApps.includes(appId)) {
                this.currentTrailerName = undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.needsSteamAppSearch = false;
                this.currentSteamAppSearchTitle = undefined;
                this.needsYouTubeDirectResolve = false;
                this.youtubeDirectResolveKey = undefined;
                this.currentYouTubeVideoId = undefined;
                this.cleanupVideo(true);
                this.status = rt("statusAppBlocked", { appId });
                return;
            }
            if (this.currentTarget === hero.element &&
                this.currentMediaAppId === appId &&
                this.currentMediaSignature === desiredMediaSignature &&
                (this.currentVideo?.isConnected || this.currentFrame?.isConnected)) {
                return;
            }
            if (this.pendingTarget === hero.element &&
                this.pendingAppId === appId &&
                this.pendingRequestToken === this.requestToken) {
                return;
            }
            this.needsYouTubeDirectResolve = false;
            this.youtubeDirectResolveKey = undefined;
            this.currentYouTubeVideoId = undefined;
            this.cleanupVideo();
            this.currentTarget = hero.element;
            this.status = rt("searchTrailerForApp", { appId });
            const token = ++this.requestToken;
            const youtubeId = this.getYouTubeId(appId);
            const localTrailer = this.settings.localTrailers?.[String(appId)];
            if (this.preferredSource === "local" && localTrailer?.videoUrl) {
                this.currentTrailerName = localTrailer.title || rt("trailerActive");
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.needsYouTubeSearch = false;
                this.attachVideo(hero.element, appId, [localTrailer.videoUrl], token, {
                    mediaSignature: desiredMediaSignature,
                    audioCandidates: localTrailer.audioUrl ? [localTrailer.audioUrl] : []
                });
                return;
            }
            if (this.shouldResolveSteamAppId(appId)) {
                this.currentTrailerName = undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.needsSteamAppSearch = true;
                this.currentSteamAppSearchTitle = this.currentGameTitle;
                this.needsYouTubeSearch = false;
                this.status = rt("searchingSteamStore", { title: this.currentGameTitle });
                return;
            }
            if (this.preferredSource === "youtube" && youtubeId) {
                this.currentTrailerName = rt("youtubeTrailer");
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.needsYouTubeSearch = false;
                this.attachYouTubeForMode(hero.element, appId, youtubeId, token, {
                    mediaSignature: desiredMediaSignature
                });
                return;
            }
            this.pendingAppId = appId;
            this.pendingTarget = hero.element;
            this.pendingRequestToken = token;
            const trailer = await this.getTrailer(appId, this.currentSourceAppId);
            if (token !== this.requestToken) {
                this.clearPendingRequest(token);
                return;
            }
            this.clearPendingRequest(token);
            this.steamMovies = trailer.movies ?? [];
            this.selectedSteamMovieId = trailer.selectedMovieId;
            this.currentSourceAppId = trailer.sourceAppId ?? this.currentSourceAppId;
            if (!trailer.ok || !trailer.candidates?.length) {
                if (this.preferredSource !== "steam" && youtubeId) {
                    this.currentTrailerName = rt("youtubeTrailer");
                    this.needsYouTubeSearch = false;
                    this.attachYouTubeForMode(hero.element, appId, youtubeId, token, {
                        mediaSignature: desiredMediaSignature
                    });
                    return;
                }
                this.currentTrailerName = undefined;
                this.needsYouTubeSearch = this.settings.youtubeEnabled && this.settings.youtubeAutoSearch && Boolean(this.currentGameTitle);
                this.status = this.settings.youtubeEnabled
                    ? this.needsYouTubeSearch
                        ? rt("searchingYouTube", { title: this.currentGameTitle })
                        : `${trailer.error ?? rt("noTrailerForApp", { appId })} - ${rt("addYouTubeLink")}`
                    : trailer.error ?? rt("noTrailerForApp", { appId });
                return;
            }
            this.currentTrailerName = trailer.name;
            this.needsYouTubeSearch = false;
            this.attachVideo(hero.element, appId, this.orderCandidates(trailer.candidates), token, {
                mediaSignature: desiredMediaSignature
            });
        }
        getPreferredSource(appId) {
            return this.settings.preferredSources[String(appId)] ?? "auto";
        }
        hasSteamAppOverride(appId) {
            const override = this.settings.steamAppOverrides[String(appId)];
            return Number.isInteger(override) && override > 0;
        }
        getSourceAppId(appId) {
            const override = this.settings.steamAppOverrides[String(appId)];
            return Number.isInteger(override) && override > 0 ? override : appId;
        }
        getDesiredMediaSignature(appId) {
            const source = this.getPreferredSource(appId);
            const sourceAppId = this.getSourceAppId(appId);
            const selectedMovie = this.settings.steamMovieOverrides[String(appId)] ?? "auto";
            const youtubeId = this.getYouTubeId(appId) ?? "";
            const trimStart = this.getTrimStart(appId);
            const trimEnd = this.getTrimEnd(appId);
            const crt = this.getCrtPreference(appId);
            const localTrailer = this.settings.localTrailers?.[String(appId)];
            return [
                source,
                sourceAppId,
                selectedMovie,
                youtubeId,
                this.settings.qualityHeight,
                trimStart,
                trimEnd,
                crt,
                this.settings.youtubePlaybackMode,
                localTrailer?.sha256 ?? "",
                localTrailer?.videoUrl ?? ""
            ].join(":");
        }
        getSteamSearchFailure(appId) {
            const entry = this.settings.steamAutoSearchFailures?.[String(appId)];
            if (!entry || typeof entry !== "object") {
                return undefined;
            }
            if (Date.now() - Number(entry.createdAt || 0) > 24 * 60 * 60 * 1000) {
                return undefined;
            }
            const titleKey = normalizeSteamLookupTitle(this.currentGameTitle || "");
            return entry.titleKey === titleKey ? entry : undefined;
        }
        shouldResolveSteamAppId(appId) {
            return (isLikelyNonSteamShortcutAppId(appId) &&
                this.preferredSource !== "youtube" &&
                !this.hasSteamAppOverride(appId) &&
                Boolean(this.currentGameTitle) &&
                !this.getSteamSearchFailure(appId));
        }
        getTrimStart(appId) {
            return this.settings.trimStartOverrides[String(appId)] ?? defaultTrimStartSeconds;
        }
        getTrimEnd(appId) {
            return this.settings.trimEndOverrides[String(appId)] ?? defaultTrimEndSeconds;
        }
        getCrtPreference(appId) {
            return this.settings.crtOverrides[String(appId)] ?? "auto";
        }
        shouldApplyCrt(appId, automaticMatch) {
            const preference = this.getCrtPreference(appId);
            if (preference === "on") {
                return true;
            }
            if (preference === "off") {
                return false;
            }
            return this.settings.crtLowResEnabled && automaticMatch;
        }
        getYouTubeQuality() {
            if (this.settings.qualityHeight >= 2160) {
                return "highres";
            }
            if (this.settings.qualityHeight >= 1080) {
                return "hd1080";
            }
            return "hd720";
        }
        getYouTubeId(appId) {
            if (!this.settings.youtubeEnabled) {
                return undefined;
            }
            const value = this.settings.youtubeVideos[String(appId)];
            return value ? extractYouTubeId(value) : undefined;
        }
        clearPendingRequest(token) {
            if (token !== undefined && this.pendingRequestToken !== token) {
                return;
            }
            this.pendingAppId = undefined;
            this.pendingTarget = undefined;
            this.pendingRequestToken = undefined;
        }
        async getTrailer(appId, sourceAppId) {
            const selectedOverride = this.settings.steamMovieOverrides[String(appId)];
            const cacheKey = `${appId}:${sourceAppId}:${selectedOverride ?? "auto"}`;
            const cached = this.trailerCache.get(cacheKey);
            if (cached) {
                return cached;
            }
            try {
                const response = await fetch(`https://store.steampowered.com/api/appdetails?appids=${sourceAppId}&filters=movies`);
                const payload = await response.json();
                const movies = payload?.[String(sourceAppId)]?.data?.movies ?? [];
                const movieChoices = movies
                    .map((entry) => ({
                    id: String(entry.id ?? ""),
                    name: entry.name ?? `${rt("steamTrailer")} ${entry.id ?? ""}`,
                    highlight: Boolean(entry.highlight)
                }))
                    .filter((entry) => entry.id);
                if (!movies.length) {
                    return this.rememberTrailer(cacheKey, {
                        ok: false,
                        error: rt("noSteamTrailer"),
                        movies: [],
                        sourceAppId
                    });
                }
                const movie = (movies.find((entry) => String(entry.id) === selectedOverride) ??
                    movies.find((entry) => entry.highlight) ??
                    movies[0]);
                const movieId = movie?.id;
                if (!movieId) {
                    return this.rememberTrailer(cacheKey, {
                        ok: false,
                        error: rt("steamTrailerNoPlayableId"),
                        movies: movieChoices,
                        sourceAppId
                    });
                }
                const sharedBase = `https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${movieId}`;
                const cdnBase = `https://cdn.akamai.steamstatic.com/steam/apps/${movieId}`;
                const declaredCandidates = [];
                for (const groupName of ["mp4", "webm"]) {
                    const group = movie[groupName];
                    if (group && typeof group === "object") {
                        for (const quality of ["max", "2160", "1440", "1080", "720", "480"]) {
                            const url = group[quality];
                            if (typeof url === "string" && url.startsWith("http")) {
                                declaredCandidates.push(url);
                            }
                        }
                    }
                }
                const directMovieFiles = [
                    "movie2160.mp4",
                    "movie1440.mp4",
                    "movie1080.mp4",
                    "movie720.mp4",
                    "movie_max.mp4",
                    "movie480.mp4"
                ];
                const candidates = [...declaredCandidates];
                if (movie.hls_h264) {
                    candidates.push(movie.hls_h264);
                }
                if (movie.dash_h264) {
                    candidates.push(movie.dash_h264);
                }
                if (movie.dash_av1) {
                    candidates.push(movie.dash_av1);
                }
                candidates.push(...directMovieFiles.map((file) => `${sharedBase}/${file}`));
                candidates.push(...directMovieFiles.map((file) => `${cdnBase}/${file}`));
                return this.rememberTrailer(cacheKey, {
                    ok: true,
                    name: movie.name ?? rt("steamTrailer"),
                    candidates: candidates.filter((url, index, urls) => url && urls.indexOf(url) === index),
                    movies: movieChoices,
                    selectedMovieId: String(movieId),
                    sourceAppId
                });
            }
            catch (error) {
                const message = error instanceof Error ? error.message : rt("steamTrailerNotPlayable");
                return { ok: false, error: message, movies: [], sourceAppId };
            }
        }
        orderCandidates(candidates) {
            const score = (url) => {
                const isHls = url.includes(".m3u8");
                const isDash = url.includes(".mpd");
                const isMax = url.includes("movie_max");
                const is480 = url.includes("movie480");
                const isGeneratedFallback = /\/movie(?:2160|1440|1080|720|480|_max)\.mp4$/i.test(url);
                const explicitHeight = Number(url.match(/movie(\d{3,4})/i)?.[1] ?? 0);
                const height = explicitHeight || (isMax ? 1080 : this.settings.qualityHeight);
                if (this.settings.qualityHeight <= 480) {
                    if (is480) {
                        return 0;
                    }
                    if (isDash || isHls) {
                        return 1;
                    }
                    if (isMax) {
                        return 2;
                    }
                    return 3;
                }
                if (is480) {
                    return 10000;
                }
                const distance = Math.abs(height - this.settings.qualityHeight);
                const exactOrHigherBias = height >= this.settings.qualityHeight ? -0.25 : 0;
                const adaptivePenalty = isDash ? 0.35 : isHls ? 0.45 : 0;
                const generatedFallbackPenalty = isGeneratedFallback ? 2400 : 0;
                return distance + adaptivePenalty + exactOrHigherBias + generatedFallbackPenalty;
            };
            return [...candidates].sort((left, right) => score(left) - score(right));
        }
        rememberTrailer(cacheKey, result) {
            this.trailerCache.set(cacheKey, result);
            return result;
        }
        syncAudioTrack() {
            const video = this.currentVideo;
            const audio = this.currentAudio;
            if (!video || !audio || !Number.isFinite(video.currentTime) || audio.readyState < 1) {
                return;
            }
            if (Math.abs(audio.currentTime - video.currentTime) > 0.35) {
                try {
                    audio.currentTime = Math.max(0, video.currentTime);
                }
                catch {
                }
            }
        }
        attachAudioTrack(video, candidates, token) {
            const urls = candidates
                .map((candidate) => typeof candidate === "string" ? candidate : candidate?.url)
                .filter((url) => typeof url === "string" && url.startsWith("http"));
            if (!urls.length) {
                return;
            }
            const audio = document.createElement("audio");
            audio.className = audioClass;
            audio.autoplay = true;
            audio.loop = true;
            audio.muted = true;
            audio.defaultMuted = true;
            audio.volume = 0;
            audio.preload = "auto";
            audio.style.display = "none";
            audio.setAttribute("aria-hidden", "true");
            let index = 0;
            const loadNext = () => {
                if (token !== this.requestToken || !audio.isConnected) {
                    return;
                }
                const source = urls[index++];
                if (!source) {
                    if (this.currentAudio === audio) {
                        this.currentAudio = undefined;
                    }
                    audio.remove();
                    return;
                }
                audio.src = source;
                audio.load();
            };
            audio.addEventListener("canplay", () => {
                if (token !== this.requestToken || !audio.isConnected) {
                    return;
                }
                this.syncAudioTrack();
                audio.muted = !this.trailerAudioEnabled;
                audio.defaultMuted = !this.trailerAudioEnabled;
                audio.volume = this.trailerAudioEnabled ? 1 : 0;
                audio.play().catch(() => undefined);
            });
            audio.addEventListener("error", loadNext);
            video.addEventListener("loadedmetadata", () => this.syncAudioTrack());
            video.addEventListener("seeked", () => this.syncAudioTrack());
            video.addEventListener("timeupdate", () => this.syncAudioTrack());
            video.addEventListener("play", () => audio.play().catch(() => undefined));
            video.addEventListener("pause", () => audio.pause());
            document.body.appendChild(audio);
            this.currentAudio = audio;
            loadNext();
        }
        attachVideo(target, appId, candidates, token, options = {}) {
            const host = this.prepareHost(target);
            const video = document.createElement("video");
            video.className = videoClass;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.defaultMuted = true;
            video.playsInline = true;
            video.preload = "auto";
            video.volume = 0;
            video.setAttribute("playsinline", "true");
            video.setAttribute("webkit-playsinline", "true");
            video.setAttribute("aria-hidden", "true");
            video.addEventListener("loadedmetadata", () => {
                this.seekPastIntro(video);
                this.applyLowResCrt(host, video);
            });
            video.addEventListener("timeupdate", () => this.loopBeforeOutro(video));
            let candidateIndex = 0;
            let candidateAttempt = 0;
            let readyCandidateIndex = -1;
            const clearCandidateWatchdog = () => {
                if (this.candidateWatchdog) {
                    clearTimeout(this.candidateWatchdog);
                    this.candidateWatchdog = undefined;
                }
            };
            const advanceCandidate = (reason) => {
                clearCandidateWatchdog();
                if (this.fadeTimer) {
                    clearTimeout(this.fadeTimer);
                    this.fadeTimer = undefined;
                }
                this.lastPlaybackError = reason;
                video.pause();
                video.classList.remove(visibleClass);
                host.classList.remove(readyClass);
                candidateIndex += 1;
                tryCandidate();
            };
            const tryCandidate = () => {
                clearCandidateWatchdog();
                if (token !== this.requestToken || !video.isConnected) {
                    return;
                }
                const attempt = ++candidateAttempt;
                readyCandidateIndex = -1;
                video.classList.remove(visibleClass);
                host.classList.remove(readyClass);
                this.currentCandidateIndex = candidateIndex;
                this.currentCandidateCount = candidates.length;
                const source = candidates[candidateIndex];
                if (!source) {
                    if (this.currentVideo === video) {
                        this.cleanupVideo();
                    }
                    if (typeof options.onFailure === "function") {
                        options.onFailure();
                        return;
                    }
                    this.status = options.failureStatus ?? rt("steamTrailerNotPlayable");
                    return;
                }
                if (source.includes(".mpd")) {
                    this.playDash(video, source, token).catch(() => {
                        if (attempt !== candidateAttempt) {
                            return;
                        }
                        candidateIndex += 1;
                        tryCandidate();
                    });
                    return;
                }
                if (source.includes(".m3u8")) {
                    this.playHls(video, source, token).catch(() => {
                        if (attempt !== candidateAttempt) {
                            return;
                        }
                        candidateIndex += 1;
                        tryCandidate();
                    });
                    return;
                }
                video.dataset.trailerheroLowResHint = source.includes("movie480") ? "1" : "";
                video.src = source;
                video.load();
                this.candidateWatchdog = setTimeout(() => {
                    if (attempt !== candidateAttempt || token !== this.requestToken || !video.isConnected || readyCandidateIndex === candidateIndex) {
                        return;
                    }
                    advanceCandidate(`Steam video timeout: ${source}`);
                }, 8000);
            };
            const onCanPlay = () => {
                if (token !== this.requestToken) {
                    return;
                }
                clearCandidateWatchdog();
                if (readyCandidateIndex === candidateIndex) {
                    if (video.paused) {
                        video.play().catch(() => undefined);
                    }
                    return;
                }
                readyCandidateIndex = candidateIndex;
                this.lastPlaybackError = undefined;
                host.classList.add(targetClass, readyClass);
                this.currentVideo = video;
                this.currentMediaAppId = appId;
                this.currentMediaSignature = options.mediaSignature ?? this.getDesiredMediaSignature(appId);
                this.updateAudioHint(true);
                this.seekPastIntro(video);
                this.applyLowResCrt(host, video);
                video.play().catch(() => {
                    window.setTimeout(() => {
                        if (token !== this.requestToken || !video.isConnected || readyCandidateIndex !== candidateIndex) {
                            return;
                        }
                        video.play().catch(() => {
                            this.status = rt("autoplayBlocked");
                        });
                    }, 300);
                });
                if (this.fadeTimer) {
                    clearTimeout(this.fadeTimer);
                }
                this.fadeTimer = setTimeout(() => {
                    if (token === this.requestToken && video.isConnected) {
                        this.seekPastIntro(video);
                        this.applyLowResCrt(host, video);
                        video.classList.add(visibleClass);
                        this.moveSteamLogoForTrailer(appId, token);
                        this.status = this.currentTrailerName ? rt("trailerLabel", { name: this.currentTrailerName }) : rt("trailerActive");
                    }
                }, this.settings.delaySeconds * 1000);
            };
            const onError = () => {
                if (token !== this.requestToken || this.currentVideo !== video) {
                    return;
                }
                const mediaError = video.error;
                advanceCandidate(`Steam video error ${mediaError?.code ?? 0}: ${mediaError?.message ?? "unknown media error"}`);
            };
            video.addEventListener("canplay", onCanPlay);
            video.addEventListener("error", onError);
            host.classList.add(targetClass);
            host.insertBefore(video, host.firstChild);
            this.currentVideo = video;
            this.currentMediaAppId = appId;
            this.currentMediaSignature = options.mediaSignature ?? this.getDesiredMediaSignature(appId);
            if (Array.isArray(options.audioCandidates) && options.audioCandidates.length) {
                this.attachAudioTrack(video, options.audioCandidates, token);
            }
            this.updateAudioHint(true);
            tryCandidate();
        }
        attachYouTubeForMode(target, appId, videoId, token, options = {}) {
            this.currentYouTubeVideoId = videoId;
            if (this.settings.youtubePlaybackMode === "direct") {
                this.attachDirectYouTube(target, appId, videoId, token, options);
                return;
            }
            this.attachYouTube(target, appId, videoId, token, options);
        }
        getYouTubeDirectKey(appId, videoId) {
            return `${appId}:${videoId}:${this.settings.qualityHeight}`;
        }
        getYouTubeDirectEntry(appId, videoId) {
            const key = this.getYouTubeDirectKey(appId, videoId);
            const entry = this.settings.youtubeDirectStreams?.[key];
            if (!entry || entry.videoId !== videoId) {
                return undefined;
            }
            const createdAt = Number(entry.createdAt || 0);
            if (createdAt && Date.now() - createdAt > 20 * 60 * 1000) {
                return undefined;
            }
            return entry;
        }
        attachDirectYouTube(target, appId, videoId, token, options = {}) {
            const key = this.getYouTubeDirectKey(appId, videoId);
            const entry = this.getYouTubeDirectEntry(appId, videoId);
            if (entry?.failed) {
                this.needsYouTubeDirectResolve = false;
                this.youtubeDirectResolveKey = undefined;
                this.status = entry.error || rt("youtubeDirectUnavailable");
                this.attachYouTube(target, appId, videoId, token, options);
                return;
            }
            const candidates = Array.isArray(entry?.candidates)
                ? entry.candidates
                    .map((candidate) => typeof candidate === "string" ? candidate : candidate?.url)
                    .filter((url) => typeof url === "string" && url.startsWith("http"))
                : [];
            const audioCandidates = Array.isArray(entry?.audioCandidates)
                ? entry.audioCandidates
                    .map((candidate) => typeof candidate === "string" ? candidate : candidate?.url)
                    .filter((url) => typeof url === "string" && url.startsWith("http"))
                : [];
            if (!candidates.length) {
                this.needsYouTubeDirectResolve = true;
                this.youtubeDirectResolveKey = key;
                this.currentYouTubeVideoId = videoId;
                this.pendingAppId = appId;
                this.pendingTarget = target;
                this.pendingRequestToken = token;
                this.status = rt("resolvingYouTubeDirect");
                return;
            }
            this.clearPendingRequest(token);
            this.needsYouTubeDirectResolve = false;
            this.youtubeDirectResolveKey = undefined;
            this.status = rt("loadingYouTubeTrailer");
            this.attachVideo(target, appId, candidates, token, {
                mediaSignature: options.mediaSignature,
                audioCandidates,
                failureStatus: rt("youtubeDirectUnavailable"),
                onFailure: () => {
                    if (token !== this.requestToken) {
                        return;
                    }
                    this.status = rt("youtubeDirectUnavailable");
                    this.attachYouTube(target, appId, videoId, token, options);
                }
            });
        }
        attachYouTube(target, appId, videoId, token, options = {}) {
            this.ensureYouTubePreconnect();
            const host = this.prepareHost(target);
            const frame = document.createElement("iframe");
            const youtubeQuality = this.getYouTubeQuality();
            const params = new URLSearchParams({
                autoplay: "1",
                autohide: "1",
                mute: "1",
                controls: "0",
                loop: "1",
                playlist: videoId,
                playsinline: "1",
                disablekb: "1",
                fs: "0",
                modestbranding: "1",
                rel: "0",
                start: String(this.getTrimStart(appId)),
                showinfo: "0",
                iv_load_policy: "3",
                enablejsapi: "1",
                widget_referrer: window.location.href,
                origin: window.location.origin
            });
            params.set("vq", youtubeQuality);
            frame.className = `${videoClass} ${youtubeClass}`;
            frame.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
            frame.allow = "autoplay; encrypted-media; picture-in-picture";
            frame.width = this.settings.qualityHeight >= 2160 ? "3840" : this.settings.qualityHeight >= 1080 ? "1920" : "1280";
            frame.height = this.settings.qualityHeight >= 2160 ? "2160" : this.settings.qualityHeight >= 1080 ? "1080" : "720";
            frame.loading = "eager";
            frame.setAttribute("aria-hidden", "true");
            frame.setAttribute("frameborder", "0");
            frame.setAttribute("tabindex", "-1");
            const requestQuality = () => {
                if (token !== this.requestToken || !frame.contentWindow) {
                    return;
                }
                const qualityRequests = this.settings.qualityHeight >= 2160
                    ? ["highres", "hd2160", "hd1440", "hd1080"]
                    : this.settings.qualityHeight >= 1080
                        ? ["hd1080", "highres"]
                        : [youtubeQuality];
                for (const quality of qualityRequests) {
                    for (const command of [
                        { event: "command", func: "setPlaybackQuality", args: [quality] },
                        { event: "command", func: "setPlaybackQualityRange", args: [quality, quality] }
                    ]) {
                        try {
                            frame.contentWindow.postMessage(JSON.stringify(command), "*");
                        }
                        catch {
                            // YouTube iframe may ignore quality commands before the player is ready.
                        }
                    }
                }
            };
            const scheduleQualityRequests = () => {
                for (const delay of [250, 750, 1500, 3000, 6000, 10000, 15000, 22000]) {
                    window.setTimeout(requestQuality, delay);
                }
            };
            const showFrame = () => {
                if (token !== this.requestToken || !frame.isConnected) {
                    return;
                }
                host.classList.add(targetClass, readyClass);
                this.fadeTimer = setTimeout(() => {
                    if (token === this.requestToken && frame.isConnected) {
                        const shouldApplyCrt = this.shouldApplyCrt(appId, false);
                        host.classList.toggle(crtClass, shouldApplyCrt);
                        frame.classList.toggle(crtClass, shouldApplyCrt);
                        this.moveSteamLogoForTrailer(appId, token);
                        window.setTimeout(() => {
                            if (token === this.requestToken && frame.isConnected) {
                                requestQuality();
                                frame.blur();
                                frame.classList.add(visibleClass);
                            }
                        }, youtubeUiSettleMs);
                        this.status = rt("youtubeTrailerActive");
                    }
                }, this.settings.delaySeconds * 1000);
            };
            frame.addEventListener("load", () => {
                scheduleQualityRequests();
                showFrame();
            }, { once: true });
            host.classList.add(targetClass);
            host.insertBefore(frame, host.firstChild);
            this.currentFrame = frame;
            this.currentMediaAppId = appId;
            this.currentMediaSignature = options.mediaSignature ?? this.getDesiredMediaSignature(appId);
            this.updateAudioHint(true);
            this.status = rt("loadingYouTubeTrailer");
        }
        prepareHost(target) {
            this.currentTarget = target;
            target.classList.add(targetClass);
            this.currentHost = target;
            return target;
        }
        seekPastIntro(video) {
            const trimStart = this.currentMediaAppId ? this.getTrimStart(this.currentMediaAppId) : defaultTrimStartSeconds;
            if (trimStart <= 0 || video.currentTime >= trimStart - 0.2) {
                return;
            }
            try {
                video.currentTime = trimStart;
            }
            catch {
                // Some MediaSource states briefly reject seeking; the next readiness event retries it.
            }
        }
        seekToTrimStart(video) {
            const trimStart = this.currentMediaAppId ? this.getTrimStart(this.currentMediaAppId) : defaultTrimStartSeconds;
            try {
                video.currentTime = Math.max(0, trimStart);
            }
            catch {
                // Some MediaSource states briefly reject seeking; the next readiness event retries it.
            }
        }
        loopBeforeOutro(video) {
            const trimStart = this.currentMediaAppId ? this.getTrimStart(this.currentMediaAppId) : defaultTrimStartSeconds;
            const trimEnd = this.currentMediaAppId ? this.getTrimEnd(this.currentMediaAppId) : defaultTrimEndSeconds;
            if (trimEnd <= 0 || !Number.isFinite(video.duration) || video.duration <= trimStart + trimEnd + 1) {
                return;
            }
            if (video.currentTime >= video.duration - trimEnd) {
                this.seekToTrimStart(video);
                video.play().catch(() => undefined);
            }
        }
        applyLowResCrt(target, video) {
            const height = video.videoHeight || 0;
            const width = video.videoWidth || 0;
            const appId = this.currentMediaAppId ?? this.currentAppId;
            const automaticMatch = (video.dataset.trailerheroLowResHint === "1" ||
                (height > 0 && height <= 540) ||
                (width > 0 && width <= 960));
            const shouldApply = appId ? this.shouldApplyCrt(appId, automaticMatch) : false;
            video.classList.toggle(crtClass, shouldApply);
            target.classList.toggle(crtClass, shouldApply);
        }
        moveSteamLogoForTrailer(appId, token) {
            if (!this.settings.logoAssistEnabled || token !== this.requestToken) {
                return;
            }
            void this.moveSteamLogoForTrailerAsync(appId, token);
        }
        async moveSteamLogoForTrailerAsync(appId, token) {
            if (this.logoPositionRestore?.appId && this.logoPositionRestore.appId !== appId) {
                await this.restoreSteamLogoPosition();
            }
            if (this.logoPositionRestore?.appId === appId) {
                this.showLogoAssist(this.currentHost ?? this.currentTarget ?? document.body, appId, token);
                return;
            }
            const overview = await getSteamAppOverview(appId);
            if (token !== this.requestToken || !this.settings.logoAssistEnabled) {
                return;
            }
            if (!overview) {
                this.showLogoAssist(this.currentHost ?? this.currentTarget ?? document.body, appId, token);
                return;
            }
            const originalPosition = readSteamCustomLogoPosition(overview);
            const hadCustomPosition = Boolean(originalPosition);
            const applied = await saveSteamLogoPosition(overview, {
                pinnedPosition: "BottomLeft",
                nWidthPct: 36,
                nHeightPct: 30
            });
            if (!applied) {
                this.showLogoAssist(this.currentHost ?? this.currentTarget ?? document.body, appId, token);
                return;
            }
            if (token !== this.requestToken || !this.settings.logoAssistEnabled) {
                if (hadCustomPosition && originalPosition) {
                    await saveSteamLogoPosition(overview, originalPosition);
                }
                else {
                    await clearSteamLogoPosition(appId, overview);
                }
                return;
            }
            this.logoPositionRestore = {
                appId,
                overview,
                hadCustomPosition,
                position: originalPosition
            };
            this.showLogoAssist(this.currentHost ?? this.currentTarget ?? document.body, appId, token);
        }
        async restoreSteamLogoPosition() {
            const restore = this.logoPositionRestore;
            if (!restore) {
                return;
            }
            this.logoPositionRestore = undefined;
            if (restore.hadCustomPosition && restore.position) {
                await saveSteamLogoPosition(restore.overview, restore.position);
                return;
            }
            await clearSteamLogoPosition(restore.appId, restore.overview);
        }
        showLogoAssist(target, appId, token) {
            if (!this.settings.logoAssistEnabled || !appId || token !== this.requestToken) {
                return;
            }
            void this.showLogoAssistAsync(target, appId, token);
        }
        async showLogoAssistAsync(target, appId, token) {
            const [steamLogo, domSource] = await Promise.all([
                getSteamLogoMetadata(appId),
                Promise.resolve(findTinyGameLogoSource(appId))
            ]);
            if (token !== this.requestToken || !this.settings.logoAssistEnabled || !target.isConnected) {
                return;
            }
            const source = domSource ?? steamLogo.urls[0] ?? "";
            if (!source) {
                this.showNativeLogoAssist(appId, token);
                return;
            }
            this.currentLogo?.remove();
            const logo = document.createElement("img");
            logo.className = logoClass;
            logo.alt = "";
            logo.draggable = false;
            logo.decoding = "async";
            logo.setAttribute("aria-hidden", "true");
            if (steamLogo.position) {
                logo.dataset.trailerheroLogoPosition = steamLogo.position.pinnedPosition;
                logo.dataset.trailerheroLogoWidthPct = String(steamLogo.position.nWidthPct);
                logo.dataset.trailerheroLogoHeightPct = String(steamLogo.position.nHeightPct);
            }
            let revealQueued = false;
            const reveal = () => {
                if (revealQueued) {
                    return;
                }
                revealQueued = true;
                logo.getBoundingClientRect();
                window.requestAnimationFrame(() => {
                    window.setTimeout(() => {
                        if (token === this.requestToken && logo.isConnected) {
                            logo.classList.add(visibleClass);
                        }
                    }, 80);
                });
            };
            logo.addEventListener("load", reveal, { once: true });
            logo.addEventListener("error", () => {
                if (this.currentLogo === logo) {
                    this.currentLogo = undefined;
                }
                logo.remove();
            }, { once: true });
            logo.src = source;
            target.appendChild(logo);
            this.currentLogo = logo;
            if (logo.complete && logo.naturalWidth > 0) {
                reveal();
            }
        }
        showNativeLogoAssist(appId, token) {
            const nativeLogo = findNativeGameTitleElement(appId);
            if (!nativeLogo || token !== this.requestToken) {
                return;
            }
            this.currentNativeLogo?.classList.remove(nativeLogoClass, visibleClass);
            nativeLogo.classList.add(nativeLogoClass);
            this.currentNativeLogo = nativeLogo;
            nativeLogo.getBoundingClientRect();
            window.requestAnimationFrame(() => {
                window.setTimeout(() => {
                    if (token === this.requestToken && nativeLogo.isConnected) {
                        nativeLogo.classList.add(visibleClass);
                    }
                }, 80);
            });
        }
        ensureYouTubePreconnect() {
            const urls = [
                "https://youtube.com",
                "https://www.youtube.com",
                "https://m.youtube.com",
                "https://www.youtube-nocookie.com",
                "https://s.ytimg.com",
                "https://i.ytimg.com",
                "https://yt3.ggpht.com",
                "https://www.gstatic.com",
                "https://googleads.g.doubleclick.net",
                "https://static.doubleclick.net",
                "https://jnn-pa.googleapis.com"
            ];
            for (const url of urls) {
                const id = `trailerhero-preconnect-${url.replace(/[^a-z0-9]/gi, "-")}`;
                if (document.getElementById(id)) {
                    continue;
                }
                const link = document.createElement("link");
                link.id = id;
                link.rel = "preconnect";
                link.href = url;
                link.crossOrigin = "anonymous";
                document.head.appendChild(link);
            }
        }
        async playHls(video, masterUrl, token) {
            if (typeof MediaSource === "undefined") {
                throw new Error(rt("mediaSourceUnavailable"));
            }
            const masterText = await this.fetchText(masterUrl);
            const variant = this.selectHlsVariant(masterText, masterUrl);
            video.dataset.trailerheroLowResHint = variant.height > 0 && variant.height <= 540 ? "1" : "";
            const mediaText = await this.fetchText(variant.url);
            const media = this.parseHlsMediaPlaylist(mediaText, variant.url);
            const codec = variant.codec ?? "avc1.640029";
            const mimeType = `video/mp4; codecs="${codec}"`;
            if (!MediaSource.isTypeSupported(mimeType)) {
                throw new Error(`Codec non supportato: ${mimeType}`);
            }
            await new Promise((resolve, reject) => {
                const mediaSource = new MediaSource();
                const objectUrl = URL.createObjectURL(mediaSource);
                video.dataset.trailerheroObjectUrl = objectUrl;
                video.src = objectUrl;
                video.load();
                const fail = (error) => {
                    URL.revokeObjectURL(objectUrl);
                    reject(error);
                };
                mediaSource.addEventListener("sourceopen", async () => {
                    try {
                        if (token !== this.requestToken) {
                            throw new Error("Trailer request changed");
                        }
                        const sourceBuffer = mediaSource.addSourceBuffer(mimeType);
                        sourceBuffer.mode = "segments";
                        await this.appendBuffer(sourceBuffer, await this.fetchArrayBuffer(media.initUrl));
                        for (const segmentUrl of media.segmentUrls) {
                            if (token !== this.requestToken) {
                                throw new Error("Trailer request changed");
                            }
                            await this.appendBuffer(sourceBuffer, await this.fetchArrayBuffer(segmentUrl));
                        }
                        if (mediaSource.readyState === "open") {
                            mediaSource.endOfStream();
                        }
                        resolve();
                    }
                    catch (error) {
                        fail(error);
                    }
                }, { once: true });
            });
        }
        async playDash(video, manifestUrl, token) {
            if (typeof MediaSource === "undefined") {
                throw new Error(rt("mediaSourceUnavailable"));
            }
            const manifestText = await this.fetchText(manifestUrl);
            const variant = this.selectDashVariant(manifestText, manifestUrl);
            video.dataset.trailerheroLowResHint = variant.height > 0 && variant.height <= 540 ? "1" : "";
            const mimeType = `video/mp4; codecs="${variant.codec}"`;
            if (!MediaSource.isTypeSupported(mimeType)) {
                throw new Error(`Codec non supportato: ${mimeType}`);
            }
            const audioMimeType = variant.audio ? `audio/mp4; codecs="${variant.audio.codec}"` : undefined;
            if (audioMimeType && !MediaSource.isTypeSupported(audioMimeType)) {
                variant.audio = undefined;
            }
            await new Promise((resolve, reject) => {
                const mediaSource = new MediaSource();
                const objectUrl = URL.createObjectURL(mediaSource);
                video.dataset.trailerheroObjectUrl = objectUrl;
                video.src = objectUrl;
                video.load();
                const fail = (error) => {
                    URL.revokeObjectURL(objectUrl);
                    reject(error);
                };
                mediaSource.addEventListener("sourceopen", async () => {
                    try {
                        if (token !== this.requestToken) {
                            throw new Error("Trailer request changed");
                        }
                        const appendStream = async (stream, streamMimeType) => {
                            const sourceBuffer = mediaSource.addSourceBuffer(streamMimeType);
                            sourceBuffer.mode = "segments";
                            await this.appendBuffer(sourceBuffer, await this.fetchArrayBuffer(stream.initUrl));
                            for (const segmentUrl of stream.segmentUrls) {
                                if (token !== this.requestToken) {
                                    throw new Error("Trailer request changed");
                                }
                                await this.appendBuffer(sourceBuffer, await this.fetchArrayBuffer(segmentUrl));
                            }
                        };
                        const streams = [appendStream(variant, mimeType)];
                        if (variant.audio && audioMimeType) {
                            streams.push(appendStream(variant.audio, audioMimeType));
                        }
                        await Promise.all(streams);
                        if (mediaSource.readyState === "open") {
                            mediaSource.endOfStream();
                        }
                        resolve();
                    }
                    catch (error) {
                        fail(error);
                    }
                }, { once: true });
            });
        }
        async fetchText(url) {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 9000);
            try {
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${url}`);
                }
                return await response.text();
            }
            finally {
                clearTimeout(timeout);
            }
        }
        async fetchArrayBuffer(url) {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 12000);
            try {
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${url}`);
                }
                return await response.arrayBuffer();
            }
            finally {
                clearTimeout(timeout);
            }
        }
        appendBuffer(sourceBuffer, data) {
            return new Promise((resolve, reject) => {
                const onUpdateEnd = () => {
                    cleanup();
                    resolve();
                };
                const onError = () => {
                    cleanup();
                    reject(new Error("SourceBuffer append failed"));
                };
                const cleanup = () => {
                    sourceBuffer.removeEventListener("updateend", onUpdateEnd);
                    sourceBuffer.removeEventListener("error", onError);
                };
                sourceBuffer.addEventListener("updateend", onUpdateEnd);
                sourceBuffer.addEventListener("error", onError);
                sourceBuffer.appendBuffer(data);
            });
        }
        selectHlsVariant(masterText, masterUrl) {
            const lines = masterText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
            const variants = [];
            for (let index = 0; index < lines.length; index += 1) {
                const line = lines[index];
                if (!line.startsWith("#EXT-X-STREAM-INF")) {
                    continue;
                }
                const uri = lines[index + 1];
                if (!uri || uri.startsWith("#")) {
                    continue;
                }
                const resolution = line.match(/RESOLUTION=\d+x(\d+)/i);
                const bandwidth = line.match(/BANDWIDTH=(\d+)/i);
                const codecs = line.match(/CODECS="([^"]+)"/i);
                const videoCodec = codecs?.[1]
                    ?.split(",")
                    .map((codec) => codec.trim())
                    .find((codec) => codec.startsWith("avc1"));
                variants.push({
                    url: new URL(uri, masterUrl).href,
                    codec: videoCodec,
                    height: resolution?.[1] ? Number(resolution[1]) : 0,
                    bandwidth: bandwidth?.[1] ? Number(bandwidth[1]) : 0
                });
            }
            if (!variants.length) {
                throw new Error("Playlist HLS senza varianti video");
            }
            variants.sort((left, right) => {
                const targetHeight = this.settings.qualityHeight;
                const leftDistance = Math.abs((left.height || targetHeight) - targetHeight);
                const rightDistance = Math.abs((right.height || targetHeight) - targetHeight);
                return leftDistance - rightDistance || right.height - left.height || left.bandwidth - right.bandwidth;
            });
            return variants[0];
        }
        selectDashVariant(manifestText, manifestUrl) {
            const documentXml = new DOMParser().parseFromString(manifestText, "application/xml");
            if (documentXml.querySelector("parsererror")) {
                throw new Error("Manifest DASH non valido");
            }
            const durationSeconds = this.parseIsoDurationSeconds(documentXml.documentElement.getAttribute("mediaPresentationDuration") ?? "");
            const variants = [];
            const audioVariants = [];
            for (const adaptation of Array.from(documentXml.getElementsByTagName("AdaptationSet"))) {
                const contentType = adaptation.getAttribute("contentType") ?? "";
                const mimeType = adaptation.getAttribute("mimeType") ?? "";
                const isAudio = contentType === "audio" || mimeType.startsWith("audio/");
                const isVideo = contentType === "video" || mimeType.startsWith("video/") || (!contentType && !mimeType);
                if (!isAudio && !isVideo) {
                    continue;
                }
                const adaptationTemplate = adaptation.getElementsByTagName("SegmentTemplate")[0];
                for (const representation of Array.from(adaptation.getElementsByTagName("Representation"))) {
                    const codec = representation.getAttribute("codecs") ?? adaptation.getAttribute("codecs") ?? "";
                    const representationMime = representation.getAttribute("mimeType") ?? mimeType;
                    if (!codec ||
                        (isAudio && representationMime && !representationMime.startsWith("audio/")) ||
                        (isVideo && representationMime && !representationMime.startsWith("video/"))) {
                        continue;
                    }
                    const template = representation.getElementsByTagName("SegmentTemplate")[0] ?? adaptationTemplate;
                    if (!template) {
                        continue;
                    }
                    const representationId = representation.getAttribute("id") ?? "";
                    const bandwidth = Number(representation.getAttribute("bandwidth") ?? 0);
                    const height = Number(representation.getAttribute("height") ?? adaptation.getAttribute("maxHeight") ?? 0);
                    const initialization = template.getAttribute("initialization") ?? "";
                    const media = template.getAttribute("media") ?? "";
                    if (!representationId || !initialization || !media) {
                        continue;
                    }
                    const initUrl = new URL(this.expandDashTemplate(initialization, representationId, bandwidth), manifestUrl).href;
                    const segmentUrls = this.buildDashSegmentUrls(template, media, representationId, bandwidth, durationSeconds, manifestUrl);
                    if (!segmentUrls.length) {
                        continue;
                    }
                    const entry = {
                        initUrl,
                        segmentUrls,
                        codec,
                        height,
                        bandwidth
                    };
                    if (isAudio) {
                        audioVariants.push(entry);
                    }
                    else {
                        variants.push(entry);
                    }
                }
            }
            if (!variants.length) {
                throw new Error("Manifest DASH senza varianti video");
            }
            variants.sort((left, right) => {
                const targetHeight = this.settings.qualityHeight;
                const leftDistance = Math.abs((left.height || targetHeight) - targetHeight);
                const rightDistance = Math.abs((right.height || targetHeight) - targetHeight);
                return leftDistance - rightDistance || right.height - left.height || right.bandwidth - left.bandwidth;
            });
            audioVariants.sort((left, right) => right.bandwidth - left.bandwidth);
            return { ...variants[0], audio: audioVariants[0] };
        }
        buildDashSegmentUrls(template, mediaTemplate, representationId, bandwidth, durationSeconds, manifestUrl) {
            const timeline = template.getElementsByTagName("SegmentTimeline")[0];
            const startNumber = Number(template.getAttribute("startNumber") ?? 1);
            const urls = [];
            const maxSegments = 180;
            if (timeline) {
                let number = startNumber;
                let currentTime = 0;
                for (const item of Array.from(timeline.getElementsByTagName("S"))) {
                    const duration = Number(item.getAttribute("d") ?? 0);
                    const repeat = Number(item.getAttribute("r") ?? 0);
                    if (!duration) {
                        continue;
                    }
                    if (item.hasAttribute("t")) {
                        currentTime = Number(item.getAttribute("t") ?? currentTime);
                    }
                    const count = repeat < 0 ? maxSegments - urls.length : repeat + 1;
                    for (let index = 0; index < count && urls.length < maxSegments; index += 1) {
                        const expanded = this.expandDashTemplate(mediaTemplate, representationId, bandwidth, number, currentTime);
                        urls.push(new URL(expanded, manifestUrl).href);
                        number += 1;
                        currentTime += duration;
                    }
                }
                return urls;
            }
            const timescale = Number(template.getAttribute("timescale") ?? 1);
            const duration = Number(template.getAttribute("duration") ?? 0);
            if (!timescale || !duration || !durationSeconds) {
                return [];
            }
            const segmentCount = Math.min(maxSegments, Math.ceil(durationSeconds / (duration / timescale)));
            for (let index = 0; index < segmentCount; index += 1) {
                const number = startNumber + index;
                const expanded = this.expandDashTemplate(mediaTemplate, representationId, bandwidth, number);
                urls.push(new URL(expanded, manifestUrl).href);
            }
            return urls;
        }
        expandDashTemplate(value, representationId, bandwidth, number, time) {
            return value
                .replace(/\$RepresentationID\$/g, representationId)
                .replace(/\$Bandwidth\$/g, String(bandwidth))
                .replace(/\$Time\$/g, String(time ?? 0))
                .replace(/\$Number(?:%0(\d+)d)?\$/g, (_match, width) => {
                const text = String(number ?? 0);
                return width ? text.padStart(Number(width), "0") : text;
            })
                .replace(/\$\$/g, "$");
        }
        parseIsoDurationSeconds(value) {
            const match = value.match(/^P(?:(\d+(?:\.\d+)?)D)?(?:T(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?)?$/);
            if (!match) {
                return 0;
            }
            const days = Number(match[1] ?? 0);
            const hours = Number(match[2] ?? 0);
            const minutes = Number(match[3] ?? 0);
            const seconds = Number(match[4] ?? 0);
            return days * 86400 + hours * 3600 + minutes * 60 + seconds;
        }
        parseHlsMediaPlaylist(mediaText, mediaUrl) {
            const lines = mediaText.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
            const mapLine = lines.find((line) => line.startsWith("#EXT-X-MAP"));
            const initMatch = mapLine?.match(/URI="([^"]+)"/i);
            if (!initMatch?.[1]) {
                throw new Error("Playlist HLS senza init segment");
            }
            const segmentUrls = lines
                .filter((line) => !line.startsWith("#"))
                .map((line) => new URL(line, mediaUrl).href);
            if (!segmentUrls.length) {
                throw new Error("Playlist HLS senza segmenti");
            }
            return {
                initUrl: new URL(initMatch[1], mediaUrl).href,
                segmentUrls
            };
        }
        cleanupVideo(cancelPending = false) {
            this.setTrailerAudioEnabled(false);
            this.removeAudioHint();
            if (cancelPending) {
                this.requestToken += 1;
                this.clearPendingRequest();
            }
            if (this.fadeTimer) {
                clearTimeout(this.fadeTimer);
                this.fadeTimer = undefined;
            }
            if (this.candidateWatchdog) {
                clearTimeout(this.candidateWatchdog);
                this.candidateWatchdog = undefined;
            }
            void this.restoreSteamLogoPosition();
            const objectUrl = this.currentVideo?.dataset.trailerheroObjectUrl;
            this.currentVideo?.remove();
            this.currentAudio?.remove();
            this.currentFrame?.remove();
            this.currentLogo?.remove();
            this.currentNativeLogo?.classList.remove(nativeLogoClass, visibleClass);
            this.currentYouTubeMask?.remove();
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            this.currentVideo = undefined;
            this.currentAudio = undefined;
            this.currentFrame = undefined;
            this.currentLogo = undefined;
            this.currentNativeLogo = undefined;
            this.currentYouTubeMask = undefined;
            this.currentHost = undefined;
            this.currentMediaAppId = undefined;
            this.currentMediaSignature = undefined;
            this.currentCandidateIndex = undefined;
            this.currentCandidateCount = undefined;
            this.currentTarget?.classList.remove(targetClass, readyClass, crtClass);
            this.currentTarget = undefined;
            document.querySelectorAll(`.${videoClass}, .${audioClass}, .${youtubeMaskClass}, .${logoClass}`)
                .forEach((element) => element.remove());
            document.querySelectorAll(`.${nativeLogoClass}`)
                .forEach((element) => element.classList.remove(nativeLogoClass, visibleClass));
            document.querySelectorAll(`.${targetClass}`)
                .forEach((element) => element.classList.remove(targetClass, readyClass, crtClass));
        }
    }
    const existing = window[runtimeKey];
    if (existing) {
        if (existing.version === runtimeVersion) {
            return existing.update(nextSettings);
        }
        try {
            existing.destroy();
        }
        catch {
            // Ignore cleanup errors from older injected builds.
        }
        delete window[runtimeKey];
    }
    const runtime = new Runtime(nextSettings);
    window[runtimeKey] = runtime;
    runtime.mount();
    return runtime.snapshot();
}
function buildInstallScript(settings) {
    return `
    (() => {
      const settings = ${JSON.stringify(settings)};
      const translations = ${JSON.stringify(TRANSLATIONS)};
      const factory = ${trailerHeroRuntimeFactory.toString()};
      return factory(settings, translations);
    })()
  `;
}

function confirmYouTubeBulkReassign() {
    return new Promise((resolve) => {
        let finished = false;
        let modal;
        const finish = (value) => {
            if (finished) {
                return;
            }
            finished = true;
            try {
                modal?.Close?.();
            }
            catch {
                // Ignore modal close errors.
            }
            resolve(value);
        };
        const content = SP_JSX.jsxs(DFL.ModalRoot, { closeModal: () => finish(false), children: [
            SP_JSX.jsx("div", { style: { fontWeight: 700, fontSize: "1.1rem", marginBottom: "0.65rem" }, children: tr("youtubeBulkReassign") }),
            SP_JSX.jsx("div", { style: { fontSize: "0.92rem", lineHeight: "1.35rem", opacity: 0.86, marginBottom: "1rem", whiteSpace: "normal" }, children: tr("youtubeBulkConfirm") }),
            SP_JSX.jsxs(DFL.Focusable, { "flow-children": "row", noFocusRing: true, style: { display: "flex", gap: "0.5rem", justifyContent: "flex-end" }, children: [
                SP_JSX.jsx(DFL.DialogButton, { focusable: true, onClick: () => finish(false), style: { minWidth: "7rem" }, children: "Cancel" }),
                SP_JSX.jsx(DFL.DialogButton, { focusable: true, onClick: () => finish(true), style: { minWidth: "7rem" }, children: "OK" })
            ] })
        ] });
        try {
            modal = DFL.showModal?.(content, undefined, { strTitle: tr("youtubeBulkReassign") });
        }
        catch {
            modal = undefined;
        }
        if (!modal) {
            try {
                resolve(Boolean(window.confirm?.(tr("youtubeBulkConfirm"))));
            }
            catch {
                resolve(false);
            }
        }
    });
}

class TrailerHeroController {
    constructor() {
        this.settings = parseSettings();
        this.status = tr("cannotReachBigPicture");
        this.steamMovies = [];
        this.trimStartSeconds = DEFAULT_TRIM_START_SECONDS;
        this.trimEndSeconds = DEFAULT_TRIM_END_SECONDS;
        this.listeners = new Set();
        this.installInFlight = false;
        this.pendingInstall = false;
        this.remoteStatusInFlight = false;
        this.youtubeSearchInFlight = new Set();
        this.youtubeSearchFailed = new Set();
        this.youtubeDirectStreams = {};
        this.youtubeDirectResolveInFlight = new Set();
        this.steamAppSearchInFlight = new Set();
        this.steamAutoSearchFailures = {};
        this.bulkYouTubeInFlight = false;
        this.localTrailers = {};
        this.trailerJob = undefined;
        this.trailerJobTimer = undefined;
    }
    mount() {
        void this.refreshLocalTrailers().finally(() => this.installOrUpdate());
        this.statusTimer = setInterval(() => this.readRemoteStatus(), 2000);
    }
    unmount() {
        if (this.statusTimer) {
            clearInterval(this.statusTimer);
            this.statusTimer = undefined;
        }
        if (this.trailerJobTimer) {
            clearTimeout(this.trailerJobTimer);
            this.trailerJobTimer = undefined;
        }
        this.destroyRemote();
        this.listeners.clear();
    }
    subscribe(listener) {
        this.listeners.add(listener);
        listener(this.getSnapshot());
        return () => this.listeners.delete(listener);
    }
    getSnapshot() {
        return {
            settings: this.settings,
            appId: this.appId,
            status: this.status,
            trailerName: this.trailerName,
            gameTitle: this.gameTitle,
            needsSteamAppSearch: this.needsSteamAppSearch,
            steamAppSearchTitle: this.steamAppSearchTitle,
            needsYouTubeSearch: this.needsYouTubeSearch,
            needsYouTubeDirectResolve: this.needsYouTubeDirectResolve,
            youtubeDirectResolveKey: this.youtubeDirectResolveKey,
            youtubeVideoId: this.youtubeVideoId,
            preferredSource: this.preferredSource,
            sourceAppId: this.sourceAppId,
            selectedSteamMovieId: this.selectedSteamMovieId,
            steamMovies: this.steamMovies,
            trimStartSeconds: this.trimStartSeconds,
            trimEndSeconds: this.trimEndSeconds,
            bulkYouTubeInFlight: this.bulkYouTubeInFlight,
            localTrailers: this.localTrailers,
            currentLocalTrailer: this.appId ? this.localTrailers[String(this.appId)] : undefined,
            trailerJob: this.trailerJob,
            tab: this.workingTab
        };
    }
    toggleEnabled() {
        this.updateSettings({ enabled: !this.settings.enabled });
    }
    setEnabled(enabled) {
        this.updateSettings({ enabled });
    }
    cycleOpacity() {
        this.updateSettings({ opacity: getNextOption(OPACITY_OPTIONS, this.settings.opacity) });
    }
    cycleQuality() {
        this.updateSettings({ qualityHeight: getNextOption(QUALITY_OPTIONS, this.settings.qualityHeight) });
    }
    toggleLogoAssist() {
        this.updateSettings({ logoAssistEnabled: !this.settings.logoAssistEnabled });
    }
    setLogoAssist(enabled) {
        this.updateSettings({ logoAssistEnabled: enabled });
    }
    setStopOnLaunch(enabled) {
        this.updateSettings({ stopOnLaunchEnabled: enabled });
    }
    toggleLowResCrt() {
        this.updateSettings({ crtLowResEnabled: !this.settings.crtLowResEnabled });
    }
    setLowResCrt(enabled) {
        this.updateSettings({ crtLowResEnabled: enabled });
    }
    cycleCrtForCurrent() {
        if (!this.appId) {
            return;
        }
        const key = String(this.appId);
        const nextPreference = getNextOption(CRT_OPTIONS, this.settings.crtOverrides[key] ?? "auto");
        const crtOverrides = { ...this.settings.crtOverrides };
        if (nextPreference === "auto") {
            delete crtOverrides[key];
        }
        else {
            crtOverrides[key] = nextPreference;
        }
        this.updateSettings({ crtOverrides });
    }
    toggleYouTubeEnabled() {
        this.updateSettings({ youtubeEnabled: !this.settings.youtubeEnabled });
    }
    setYouTubeEnabled(enabled) {
        this.updateSettings({ youtubeEnabled: enabled });
    }
    toggleYouTubeAutoSearch() {
        this.updateSettings({ youtubeAutoSearch: !this.settings.youtubeAutoSearch });
    }
    setYouTubeAutoSearch(enabled) {
        this.updateSettings({ youtubeAutoSearch: enabled });
    }
    cyclePreferredSource() {
        if (!this.appId) {
            return;
        }
        this.updateSettings({
            preferredSources: {
                ...this.settings.preferredSources,
                [String(this.appId)]: getNextOption(SOURCE_OPTIONS, this.settings.preferredSources[String(this.appId)] ?? "auto")
            }
        });
    }
    setSteamAppForCurrent(value) {
        if (!this.appId) {
            return false;
        }
        const steamAppId = Number.parseInt(value.trim(), 10);
        if (!Number.isInteger(steamAppId) || steamAppId <= 0) {
            this.status = tr("invalidSteamAppId");
            this.emit();
            return false;
        }
        this.updateSettings({
            steamAppOverrides: {
                ...this.settings.steamAppOverrides,
                [String(this.appId)]: steamAppId
            }
        });
        return true;
    }
    clearSteamAppForCurrent() {
        if (!this.appId) {
            return;
        }
        const steamAppOverrides = { ...this.settings.steamAppOverrides };
        const steamMovieOverrides = { ...this.settings.steamMovieOverrides };
        delete steamAppOverrides[String(this.appId)];
        delete steamMovieOverrides[String(this.appId)];
        this.updateSettings({ steamAppOverrides, steamMovieOverrides });
    }
    cycleSteamMovieForCurrent() {
        if (!this.appId || !this.steamMovies.length) {
            return;
        }
        const currentId = this.settings.steamMovieOverrides[String(this.appId)] ?? this.selectedSteamMovieId ?? this.steamMovies[0].id;
        const currentIndex = Math.max(0, this.steamMovies.findIndex((movie) => movie.id === currentId));
        const nextMovie = this.steamMovies[(currentIndex + 1) % this.steamMovies.length];
        if (!nextMovie) {
            return;
        }
        this.updateSettings({
            steamMovieOverrides: {
                ...this.settings.steamMovieOverrides,
                [String(this.appId)]: nextMovie.id
            },
            preferredSources: {
                ...this.settings.preferredSources,
                [String(this.appId)]: "steam"
            }
        });
    }
    setSteamMovieForCurrent(movieId) {
        if (!this.appId || !movieId) {
            return;
        }
        this.updateSettings({
            steamMovieOverrides: {
                ...this.settings.steamMovieOverrides,
                [String(this.appId)]: movieId
            },
            preferredSources: {
                ...this.settings.preferredSources,
                [String(this.appId)]: "steam"
            }
        });
    }
    clearSteamMovieForCurrent() {
        if (!this.appId) {
            return;
        }
        const steamMovieOverrides = { ...this.settings.steamMovieOverrides };
        delete steamMovieOverrides[String(this.appId)];
        this.updateSettings({ steamMovieOverrides });
    }
    setTrimForCurrent(startValue, endValue) {
        if (!this.appId) {
            return false;
        }
        const parseTrim = (value) => Number.parseInt(value.trim(), 10);
        const trimStart = parseTrim(startValue);
        const trimEnd = parseTrim(endValue);
        if (!Number.isInteger(trimStart) ||
            !Number.isInteger(trimEnd) ||
            trimStart < 0 ||
            trimStart > 60 ||
            trimEnd < 0 ||
            trimEnd > 60) {
            this.status = tr("invalidTrims");
            this.emit();
            return false;
        }
        this.updateSettings({
            trimStartOverrides: {
                ...this.settings.trimStartOverrides,
                [String(this.appId)]: trimStart
            },
            trimEndOverrides: {
                ...this.settings.trimEndOverrides,
                [String(this.appId)]: trimEnd
            }
        });
        return true;
    }
    toggleCurrentApp() {
        if (!this.appId) {
            return;
        }
        const blocked = new Set(this.settings.blockedApps);
        if (blocked.has(this.appId)) {
            blocked.delete(this.appId);
        }
        else {
            blocked.add(this.appId);
        }
        this.updateSettings({ blockedApps: Array.from(blocked) });
    }
    setCurrentAppBlocked(blockedForCurrentApp) {
        this.setAppBlocked(this.appId, blockedForCurrentApp);
    }
    setAppBlocked(appId, blocked) {
        if (!appId) {
            return;
        }
        const blockedApps = new Set(this.settings.blockedApps);
        if (blocked) {
            blockedApps.add(appId);
        }
        else {
            blockedApps.delete(appId);
        }
        this.updateSettings({ blockedApps: Array.from(blockedApps) });
    }
    setYouTubeQueryForCurrent(value) {
        this.setYouTubeQueryForApp(this.appId, value, this.gameTitle);
    }
    setYouTubeQueryForApp(appId, value, defaultTitle = "") {
        if (!appId) {
            return;
        }
        const query = String(value || "").trim();
        const youtubeQueries = { ...this.settings.youtubeQueries };
        if (query && query !== defaultTitle) {
            youtubeQueries[String(appId)] = query;
        }
        else {
            delete youtubeQueries[String(appId)];
        }
        this.updateSettings({ youtubeQueries });
    }
    setYouTubeForCurrent(value) {
        return this.setYouTubeForApp(this.appId, value);
    }
    setYouTubeForApp(appId, value) {
        if (!appId) {
            return false;
        }
        const videoId = extractYouTubeId(value);
        if (!videoId) {
            this.status = tr("invalidYouTubeLink");
            this.emit();
            return false;
        }
        this.updateSettings({
            youtubeVideos: {
                ...this.settings.youtubeVideos,
                [String(appId)]: videoId
            },
            preferredSources: {
                ...this.settings.preferredSources,
                [String(appId)]: "youtube"
            }
        });
        return true;
    }
    clearYouTubeForCurrent() {
        this.clearYouTubeForApp(this.appId);
    }
    clearYouTubeForApp(appId) {
        if (!appId) {
            return;
        }
        const youtubeVideos = { ...this.settings.youtubeVideos };
        delete youtubeVideos[String(appId)];
        this.updateSettings({ youtubeVideos });
    }
    setDefaultAudio(value) {
        this.updateSettings({ defaultAudio: value === "trailer" ? "trailer" : "theme" });
    }
    setPreferredSourceForCurrent(source) {
        return this.setPreferredSourceForApp(this.appId, source);
    }
    setPreferredSourceForApp(appId, source) {
        if (!appId || !SOURCE_OPTIONS.includes(source)) {
            return;
        }
        this.updateSettings({
            preferredSources: {
                ...this.settings.preferredSources,
                [String(appId)]: source
            }
        });
    }
    useStreamingForApp(appId) {
        if (!appId) {
            return;
        }
        const key = String(appId);
        const nextSource = this.settings.youtubeVideos[key] ? "youtube" : "auto";
        this.setPreferredSourceForApp(appId, nextSource);
    }
    setSteamMovieForApp(appId, movieId) {
        if (!appId || !movieId) {
            return;
        }
        this.updateSettings({
            steamMovieOverrides: {
                ...this.settings.steamMovieOverrides,
                [String(appId)]: movieId
            },
            preferredSources: {
                ...this.settings.preferredSources,
                [String(appId)]: "steam"
            }
        });
    }
    setTrimForApp(appId, startValue, endValue) {
        if (!appId) {
            return false;
        }
        const trimStart = Number.parseInt(String(startValue).trim(), 10);
        const trimEnd = Number.parseInt(String(endValue).trim(), 10);
        if (!Number.isInteger(trimStart) || !Number.isInteger(trimEnd) ||
            trimStart < 0 || trimStart > 60 || trimEnd < 0 || trimEnd > 60) {
            return false;
        }
        this.updateSettings({
            trimStartOverrides: {
                ...this.settings.trimStartOverrides,
                [String(appId)]: trimStart
            },
            trimEndOverrides: {
                ...this.settings.trimEndOverrides,
                [String(appId)]: trimEnd
            }
        });
        return true;
    }
    async refreshLocalTrailers() {
        try {
            const result = await getLocalTrailer(0);
            const entries = Array.isArray(result?.entries) ? result.entries : [];
            this.localTrailers = Object.fromEntries(entries
                .filter((entry) => entry?.assigned && Number.isInteger(Number(entry.appid)))
                .map((entry) => [String(entry.appid), entry]));
            const preferredSources = { ...this.settings.preferredSources };
            let settingsChanged = false;
            for (const [appId, source] of Object.entries(preferredSources)) {
                if (source === "local" && !this.localTrailers[appId]) {
                    preferredSources[appId] = "auto";
                    settingsChanged = true;
                }
            }
            if (settingsChanged) {
                this.settings = { ...this.settings, preferredSources };
                saveSettings(this.settings);
            }
            this.emit();
            return result;
        }
        catch (error) {
            this.status = error instanceof Error ? error.message : String(error);
            this.emit();
            return { ok: false, error: this.status };
        }
    }
    async importTrailerForCurrent(path) {
        return this.importTrailerForApp(this.appId, path, this.gameTitle || "");
    }
    async importTrailerForApp(appId, path, title = "") {
        if (!appId || !path) {
            return { ok: false };
        }
        const result = await importLocalTrailer(appId, path, title);
        if (result?.ok) {
            await this.refreshLocalTrailers();
            this.setPreferredSourceForApp(appId, "local");
            this.status = tr("operationComplete");
            this.emit();
        }
        return result;
    }
    async startDownloadForCurrent(quality = this.settings.qualityHeight) {
        return this.startDownloadForApp(this.appId, this.gameTitle || "", quality);
    }
    async startDownloadForApp(appId, title = "", quality = this.settings.qualityHeight) {
        if (!appId) {
            return { ok: false };
        }
        const key = String(appId);
        const youtubeId = this.settings.youtubeVideos[key] || this.youtubeVideoId || "";
        const useYouTube = this.settings.preferredSources[key] === "youtube" && youtubeId;
        const source = useYouTube ? "youtube" : "steam";
        const value = useYouTube ? youtubeId : this.settings.steamMovieOverrides[key] || this.selectedSteamMovieId || "";
        const sourceAppId = this.settings.steamAppOverrides[key] || (this.appId === appId ? this.sourceAppId : 0) || appId;
        const result = await startTrailerDownload(appId, source, value, quality, title, sourceAppId);
        if (result?.ok && result.jobId) {
            this.watchTrailerJob(result.jobId, [appId], title || `App ${appId}`);
        }
        return result;
    }
    async startDownloadSelectionForApp(appId, title, quality, source, value, sourceAppId = 0) {
        if (!appId || !["steam", "youtube"].includes(source)) {
            return { ok: false };
        }
        const result = await startTrailerDownload(appId, source, value || "", quality, title || "", sourceAppId || appId);
        if (result?.ok && result.jobId) {
            this.watchTrailerJob(result.jobId, [appId], title || `App ${appId}`);
        }
        return result;
    }
    watchTrailerJob(jobId, appIds = [], title = "") {
        if (this.trailerJobTimer) {
            clearTimeout(this.trailerJobTimer);
        }
        this.trailerJob = { ok: true, jobId, state: "queued", current: 0, total: Math.max(1, appIds.length) };
        this.trailerJobAppIds = appIds;
        const poll = async () => {
            try {
                const job = await getTrailerJob(jobId);
                this.trailerJob = job;
                this.status = job?.state === "running" ? tr("downloadRunning") : this.status;
                this.emit();
                if (["done", "failed", "cancelled"].includes(job?.state)) {
                    this.trailerJobTimer = undefined;
                    if (job.state === "done") {
                        await this.refreshLocalTrailers();
                        const preferredSources = { ...this.settings.preferredSources };
                        for (const appId of this.trailerJobAppIds || []) {
                            if (this.localTrailers[String(appId)]) preferredSources[String(appId)] = "local";
                        }
                        this.updateSettings({ preferredSources });
                        this.status = tr("operationComplete");
                        this.emit();
                        if ((this.trailerJobAppIds || []).length > 1 || job?.kind === "bulk") {
                            const result = job.result || job;
                            showTrailerHeroNotice(tr("bulkDone", { ok: Number(result.downloaded || 0), skipped: Number(result.skipped || 0), failed: Number(result.failed || 0) }));
                        }
                        else showTrailerHeroNotice(tr("downloadAssigned", { title: title || this.gameTitle || `App ${appIds[0] || ""}` }));
                    }
                    else if (job.state === "failed") {
                        showTrailerHeroNotice(job.error || job.result?.error || tr("noPreview"));
                    }
                    return;
                }
            }
            catch (error) {
                this.trailerJob = { ok: false, state: "failed", error: error instanceof Error ? error.message : String(error) };
                this.emit();
                return;
            }
            this.trailerJobTimer = window.setTimeout(poll, 700);
        };
        void poll();
    }
    async cancelCurrentTrailerJob() {
        const jobId = this.trailerJob?.jobId;
        if (!jobId) return;
        await cancelTrailerJob(jobId);
    }
    async deleteLocalForCurrent() {
        return this.deleteLocalForApp(this.appId);
    }
    async deleteLocalForApp(appId) {
        if (!appId) return { ok: false };
        const result = await deleteLocalTrailer(appId);
        if (result?.ok) {
            await this.refreshLocalTrailers();
            const preferredSources = { ...this.settings.preferredSources };
            if (preferredSources[String(appId)] === "local") preferredSources[String(appId)] = "auto";
            this.updateSettings({ preferredSources });
        }
        return result;
    }
    async deleteAllLocal() {
        const result = await deleteAllLocalTrailers();
        if (result?.ok) {
            this.localTrailers = {};
            const preferredSources = Object.fromEntries(Object.entries(this.settings.preferredSources)
                .map(([appId, source]) => [appId, source === "local" ? "auto" : source]));
            this.updateSettings({ preferredSources });
        }
        return result;
    }
    async cleanupUnassignedLocal() {
        return cleanupUnassignedTrailers();
    }
    refresh() {
        if (this.appId) {
            this.youtubeSearchFailed.delete(this.appId);
            delete this.steamAutoSearchFailures[String(this.appId)];
        }
        this.runInSteamTab(FORCE_SCAN_SCRIPT)
            .then((result) => this.applyRemoteResultOrInstall(result))
            .catch(() => this.installOrUpdate());
    }
    updateSettings(next) {
        if ("youtubePlaybackMode" in next || "qualityHeight" in next || "youtubeVideos" in next) {
            this.youtubeDirectStreams = {};
            this.youtubeDirectResolveInFlight.clear();
        }
        this.settings = {
            ...this.settings,
            ...next,
            settingsVersion: DEFAULT_SETTINGS.settingsVersion
        };
        saveSettings(this.settings);
        this.emit();
        this.installOrUpdate();
    }
    getRuntimeSettings() {
        return {
            ...this.settings,
            steamAutoSearchFailures: this.steamAutoSearchFailures,
            youtubeDirectStreams: this.youtubeDirectStreams,
            localTrailers: this.localTrailers
        };
    }
    async installOrUpdate() {
        if (this.installInFlight) {
            this.pendingInstall = true;
            return;
        }
        this.installInFlight = true;
        try {
            do {
                this.pendingInstall = false;
                const result = await this.runInSteamTab(buildInstallScript(this.getRuntimeSettings()));
                this.applyRemoteResult(result);
            } while (this.pendingInstall);
        }
        finally {
            this.installInFlight = false;
        }
    }
    async readRemoteStatus() {
        if (this.installInFlight || this.remoteStatusInFlight) {
            return;
        }
        this.remoteStatusInFlight = true;
        try {
            const result = await this.runInSteamTab(RUNTIME_MISSING_SCRIPT, true);
            this.applyRemoteResultOrInstall(result);
        }
        finally {
            this.remoteStatusInFlight = false;
        }
    }
    async destroyRemote() {
        await this.runInSteamTab("window.__trailerHeroRuntime?.destroy?.(); delete window.__trailerHeroRuntime; true", true).catch(() => undefined);
    }
    async runInSteamTab(code, _preferWorkingTab = false) {
        try {
            this.status = tr("connectingSteamDebugger");
            this.emit();
            const backendResult = await this.withTimeout(evalInBigPicture(code), BACKEND_TIMEOUT_MS);
            if (isRuntimeSnapshot(backendResult)) {
                if (backendResult.tab) {
                    this.workingTab = backendResult.tab;
                }
                else if (!backendResult.error && !this.workingTab) {
                    this.workingTab = "Steam CEF";
                }
                if (backendResult.error) {
                    this.status = backendResult.status;
                    this.emit();
                }
                return backendResult;
            }
        }
        catch {
            // The backend keeps retrying; tab-name injection is too fragile after Steam restarts.
        }
        this.status = tr("cannotReachBigPicture");
        this.emit();
        return undefined;
    }
    withTimeout(promise, timeoutMs) {
        return new Promise((resolve, reject) => {
            const timeout = window.setTimeout(() => reject(new Error("Steam debugger timeout")), timeoutMs);
            promise
                .then((value) => resolve(value))
                .catch((error) => reject(error))
                .finally(() => window.clearTimeout(timeout));
        });
    }
    applyRemoteResult(result) {
        if (!result) {
            return;
        }
        this.appId = result.appId;
        this.status = result.status;
        this.trailerName = result.trailerName;
        this.gameTitle = result.gameTitle;
        this.needsSteamAppSearch = result.needsSteamAppSearch;
        this.steamAppSearchTitle = result.steamAppSearchTitle;
        this.needsYouTubeSearch = result.needsYouTubeSearch;
        this.needsYouTubeDirectResolve = result.needsYouTubeDirectResolve;
        this.youtubeDirectResolveKey = result.youtubeDirectResolveKey;
        this.youtubeVideoId = result.youtubeVideoId;
        this.preferredSource = result.preferredSource;
        this.sourceAppId = result.sourceAppId;
        this.selectedSteamMovieId = result.selectedSteamMovieId;
        this.steamMovies = result.steamMovies ?? [];
        this.trimStartSeconds = result.trimStartSeconds ?? DEFAULT_TRIM_START_SECONDS;
        this.trimEndSeconds = result.trimEndSeconds ?? DEFAULT_TRIM_END_SECONDS;
        this.emit();
        this.maybeResolveSteamAppId();
        this.maybeAutoSearchYouTube();
        this.maybeResolveYouTubeDirect();
    }
    rememberYouTubeDirectEntry(key, entry) {
        const entries = Object.entries({
            ...this.youtubeDirectStreams,
            [key]: entry
        }).sort((left, right) => Number(right[1]?.createdAt || 0) - Number(left[1]?.createdAt || 0));
        this.youtubeDirectStreams = Object.fromEntries(entries.slice(0, 6));
    }
    maybeResolveYouTubeDirect() {
        if (!this.settings.youtubeEnabled ||
            this.settings.youtubePlaybackMode !== "direct" ||
            !this.needsYouTubeDirectResolve ||
            !this.appId ||
            !this.youtubeVideoId) {
            return;
        }
        const key = this.youtubeDirectResolveKey || `${this.appId}:${this.youtubeVideoId}:${this.settings.qualityHeight}`;
        const existing = this.youtubeDirectStreams[key];
        if (existing && Date.now() - Number(existing.createdAt || 0) <= 20 * 60 * 1000) {
            return;
        }
        if (existing) {
            delete this.youtubeDirectStreams[key];
        }
        if (this.youtubeDirectResolveInFlight.has(key)) {
            return;
        }
        const videoId = this.youtubeVideoId;
        const qualityHeight = this.settings.qualityHeight;
        this.youtubeDirectResolveInFlight.add(key);
        this.status = tr("resolvingYouTubeDirect");
        this.emit();
        resolveYouTubeStreams(videoId, qualityHeight)
            .then((result) => {
            const candidates = Array.isArray(result?.candidates) ? result.candidates : [];
            const audioCandidates = Array.isArray(result?.audioCandidates) ? result.audioCandidates : [];
            if (result?.ok && candidates.length) {
                this.rememberYouTubeDirectEntry(key, {
                    videoId,
                    qualityHeight,
                    createdAt: Date.now(),
                    candidates,
                    audioCandidates
                });
            }
            else {
                this.rememberYouTubeDirectEntry(key, {
                    videoId,
                    qualityHeight,
                    createdAt: Date.now(),
                    failed: true,
                    error: result?.error || tr("youtubeDirectUnavailable"),
                    candidates: [],
                    audioCandidates: []
                });
            }
            this.installOrUpdate();
        })
            .catch((error) => {
            this.rememberYouTubeDirectEntry(key, {
                videoId,
                qualityHeight,
                createdAt: Date.now(),
                failed: true,
                error: error instanceof Error ? error.message : tr("youtubeDirectUnavailable"),
                candidates: [],
                audioCandidates: []
            });
            this.installOrUpdate();
        })
            .finally(() => {
            this.youtubeDirectResolveInFlight.delete(key);
        });
    }
    rememberSteamAppSearchFailure(appId, title, error) {
        this.steamAutoSearchFailures = {
            ...this.steamAutoSearchFailures,
            [String(appId)]: {
                title,
                titleKey: normalizeSteamLookupTitle(title),
                createdAt: Date.now(),
                error
            }
        };
    }
    maybeResolveSteamAppId() {
        if (!this.needsSteamAppSearch ||
            !this.appId ||
            !this.steamAppSearchTitle ||
            this.settings.preferredSources[String(this.appId)] === "youtube") {
            return;
        }
        const appId = this.appId;
        const title = this.steamAppSearchTitle;
        const key = `${appId}:${normalizeSteamLookupTitle(title)}`;
        if (this.steamAppSearchInFlight.has(key)) {
            return;
        }
        this.steamAppSearchInFlight.add(key);
        this.status = tr("searchingSteamStore", { title });
        this.emit();
        resolveSteamAppId(title)
            .then((result) => {
            if (result?.ok && Number.isInteger(result.appid) && result.appid > 0) {
                const steamAutoSearchFailures = { ...this.steamAutoSearchFailures };
                delete steamAutoSearchFailures[String(appId)];
                this.steamAutoSearchFailures = steamAutoSearchFailures;
                this.status = tr("steamAutoFound", { title: result.name ?? result.appid });
                this.updateSettings({
                    steamAppOverrides: {
                        ...this.settings.steamAppOverrides,
                        [String(appId)]: result.appid
                    }
                });
                return;
            }
            this.rememberSteamAppSearchFailure(appId, title, result?.error || tr("steamAutoNoMatch"));
            this.status = tr("steamAutoNoMatch");
            this.emit();
            this.installOrUpdate();
        })
            .catch((error) => {
            this.rememberSteamAppSearchFailure(appId, title, error instanceof Error ? error.message : tr("steamAutoNoMatch"));
            this.status = error instanceof Error ? error.message : tr("steamAutoNoMatch");
            this.emit();
            this.installOrUpdate();
        })
            .finally(() => {
            this.steamAppSearchInFlight.delete(key);
        });
    }
    applyRemoteResultOrInstall(result) {
        if (result?.runtimeMissing) {
            this.installOrUpdate();
            return;
        }
        this.applyRemoteResult(result);
    }
    async collectNonSteamApps(shortcutsOnly = true) {
        const script = `(() => {
          const apps = new Map();
          const windows = [];
          const addWindow = (value) => {
            try {
              if (value && !windows.includes(value)) windows.push(value);
            } catch {}
          };
          try { addWindow(window); } catch {}
          try { addWindow(globalThis); } catch {}
          try { addWindow(window.top); } catch {}
          try { addWindow(window.parent); } catch {}
          try { addWindow(window.opener); } catch {}
          try { addWindow(window.Router?.WindowStore?.GamepadUIMainWindowInstance?.BrowserWindow); } catch {}
          try { addWindow(globalThis.Router?.WindowStore?.GamepadUIMainWindowInstance?.BrowserWindow); } catch {}
          const cleanTitle = (value) => String(value ?? '')
            .replace(/\s+/g, ' ')
            .replace(/^(?:shortcut|non[- ]steam game)[:\s-]+/i, '')
            .replace(/\s+\|\s+Steam.*$/i, '')
            .trim();
          const badTitle = (value) => {
            const text = cleanTitle(value);
            const lower = text.toLowerCase();
            return (!text || /^App\s+\d+$/i.test(text) || /^\d{1,2}:\d{2}(?::\d{2})?$/.test(text) ||
              ['play','gioca','visualizza notifiche','view notifications','notifications','notifiche','library','libreria'].includes(lower));
          };
          const readId = (entry) => {
            const raw = entry?.appid ?? entry?.appId ?? entry?.appID ?? entry?.app_id ?? entry?.unAppID ?? entry?.nAppID ?? entry?.m_unAppID ?? entry?.id ?? entry?.gameid ?? entry?.gameId;
            const value = Number(raw);
            return Number.isFinite(value) && value > 0 ? value : 0;
          };
          const collectTitleCandidates = (entry, candidates, depth = 0, seen = new Set()) => {
            if (!entry || depth > 2 || seen.has(entry)) return;
            seen.add(entry);
            const push = (value) => { if (typeof value === 'string') candidates.push(value); };
            for (const key of ['display_name','localized_name','name','m_strName','title','strDisplayName','m_strDisplayName','m_strName','displayName','m_displayName']) {
              try { push(entry[key]); } catch {}
            }
            for (const getter of ['GetDisplayName','GetName','GetStoreName','GetTitle']) {
              try { const fn = entry[getter]; if (typeof fn === 'function') push(fn.call(entry)); } catch {}
            }
            for (const key of ['app','data','overview','details','m_data']) {
              try { if (entry[key] && typeof entry[key] === 'object') collectTitleCandidates(entry[key], candidates, depth + 1, seen); } catch {}
            }
          };
          const readTitle = (entry, appId) => {
            const candidates = [];
            collectTitleCandidates(entry, candidates);
            for (const candidate of candidates) {
              const text = cleanTitle(candidate);
              if (!badTitle(text)) return text;
            }
            return '';
          };
          const isShortcut = (entry, appId) => {
            try { if (entry?.BIsShortcut?.()) return true; } catch {}
            try { if (entry?.BIsModOrShortcut?.()) return true; } catch {}
            try { if (entry?.BIsExternalApp?.()) return true; } catch {}
            const appTypeRaw = entry?.app_type ?? entry?.m_eAppType ?? entry?.unAppType ?? entry?.type ?? entry?.m_AppType ?? '';
            const appType = Number(appTypeRaw);
            const flags = [entry?.bIsShortcut, entry?.m_bIsShortcut, entry?.is_shortcut, entry?.isShortcut, entry?.bIsNonSteam, entry?.m_bIsNonSteam].some(Boolean);
            const text = String(appTypeRaw ?? '').toLowerCase();
            return Boolean(flags || appType === 1073741824 || appId >= 2147483648 || text.includes('shortcut') || text.includes('non-steam') || text.includes('non steam'));
          };
          const add = (entry) => {
            if (!entry) return;
            const appId = readId(entry);
            if (!appId || (${shortcutsOnly ? "true" : "false"} && !isShortcut(entry, appId))) return;
            const title = readTitle(entry, appId);
            if (!title || badTitle(title)) return;
            apps.set(String(appId), { appId, title });
          };
          const addIterable = (value) => {
            try {
              if (!value) return;
              if (Array.isArray(value)) { value.forEach(add); return; }
              if (typeof value.values === 'function') { Array.from(value.values()).forEach(add); return; }
              if (typeof value === 'object') { Object.values(value).forEach(add); }
            } catch {}
          };
          const addStore = (store) => {
            if (!store) return;
            addIterable(store.allApps);
            addIterable(store.m_mapAppOverview);
            addIterable(store.m_mapApps);
            addIterable(store.m_mapAppInfo);
            addIterable(store.m_mapAppDetails);
            addIterable(store.m_rgApps);
            addIterable(store.apps);
            try { addIterable(store.GetAllApps?.()); } catch {}
            try { addIterable(store.GetApps?.()); } catch {}
          };
          for (const steamWindow of windows) {
            try { addStore(steamWindow.appStore); } catch {}
            try { addStore(steamWindow.SteamUIStore?.m_AppStore); } catch {}
            try { addStore(steamWindow.appDetailsStore); } catch {}
          }
          return { ok: true, apps: Array.from(apps.values()).sort((a, b) => a.title.localeCompare(b.title)) };
        })()`;
        const result = await this.withTimeout(evalInBigPicture(script), 30000);
        return Array.isArray(result?.apps) ? result.apps : [];
    }
    async startBulkLocalDownload(quality) {
        const apps = await this.collectNonSteamApps(false);
        if (!apps.length) {
            return { ok: false, error: tr("noGameRecognized") };
        }
        const items = apps.map((app) => {
            const key = String(app.appId);
            const preferred = this.settings.preferredSources[key] || "auto";
            const youtubeId = this.settings.youtubeVideos[key] || "";
            const useYouTube = preferred === "youtube" && youtubeId;
            return {
                appid: app.appId,
                title: app.title,
                source: useYouTube ? "youtube" : preferred === "steam" ? "steam" : "auto",
                value: useYouTube ? youtubeId : this.settings.steamMovieOverrides[key] || "",
                sourceAppId: this.settings.steamAppOverrides[key] || app.appId
            };
        });
        const result = await startBulkDownload(items, quality);
        if (result?.ok && result.jobId) {
            this.watchTrailerJob(result.jobId, apps.map((app) => app.appId));
        }
        return result;
    }

    async reassignYouTubeForNonSteamGames() {
        if (this.bulkYouTubeInFlight) {
            return;
        }
        const confirmed = await confirmYouTubeBulkReassign();
        if (!confirmed) {
            return;
        }
        this.bulkYouTubeInFlight = true;
        this.emit();
        try {
            const youtubeVideos = {};
            const youtubeQueries = {};
            const preferredSources = Object.fromEntries(Object.entries(this.settings.preferredSources)
                .filter(([_key, source]) => source !== "youtube"));
            // The reset must be saved immediately and globally, before any new search starts.
            // This guarantees that old bad custom YouTube links, even ones saved under
            // app IDs that Steam does not enumerate as shortcuts, cannot survive.
            this.youtubeSearchFailed.clear();
            this.youtubeSearchInFlight.clear();
            this.updateSettings({ youtubeVideos, preferredSources, youtubeQueries });
            const apps = await this.collectNonSteamApps();
            if (!apps.length) {
                this.status = tr("youtubeBulkNoGames");
                this.emit();
                return;
            }
            let assigned = 0;
            let failed = 0;
            for (let index = 0; index < apps.length; index += 1) {
                const app = apps[index];
                const key = String(app.appId);
                this.status = tr("youtubeBulkProgress", { current: index + 1, total: apps.length, title: app.title });
                this.emit();
                try {
                    const result = await searchYouTubeTrailer(app.title);
                    if (result?.ok && result.videoId) {
                        youtubeVideos[key] = result.videoId;
                        delete youtubeQueries[key];
                        assigned += 1;
                    }
                    else {
                        delete youtubeVideos[key];
                        delete youtubeQueries[key];
                        if (preferredSources[key] === "youtube") {
                            delete preferredSources[key];
                        }
                        failed += 1;
                    }
                }
                catch {
                    delete youtubeVideos[key];
                    delete youtubeQueries[key];
                    if (preferredSources[key] === "youtube") {
                        delete preferredSources[key];
                    }
                    failed += 1;
                }
            }
            this.status = tr("youtubeBulkDone", { assigned, total: apps.length, failed });
            this.updateSettings({ youtubeVideos, preferredSources, youtubeQueries });
        }
        finally {
            this.bulkYouTubeInFlight = false;
            this.emit();
        }
    }
    maybeAutoSearchYouTube() {
        if (!this.settings.youtubeEnabled ||
            !this.settings.youtubeAutoSearch ||
            !this.needsYouTubeSearch ||
            !this.appId ||
            !this.gameTitle ||
            this.settings.preferredSources[String(this.appId)] === "steam" ||
            this.settings.youtubeVideos[String(this.appId)] ||
            this.youtubeSearchInFlight.has(this.appId) ||
            this.youtubeSearchFailed.has(this.appId)) {
            return;
        }
        const appId = this.appId;
        const gameTitle = this.gameTitle;
        this.youtubeSearchInFlight.add(appId);
        this.status = tr("searchingYouTubeTrailer", { title: gameTitle });
        this.emit();
        searchYouTubeTrailer(gameTitle)
            .then((result) => {
            if (!result.ok || !result.videoId) {
                this.youtubeSearchFailed.add(appId);
                this.status = tr("youtubeAutoNoTrailer");
                this.emit();
                return;
            }
            this.status = tr("youtubeAutoFound", { title: result.title ?? result.videoId });
            this.updateSettings({
                youtubeVideos: {
                    ...this.settings.youtubeVideos,
                    [String(appId)]: result.videoId
                }
            });
        })
            .catch((error) => {
            this.youtubeSearchFailed.add(appId);
            this.status = error instanceof Error ? error.message : tr("youtubeSearchError");
            this.emit();
        })
            .finally(() => {
            this.youtubeSearchInFlight.delete(appId);
        });
    }
    emit() {
        const snapshot = this.getSnapshot();
        this.listeners.forEach((listener) => listener(snapshot));
    }
}
const controller = new TrailerHeroController();
const isLikelyBadYouTubeQuery = (value) => {
    const text = String(value || "").replace(/\s+/g, " ").trim();
    const lower = text.toLowerCase();
    return (!text ||
        /^\d{1,2}:\d{2}(?::\d{2})?$/.test(text) ||
        /^\d+(?:[.,]\d+)?\s*(?:h|hrs?|hours?|ore|min|mins?|minutes?|secondi?|seconds?)$/i.test(text) ||
        /(?:visualizza notifiche|view notifications|notifications|notifiche|ultimo avvio|last played|tempo di gioco|play time|gioca ultimo|play last)/i.test(lower));
};
const TRAILERHERO_ROUTE = "/trailerhero/:appid";
const TRAILERHERO_MENU_KEY = "trailerhero-game-settings";
const trailerHeroPageStyles = `
  .thQam,.thQam *,.thGamePage,.thGamePage *{box-sizing:border-box}
  .thQam{width:100%;max-width:100%;min-width:0;padding:0 2px 18px;overflow:hidden;color:#fff}
  .thQamHeading{margin:13px 2px 7px;color:rgba(255,255,255,.68);font-size:12px;font-weight:800;text-transform:uppercase}
  .thQamCard{width:100%;min-width:0;margin:0 0 9px;padding:12px;border:1px solid rgba(255,255,255,.09);border-radius:8px;background:rgba(255,255,255,.04);overflow:hidden}
  .thQamCard>*{border-top:0!important;border-bottom:0!important;box-shadow:none!important;background-image:none!important}
  .thQamCard>*:before,.thQamCard>*:after{border:0!important;box-shadow:none!important;background:none!important}
  .thQamCard [class*="PanelSectionRow"],.thQamCard [class*="ToggleField"],.thQamCard [class*="DropdownItem"]{width:100%!important;max-width:100%!important;border-top:0!important;border-bottom:0!important;box-shadow:none!important;background-image:none!important}
  .thQamCard [class*="Dropdown"]{max-width:100%!important}
  .thQamButtonStack{display:grid;gap:7px;width:100%;margin-top:8px}
  .thQamButton.DialogButton{width:100%!important;min-width:0!important;min-height:40px!important;margin:0!important;padding:0 10px!important;border-radius:7px!important;color:#fff!important;font-size:14px!important}
  .thQamButton.DialogButton:hover,.thQamButton.DialogButton:focus,.thQamButton.DialogButton.gpfocus{background:rgba(240,180,41,.16)!important;color:#fff!important;border-color:rgba(240,180,41,.92)!important;box-shadow:0 0 0 2px rgba(240,180,41,.22)!important}
  .thQamButton.DialogButton:disabled{opacity:.35!important}
  .thQamDanger.DialogButton{background:rgba(200,42,42,.18)!important;border:1px solid rgba(232,72,72,.48)!important;color:#ffaaaa!important}
  .thQamDanger.DialogButton:focus,.thQamDanger.DialogButton.gpfocus{background:#c62828!important;color:#fff!important;border-color:#ffaaaa!important;box-shadow:inset 0 0 0 2px rgba(255,255,255,.85)!important}
  .thQamStatus{width:100%;margin-top:9px;padding:10px;border-radius:7px;background:rgba(240,180,41,.09);font-size:12px;line-height:1.35}
  .thGamePage{position:fixed;inset:0;z-index:10;width:100%;min-height:100vh;overflow-y:auto;overflow-x:hidden;padding:30px max(36px,calc((100vw - 1460px)/2)) 110px;color:#fff;background:linear-gradient(180deg,rgba(255,255,255,.025),transparent 360px),#080909}
  .thGamePage .DialogButton{border-radius:6px!important;min-height:42px!important}
  .thGameHeader{display:grid;grid-template-columns:42px minmax(0,1fr);gap:14px;align-items:center;margin-bottom:18px}
  .thIconButton{width:42px!important;min-width:42px!important;height:42px!important;min-height:42px!important;padding:0!important;display:grid!important;place-items:center!important}
  .thIconButton:hover,.thIconButton:focus,.thIconButton.gpfocus{background:#f0b429!important;color:#151515!important;box-shadow:0 0 0 3px rgba(255,255,255,.9)!important}
  .thIconButton:hover svg,.thIconButton:focus svg,.thIconButton.gpfocus svg{color:#151515!important;fill:currentColor!important}
  .thGrid{display:grid;grid-template-columns:minmax(0,1fr);gap:0;align-items:start;margin-top:16px}
  .thCard{width:100%;min-width:0;margin:0 0 16px;padding:18px;border:1px solid rgba(255,255,255,.1);border-radius:7px;background:rgba(255,255,255,.045);overflow:hidden}
  .thCard h2{margin:0 0 4px;font-size:20px}.thCardDesc{font-size:13px;line-height:1.4;opacity:.62;margin-bottom:12px}
  .thActiveCard{display:grid;grid-template-columns:minmax(0,1.12fr) minmax(340px,.88fr);gap:20px;align-items:start}
  .thActivePreview,.thActiveSettings{min-width:0}.thActiveSettings{padding-left:20px;border-left:1px solid rgba(255,255,255,.09)}
  .thDeleteFile.DialogButton{width:100%!important;margin:12px 0 0!important;border:1px solid rgba(255,110,110,.7)!important;background:rgba(170,30,30,.22)!important;color:#ffd2d2!important}.thDeleteFile.DialogButton:hover,.thDeleteFile.DialogButton:focus,.thDeleteFile.DialogButton.gpfocus{background:#c73535!important;color:#fff!important;outline:3px solid #fff!important;outline-offset:2px!important;box-shadow:0 0 0 2px rgba(8,9,9,.95)!important}
  .thPreview{position:relative;width:100%;aspect-ratio:16/9;display:grid;place-items:center;overflow:hidden;border-radius:7px;background:#000}
  .thPreview video,.thPreview iframe,.thPreview img{width:100%;height:100%;border:0;object-fit:contain;background:#000}
  .thActions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px;margin-top:11px}
  .thActions .DialogButton{width:100%!important;min-width:0!important;margin:0!important}
  .thModeChoices{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-top:14px}
  .thModeChoices .DialogButton{width:100%!important;min-height:106px!important;margin:0!important;padding:14px 10px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:9px!important;text-align:center!important}
  .thModeIcon{display:grid;place-items:center;width:34px;height:34px;font-size:28px;line-height:1;color:rgba(255,255,255,.9)}.thModeIcon svg{display:block;width:28px;height:28px}
  .thModeChoices .thModeSelected.DialogButton{background:#f0b429!important;border:1px solid #f0b429!important;color:#151515!important;box-shadow:none!important}.thModeChoices .thModeSelected .thModeIcon{color:#151515!important}
  .thModeChoices .DialogButton:hover,.thModeChoices .DialogButton:focus,.thModeChoices .DialogButton.gpfocus,
  .thActions .DialogButton:hover,.thActions .DialogButton:focus,.thActions .DialogButton.gpfocus{outline:3px solid #fff!important;outline-offset:3px!important;filter:contrast(1.14) brightness(1.08)!important;transform:translateY(-1px)!important;box-shadow:0 0 0 2px rgba(8,9,9,.92),0 5px 18px rgba(0,0,0,.42)!important}
  .thModeChoices .DialogButton:hover,.thModeChoices .DialogButton:focus,.thModeChoices .DialogButton.gpfocus{background:#f4f4f4!important;color:#151515!important}.thModeChoices .DialogButton:hover .thModeIcon,.thModeChoices .DialogButton:focus .thModeIcon,.thModeChoices .DialogButton.gpfocus .thModeIcon{color:#151515!important}
  .thModeChoices .thModeSelected.DialogButton:hover,.thModeChoices .thModeSelected.DialogButton:focus,.thModeChoices .thModeSelected.DialogButton.gpfocus{background:#f0b429!important;box-shadow:0 0 0 2px rgba(8,9,9,.92),0 5px 18px rgba(0,0,0,.42)!important}
  .thSearchRow{display:grid;grid-template-columns:minmax(0,1fr) 136px;gap:10px;align-items:stretch;width:100%;min-width:0;margin-top:14px}.thSearchRow .DialogButton{width:136px!important;min-width:136px!important;height:100%!important;margin:0!important;justify-self:end!important}
  .thResult{display:grid!important;grid-template-columns:144px minmax(0,1fr) 112px 116px 112px!important;gap:10px!important;align-items:center!important;width:100%!important;min-height:101px!important;height:auto!important;margin:0!important;padding:10px!important;text-align:left!important;border-bottom:1px solid rgba(255,255,255,.075)!important;border-radius:0;background:transparent!important}
  .thResult:hover,.thResult:focus,.thResult.gpfocus{outline:3px solid #fff!important;outline-offset:2px!important;border-color:#f0b429!important;background:rgba(240,180,41,.13)!important;transform:translateY(-1px)!important}
  .thResult.thResultSelected{border-color:#f0b429!important;background:rgba(240,180,41,.2)!important;box-shadow:inset 4px 0 0 #f0b429!important}
  .thResult .DialogButton{width:100%!important;min-width:0!important;height:44px!important;min-height:44px!important;margin:0!important;padding:0 9px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:7px!important;font-size:13px!important;white-space:nowrap!important}
  .thResult .DialogButton:hover,.thResult .DialogButton:focus,.thResult .DialogButton.gpfocus{position:relative!important;z-index:2!important;background:#f0b429!important;color:#151515!important;outline:3px solid #fff!important;outline-offset:2px!important;box-shadow:0 0 0 2px rgba(8,9,9,.95)!important;transform:translateY(-1px)!important}.thResult .DialogButton svg{width:17px;height:17px;pointer-events:none}
  .thResult .thResultActionSelected.DialogButton{border:1px solid #f0b429!important;background:rgba(240,180,41,.2)!important;color:#fff!important}.thResult .thResultActionSelected.DialogButton:hover,.thResult .thResultActionSelected.DialogButton:focus,.thResult .thResultActionSelected.DialogButton.gpfocus{background:#f0b429!important;color:#151515!important}
  .thResultThumb{width:144px;height:81px;aspect-ratio:16/9;object-fit:cover;border-radius:5px;background:linear-gradient(135deg,#222,#111);display:block}
  .thResultPlaceholder{width:144px;height:81px;border-radius:5px;background:linear-gradient(135deg,#242424,#101010);display:grid;place-items:center;color:rgba(255,255,255,.42);font-size:11px;text-transform:uppercase}
  .thInlinePreview{grid-column:1/3;width:min(460px,100%);max-width:460px;aspect-ratio:16/9;max-height:259px;justify-self:start;margin:4px 0 2px;border-radius:6px;overflow:hidden;background:#000}.thInlinePreview .thPreview{width:100%;max-height:259px}
  .thInlinePreview video,.thInlinePreview iframe,.thInlinePreview img{width:100%;height:100%;border:0;background:#000;object-fit:contain}
  .thProgress{height:7px;margin-top:10px;border-radius:5px;overflow:hidden;background:rgba(255,255,255,.14)}
  .thProgress>div{height:100%;background:#f0b429;transition:width .2s ease}
  @media(max-width:900px){.thActiveCard{grid-template-columns:minmax(0,1fr)}.thActiveSettings{padding-left:0;padding-top:16px;border-left:0;border-top:1px solid rgba(255,255,255,.09)}}
`;
function showTrailerHeroNotice(body) {
    try {
        toaster?.toast?.({ title: "TrailerHero", body: String(body || tr("operationComplete")) });
    }
    catch {
    }
}
function confirmTrailerHeroAction(body) {
    return new Promise((resolve) => {
        let finished = false;
        let modal;
        const finish = (value) => {
            if (finished) return;
            finished = true;
            try { modal?.Close?.(); }
            catch { }
            resolve(value);
        };
        try {
            const content = SP_JSX.jsxs(DFL.ModalRoot, { closeModal: () => finish(false), children: [
                SP_JSX.jsx("div", { style: { fontSize: "1rem", lineHeight: 1.4, marginBottom: 16, whiteSpace: "normal" }, children: body }),
                SP_JSX.jsxs(DFL.Focusable, { "flow-children": "row", noFocusRing: true, style: { display: "flex", justifyContent: "flex-end", gap: 8 }, children: [
                    SP_JSX.jsx(DFL.DialogButton, { focusable: true, onClick: () => finish(false), children: tr("cancel") }),
                    SP_JSX.jsx(DFL.DialogButton, { focusable: true, onClick: () => finish(true), children: tr("confirm") })
                ] })
            ] });
            modal = DFL.showModal?.(content, undefined, { strTitle: "TrailerHero" });
        }
        catch {
            modal = undefined;
        }
        if (!modal) {
            try { finish(Boolean(window.confirm?.(body))); }
            catch { finish(false); }
        }
    });
}
function readTrailerHeroRouteAppId() {
    const locationText = `${globalThis.location?.pathname || ""}${globalThis.location?.hash || ""}`;
    const match = locationText.match(/\/trailerhero\/(\d+)/i);
    const appId = Number(match?.[1] || 0);
    return Number.isInteger(appId) && appId > 0 ? appId : 0;
}
function normalizeMenuAppId(value) {
    const appId = Number(value?.trailerHeroAppId ?? value?.appid ?? value?.appId ?? value?.appID ?? value?.app_id ?? value?.unAppID ?? value?.nAppID ?? value?.m_unAppID ?? value?.gameid ?? value?.gameId ?? value);
    return Number.isInteger(appId) && appId > 0 ? appId : 0;
}
function getSteamAppName(appId) {
    if (!appId) {
        return "";
    }
    const stores = [
        globalThis.appStore,
        globalThis.SteamUIStore?.m_AppStore,
        globalThis.appDetailsStore,
        globalThis.Router?.WindowStore?.GamepadUIMainWindowInstance?.BrowserWindow?.appStore
    ];
    for (const store of stores) {
        if (!store) {
            continue;
        }
        const entries = [];
        for (const getter of ["GetAppOverviewByAppID", "GetAppOverview", "GetAppDetails"]) {
            try {
                if (typeof store[getter] === "function") {
                    entries.push(store[getter](appId));
                }
            }
            catch {
            }
        }
        try {
            entries.push(store.m_mapAppOverview?.get?.(appId));
            entries.push(store.m_mapAppDetails?.get?.(appId));
            entries.push(store.m_mapApps?.get?.(appId));
        }
        catch {
        }
        for (const entry of entries.filter(Boolean)) {
            for (const value of [entry.display_name, entry.localized_name, entry.name, entry.m_strName, entry.title, entry.strDisplayName]) {
                const title = String(value || "").replace(/\s+/g, " ").trim();
                if (title) {
                    return title;
                }
            }
        }
    }
    return `App ${appId}`;
}
function TrailerPreview({ preview, audioMode }) {
    const videoRef = SP_REACT.useRef(null);
    const audioRef = SP_REACT.useRef(null);
    const iframeRef = SP_REACT.useRef(null);
    const [videoFailed, setVideoFailed] = SP_REACT.useState(false);
    SP_REACT.useEffect(() => {
        setVideoFailed(false);
    }, [preview?.url]);
    SP_REACT.useEffect(() => {
        const video = videoRef.current;
        const audio = audioRef.current;
        if (!video) {
            return undefined;
        }
        const trailerAudio = audioMode === "trailer";
        const syncAudio = () => {
            if (!audio || Math.abs(Number(audio.currentTime || 0) - Number(video.currentTime || 0)) < 0.35) {
                return;
            }
            try {
                audio.currentTime = video.currentTime;
            }
            catch {
            }
        };
        const playAudio = () => {
            if (!audio || !trailerAudio) {
                return;
            }
            syncAudio();
            void audio.play().catch(() => undefined);
        };
        const pauseAudio = () => audio?.pause?.();
        video.muted = !trailerAudio || Boolean(audio);
        video.defaultMuted = video.muted;
        if (audio) {
            audio.muted = !trailerAudio;
            audio.defaultMuted = !trailerAudio;
            audio.volume = trailerAudio ? 1 : 0;
        }
        video.addEventListener("play", playAudio);
        video.addEventListener("pause", pauseAudio);
        video.addEventListener("seeked", syncAudio);
        video.addEventListener("timeupdate", syncAudio);
        const start = async () => {
            try {
                await video.play();
                playAudio();
            }
            catch {
                video.muted = true;
                if (audio) {
                    audio.muted = true;
                }
                await video.play().catch(() => undefined);
            }
        };
        void start();
        return () => {
            video.removeEventListener("play", playAudio);
            video.removeEventListener("pause", pauseAudio);
            video.removeEventListener("seeked", syncAudio);
            video.removeEventListener("timeupdate", syncAudio);
            video.pause();
            audio?.pause?.();
        };
    }, [preview?.url, preview?.audioUrl, audioMode]);
    if (!preview || preview.kind === "loading") {
        return SP_JSX.jsx("div", { className: "thPreview", children: SP_JSX.jsx(DFL.Spinner, {}) });
    }
    if (preview.kind === "preparing") {
        return SP_JSX.jsxs("div", { className: "thPreview", style: { position: "relative" }, children: [
            preview.poster ? SP_JSX.jsx("img", { src: preview.poster, alt: preview.title || tr("previewTrailer"), style: { width: "100%", height: "100%", objectFit: "cover", opacity: 0.72 } }) : null,
            SP_JSX.jsx("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.2)" }, children: SP_JSX.jsx(DFL.Spinner, {}) })
        ] });
    }
    if (preview.kind === "youtube") {
        const src = `https://www.youtube-nocookie.com/embed/${preview.videoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&playsinline=1&rel=0&loop=1&playlist=${preview.videoId}`;
        const startYouTube = () => {
            const target = iframeRef.current?.contentWindow;
            if (!target) return;
            const command = (func, args = []) => target.postMessage(JSON.stringify({ event: "command", func, args }), "*");
            command("playVideo");
            if (audioMode === "trailer") command("unMute");
        };
        return SP_JSX.jsx("div", { className: "thPreview", children: SP_JSX.jsx("iframe", { ref: iframeRef, className: "trailerhero-video", src, allow: "autoplay; encrypted-media; picture-in-picture", allowFullScreen: true, onLoad: startYouTube, title: preview.title || tr("previewTrailer") }) });
    }
    if (preview.kind !== "video" || !preview.url) {
        return SP_JSX.jsx("div", { className: "thPreview", children: SP_JSX.jsx("div", { style: { padding: 24, textAlign: "center", opacity: 0.66 }, children: tr("noPreview") }) });
    }
    if (videoFailed && preview.poster) {
        return SP_JSX.jsx("div", { className: "thPreview", children: SP_JSX.jsx("img", { src: preview.poster, alt: preview.title || tr("previewTrailer") }) });
    }
    return SP_JSX.jsxs("div", { className: "thPreview", children: [
        SP_JSX.jsx("video", { ref: videoRef, src: preview.url, poster: preview.poster || undefined, autoPlay: true, playsInline: true, loop: true, controls: false, preload: "auto", crossOrigin: "anonymous", onError: () => setVideoFailed(true) }),
        preview.audioUrl ? SP_JSX.jsx("audio", { ref: audioRef, src: preview.audioUrl, preload: "auto", loop: true, crossOrigin: "anonymous" }) : null
    ] });
}

const TRAILERHERO_CHROME_STYLE_ID = "th-fullscreen-chrome-style";
let trailerHeroChromeLease = 0;
let trailerHeroChromeObservers = [];
let trailerHeroChromeFrame = 0;
let trailerHeroChromeReleaseTimer = 0;
const trailerHeroChromeRefreshTimers = new Set();
let trailerHeroFocusTraps = [];
const trailerHeroChromeTouched = new Map();
const trailerHeroChromeSelectors = [
    "#header", "#Footer",
    '[class*="BasicFooter"]', '[class*="FooterLegend"]', '[class*="QuickAccessFooter"]',
    '[class*="GamepadFooter"]', '[class*="GamepadHeader"]', '[class*="HeaderStatus"]',
    '[class*="StatusIcons"]', '[class*="TopBar"]', '[class*="SearchBar"]',
    '[class*="SearchBox"]', '[class*="GamepadSearch"]', '[data-featuretarget*="search" i]',
    '[data-th-fullscreen-chrome="true"]'
];
function trailerHeroRouteDocuments() {
    if (typeof document === "undefined") return [];
    const docs = [];
    const addDocument = (candidate) => { try { if (candidate?.documentElement && !docs.includes(candidate)) docs.push(candidate); } catch { } };
    const addWindowDocument = (candidate) => {
        if (!candidate) return;
        try { addDocument(candidate.document); } catch { }
        try { addDocument(candidate.window?.document); } catch { }
        try { addDocument(candidate.m_Window?.document); } catch { }
        try { addDocument(candidate.m_popup?.document); } catch { }
        try { addDocument(candidate.BrowserWindow?.document); } catch { }
        try { addDocument(candidate.GetWindow?.()?.document); } catch { }
    };
    addDocument(document);
    try { addDocument(window.top?.document); } catch { }
    try { addDocument(window.parent?.document); } catch { }
    try { addDocument(window.opener?.document); } catch { }
    const store = DFL.Router?.WindowStore;
    addWindowDocument(store?.GamepadUIMainWindowInstance);
    if (Array.isArray(store?.SteamUIWindows)) store.SteamUIWindows.forEach(addWindowDocument);
    return docs;
}
function ensureTrailerHeroChromeStyle(doc) {
    const css = `
      html.thFullscreenActive ${trailerHeroChromeSelectors.join(",html.thFullscreenActive ")},
      body.thFullscreenActive ${trailerHeroChromeSelectors.join(",body.thFullscreenActive ")} {
        display:none!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;
        transition:none!important;animation:none!important;
      }`;
    const existing = doc.getElementById(TRAILERHERO_CHROME_STYLE_ID);
    if (existing) { existing.textContent = css; return; }
    const style = doc.createElement("style");
    style.id = TRAILERHERO_CHROME_STYLE_ID;
    style.textContent = css;
    doc.head.appendChild(style);
}
function isTrailerHeroVirtualKeyboardElement(element) {
    let current = element;
    for (let depth = 0; current && depth < 10; depth += 1, current = current.parentElement) {
        const className = typeof current.className === "string" ? current.className : "";
        const identity = `${current.id || ""} ${className} ${current.getAttribute("data-featuretarget") || ""} ${current.getAttribute("aria-label") || ""}`.toLowerCase();
        if (identity.includes("virtualkeyboard") || identity.includes("virtual-keyboard") || identity.includes("onscreenkeyboard") || identity.includes("on-screen keyboard") || identity.includes("keyboardmodal") || identity.includes("keyboard_modal")) return true;
    }
    return false;
}
function hideTrailerHeroChromeElement(element) {
    if (!trailerHeroChromeTouched.has(element)) {
        trailerHeroChromeTouched.set(element, {
            cssText: element.style.cssText, ariaHidden: element.getAttribute("aria-hidden"),
            inert: Boolean(element.inert), tabIndex: element.getAttribute("tabindex")
        });
    }
    element.dataset.thFullscreenChrome = "true";
    for (const name of ["display", "opacity", "visibility", "pointer-events", "transition", "animation"])
        element.style.setProperty(name, name === "display" ? "none" : name === "opacity" ? "0" : name === "visibility" ? "hidden" : name === "pointer-events" ? "none" : "none", "important");
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("tabindex", "-1");
    try { element.inert = true; } catch { }
}
function markTrailerHeroSteamChrome(doc) {
    if (!doc.documentElement.classList.contains("thFullscreenActive")) return;
    doc.querySelectorAll(trailerHeroChromeSelectors.join(",")).forEach((element) => {
        if (!element.closest(".thGamePage") && !isTrailerHeroVirtualKeyboardElement(element)) hideTrailerHeroChromeElement(element);
    });
    const targetWindow = doc.defaultView ?? window;
    const viewportWidth = targetWindow.innerWidth;
    const viewportHeight = targetWindow.innerHeight;
    doc.querySelectorAll("body *").forEach((element) => {
        if (element.closest(".thGamePage") || element.dataset.thFullscreenChrome === "true" || isTrailerHeroVirtualKeyboardElement(element)) return;
        const rect = element.getBoundingClientRect();
        if (rect.width < viewportWidth * .45 || rect.height <= 0 || rect.height > 190) return;
        const computed = targetWindow.getComputedStyle(element);
        if (!/^(fixed|absolute|sticky)$/.test(computed.position)) return;
        const touchesTop = rect.top <= 12 && rect.bottom <= 194;
        const touchesBottom = rect.bottom >= viewportHeight - 12 && rect.top >= viewportHeight - 194;
        if (touchesTop || touchesBottom) hideTrailerHeroChromeElement(element);
    });
}
function hideTrailerHeroSteamChrome() {
    trailerHeroRouteDocuments().forEach((doc) => {
        ensureTrailerHeroChromeStyle(doc);
        doc.documentElement.classList.add("thFullscreenActive");
        doc.body?.classList.add("thFullscreenActive");
        markTrailerHeroSteamChrome(doc);
    });
}
function scheduleTrailerHeroChromeMark() {
    if (trailerHeroChromeFrame) window.cancelAnimationFrame(trailerHeroChromeFrame);
    trailerHeroChromeFrame = window.requestAnimationFrame(() => { trailerHeroChromeFrame = 0; hideTrailerHeroSteamChrome(); });
}
function scheduleTrailerHeroChromeBurst() {
    trailerHeroChromeRefreshTimers.forEach((timer) => window.clearTimeout(timer));
    trailerHeroChromeRefreshTimers.clear();
    [50, 140, 320, 650, 1100].forEach((delay) => {
        const timer = window.setTimeout(() => { trailerHeroChromeRefreshTimers.delete(timer); hideTrailerHeroSteamChrome(); }, delay);
        trailerHeroChromeRefreshTimers.add(timer);
    });
}
function retainTrailerHeroChrome() {
    trailerHeroChromeLease += 1;
    if (trailerHeroChromeReleaseTimer) { window.clearTimeout(trailerHeroChromeReleaseTimer); trailerHeroChromeReleaseTimer = 0; }
    hideTrailerHeroSteamChrome();
    trailerHeroChromeObservers.forEach((observer) => observer.disconnect());
    trailerHeroChromeObservers = trailerHeroRouteDocuments().flatMap((doc) => {
        if (!doc.body) return [];
        const observer = new MutationObserver(scheduleTrailerHeroChromeMark);
        observer.observe(doc.body, { childList: true, subtree: true });
        return [observer];
    });
    trailerHeroFocusTraps.forEach(({ doc, handler }) => doc.removeEventListener("focusin", handler, true));
    trailerHeroFocusTraps = trailerHeroRouteDocuments().map((doc) => {
        const handler = (event) => {
            const page = doc.querySelector(".thGamePage");
            if (!page || page.contains(event.target)) return;
            event.preventDefault?.();
            event.stopImmediatePropagation?.();
            const next = page.querySelector('button:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"]),[role="button"]');
            next?.focus?.({ preventScroll: true });
            next?.scrollIntoView?.({ block: "nearest", inline: "nearest" });
        };
        doc.addEventListener("focusin", handler, true);
        return { doc, handler };
    });
    scheduleTrailerHeroChromeBurst();
}
function releaseTrailerHeroChrome() {
    trailerHeroChromeLease = Math.max(0, trailerHeroChromeLease - 1);
    if (trailerHeroChromeLease) return;
    if (trailerHeroChromeReleaseTimer) window.clearTimeout(trailerHeroChromeReleaseTimer);
    trailerHeroChromeReleaseTimer = window.setTimeout(() => {
        trailerHeroChromeReleaseTimer = 0;
        if (trailerHeroChromeLease || trailerHeroRouteDocuments().some((doc) => doc.querySelector(".thGamePage"))) return;
        trailerHeroChromeRefreshTimers.forEach((timer) => window.clearTimeout(timer));
        trailerHeroChromeRefreshTimers.clear();
        trailerHeroChromeObservers.forEach((observer) => observer.disconnect());
        trailerHeroChromeObservers = [];
        if (trailerHeroChromeFrame) window.cancelAnimationFrame(trailerHeroChromeFrame);
        trailerHeroChromeFrame = 0;
        trailerHeroFocusTraps.forEach(({ doc, handler }) => doc.removeEventListener("focusin", handler, true));
        trailerHeroFocusTraps = [];
        trailerHeroRouteDocuments().forEach((doc) => {
            doc.documentElement.classList.remove("thFullscreenActive");
            doc.body?.classList.remove("thFullscreenActive");
        });
        trailerHeroChromeTouched.forEach((saved, element) => {
            element.style.cssText = saved.cssText;
            saved.ariaHidden === null ? element.removeAttribute("aria-hidden") : element.setAttribute("aria-hidden", saved.ariaHidden);
            saved.tabIndex === null ? element.removeAttribute("tabindex") : element.setAttribute("tabindex", saved.tabIndex);
            try { element.inert = saved.inert; } catch { }
            delete element.dataset.thFullscreenChrome;
        });
        trailerHeroChromeTouched.clear();
    }, 700);
}
function scrollTrailerHeroFocus(event) {
    event?.target?.scrollIntoView?.({ block: "nearest", inline: "nearest", behavior: "smooth" });
}
function Content() {
    const [snapshot, setSnapshot] = SP_REACT.useState(controller.getSnapshot());
    const [busy, setBusy] = SP_REACT.useState("");
    SP_REACT.useEffect(() => controller.subscribe(setSnapshot), []);
    SP_REACT.useEffect(() => { void controller.refreshLocalTrailers(); }, [appId]);
    const activeJob = ["queued", "running"].includes(snapshot.trailerJob?.state);
    const run = async (name, action) => {
        if (busy || activeJob) {
            return;
        }
        setBusy(name);
        try {
            const result = await action();
            if (result?.ok === false) {
                showTrailerHeroNotice(result.error || tr("noTrailerForApp", { appId: snapshot.appId || 0 }));
            }
        }
        catch (error) {
            showTrailerHeroNotice(error instanceof Error ? error.message : String(error));
        }
        finally {
            setBusy("");
        }
    };
    const jobTotal = Math.max(1, Number(snapshot.trailerJob?.total || 1));
    const jobCurrent = Math.max(0, Number(snapshot.trailerJob?.current || 0));
    const jobPercent = Math.max(0, Math.min(100, Math.round(jobCurrent / jobTotal * 100)));
    return SP_JSX.jsxs(DFL.PanelSection, { children: [
        SP_JSX.jsx("style", { children: trailerHeroPageStyles }),
        SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsxs(DFL.Focusable, { className: "thQam", "flow-children": "column", children: [
            SP_JSX.jsx("div", { className: "thQamHeading", children: tr("globalSettings") }),
            SP_JSX.jsxs("section", { className: "thQamCard", children: [
                SP_JSX.jsx(DFL.ToggleField, { label: tr("active"), bottomSeparator: "none", checked: snapshot.settings.enabled, onChange: (checked) => controller.setEnabled(checked) }),
                SP_JSX.jsx(DFL.DropdownItem, { label: tr("defaultAudio"), bottomSeparator: "none", rgOptions: [
                { data: "theme", label: tr("defaultAudioTheme") },
                { data: "trailer", label: tr("defaultAudioTrailer") }
            ], selectedOption: snapshot.settings.defaultAudio, onChange: (option) => controller.setDefaultAudio(option.data) }),
                SP_JSX.jsx(DFL.ToggleField, { label: tr("youtubeGlobal"), bottomSeparator: "none", checked: snapshot.settings.youtubeEnabled, onChange: (checked) => controller.setYouTubeEnabled(checked) }),
                SP_JSX.jsx(DFL.ToggleField, { label: tr("youtubeAutoSearch"), bottomSeparator: "none", checked: snapshot.settings.youtubeAutoSearch, disabled: !snapshot.settings.youtubeEnabled, onChange: (checked) => controller.setYouTubeAutoSearch(checked) }),
                SP_JSX.jsx(DFL.ToggleField, { label: tr("logoAssist"), bottomSeparator: "none", checked: snapshot.settings.logoAssistEnabled, onChange: (checked) => controller.setLogoAssist(checked) }),
                SP_JSX.jsx(DFL.ToggleField, { label: tr("stopOnLaunch"), bottomSeparator: "none", checked: snapshot.settings.stopOnLaunchEnabled, onChange: (checked) => controller.setStopOnLaunch(checked) }),
                SP_JSX.jsx(DFL.ToggleField, { label: tr("crtAutomatic"), bottomSeparator: "none", checked: snapshot.settings.crtLowResEnabled, onChange: (checked) => controller.setLowResCrt(checked) })
            ] }),
            SP_JSX.jsx("div", { className: "thQamHeading", children: tr("localLibrary") }),
            SP_JSX.jsxs("section", { className: "thQamCard", children: [
                SP_JSX.jsx(DFL.DropdownItem, { label: tr("qualityPreset", { quality: snapshot.settings.qualityHeight }), bottomSeparator: "none", rgOptions: QUALITY_OPTIONS.map((quality) => ({ data: quality, label: `${quality}p` })), selectedOption: snapshot.settings.qualityHeight, onChange: (option) => controller.updateSettings({ qualityHeight: Number(option.data) }) }),
                SP_JSX.jsx(DFL.Focusable, { className: "thQamButtonStack", "flow-children": "column", children: SP_JSX.jsx(DFL.DialogButton, { focusable: true, className: "thQamButton", disabled: Boolean(busy) || activeJob, onClick: () => void run("bulk-download", () => controller.startBulkLocalDownload(snapshot.settings.qualityHeight)), children: tr("downloadAll") }) }),
                activeJob ? SP_JSX.jsxs("div", { className: "thQamStatus", children: [
                    SP_JSX.jsx("div", { children: tr("downloadProgress", { current: jobCurrent, total: jobTotal }) }),
                    SP_JSX.jsx("div", { className: "thProgress", children: SP_JSX.jsx("div", { style: { width: `${jobPercent}%` } }) }),
                    SP_JSX.jsx(DFL.DialogButton, { focusable: true, className: "thQamButton", onClick: () => void controller.cancelCurrentTrailerJob(), style: { marginTop: 9 }, children: tr("cancelDownload") })
                ] }) : null
            ] }),
            SP_JSX.jsx("div", { className: "thQamHeading", children: tr("maintenance") }),
            SP_JSX.jsx("section", { className: "thQamCard", children: SP_JSX.jsxs(DFL.Focusable, { className: "thQamButtonStack", "flow-children": "column", children: [
                SP_JSX.jsx(DFL.DialogButton, { focusable: true, className: "thQamButton thQamDanger", disabled: Boolean(busy) || activeJob, onClick: () => {
                    void confirmTrailerHeroAction(tr("confirmDeleteAll")).then((confirmed) => {
                        if (confirmed) void run("delete-all", () => controller.deleteAllLocal());
                    });
                }, children: tr("deleteAll") }),
                SP_JSX.jsx(DFL.DialogButton, { focusable: true, className: "thQamButton thQamDanger", disabled: Boolean(busy) || activeJob, onClick: () => {
                    void confirmTrailerHeroAction(tr("confirmCleanup")).then((confirmed) => {
                        if (confirmed) void run("cleanup", () => controller.cleanupUnassignedLocal());
                    });
                }, children: tr("cleanupTrailers") })
            ] }) })
        ] }) })
    ] });
}
function GameSettingsPage({ appId }) {
    const pageRef = SP_REACT.useRef(null);
    const [snapshot, setSnapshot] = SP_REACT.useState(controller.getSnapshot());
    const initialSnapshot = controller.getSnapshot();
    const [gameTitle, setGameTitle] = SP_REACT.useState(initialSnapshot.appId === appId && initialSnapshot.gameTitle ? initialSnapshot.gameTitle : getSteamAppName(appId));
    const [steamCatalog, setSteamCatalog] = SP_REACT.useState({ appId: 0, movies: [], movieId: "" });
    const [preview, setPreview] = SP_REACT.useState({ kind: "loading" });
    const [youtubeQuery, setYoutubeQuery] = SP_REACT.useState("");
    const [youtubeResults, setYoutubeResults] = SP_REACT.useState([]);
    const [youtubeInlinePreview, setYoutubeInlinePreview] = SP_REACT.useState({ id: "", preview: null });
    const [youtubeBusy, setYoutubeBusy] = SP_REACT.useState(false);
    const [youtubeError, setYoutubeError] = SP_REACT.useState("");
    const [actionBusy, setActionBusy] = SP_REACT.useState("");
    const [trimStart, setTrimStart] = SP_REACT.useState(String(DEFAULT_TRIM_START_SECONDS));
    const [trimEnd, setTrimEnd] = SP_REACT.useState(String(DEFAULT_TRIM_END_SECONDS));
    SP_REACT.useLayoutEffect(() => {
        retainTrailerHeroChrome();
        const frame = window.requestAnimationFrame(() => pageRef.current?.querySelector?.(".thIconButton")?.focus?.());
        return () => { window.cancelAnimationFrame(frame); releaseTrailerHeroChrome(); };
    }, []);
    SP_REACT.useEffect(() => controller.subscribe(setSnapshot), []);
    const settings = snapshot.settings;
    const key = String(appId || "");
    const snapshotLocalTrailer = snapshot.localTrailers[key];
    const [routeLocalTrailer, setRouteLocalTrailer] = SP_REACT.useState(snapshotLocalTrailer);
    const localTrailer = routeLocalTrailer ?? snapshotLocalTrailer;
    const preferredSource = settings.preferredSources[key] || "auto";
    const youtubeId = settings.youtubeVideos[key] || "";
    const sourceAppId = settings.steamAppOverrides[key] || appId;
    const catalogMovies = steamCatalog.appId === sourceAppId ? steamCatalog.movies : [];
    const savedMovieId = settings.steamMovieOverrides[key] || "";
    const selectedMovieId = catalogMovies.some((movie) => movie.id === savedMovieId)
        ? savedMovieId
        : steamCatalog.appId === sourceAppId ? steamCatalog.movieId : "";
    const blocked = settings.blockedApps.includes(appId);
    const activeJob = ["queued", "running"].includes(snapshot.trailerJob?.state);
    const localKind = localTrailer?.source === "import" ? "imported" : localTrailer ? "downloaded" : "";
    const trailerMode = preferredSource === "local" && localTrailer ? localKind : "streaming";
    SP_REACT.useEffect(() => {
        if (snapshot.appId === appId && snapshot.gameTitle) {
            setGameTitle(snapshot.gameTitle);
        }
    }, [snapshot.appId, snapshot.gameTitle, appId]);
    SP_REACT.useEffect(() => {
        let cancelled = false;
        void getLocalTrailer(appId).then((result) => {
            if (!cancelled) setRouteLocalTrailer(result?.assigned ? result : undefined);
        }).catch(() => {
            if (!cancelled) setRouteLocalTrailer(snapshot.localTrailers[key]);
        });
        return () => { cancelled = true; };
    }, [appId, key, snapshotLocalTrailer?.sha256, actionBusy, snapshot.trailerJob?.state]);
    SP_REACT.useEffect(() => {
        setYoutubeQuery(settings.youtubeQueries[key] || (isLikelyBadYouTubeQuery(gameTitle) ? "" : gameTitle));
        setTrimStart(String(settings.trimStartOverrides[key] ?? DEFAULT_TRIM_START_SECONDS));
        setTrimEnd(String(settings.trimEndOverrides[key] ?? DEFAULT_TRIM_END_SECONDS));
    }, [appId, key, gameTitle]);
    SP_REACT.useEffect(() => {
        let cancelled = false;
        if (!sourceAppId) {
            setSteamCatalog({ appId: 0, movies: [], movieId: "" });
            return () => { cancelled = true; };
        }
        setSteamCatalog({ appId: sourceAppId, movies: [], movieId: "" });
        void getSteamTrailer(sourceAppId, true).then((result) => {
            if (!cancelled && Number(result?.appid) === sourceAppId) {
                setSteamCatalog({
                    appId: sourceAppId,
                    movies: Array.isArray(result?.movies) ? result.movies : [],
                    movieId: String(result?.movieId || "")
                });
            }
        }).catch(() => {
            if (!cancelled) {
                setSteamCatalog({ appId: sourceAppId, movies: [], movieId: "" });
            }
        });
        return () => { cancelled = true; };
    }, [sourceAppId]);
    SP_REACT.useEffect(() => {
        let cancelled = false;
        const loadPreview = async () => {
            const loadYouTubeMaterialized = async (videoId) => {
                const prepared = await getYouTubeTrailerPreview(videoId, Math.min(1080, settings.qualityHeight));
                if (!prepared?.ok) throw new Error(prepared?.error || tr("noPreview"));
                const poster = prepared.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                if (prepared.ready && prepared.url) {
                    if (!cancelled) setPreview({ kind: "video", url: prepared.url, poster, title: gameTitle, source: "youtube", sourceId: videoId });
                    return true;
                }
                if (!cancelled) setPreview({ kind: "preparing", poster, title: gameTitle, source: "youtube", sourceId: videoId });
                for (let attempt = 0; attempt < 240 && !cancelled; attempt += 1) {
                    await new Promise((resolve) => window.setTimeout(resolve, 700));
                    const status = await getSteamTrailerPreviewStatus(prepared.previewId).catch(() => null);
                    if (status?.ready && status.url) {
                        if (!cancelled) setPreview({ kind: "video", url: status.url, poster, title: gameTitle, source: "youtube", sourceId: videoId });
                        return true;
                    }
                    if (status?.ok === false) throw new Error(status.error || tr("noPreview"));
                }
                return false;
            };
            setPreview({ kind: "loading" });
            if (!appId || !sourceAppId) {
                setPreview({ kind: "missing" });
                return;
            }
            if (preferredSource === "local" && localTrailer?.videoUrl) {
                setPreview({ kind: "video", url: localTrailer.videoUrl, audioUrl: localTrailer.audioUrl || "", title: localTrailer.title || gameTitle, source: "local" });
                return;
            }
            if (preferredSource === "youtube" && youtubeId) {
                try {
                    if (await loadYouTubeMaterialized(youtubeId)) return;
                }
                catch (error) {
                    console.warn("[TrailerHero] YouTube preview materialization failed", error);
                }
                if (!cancelled) setPreview({ kind: "missing" });
                return;
            }
            try {
                const result = await getSteamTrailerPreview(sourceAppId, selectedMovieId, settings.qualityHeight);
                if (cancelled) {
                    return;
                }
                if (result?.ok && Number(result.appid) === sourceAppId && result.pending && result.previewId) {
                    setPreview({ kind: "preparing", poster: result.poster || "", title: result.name || gameTitle, source: "steam", sourceId: result.movieId || selectedMovieId, sourceAppId });
                    for (let attempt = 0; attempt < 180 && !cancelled; attempt += 1) {
                        await new Promise((resolve) => window.setTimeout(resolve, 700));
                        const status = await getSteamTrailerPreviewStatus(result.previewId).catch(() => null);
                        if (status?.ready && status.url) {
                            if (!cancelled) setPreview({ kind: "video", url: status.url, poster: result.poster || "", format: "mp4", streaming: false, title: result.name || gameTitle, source: "steam", sourceId: result.movieId || selectedMovieId, sourceAppId });
                            return;
                        }
                        if (status?.ok === false) break;
                    }
                }
                else if (result?.ok && Number(result.appid) === sourceAppId && result.url) {
                    setPreview({ kind: "video", url: result.url, poster: result.poster || "", format: result.format || "file", streaming: Boolean(result.streaming), title: result.name || gameTitle, source: "steam", sourceId: result.movieId || selectedMovieId, sourceAppId });
                    return;
                }
            }
            catch {
            }
            if (!cancelled && youtubeId && preferredSource !== "steam") {
                try {
                    if (await loadYouTubeMaterialized(youtubeId)) return;
                }
                catch (error) {
                    console.warn("[TrailerHero] YouTube fallback preview materialization failed", error);
                }
                if (!cancelled) setPreview({ kind: "missing" });
            }
            else if (!cancelled) {
                setPreview({ kind: "missing" });
            }
        };
        void loadPreview();
        return () => { cancelled = true; };
    }, [appId, preferredSource, localTrailer?.videoUrl, localTrailer?.audioUrl, localTrailer?.sha256, youtubeId, sourceAppId, selectedMovieId, settings.qualityHeight]);
    const runAction = async (name, action, successMessage = tr("operationComplete")) => {
        if (actionBusy || activeJob) {
            return undefined;
        }
        setActionBusy(name);
        try {
            const result = await action();
            if (result?.ok === false) {
                showTrailerHeroNotice(result.error || tr("noPreview"));
            }
            else if (!result?.jobId && !result?.cancelled) {
                showTrailerHeroNotice(successMessage);
            }
            return result;
        }
        catch (error) {
            showTrailerHeroNotice(error instanceof Error ? error.message : String(error));
            return undefined;
        }
        finally {
            setActionBusy("");
        }
    };
    const importTrailer = async () => {
        const picked = await openFilePicker(0, "C:\\", true, false, undefined, undefined, false, true);
        const path = String(picked?.realpath || picked?.path || "");
        if (!path) {
            return { ok: true, cancelled: true };
        }
        return controller.importTrailerForApp(appId, path, gameTitle);
    };
    const downloadTrailer = async () => {
        let source = preview?.source === "youtube" ? "youtube" : "steam";
        let value = source === "youtube" ? youtubeId : selectedMovieId;
        let previewSourceAppId = sourceAppId;
        if (preferredSource === "local" && localTrailer?.source === "youtube" && localTrailer.sourceId) {
            source = "youtube";
            value = localTrailer.sourceId;
        }
        else if (preferredSource === "local" && localTrailer?.source === "steam") {
            source = "steam";
            value = localTrailer.sourceId || selectedMovieId;
        }
        return controller.startDownloadSelectionForApp(appId, gameTitle, settings.qualityHeight, source, value, previewSourceAppId);
    };
    const searchYouTube = async () => {
        const query = String(youtubeQuery || "").trim();
        if (!query) {
            setYoutubeError(tr("emptyYouTubeQuery"));
            return;
        }
        setYoutubeBusy(true);
        setYoutubeInlinePreview({ id: "", preview: null });
        setYoutubeError("");
        controller.setYouTubeQueryForApp(appId, query, gameTitle);
        try {
            const result = await searchYouTubeVideos(query, 10);
            const entries = Array.isArray(result?.results) ? result.results : [];
            setYoutubeResults(entries);
            if (!entries.length) {
                setYoutubeError(result?.error || tr("noReadableYouTubeResults"));
            }
        }
        catch (error) {
            setYoutubeError(error instanceof Error ? error.message : tr("youtubeSearchError"));
        }
        finally {
            setYoutubeBusy(false);
        }
    };
    const toggleYouTubeInlinePreview = async (result, button) => {
        const resultId = String(result?.videoId || result?.id || "");
        if (!resultId) return;
        if (youtubeInlinePreview.id === resultId) {
            setYoutubeInlinePreview({ id: "", preview: null });
            window.requestAnimationFrame(() => button?.focus?.());
            return;
        }
        setYoutubeInlinePreview({ id: resultId, preview: { kind: "preparing", poster: result.thumbnail || `https://i.ytimg.com/vi/${resultId}/hqdefault.jpg`, title: result.title || resultId } });
        try {
            const prepared = await getYouTubeTrailerPreview(resultId, Math.min(1080, settings.qualityHeight));
            if (!prepared?.ok) throw new Error(prepared?.error || tr("noPreview"));
            if (prepared.ready && prepared.url) {
                setYoutubeInlinePreview((current) => current.id === resultId ? { id: resultId, preview: { kind: "video", url: prepared.url, poster: prepared.thumbnail || result.thumbnail || "", title: result.title || resultId, source: "youtube" } } : current);
                return;
            }
            for (let attempt = 0; attempt < 240; attempt += 1) {
                await new Promise((resolve) => window.setTimeout(resolve, 700));
                const status = await getSteamTrailerPreviewStatus(prepared.previewId).catch(() => null);
                if (status?.ready && status.url) {
                    setYoutubeInlinePreview((current) => current.id === resultId ? { id: resultId, preview: { kind: "video", url: status.url, poster: prepared.thumbnail || result.thumbnail || "", title: result.title || resultId, source: "youtube" } } : current);
                    return;
                }
                if (status?.ok === false) throw new Error(status.error || tr("noPreview"));
            }
            throw new Error(tr("noPreview"));
        }
        catch (error) {
            setYoutubeInlinePreview((current) => current.id === resultId ? { id: "", preview: null } : current);
            showTrailerHeroNotice(error instanceof Error ? error.message : String(error));
        }
    };
    const downloadYouTubeResult = (result) => runAction("download", () => controller.startDownloadSelectionForApp(
        appId, gameTitle, settings.qualityHeight, "youtube", String(result?.videoId || result?.id || ""), sourceAppId
    ));
    const sourceOptions = SOURCE_OPTIONS.filter((source) => source !== "local" || Boolean(localTrailer)).map((source) => ({ data: source, label: getSourceLabel(source) }));
    const crtPreference = settings.crtOverrides[key] || "auto";
    const jobTotal = Math.max(1, Number(snapshot.trailerJob?.total || 1));
    const jobCurrent = Math.max(0, Number(snapshot.trailerJob?.current || 0));
    const jobPercent = Math.max(0, Math.min(100, Math.round(jobCurrent / jobTotal * 100)));
    const mediaJobPercent = Math.max(0, Math.min(100, Math.round(Number(snapshot.trailerJob?.progress || 0) * 100)));
    const jobStageText = snapshot.trailerJob?.state === "queued" ? tr("preparingDownload")
        : snapshot.trailerJob?.state === "running" && mediaJobPercent >= 99 ? tr("processingDownload")
        : snapshot.trailerJob?.state === "running" ? tr("downloadingPercent", { percent: mediaJobPercent })
        : snapshot.trailerJob?.state === "done" && localTrailer ? tr("savedLocal") : "";
    if (!appId) {
        return SP_JSX.jsx(DFL.ScrollPanel, { children: SP_JSX.jsx("div", { className: "thGamePage", children: tr("noGameForSettings") }) });
    }
    return SP_JSX.jsx(DFL.ScrollPanel, { children: SP_JSX.jsxs(DFL.Focusable, { ref: pageRef, "flow-children": "grid", noFocusRing: true, className: "thGamePage", onFocusCapture: scrollTrailerHeroFocus, children: [
        SP_JSX.jsx("style", { children: trailerHeroPageStyles }),
        SP_JSX.jsxs("header", { className: "thGameHeader", children: [
            SP_JSX.jsx(DFL.DialogButton, { focusable: true, className: "DialogButton thIconButton", title: tr("back"), onClick: () => DFL.Navigation.NavigateBack(), style: { width: 42, minWidth: 42, height: 42, minHeight: 42, padding: 0, display: "grid", placeItems: "center" }, children: SP_JSX.jsx(FaArrowLeft, {}) }),
            SP_JSX.jsxs("div", { style: { minWidth: 0 }, children: [
                SP_JSX.jsx("div", { style: { fontSize: 13, opacity: 0.56, textTransform: "uppercase", fontWeight: 700 }, children: "TrailerHero" }),
                SP_JSX.jsx("h1", { style: { margin: "4px 0 0", fontSize: 31, lineHeight: 1.08, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: gameTitle || `App ${appId}` })
            ] })
        ] }),
        SP_JSX.jsxs(DFL.Focusable, { className: "thGrid", "flow-children": "vertical", noFocusRing: true, children: [
            SP_JSX.jsxs(DFL.Focusable, { className: "thCard thActiveCard", "flow-children": "horizontal", noFocusRing: true, children: [
                SP_JSX.jsxs(DFL.Focusable, { className: "thActivePreview", "flow-children": "vertical", noFocusRing: true, children: [
                    SP_JSX.jsx("h2", { children: tr("trailerActive") }),
                    SP_JSX.jsx("div", { className: "thCardDesc", children: preview?.title || gameTitle }),
                    SP_JSX.jsx(TrailerPreview, { preview, audioMode: settings.defaultAudio }),
                    localTrailer ? SP_JSX.jsx(DFL.DialogButton, { focusable: true, className: "thDeleteFile", disabled: Boolean(actionBusy) || activeJob, onClick: () => { void confirmTrailerHeroAction(tr("confirmDeleteLocal")).then((confirmed) => { if (confirmed) void runAction("delete", () => controller.deleteLocalForApp(appId), tr("localDeleted", { title: gameTitle })); }); }, children: tr("deleteFile") }) : null
                ] }),
                SP_JSX.jsxs(DFL.Focusable, { className: "thActiveSettings", "flow-children": "vertical", noFocusRing: true, children: [
                    SP_JSX.jsx("h2", { children: tr("gameSettings") }),
                    SP_JSX.jsx("div", { className: "thCardDesc", children: tr("gameSettingsHint") }),
                    SP_JSX.jsx(DFL.ToggleField, { label: tr("disabledForCurrentGame"), bottomSeparator: "none", checked: blocked, onChange: (checked) => controller.setAppBlocked(appId, checked) }),
                    SP_JSX.jsx(DFL.DropdownItem, { label: tr("source", { value: getSourceLabel(preferredSource) }), bottomSeparator: "none", rgOptions: sourceOptions, selectedOption: preferredSource, onChange: (option) => controller.setPreferredSourceForApp(appId, option.data) }),
                    SP_JSX.jsx(DFL.DropdownItem, { label: tr("qualityPreset", { quality: settings.qualityHeight }), bottomSeparator: "none", rgOptions: QUALITY_OPTIONS.map((quality) => ({ data: quality, label: `${quality}p` })), selectedOption: settings.qualityHeight, onChange: (option) => controller.updateSettings({ qualityHeight: Number(option.data) }) }),
                    catalogMovies.length ? SP_JSX.jsx(DFL.DropdownItem, { label: tr("steamTrailer"), bottomSeparator: "none", rgOptions: catalogMovies.map((movie, index) => ({ data: movie.id, label: `${index + 1}. ${movie.name}` })), selectedOption: selectedMovieId, onChange: (option) => controller.setSteamMovieForApp(appId, option.data) }) : null,
                    SP_JSX.jsx(DFL.DropdownItem, { label: tr("crtGame", { value: getCrtPreferenceLabel(crtPreference) }), bottomSeparator: "none", rgOptions: CRT_OPTIONS.map((value) => ({ data: value, label: getCrtPreferenceLabel(value) })), selectedOption: crtPreference, onChange: (option) => { const crtOverrides = { ...settings.crtOverrides }; if (option.data === "auto") delete crtOverrides[key]; else crtOverrides[key] = option.data; controller.updateSettings({ crtOverrides }); } }),
                    SP_JSX.jsx(DFL.TextField, { label: tr("trimStart"), value: trimStart, mustBeURL: false, onChange: (event) => setTrimStart(event.currentTarget.value) }),
                    SP_JSX.jsx(DFL.TextField, { label: tr("trimEnd"), value: trimEnd, mustBeURL: false, onChange: (event) => setTrimEnd(event.currentTarget.value) }),
                    SP_JSX.jsx(DFL.DialogButton, { focusable: true, onClick: () => { if (!controller.setTrimForApp(appId, trimStart, trimEnd)) showTrailerHeroNotice(tr("invalidTrims")); }, style: { width: "100%", marginTop: 9 }, children: tr("saveTrims") })
                ] })
            ] }),
            SP_JSX.jsxs(DFL.Focusable, { className: "thCard", "flow-children": "vertical", noFocusRing: true, children: [
                SP_JSX.jsx("h2", { children: tr("trailerSource") }),
                SP_JSX.jsx("div", { className: "thCardDesc", children: tr("gameSettingsHint") }),
                SP_JSX.jsxs(DFL.Focusable, { className: "thModeChoices", "flow-children": "horizontal", noFocusRing: true, children: [
                    SP_JSX.jsxs(DFL.DialogButton, { focusable: true, "aria-pressed": trailerMode === "streaming", className: trailerMode === "streaming" ? "thModeSelected" : "", disabled: Boolean(actionBusy) || activeJob, onClick: () => controller.useStreamingForApp(appId), children: [SP_JSX.jsx("span", { className: "thModeIcon", children: SP_JSX.jsx(FaPlay, {}) }), SP_JSX.jsx("span", { children: tr("streaming") })] }),
                    SP_JSX.jsxs(DFL.DialogButton, { focusable: true, "aria-pressed": trailerMode === "downloaded", className: trailerMode === "downloaded" ? "thModeSelected" : "", disabled: Boolean(actionBusy) || activeJob || (!localTrailer && preview?.kind === "missing"), onClick: () => localTrailer && localKind === "downloaded" ? controller.setPreferredSourceForApp(appId, "local") : void runAction("download", downloadTrailer), children: [SP_JSX.jsx("span", { className: "thModeIcon", children: SP_JSX.jsx(FaDownload, {}) }), SP_JSX.jsx("span", { children: tr("downloadActiveTrailer") })] }),
                    SP_JSX.jsxs(DFL.DialogButton, { focusable: true, "aria-pressed": trailerMode === "imported", className: trailerMode === "imported" ? "thModeSelected" : "", disabled: Boolean(actionBusy) || activeJob, onClick: () => localTrailer && localKind === "imported" ? controller.setPreferredSourceForApp(appId, "local") : void runAction("import", importTrailer, tr("importAssigned", { title: gameTitle })), children: [SP_JSX.jsx("span", { className: "thModeIcon", children: SP_JSX.jsx(FaFolder, {}) }), SP_JSX.jsx("span", { children: tr("localFile") })] })
                ] }),
                activeJob ? SP_JSX.jsxs("div", { style: { marginTop: 12, fontSize: 12 }, children: [SP_JSX.jsx("div", { children: jobStageText }), SP_JSX.jsx("div", { className: "thProgress", children: SP_JSX.jsx("div", { style: { width: `${mediaJobPercent}%` } }) }), SP_JSX.jsx(DFL.DialogButton, { focusable: true, onClick: () => void controller.cancelCurrentTrailerJob(), style: { width: "100%", marginTop: 9 }, children: tr("cancelDownload") })] }) : jobStageText ? SP_JSX.jsx("div", { style: { marginTop: 12, fontSize: 12, color: "#b9efc4" }, children: jobStageText }) : null
            ] }),
            SP_JSX.jsxs(DFL.Focusable, { className: "thCard", "flow-children": "vertical", noFocusRing: true, children: [
                SP_JSX.jsx("h2", { children: tr("youtubeTrailer") }),
                SP_JSX.jsx("div", { className: "thCardDesc", children: tr("gameSettingsHint") }),
                SP_JSX.jsxs(DFL.Focusable, { className: "thSearchRow", "flow-children": "horizontal", noFocusRing: true, children: [
                    SP_JSX.jsx(DFL.TextField, { value: youtubeQuery, mustBeURL: false, disabled: youtubeBusy, onChange: (event) => setYoutubeQuery(event.currentTarget.value), style: { width: "100%", minWidth: 0 } }),
                    SP_JSX.jsx(DFL.DialogButton, { focusable: true, "aria-busy": youtubeBusy, disabled: youtubeBusy || !settings.youtubeEnabled, onClick: () => void searchYouTube(), children: tr("search") })
                ] }),
                youtubeError ? SP_JSX.jsx("div", { style: { marginTop: 9, fontSize: 12, color: "#ffb6b6" }, children: youtubeError }) : null,
                youtubeResults.length ? SP_JSX.jsx(DFL.Focusable, { "flow-children": "vertical", noFocusRing: true, style: { marginTop: 14 }, children: youtubeResults.map((result, index) => {
                    const resultId = result.videoId || result.id;
                    const thumbnails = Array.isArray(result.thumbnails) ? result.thumbnails : [];
                    const thumbnail = result.thumbnail || thumbnails[thumbnails.length - 1]?.url || `https://i.ytimg.com/vi/${resultId}/hqdefault.jpg`;
                    const selected = resultId === youtubeId;
                    const inlineActive = youtubeInlinePreview.id === resultId;
                    return SP_JSX.jsxs(DFL.Focusable, { "flow-children": "horizontal", "aria-pressed": selected, className: `thResult${selected ? " thResultSelected" : ""}`, children: [
                        SP_JSX.jsx("img", { className: "thResultThumb", src: thumbnail, alt: result.title || "", loading: "lazy", decoding: "async", width: 144, height: 81, onError: (event) => { event.currentTarget.src = `https://i.ytimg.com/vi/${resultId}/mqdefault.jpg`; } }),
                        SP_JSX.jsxs("div", { style: { minWidth: 0 }, children: [SP_JSX.jsx("div", { style: { fontWeight: 650, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: `${index + 1}. ${result.title || resultId}` }), SP_JSX.jsx("div", { style: { fontSize: 12, opacity: 0.58, marginTop: 3 }, children: [result.channel || result.uploader || "YouTube", result.length].filter(Boolean).join(" · ") })] }),
                        SP_JSX.jsxs(DFL.DialogButton, { focusable: true, title: inlineActive ? tr("pause") : tr("play"), onClick: (event) => { event?.stopPropagation?.(); void toggleYouTubeInlinePreview(result, event?.currentTarget); }, children: [inlineActive ? SP_JSX.jsx(FaPause, {}) : SP_JSX.jsx(FaPlay, {}), SP_JSX.jsx("span", { children: inlineActive ? tr("pause") : tr("play") })] }),
                        SP_JSX.jsx(DFL.DialogButton, { focusable: true, "aria-pressed": selected, className: selected ? "thResultActionSelected" : "", title: selected ? tr("selectedTrailer") : tr("selectTrailer"), onClick: (event) => { event?.stopPropagation?.(); controller.setYouTubeForApp(appId, resultId); }, children: selected ? tr("selectedTrailer") : tr("selectTrailer") }),
                        SP_JSX.jsxs(DFL.DialogButton, { focusable: true, title: tr("downloadTrailer"), disabled: Boolean(actionBusy) || activeJob, onClick: (event) => { event?.stopPropagation?.(); void downloadYouTubeResult(result); }, children: [SP_JSX.jsx(FaDownload, {}), SP_JSX.jsx("span", { children: tr("download") })] }),
                        inlineActive ? SP_JSX.jsx("div", { className: "thInlinePreview", children: SP_JSX.jsx(TrailerPreview, { preview: youtubeInlinePreview.preview, audioMode: "trailer" }) }) : null
                    ] }, resultId);
                }) }) : null
            ] })
        ] })
    ] }) });
}
function GameSettingsRoute() {
    const params = typeof DFL.useParams === "function" ? DFL.useParams() : {};
    const appId = normalizeMenuAppId(params?.appid) || readTrailerHeroRouteAppId();
    return SP_JSX.jsx(GameSettingsPage, { appId }, appId || "no-app");
}
function extractContextAppId(node, depth = 0, seen = new Set()) {
    if (!node || depth > 5 || (typeof node === "object" && seen.has(node))) {
        return 0;
    }
    if (typeof node === "object") {
        seen.add(node);
    }
    const direct = normalizeMenuAppId(node);
    if (direct) {
        return direct;
    }
    for (const key of ["app", "overview", "game", "item", "target", "data", "props", "context", "selectedApp"]) {
        const value = node?.[key];
        if (value && value !== node) {
            const nested = extractContextAppId(value, depth + 1, seen);
            if (nested) {
                return nested;
            }
        }
    }
    const children = node?.children ?? node?.props?.children;
    for (const child of Array.isArray(children) ? children : children ? [children] : []) {
        const nested = extractContextAppId(child, depth + 1, seen);
        if (nested) {
            return nested;
        }
    }
    return 0;
}
function coerceContextMenuChildren(children) {
    if (Array.isArray(children)) return children;
    if (Array.isArray(children?.props?.children)) return children.props.children;
    if (Array.isArray(children?.children)) return children.children;
    return null;
}
function patchTrailerHeroMenuItems(menuItems, explicitAppId) {
    const entries = coerceContextMenuChildren(menuItems);
    if (!entries?.length) {
        return undefined;
    }
    const appId = normalizeMenuAppId(explicitAppId) || extractContextAppId(entries);
    if (!appId) {
        return undefined;
    }
    const cleanEntries = entries.filter((item) => item?.key !== TRAILERHERO_MENU_KEY);
    const propertiesIndex = cleanEntries.findIndex((item) => DFL.findInReactTree?.(item, (node) => {
        const handler = node?.onSelected ?? node?.props?.onSelected ?? node?.onClick ?? node?.props?.onClick;
        return typeof handler === "function" && /AppProperties|ShowAppProperties/.test(handler.toString());
    }));
    if (propertiesIndex < 0) {
        return undefined;
    }
    const menuItem = SP_REACT.createElement(DFL.MenuItem, {
        key: TRAILERHERO_MENU_KEY,
        onSelected: () => DFL.Navigation?.Navigate?.(`/trailerhero/${appId}`)
    }, "TrailerHero");
    return {
        appId,
        items: [
            ...cleanEntries.slice(0, propertiesIndex),
            menuItem,
            ...cleanEntries.slice(propertiesIndex)
        ]
    };
}
function patchRenderedMenu(node, explicitAppId) {
    if (!SP_REACT.isValidElement?.(node)) {
        return node;
    }
    const children = node.props?.children;
    const firstChildItems = Array.isArray(children) && Array.isArray(children[0]) ? children[0] : undefined;
    const patch = patchTrailerHeroMenuItems(firstChildItems ?? children, explicitAppId);
    if (!patch) {
        return node;
    }
    if (firstChildItems) {
        return SP_REACT.cloneElement(node, undefined, [patch.items, ...children.slice(1)]);
    }
    return SP_REACT.cloneElement(node, undefined, patch.items);
}
function installTrailerHeroContextMenu() {
    try {
        const module = DFL.findModuleByExport?.((entry) => entry?.toString?.().includes("().LibraryContextMenu"));
        const candidate = Object.values(module || {}).find((entry) => entry?.toString?.().includes("navigator:"));
        const LibraryContextMenu = DFL.fakeRenderComponent?.(candidate)?.type ?? candidate;
        if (!LibraryContextMenu?.prototype?.render || typeof DFL.afterPatch !== "function") {
            return { unpatch: () => undefined };
        }
        const patchedPrototypes = new WeakSet();
        const patches = [];
        const patchPrototype = (prototype) => {
            if (!prototype?.render || patchedPrototypes.has(prototype)) {
                return;
            }
            patchedPrototypes.add(prototype);
            const originalRender = prototype.render;
            const wrappedRender = function (...args) {
                const explicitAppId = extractContextAppId(this?.props) || extractContextAppId(args);
                let rendered = originalRender.apply(this, args);
                patchPrototype(rendered?.type?.prototype);
                if (explicitAppId && rendered?.type?.prototype?.render && SP_REACT.isValidElement?.(rendered)) {
                    rendered = SP_REACT.cloneElement(rendered, { trailerHeroAppId: explicitAppId });
                }
                return patchRenderedMenu(rendered, explicitAppId || extractContextAppId(rendered));
            };
            prototype.render = wrappedRender;
            patches.push({
                unpatch: () => {
                    if (prototype.render === wrappedRender) {
                        prototype.render = originalRender;
                    }
                }
            });
        };
        patchPrototype(LibraryContextMenu.prototype);
        return {
            unpatch: () => patches.splice(0).reverse().forEach((patch) => {
                try { patch?.unpatch?.(); }
                catch { }
            })
        };
    }
    catch (error) {
        console.warn("TrailerHero could not patch the game options menu", error);
        return { unpatch: () => undefined };
    }
}
var index = definePlugin(() => {
    controller.mount();
    const contextMenuPatch = installTrailerHeroContextMenu();
    try {
        routerHook?.addRoute?.(TRAILERHERO_ROUTE, GameSettingsRoute, { exact: true });
    }
    catch (error) {
        console.warn("TrailerHero could not register its game settings route", error);
    }
    return {
        name: "TrailerHero",
        titleView: SP_JSX.jsxs("div", { className: DFL.staticClasses.Title, style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.45rem", width: "100%", marginLeft: "auto", paddingRight: 8 }, children: [SP_JSX.jsx(FaFilm, { size: 19 }), SP_JSX.jsx("span", { children: tr("title") })] }),
        content: SP_JSX.jsx(Content, {}),
        icon: SP_JSX.jsx(FaFilm, {}),
        onDismount() {
            contextMenuPatch?.unpatch?.();
            try {
                routerHook?.removeRoute?.(TRAILERHERO_ROUTE);
            }
            catch (error) {
                console.warn("TrailerHero could not remove its game settings route", error);
            }
            controller.unmount();
        }
    };
});

export { index as default };
