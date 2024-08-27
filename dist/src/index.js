"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShoheiAPI = void 0;
var fs_1 = require("fs");
var express_1 = __importDefault(require("express"));
var ShoheiAPI = /** @class */ (function () {
    function ShoheiAPI() {
        this.loaderPlugins = [];
        this.loaderPlugins = [];
    }
    ShoheiAPI.prototype.registerPlugin = function (name, plugin) {
        this.loaderPlugins.push({ plugin: plugin, name: name });
        return this;
    };
    ShoheiAPI.prototype.startServer = function (port) {
        var _this = this;
        if (port === void 0) { port = 3000; }
        var app = (0, express_1.default)();
        var routes = this.getRoutes();
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        var loadedRoutes = 0;
        var totalRoutes = routes.length;
        console.log('[Loader] Loading routes...');
        Promise.all(routes.map(function (route) { return __awaiter(_this, void 0, void 0, function () {
            var router;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Promise.resolve("".concat(route)).then(function (s) { return __importStar(require(s)); })];
                    case 1:
                        router = (_b.sent()).default;
                        if (typeof router === 'undefined' || !router || typeof router !== 'function') {
                            console.error("[Loader -> ERROR] File ".concat(route, " is not a valid router"));
                            return [2 /*return*/];
                        }
                        app.use(router);
                        loadedRoutes++;
                        console.log("[Loader] (".concat(loadedRoutes, "/").concat(totalRoutes, ") ").concat((_a = router.stack[0].route) === null || _a === void 0 ? void 0 : _a.path));
                        if (loadedRoutes === totalRoutes) {
                            console.log('[Loader] All routes loaded');
                            this.loaderPlugins.forEach(function (plugin, index) {
                                console.log("[Loader] (".concat(index + 1, "/").concat(_this.loaderPlugins.length, ") ").concat(plugin.name, " plugin loaded"));
                                app.use(plugin.plugin);
                            });
                        }
                        return [2 /*return*/];
                }
            });
        }); }));
        app.listen(port, function () {
            console.log('[Server] Server is running on port ' + port);
        });
    };
    ShoheiAPI.prototype.getRoutes = function () {
        var _this = this;
        var routes = (0, fs_1.readdirSync)("".concat(__dirname, "/router"), { withFileTypes: true });
        var routers = [];
        routes.forEach(function (route) {
            if (route.isDirectory()) {
                _this.getDirectoryFileLists("".concat(__dirname, "/router/").concat(route.name), function (file) {
                    routers.push(file);
                });
            }
            else {
                routers.push("".concat(__dirname, "/router/").concat(route.name));
            }
        });
        return routers;
    };
    ShoheiAPI.prototype.isDirectory = function (path) {
        return !path.includes('.');
    };
    /**
     *
     * @param {string} path - path to directory
     * @param {Function} callback - called when file is found
     * @returns
     */
    ShoheiAPI.prototype.getDirectoryFileLists = function (path, callback) {
        var _this = this;
        var apiFiles = (0, fs_1.readdirSync)(path, { withFileTypes: true });
        apiFiles.forEach(function (dirent) {
            var FileFullpath = "".concat(path, "/").concat(dirent.name);
            if (dirent.isDirectory()) {
                _this.getDirectoryFileLists(FileFullpath, callback);
            }
            else {
                return callback(FileFullpath);
            }
        });
    };
    return ShoheiAPI;
}());
exports.ShoheiAPI = ShoheiAPI;
