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
function FaFilm (props) {
  return GenIcon({"attr":{"viewBox":"0 0 512 512"},"child":[{"tag":"path","attr":{"d":"M488 64h-8v20c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12V64H96v20c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12V64h-8C10.7 64 0 74.7 0 88v336c0 13.3 10.7 24 24 24h8v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h320v-20c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v20h8c13.3 0 24-10.7 24-24V88c0-13.3-10.7-24-24-24zM96 372c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12H44c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm272 208c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm0-168c0 6.6-5.4 12-12 12H156c-6.6 0-12-5.4-12-12v-96c0-6.6 5.4-12 12-12h200c6.6 0 12 5.4 12 12v96zm112 152c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40zm0-96c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40z"},"child":[]}]})(props);
}

const SETTINGS_KEY = "trailerhero.settings.v1";
const DEFAULT_SETTINGS = {
    settingsVersion: 6,
    enabled: true,
    delaySeconds: 3,
    opacity: 1,
    qualityHeight: 2160,
    blockedApps: [],
    homeHeroEnabled: true,
    logoAssistEnabled: true,
    stopOnLaunchEnabled: true,
    crtLowResEnabled: true,
    youtubeEnabled: true,
    youtubeAutoSearch: true,
    preferredSources: {},
    steamAppOverrides: {},
    steamMovieOverrides: {},
    trimStartOverrides: {},
    trimEndOverrides: {},
    crtOverrides: {},
    youtubeVideos: {}
};
const DEFAULT_TRIM_START_SECONDS = 4;
const DEFAULT_TRIM_END_SECONDS = 5;
const OPACITY_OPTIONS = [0.65, 0.8, 0.92, 1];
const QUALITY_OPTIONS = [720, 1080, 2160];
const SOURCE_OPTIONS = ["auto", "steam", "youtube"];
const CRT_OPTIONS = ["auto", "on", "off"];
const BACKEND_TIMEOUT_MS = 18000;
const RUNTIME_MISSING_SCRIPT = "window.__trailerHeroRuntime?.snapshot?.() ?? { status: 'TrailerHero runtime missing', runtimeMissing: true }";
const FORCE_SCAN_SCRIPT = "window.__trailerHeroRuntime?.forceScan?.() ?? { status: 'TrailerHero runtime missing', runtimeMissing: true }";
const evalInBigPicture = callable("eval_in_big_picture");
const searchYouTubeTrailer = callable("search_youtube_trailer");
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
            homeHeroEnabled: typeof parsed.homeHeroEnabled === "boolean"
                ? parsed.homeHeroEnabled
                : DEFAULT_SETTINGS.homeHeroEnabled,
            logoAssistEnabled: typeof parsed.logoAssistEnabled === "boolean"
                ? parsed.logoAssistEnabled
                : DEFAULT_SETTINGS.logoAssistEnabled,
            stopOnLaunchEnabled: typeof parsed.stopOnLaunchEnabled === "boolean"
                ? parsed.stopOnLaunchEnabled
                : DEFAULT_SETTINGS.stopOnLaunchEnabled,
            crtLowResEnabled: parsedVersion >= 2 && typeof parsed.crtLowResEnabled === "boolean"
                ? parsed.crtLowResEnabled
                : DEFAULT_SETTINGS.crtLowResEnabled,
            youtubeEnabled: DEFAULT_SETTINGS.youtubeEnabled,
            youtubeAutoSearch: DEFAULT_SETTINGS.youtubeAutoSearch,
            preferredSources: parsed.preferredSources && typeof parsed.preferredSources === "object"
                ? Object.fromEntries(Object.entries(parsed.preferredSources)
                    .filter(([appid, source]) => (/^\d+$/.test(appid) &&
                    (source === "auto" || source === "steam" || source === "youtube"))))
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
        delay: "Delay: {seconds}s",
        disabled: "Disabled",
        disabledForCurrentGame: "Disabled for this game",
        emptyYouTubeQuery: "Empty YouTube query",
        forceCrt: "Force CRT",
        game: "Game: {title}",
        heroHomeDisabled: "Home hero disabled",
        homeHero: "Enable on home",
        invalidSteamAppId: "Invalid Steam AppID",
        invalidTrims: "Valid trims: 0-60 seconds",
        invalidYouTubeLink: "Invalid YouTube link",
        loadingYouTubeTrailer: "Loading YouTube trailer",
        logoAssist: "Game page logo",
        logoAssistHelp: "When the trailer starts on a game page, move the Steam logo to the bottom-left and restore it when you leave.",
        stopOnLaunch: "Stop trailer on Play",
        stoppedForLaunch: "Trailer stopped for launch",
        mediaSourceUnavailable: "MediaSource is not available",
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
        searchingYouTube: "Searching YouTube for {title}",
        searchingYouTubeTrailer: "Searching YouTube trailer: {title}",
        source: "Source: {value}",
        sourceAuto: "Automatic",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID source",
        steamQuality: "Quality: {quality}p",
        steamTrailer: "Steam trailer",
        steamTrailerAuto: "Automatic Steam video",
        steamTrailerNoPlayableId: "Trailer found, but without a playable id",
        steamTrailerNotPlayable: "Trailer not playable",
        steamVideosAvailable: "{count} Steam videos available. Select one to save it for this game.",
        statusAppBlocked: "App {appId} disabled",
        statusHeroNotFound: "App {appId}: hero not found",
        title: "TrailerHero",
        trailerActive: "Trailer active",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Trim end sec",
        trimStart: "Trim start sec",
        waitingGamePage: "Waiting for a game page",
        youtubeAutoFound: "YouTube found: {title}",
        youtubeAutoNoTrailer: "YouTube auto: no trailer found",
        youtubeAutoSearch: "Auto YouTube search",
        youtubeFallback: "YouTube fallback",
        youtubeForGame: "Custom YouTube link",
        youtubeSearchError: "YouTube search error",
        youtubeTrailer: "YouTube trailer",
        youtubeTrailerActive: "YouTube trailer active",
        youtubeQuality: "YouTube quality: {value}"
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
        delay: "Delay: {seconds}s",
        disabled: "Disattivato",
        disabledForCurrentGame: "Disattivato per questo gioco",
        emptyYouTubeQuery: "Query YouTube vuota",
        forceCrt: "Forza CRT",
        game: "Gioco: {title}",
        heroHomeDisabled: "Hero home disattivata",
        homeHero: "Attiva in home",
        invalidSteamAppId: "Steam AppID non valido",
        invalidTrims: "Tagli validi: 0-60 secondi",
        invalidYouTubeLink: "Link YouTube non valido",
        loadingYouTubeTrailer: "Carico trailer YouTube",
        logoAssist: "Logo pagina gioco",
        logoAssistHelp: "Quando parte il trailer nella pagina gioco, sposta il logo Steam in basso a sinistra e lo ripristina uscendo.",
        stopOnLaunch: "Ferma su Gioca",
        stoppedForLaunch: "Trailer fermato per l'avvio",
        mediaSourceUnavailable: "MediaSource non disponibile",
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
        searchingYouTube: "Cerco YouTube per {title}",
        searchingYouTubeTrailer: "Cerco trailer YouTube: {title}",
        source: "Sorgente: {value}",
        sourceAuto: "Automatico",
        sourceSteam: "Steam",
        sourceYouTube: "YouTube",
        steamAppIdSource: "Steam AppID sorgente",
        steamQuality: "Qualità: {quality}p",
        steamTrailer: "Steam trailer",
        steamTrailerAuto: "Video Steam automatico",
        steamTrailerNoPlayableId: "Trailer trovato, ma senza id riproducibile",
        steamTrailerNotPlayable: "Trailer non riproducibile",
        steamVideosAvailable: "Video Steam disponibili: {count}. Selezionane uno per salvarlo su questo gioco.",
        statusAppBlocked: "App {appId} disattivata",
        statusHeroNotFound: "App {appId}: hero non trovata",
        title: "TrailerHero",
        trailerActive: "Trailer attivo",
        trailerLabel: "Trailer: {name}",
        trimEnd: "Taglio fine sec",
        trimStart: "Taglio inizio sec",
        waitingGamePage: "In attesa di una pagina gioco",
        youtubeAutoFound: "YouTube trovato: {title}",
        youtubeAutoNoTrailer: "YouTube auto: nessun trailer trovato",
        youtubeAutoSearch: "Ricerca YouTube auto",
        youtubeFallback: "YouTube fallback",
        youtubeForGame: "Link YouTube personalizzato",
        youtubeSearchError: "Errore ricerca YouTube",
        youtubeTrailer: "YouTube trailer",
        youtubeTrailerActive: "Trailer YouTube attivo",
        youtubeQuality: "Qualita YouTube: {value}"
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
        heroHomeDisabled: "Hero de l'accueil désactivé",
        homeHero: "Activer sur l'accueil",
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
        youtubeQuality: "Qualité YouTube : {value}"
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
        heroHomeDisabled: "Hero de inicio desactivado",
        homeHero: "Activar en inicio",
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
        youtubeQuality: "Calidad YouTube: {value}"
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
        heroHomeDisabled: "Hero do início desativado",
        homeHero: "Ativar no início",
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
        youtubeQuality: "Qualidade YouTube: {value}"
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
        heroHomeDisabled: "Hero da home desativado",
        homeHero: "Ativar na home",
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
        youtubeQuality: "Qualidade YouTube: {value}"
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
        heroHomeDisabled: "Home-Hero deaktiviert",
        homeHero: "Auf Home aktivieren",
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
        youtubeQuality: "YouTube-Qualität: {value}"
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
        heroHomeDisabled: "Home-hero uitgeschakeld",
        homeHero: "Inschakelen op home",
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
        youtubeQuality: "YouTube-kwaliteit: {value}"
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
        heroHomeDisabled: "Hero на головній вимкнено",
        homeHero: "Увімкнути на головній",
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
        youtubeQuality: "Якість YouTube: {value}"
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
        heroHomeDisabled: "主页 Hero 已禁用",
        homeHero: "在主页启用",
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
        youtubeQuality: "YouTube 质量：{value}"
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
        heroHomeDisabled: "ホームの Hero は無効",
        homeHero: "ホームで有効",
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
        youtubeQuality: "YouTube 品質: {value}"
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
function isRuntimeSnapshot(value) {
    return Boolean(value &&
        typeof value === "object" &&
        "status" in value &&
        typeof value.status === "string");
}
function trailerHeroRuntimeFactory(nextSettings, injectedTranslations) {
    const runtimeKey = "__trailerHeroRuntime";
    const runtimeVersion = "0.1.7.0";
    const styleId = "trailerhero-style";
    const videoClass = "trailerhero-video";
    const youtubeClass = "trailerhero-youtube";
    const youtubeMaskClass = "trailerhero-youtube-mask";
    const logoClass = "trailerhero-logo";
    const crtClass = "trailerhero-crt";
    const hostClass = "trailerhero-host";
    const targetClass = "trailerhero-target";
    const homeAnchorClass = "trailerhero-home-anchor";
    const homeWindowClass = "trailerhero-home-window";
    const homeFadeSuppressedClass = "trailerhero-home-fade-suppressed";
    const readyClass = "trailerhero-ready";
    const visibleClass = "trailerhero-visible";
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
    function detectLocationAppId() {
        const sources = [
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
                best = { appId, element: target, score };
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
    function readAppIdFromUnknown(value, depth = 0) {
        if (!value || depth > 5) {
            return undefined;
        }
        if (Array.isArray(value)) {
            for (const item of value.slice(0, 12)) {
                const appId = readAppIdFromUnknown(item, depth + 1);
                if (appId) {
                    return appId;
                }
            }
            return undefined;
        }
        if (typeof value !== "object") {
            return undefined;
        }
        const record = value;
        for (const key of ["appid", "appId", "appID", "app_id", "unAppID", "nAppID", "m_unAppID"]) {
            const appId = coerceAppId(record[key]);
            if (appId) {
                return appId;
            }
        }
        const appIdFromApp = readAppIdFromUnknown(record.app, depth + 1);
        if (appIdFromApp) {
            return appIdFromApp;
        }
        if (depth >= 3) {
            return undefined;
        }
        for (const key of Object.keys(record).slice(0, 24)) {
            const appId = readAppIdFromUnknown(record[key], depth + 1);
            if (appId) {
                return appId;
            }
        }
        return undefined;
    }
    function readReactAppId(element) {
        const reactKeys = Object.getOwnPropertyNames(element).filter((key) => key.startsWith("__react"));
        for (const key of reactKeys) {
            let fiber = element[key];
            for (let depth = 0; fiber && depth < 12; depth += 1) {
                const fiberRecord = fiber;
                const appId = readAppIdFromUnknown(fiberRecord.memoizedProps) ?? readAppIdFromUnknown(fiberRecord.pendingProps);
                if (appId) {
                    return appId;
                }
                fiber = fiberRecord.return;
            }
        }
        return undefined;
    }
    function findFocusedHomeAppId() {
        const active = document.activeElement instanceof HTMLElement ? document.activeElement : undefined;
        if (!active) {
            return undefined;
        }
        const elements = [active];
        elements.push(...Array.from(active.querySelectorAll("img, [style], a[href], [role='link']")));
        let ancestor = active.parentElement;
        while (ancestor && elements.length < 96) {
            elements.push(ancestor);
            ancestor = ancestor.parentElement;
        }
        for (const element of elements) {
            const appId = readReactAppId(element) ?? extractAppIdFromText(getElementAssetText(element));
            if (appId) {
                return appId;
            }
        }
        return undefined;
    }
    function hasGameDetailsSignals(bodyText) {
        const hasActionText = /\b(play|install|resume|update|gioca|avvia|installa|riprendi|aggiorna)\b/.test(bodyText);
        const hasGamePageText = (/\b(achievements|achievement|activity|dlc|community|controller|library|cloud)\b/.test(bodyText) ||
            /\b(obiettivi|attivit|collezione|ultimo avvio|tempo di gioco|informazioni sul gioco|amici)\b/.test(bodyText));
        return hasActionText && hasGamePageText;
    }
    function hasLibraryHomeRoute(routeText) {
        return (routeText.includes("/routes/library/home") ||
            routeText.includes("/library/home") ||
            routeText.includes("library_home") ||
            routeText.includes("libraryhome"));
    }
    function getHomeCapsuleLikeCount() {
        return Array.from(document.querySelectorAll("img[src*='/customimages/'], img[src*='library_capsule'], img[src*='header_image'], [style*='/customimages/'], [style*='library_capsule'], [style*='header_image']")).filter((element) => {
            const rect = element.getBoundingClientRect();
            return (rect.width >= 90 &&
                rect.height >= 90 &&
                rect.top > window.innerHeight * 0.35 &&
                rect.top < window.innerHeight * 0.95);
        }).length;
    }
    function hasLibraryHomeSignals(bodyText, routeText) {
        const hasHomeText = (bodyText.includes("vedi altri giochi nella libreria") ||
            bodyText.includes("see more games in your library") ||
            bodyText.includes("recent games") ||
            bodyText.includes("giochi recenti"));
        if (hasHomeText) {
            return true;
        }
        const capsuleLikeCount = getHomeCapsuleLikeCount();
        if (capsuleLikeCount < 3) {
            return false;
        }
        const hasBigPictureChrome = /\b(menu|opzioni|options|seleziona|select|indietro|back)\b/.test(bodyText);
        return hasLibraryHomeRoute(routeText) || hasBigPictureChrome;
    }
    function isProbablyGameDetailsPage() {
        if (detectLocationAppId()) {
            return true;
        }
        const bodyText = document.body?.innerText?.slice(0, 7000).toLowerCase() ?? "";
        const routeText = [
            window.location.href,
            window.location.pathname,
            window.location.hash,
            document.URL
        ].join(" ").toLowerCase();
        if (hasLibraryHomeSignals(bodyText, routeText)) {
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
    function isLibraryHomePage() {
        const routeText = [
            window.location.href,
            window.location.pathname,
            window.location.hash,
            document.URL
        ].join(" ").toLowerCase();
        if (detectLocationAppId()) {
            return false;
        }
        const bodyText = document.body?.innerText?.slice(0, 9000).toLowerCase() ?? "";
        if (hasLibraryHomeSignals(bodyText, routeText)) {
            return true;
        }
        if (hasGameDetailsSignals(bodyText)) {
            return false;
        }
        return hasLibraryHomeRoute(routeText) && Boolean(findHeroCandidate());
    }
    function detectGameTitle(appId) {
        const cleanTitle = (value) => {
            let text = value
                .replace(/\s+/g, " ")
                .replace(/Nessun tempo di gioco/gi, "")
                .replace(/Ne un tempo di gioco/gi, "")
                .trim();
            if (!text) {
                return "";
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
            "obiettivi"
        ]);
        const heroImages = Array.from(document.querySelectorAll(`img[src*="/${appId}/"], img[src*="/${appId}_hero"], img[src*="/customimages/${appId}"]`));
        const capsuleTitles = heroImages
            .filter((image) => !(image.getAttribute("src") ?? "").includes("_hero"))
            .map((image) => {
            const root = image.closest("[class*='Panel']") ?? image.parentElement;
            return cleanTitle(image.getAttribute("aria-label") ??
                image.getAttribute("title") ??
                root?.innerText ??
                root?.textContent ??
                "");
        })
            .filter((text) => text.length >= 2 && text.length <= 70);
        if (capsuleTitles[0]) {
            return capsuleTitles[0];
        }
        const roots = heroImages
            .map((image) => image.closest("[class*='Panel']") ?? image.parentElement)
            .filter((element) => Boolean(element));
        const textElements = Array.from(document.querySelectorAll("h1, h2, h3, div, span"));
        const candidates = [...roots.flatMap((root) => Array.from(root.querySelectorAll("h1, h2, h3, div, span"))), ...textElements]
            .map((element) => {
            const text = cleanTitle(element.innerText || element.textContent || "");
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            const fontSize = Number.parseFloat(style.fontSize) || 0;
            return { text, rect, fontSize };
        })
            .filter(({ text, rect }) => {
            const lower = text.toLowerCase();
            return (text.length >= 2 &&
                text.length <= 70 &&
                !blocked.has(lower) &&
                !lower.includes("\n") &&
                rect.width > 20 &&
                rect.height > 8 &&
                rect.bottom > 0 &&
                rect.top < window.innerHeight * 0.65);
        })
            .sort((left, right) => {
            const leftScore = left.fontSize * 2 - Math.abs(left.rect.top - 190) / 20;
            const rightScore = right.fontSize * 2 - Math.abs(right.rect.top - 190) / 20;
            return rightScore - leftScore;
        });
        return candidates[0]?.text;
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

      .${homeAnchorClass} {
        position: relative !important;
      }

      .${homeWindowClass} {
        position: absolute !important;
        left: 0 !important;
        top: 0 !important;
        width: 100% !important;
        height: min(58vh, calc(100vh - 390px)) !important;
        min-height: min(330px, 48vh) !important;
        max-height: 680px !important;
        z-index: 0 !important;
        overflow: hidden !important;
      }

      body.${homeFadeSuppressedClass} [style*='library_hero'],
      body.${homeFadeSuppressedClass} [style*='_hero'],
      body.${homeFadeSuppressedClass} img[src*='library_hero'],
      body.${homeFadeSuppressedClass} img[src*='_hero'] {
        transition: none !important;
        animation: none !important;
      }

      .${targetClass}.${readyClass} {
        background-color: #000 !important;
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
        opacity: 1 !important;
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
        opacity: 1 !important;
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
        transition: opacity 700ms ease, transform 900ms ease !important;
        z-index: 5 !important;
        filter: drop-shadow(0 8px 18px rgba(0, 0, 0, 0.62)) !important;
      }

      .${logoClass}.${visibleClass} {
        opacity: 1 !important;
        transform: translateY(0) scale(1) !important;
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
            this.needsYouTubeSearch = false;
            this.status = rt("waitingGamePage");
            this.requestToken = 0;
            this.trailerCache = new Map();
            this.hiddenHomeHeroCopies = [];
            this.scanQueued = false;
            this.launchSuppressedUntil = 0;
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
                if (event.key !== "Enter" && event.key !== " ") {
                    return;
                }
                this.stopTrailerForLaunch(event.target ?? document.activeElement);
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
            if (!settings.enabled) {
                this.cleanupVideo(true);
                this.status = rt("disabled");
                return this.snapshot();
            }
            if (previousSettings.qualityHeight !== settings.qualityHeight ||
                previousSettings.homeHeroEnabled !== settings.homeHeroEnabled ||
                previousSettings.logoAssistEnabled !== settings.logoAssistEnabled ||
                previousSettings.crtLowResEnabled !== settings.crtLowResEnabled ||
                previousSettings.youtubeEnabled !== settings.youtubeEnabled ||
                previousSettings.youtubeAutoSearch !== settings.youtubeAutoSearch ||
                JSON.stringify(previousSettings.preferredSources) !== JSON.stringify(settings.preferredSources) ||
                JSON.stringify(previousSettings.steamAppOverrides) !== JSON.stringify(settings.steamAppOverrides) ||
                JSON.stringify(previousSettings.steamMovieOverrides) !== JSON.stringify(settings.steamMovieOverrides) ||
                JSON.stringify(previousSettings.trimStartOverrides) !== JSON.stringify(settings.trimStartOverrides) ||
                JSON.stringify(previousSettings.trimEndOverrides) !== JSON.stringify(settings.trimEndOverrides) ||
                JSON.stringify(previousSettings.crtOverrides) !== JSON.stringify(settings.crtOverrides) ||
                JSON.stringify(previousSettings.youtubeVideos) !== JSON.stringify(settings.youtubeVideos)) {
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
                needsYouTubeSearch: this.needsYouTubeSearch,
                preferredSource: this.preferredSource,
                sourceAppId: this.currentSourceAppId,
                selectedSteamMovieId: this.selectedSteamMovieId,
                steamMovies: this.steamMovies,
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
                const className = String(target.getAttribute("class") ?? "").toLowerCase();
                return (assetText.includes("library_hero") ||
                    assetText.includes("_hero") ||
                    assetText.includes("customimages") ||
                    assetText.includes("library_capsule") ||
                    className.includes("focus") ||
                    className.includes("selected"));
            }
            return true;
        }
        stopTrailerForLaunch(target) {
            if (!this.settings.stopOnLaunchEnabled ||
                !this.currentAppId ||
                isLibraryHomePage() ||
                !(target instanceof HTMLElement) ||
                !isLaunchActionElement(target)) {
                return;
            }
            this.launchSuppressedUntil = Date.now() + launchSuppressionMs;
            this.cleanupVideo(true);
            this.status = rt("stoppedForLaunch");
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
            const isHome = isLibraryHomePage() && !isGameDetails;
            if (isHome && !this.settings.homeHeroEnabled) {
                this.currentAppId = undefined;
                this.currentSourceAppId = undefined;
                this.currentTrailerName = undefined;
                this.currentGameTitle = undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.preferredSource = "auto";
                this.needsYouTubeSearch = false;
                this.cleanupVideo(true);
                this.status = rt("heroHomeDisabled");
                return;
            }
            if (!document.body || (!isHome && !isGameDetails)) {
                this.currentAppId = undefined;
                this.currentSourceAppId = undefined;
                this.currentTrailerName = undefined;
                this.currentGameTitle = undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.preferredSource = "auto";
                this.needsYouTubeSearch = false;
                this.cleanupVideo(true);
                this.status = rt("waitingGamePage");
                return;
            }
            const locationAppId = detectLocationAppId();
            const hero = findHeroCandidate();
            const focusedHomeAppId = isHome ? findFocusedHomeAppId() : undefined;
            const appId = locationAppId ?? focusedHomeAppId ?? hero?.appId;
            if (!appId || !hero) {
                this.currentAppId = appId;
                this.currentSourceAppId = appId ? this.getSourceAppId(appId) : undefined;
                this.currentTrailerName = undefined;
                this.currentGameTitle = appId ? detectGameTitle(appId) : undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.preferredSource = appId ? this.getPreferredSource(appId) : "auto";
                this.needsYouTubeSearch = false;
                this.cleanupVideo(true);
                this.status = appId ? rt("statusHeroNotFound", { appId }) : rt("noGameRecognized");
                return;
            }
            this.currentAppId = appId;
            this.currentSourceAppId = this.getSourceAppId(appId);
            this.preferredSource = this.getPreferredSource(appId);
            this.currentGameTitle = detectGameTitle(appId);
            this.needsYouTubeSearch = false;
            if (this.settings.blockedApps.includes(appId)) {
                this.currentTrailerName = undefined;
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.cleanupVideo(true);
                this.status = rt("statusAppBlocked", { appId });
                return;
            }
            if (this.currentTarget === hero.element &&
                this.currentMediaAppId === appId &&
                (this.currentVideo?.isConnected || this.currentFrame?.isConnected)) {
                return;
            }
            if (this.pendingTarget === hero.element &&
                this.pendingAppId === appId &&
                this.pendingRequestToken === this.requestToken) {
                return;
            }
            this.cleanupVideo();
            this.currentTarget = hero.element;
            this.status = rt("searchTrailerForApp", { appId });
            const token = ++this.requestToken;
            const youtubeId = this.getYouTubeId(appId);
            if (this.preferredSource === "youtube" && youtubeId) {
                this.currentTrailerName = rt("youtubeTrailer");
                this.selectedSteamMovieId = undefined;
                this.steamMovies = [];
                this.needsYouTubeSearch = false;
                this.attachYouTube(hero.element, appId, youtubeId, token);
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
                    this.attachYouTube(hero.element, appId, youtubeId, token);
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
            this.attachVideo(hero.element, appId, this.orderCandidates(trailer.candidates), token);
        }
        getPreferredSource(appId) {
            return this.settings.preferredSources[String(appId)] ?? "auto";
        }
        getSourceAppId(appId) {
            return this.settings.steamAppOverrides[String(appId)] ?? appId;
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
                const directMovieFiles = [
                    "movie2160.mp4",
                    "movie1440.mp4",
                    "movie1080.mp4",
                    "movie720.mp4",
                    "movie_max.mp4",
                    "movie480.mp4"
                ];
                const candidates = [
                    ...directMovieFiles.map((file) => `${sharedBase}/${file}`),
                    ...directMovieFiles.map((file) => `${cdnBase}/${file}`)
                ];
                if (movie.dash_h264) {
                    candidates.push(movie.dash_h264);
                }
                if (movie.dash_av1) {
                    candidates.push(movie.dash_av1);
                }
                if (movie.hls_h264) {
                    candidates.push(movie.hls_h264);
                }
                return this.rememberTrailer(cacheKey, {
                    ok: true,
                    name: movie.name ?? rt("steamTrailer"),
                    candidates,
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
                return distance + adaptivePenalty + exactOrHigherBias;
            };
            return [...candidates].sort((left, right) => score(left) - score(right));
        }
        rememberTrailer(cacheKey, result) {
            this.trailerCache.set(cacheKey, result);
            return result;
        }
        attachVideo(target, appId, candidates, token) {
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
            const tryCandidate = () => {
                const source = candidates[candidateIndex];
                if (!source) {
                    this.cleanupVideo();
                    this.status = rt("steamTrailerNotPlayable");
                    return;
                }
                if (source.includes(".mpd")) {
                    this.playDash(video, source, token).catch(() => {
                        candidateIndex += 1;
                        tryCandidate();
                    });
                    return;
                }
                if (source.includes(".m3u8")) {
                    this.playHls(video, source, token).catch(() => {
                        candidateIndex += 1;
                        tryCandidate();
                    });
                    return;
                }
                video.dataset.trailerheroLowResHint = source.includes("movie480") ? "1" : "";
                video.src = source;
                video.load();
            };
            const onCanPlay = () => {
                if (token !== this.requestToken) {
                    return;
                }
                host.classList.add(targetClass, readyClass);
                this.currentVideo = video;
                this.currentMediaAppId = appId;
                this.seekPastIntro(video);
                this.applyLowResCrt(host, video);
                video.play().catch(() => {
                    this.status = rt("autoplayBlocked");
                });
                this.fadeTimer = setTimeout(() => {
                    if (token === this.requestToken && video.isConnected) {
                        this.seekPastIntro(video);
                        this.applyLowResCrt(host, video);
                        this.hideDuplicateHomeHeroCopies(appId);
                        video.classList.add(visibleClass);
                        this.moveSteamLogoForTrailer(appId, token);
                        this.status = this.currentTrailerName ? rt("trailerLabel", { name: this.currentTrailerName }) : rt("trailerActive");
                    }
                }, this.settings.delaySeconds * 1000);
            };
            const onError = () => {
                candidateIndex += 1;
                tryCandidate();
            };
            video.addEventListener("canplay", onCanPlay, { once: true });
            video.addEventListener("error", onError);
            host.classList.add(targetClass);
            host.insertBefore(video, host.firstChild);
            this.currentVideo = video;
            this.currentMediaAppId = appId;
            tryCandidate();
        }
        attachYouTube(target, appId, videoId, token) {
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
                origin: window.location.origin
            });
            params.set("vq", youtubeQuality);
            frame.className = `${videoClass} ${youtubeClass}`;
            frame.src = `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
            frame.allow = "autoplay; encrypted-media; picture-in-picture";
            frame.loading = "eager";
            frame.setAttribute("aria-hidden", "true");
            frame.setAttribute("frameborder", "0");
            frame.setAttribute("tabindex", "-1");
            const showFrame = () => {
                if (token !== this.requestToken || !frame.isConnected) {
                    return;
                }
                host.classList.add(targetClass, readyClass);
                this.fadeTimer = setTimeout(() => {
                    if (token === this.requestToken && frame.isConnected) {
                        this.hideDuplicateHomeHeroCopies(appId);
                        const shouldApplyCrt = this.shouldApplyCrt(appId, false);
                        host.classList.toggle(crtClass, shouldApplyCrt);
                        frame.classList.toggle(crtClass, shouldApplyCrt);
                        this.moveSteamLogoForTrailer(appId, token);
                        window.setTimeout(() => {
                            if (token === this.requestToken && frame.isConnected) {
                                frame.blur();
                                frame.classList.add(visibleClass);
                            }
                        }, youtubeUiSettleMs);
                        this.status = rt("youtubeTrailerActive");
                    }
                }, this.settings.delaySeconds * 1000);
            };
            frame.addEventListener("load", showFrame, { once: true });
            host.classList.add(targetClass);
            host.insertBefore(frame, host.firstChild);
            this.currentFrame = frame;
            this.currentMediaAppId = appId;
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
        loopBeforeOutro(video) {
            const trimStart = this.currentMediaAppId ? this.getTrimStart(this.currentMediaAppId) : defaultTrimStartSeconds;
            const trimEnd = this.currentMediaAppId ? this.getTrimEnd(this.currentMediaAppId) : defaultTrimEndSeconds;
            if (trimEnd <= 0 || !Number.isFinite(video.duration) || video.duration <= trimStart + trimEnd + 1) {
                return;
            }
            if (video.currentTime >= video.duration - trimEnd) {
                this.seekPastIntro(video);
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
        hideDuplicateHomeHeroCopies(appId) {
            if (!isLibraryHomePage()) {
                return;
            }
            this.restoreDuplicateHomeHeroCopies();
            document.body.classList.add(homeFadeSuppressedClass);
            const selector = [
                "[style*='library_hero']",
                "[style*='_hero']",
                "img[src*='library_hero']",
                "img[src*='_hero']"
            ].join(",");
            for (const element of Array.from(document.querySelectorAll(selector))) {
                if (element.classList.contains(videoClass) || element.classList.contains(logoClass)) {
                    continue;
                }
                const assetText = getElementAssetText(element);
                const lower = assetText.toLowerCase();
                const copyAppId = extractAppIdFromText(assetText);
                if (!copyAppId && !lower.includes("library_hero") && !lower.includes("_hero")) {
                    continue;
                }
                const protectsActiveHost = Boolean(this.currentHost && (element === this.currentHost || element.contains(this.currentHost)));
                const protectsActiveTarget = Boolean(this.currentTarget && (element === this.currentTarget || element.contains(this.currentTarget)));
                if (protectsActiveHost || protectsActiveTarget) {
                    continue;
                }
                const rect = element.getBoundingClientRect();
                const isLargeHeroLayer = (rect.width >= window.innerWidth * 0.34 &&
                    rect.height >= window.innerHeight * 0.18 &&
                    rect.top < window.innerHeight * 0.62 &&
                    rect.bottom > 0);
                if (!isLargeHeroLayer) {
                    continue;
                }
                this.hiddenHomeHeroCopies.push({
                    element,
                    opacity: element.style.opacity,
                    transition: element.style.transition,
                    animation: element.style.animation,
                    pointerEvents: element.style.pointerEvents
                });
                element.dataset.trailerheroHomeCopyHidden = "1";
                if (copyAppId && copyAppId !== appId) {
                    element.style.setProperty("opacity", "0", "important");
                }
                element.style.setProperty("transition", "none", "important");
                element.style.setProperty("animation", "none", "important");
                element.style.setProperty("pointer-events", "none", "important");
            }
        }
        restoreDuplicateHomeHeroCopies() {
            document.body.classList.remove(homeFadeSuppressedClass);
            for (const state of this.hiddenHomeHeroCopies) {
                const { element } = state;
                element.style.opacity = state.opacity;
                element.style.transition = state.transition;
                element.style.animation = state.animation;
                element.style.pointerEvents = state.pointerEvents;
                delete element.dataset.trailerheroHomeCopyHidden;
            }
            this.hiddenHomeHeroCopies = [];
            document.querySelectorAll("[data-trailerhero-home-copy-hidden='1']")
                .forEach((element) => {
                element.style.removeProperty("opacity");
                element.style.removeProperty("transition");
                element.style.removeProperty("animation");
                element.style.removeProperty("pointer-events");
                delete element.dataset.trailerheroHomeCopyHidden;
            });
        }
        moveSteamLogoForTrailer(appId, token) {
            if (!this.settings.logoAssistEnabled || isLibraryHomePage() || token !== this.requestToken) {
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
            if (token !== this.requestToken || !this.settings.logoAssistEnabled || isLibraryHomePage()) {
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
            if (token !== this.requestToken || !this.settings.logoAssistEnabled || isLibraryHomePage()) {
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
            if (!this.settings.logoAssistEnabled || !appId || isLibraryHomePage() || token !== this.requestToken) {
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
                return;
            }
            this.currentLogo?.remove();
            const logo = document.createElement("img");
            logo.className = logoClass;
            logo.src = source;
            logo.alt = "";
            logo.draggable = false;
            logo.setAttribute("aria-hidden", "true");
            if (steamLogo.position) {
                logo.dataset.trailerheroLogoPosition = steamLogo.position.pinnedPosition;
                logo.dataset.trailerheroLogoWidthPct = String(steamLogo.position.nWidthPct);
                logo.dataset.trailerheroLogoHeightPct = String(steamLogo.position.nHeightPct);
            }
            target.appendChild(logo);
            this.currentLogo = logo;
            window.requestAnimationFrame(() => {
                if (token === this.requestToken && logo.isConnected) {
                    logo.classList.add(visibleClass);
                }
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
                        await this.appendBuffer(sourceBuffer, await this.fetchArrayBuffer(variant.initUrl));
                        for (const segmentUrl of variant.segmentUrls) {
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
        async fetchText(url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${url}`);
            }
            return response.text();
        }
        async fetchArrayBuffer(url) {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${url}`);
            }
            return response.arrayBuffer();
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
            for (const adaptation of Array.from(documentXml.getElementsByTagName("AdaptationSet"))) {
                const contentType = adaptation.getAttribute("contentType") ?? "";
                const mimeType = adaptation.getAttribute("mimeType") ?? "";
                if (contentType && contentType !== "video") {
                    continue;
                }
                if (mimeType && !mimeType.startsWith("video/")) {
                    continue;
                }
                const adaptationTemplate = adaptation.getElementsByTagName("SegmentTemplate")[0];
                for (const representation of Array.from(adaptation.getElementsByTagName("Representation"))) {
                    const codec = representation.getAttribute("codecs") ?? adaptation.getAttribute("codecs") ?? "";
                    const representationMime = representation.getAttribute("mimeType") ?? mimeType;
                    if (!codec || (representationMime && !representationMime.startsWith("video/"))) {
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
                    variants.push({
                        initUrl,
                        segmentUrls,
                        codec,
                        height,
                        bandwidth
                    });
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
            return variants[0];
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
            if (cancelPending) {
                this.requestToken += 1;
                this.clearPendingRequest();
            }
            if (this.fadeTimer) {
                clearTimeout(this.fadeTimer);
                this.fadeTimer = undefined;
            }
            this.restoreDuplicateHomeHeroCopies();
            void this.restoreSteamLogoPosition();
            const objectUrl = this.currentVideo?.dataset.trailerheroObjectUrl;
            this.currentVideo?.remove();
            this.currentFrame?.remove();
            this.currentLogo?.remove();
            this.currentYouTubeMask?.remove();
            if (this.currentHost?.classList.contains(homeWindowClass)) {
                this.currentHost.remove();
            }
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
            this.currentVideo = undefined;
            this.currentFrame = undefined;
            this.currentLogo = undefined;
            this.currentYouTubeMask = undefined;
            this.currentHost = undefined;
            this.currentMediaAppId = undefined;
            this.currentTarget?.classList.remove(targetClass, readyClass, crtClass, homeAnchorClass);
            this.currentTarget = undefined;
            document.querySelectorAll(`.${videoClass}, .${youtubeMaskClass}, .${homeWindowClass}, .${logoClass}`)
                .forEach((element) => element.remove());
            document.querySelectorAll(`.${targetClass}, .${homeAnchorClass}`)
                .forEach((element) => element.classList.remove(targetClass, readyClass, crtClass, homeAnchorClass));
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
    }
    mount() {
        this.installOrUpdate();
        this.statusTimer = setInterval(() => this.readRemoteStatus(), 2000);
    }
    unmount() {
        if (this.statusTimer) {
            clearInterval(this.statusTimer);
            this.statusTimer = undefined;
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
            needsYouTubeSearch: this.needsYouTubeSearch,
            preferredSource: this.preferredSource,
            sourceAppId: this.sourceAppId,
            selectedSteamMovieId: this.selectedSteamMovieId,
            steamMovies: this.steamMovies,
            trimStartSeconds: this.trimStartSeconds,
            trimEndSeconds: this.trimEndSeconds,
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
    toggleHomeHero() {
        this.updateSettings({ homeHeroEnabled: !this.settings.homeHeroEnabled });
    }
    setHomeHero(enabled) {
        this.updateSettings({ homeHeroEnabled: enabled });
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
        if (!this.appId) {
            return;
        }
        const blocked = new Set(this.settings.blockedApps);
        if (blockedForCurrentApp) {
            blocked.add(this.appId);
        }
        else {
            blocked.delete(this.appId);
        }
        this.updateSettings({ blockedApps: Array.from(blocked) });
    }
    setYouTubeForCurrent(value) {
        if (!this.appId) {
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
                [String(this.appId)]: videoId
            },
            preferredSources: {
                ...this.settings.preferredSources,
                [String(this.appId)]: "youtube"
            }
        });
        return true;
    }
    clearYouTubeForCurrent() {
        if (!this.appId) {
            return;
        }
        const youtubeVideos = { ...this.settings.youtubeVideos };
        delete youtubeVideos[String(this.appId)];
        this.updateSettings({ youtubeVideos });
    }
    refresh() {
        if (this.appId) {
            this.youtubeSearchFailed.delete(this.appId);
        }
        this.runInSteamTab(FORCE_SCAN_SCRIPT)
            .then((result) => this.applyRemoteResultOrInstall(result))
            .catch(() => this.installOrUpdate());
    }
    updateSettings(next) {
        this.settings = {
            ...this.settings,
            ...next,
            settingsVersion: DEFAULT_SETTINGS.settingsVersion
        };
        saveSettings(this.settings);
        this.emit();
        this.installOrUpdate();
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
                const result = await this.runInSteamTab(buildInstallScript(this.settings));
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
        this.needsYouTubeSearch = result.needsYouTubeSearch;
        this.preferredSource = result.preferredSource;
        this.sourceAppId = result.sourceAppId;
        this.selectedSteamMovieId = result.selectedSteamMovieId;
        this.steamMovies = result.steamMovies ?? [];
        this.trimStartSeconds = result.trimStartSeconds ?? DEFAULT_TRIM_START_SECONDS;
        this.trimEndSeconds = result.trimEndSeconds ?? DEFAULT_TRIM_END_SECONDS;
        this.emit();
        this.maybeAutoSearchYouTube();
    }
    applyRemoteResultOrInstall(result) {
        if (result?.runtimeMissing) {
            this.installOrUpdate();
            return;
        }
        this.applyRemoteResult(result);
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
function Content() {
    const [snapshot, setSnapshot] = SP_REACT.useState(controller.getSnapshot());
    const [youtubeInput, setYoutubeInput] = SP_REACT.useState("");
    const [trimStartInput, setTrimStartInput] = SP_REACT.useState(String(DEFAULT_TRIM_START_SECONDS));
    const [trimEndInput, setTrimEndInput] = SP_REACT.useState(String(DEFAULT_TRIM_END_SECONDS));
    SP_REACT.useEffect(() => controller.subscribe(setSnapshot), []);
    SP_REACT.useEffect(() => {
        setYoutubeInput(snapshot.appId ? snapshot.settings.youtubeVideos[String(snapshot.appId)] ?? "" : "");
    }, [snapshot.appId, snapshot.settings.youtubeVideos]);
    SP_REACT.useEffect(() => {
        setTrimStartInput(String(snapshot.trimStartSeconds ?? DEFAULT_TRIM_START_SECONDS));
        setTrimEndInput(String(snapshot.trimEndSeconds ?? DEFAULT_TRIM_END_SECONDS));
    }, [snapshot.appId, snapshot.trimStartSeconds, snapshot.trimEndSeconds]);
    const currentBlocked = snapshot.appId
        ? snapshot.settings.blockedApps.includes(snapshot.appId)
        : false;
    const currentSteamMovie = snapshot.steamMovies?.find((movie) => movie.id === snapshot.selectedSteamMovieId);
    const currentCrtPreference = snapshot.appId
        ? snapshot.settings.crtOverrides[String(snapshot.appId)] ?? "auto"
        : "auto";
    return (SP_JSX.jsxs(DFL.PanelSection, { title: tr("title"), children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: tr("active"), checked: snapshot.settings.enabled, onChange: (checked) => controller.setEnabled(checked) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: tr("homeHero"), checked: snapshot.settings.homeHeroEnabled, onChange: (checked) => controller.setHomeHero(checked) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: tr("logoAssist"), checked: snapshot.settings.logoAssistEnabled, onChange: (checked) => controller.setLogoAssist(checked) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: { fontSize: "11px", opacity: 0.62, lineHeight: 1.32 }, children: tr("logoAssistHelp") }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: tr("stopOnLaunch"), checked: snapshot.settings.stopOnLaunchEnabled, onChange: (checked) => controller.setStopOnLaunch(checked) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: tr("crtAutomatic"), checked: snapshot.settings.crtLowResEnabled, onChange: (checked) => controller.setLowResCrt(checked) }) }), snapshot.appId ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ToggleField, { label: tr("disabledForCurrentGame"), checked: currentBlocked, onChange: (checked) => controller.setCurrentAppBlocked(checked) }) })) : null, SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx("div", { style: { fontSize: "12px", opacity: 0.82, lineHeight: 1.35 }, children: snapshot.status }) }), snapshot.appId ? (SP_JSX.jsxs(SP_JSX.Fragment, { children: [SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => controller.cyclePreferredSource(), children: tr("source", { value: getSourceLabel(snapshot.preferredSource) }) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => {
                                controller.cycleQuality();
                                controller.refresh();
                            }, children: tr("steamQuality", { quality: snapshot.settings.qualityHeight }) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => {
                                controller.cycleCrtForCurrent();
                                controller.refresh();
                            }, children: tr("crtGame", { value: getCrtPreferenceLabel(currentCrtPreference) }) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.TextField, { label: tr("trimStart"), value: trimStartInput, mustBeURL: false, onChange: (event) => setTrimStartInput(event.currentTarget.value) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.TextField, { label: tr("trimEnd"), value: trimEndInput, mustBeURL: false, onChange: (event) => setTrimEndInput(event.currentTarget.value) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => {
                                if (controller.setTrimForCurrent(trimStartInput, trimEndInput)) {
                                    controller.refresh();
                                }
                            }, children: tr("saveTrims") }) }), snapshot.steamMovies?.length ? (SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.DropdownItem, { label: tr("steamTrailer"), rgOptions: snapshot.steamMovies.map((movie, index) => ({
                                data: movie.id,
                                label: `${index + 1}. ${movie.name}`
                            })), selectedOption: currentSteamMovie?.id ?? snapshot.selectedSteamMovieId ?? "", onChange: (option) => {
                                if (typeof option.data === "string") {
                                    controller.setSteamMovieForCurrent(option.data);
                                    controller.refresh();
                                }
                            } }) })) : null, SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.TextField, { label: tr("youtubeForGame"), value: youtubeInput, mustBeURL: false, onChange: (event) => setYoutubeInput(event.currentTarget.value) }) }), SP_JSX.jsx(DFL.PanelSectionRow, { children: SP_JSX.jsx(DFL.ButtonItem, { layout: "below", onClick: () => {
                                if (controller.setYouTubeForCurrent(youtubeInput)) {
                                    controller.refresh();
                                }
                            }, children: tr("saveYouTubeLink") }) })] })) : null] }));
}
var index = definePlugin(() => {
    controller.mount();
    return {
        name: "TrailerHero",
        titleView: SP_JSX.jsx("div", { className: DFL.staticClasses.Title, children: tr("title") }),
        content: SP_JSX.jsx(Content, {}),
        icon: SP_JSX.jsx(FaFilm, {}),
        onDismount() {
            controller.unmount();
        }
    };
});

export { index as default };
//# sourceMappingURL=index.js.map
