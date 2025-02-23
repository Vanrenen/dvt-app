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
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserInputError } from 'apollo-server-express';
import User from '../models/User.js';
export var userResolvers = {
    Query: {
        users: function () { return __awaiter(void 0, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        err_1 = _a.sent();
                        throw new Error('Failed to fetch users');
                    case 3: return [2 /*return*/];
                }
            });
        }); },
        user: function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
            var user, err_2;
            var id = _b.id;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, User.findById(id)];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new UserInputError('User not found');
                        }
                        return [2 /*return*/, user];
                    case 2:
                        err_2 = _c.sent();
                        throw new Error('Failed to fetch user');
                    case 3: return [2 /*return*/];
                }
            });
        }); },
    },
    Mutation: {
        registerUser: function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
            var existingUser, hashedPassword, user, err_3;
            var username = _b.username, password = _b.password;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, User.findOne({ username: username })];
                    case 1:
                        existingUser = _c.sent();
                        if (existingUser) {
                            throw new UserInputError('Username already exists');
                        }
                        return [4 /*yield*/, bcrypt.hash(password, 12)];
                    case 2:
                        hashedPassword = _c.sent();
                        user = new User({ username: username, password: hashedPassword });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, user];
                    case 4:
                        err_3 = _c.sent();
                        throw new Error('Failed to register user');
                    case 5: return [2 /*return*/];
                }
            });
        }); },
        loginUser: function (_1, _a) { return __awaiter(void 0, [_1, _a], void 0, function (_, _b) {
            var user, isMatch, token, err_4;
            var username = _b.username, password = _b.password;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, User.findOne({ username: username })];
                    case 1:
                        user = _c.sent();
                        if (!user) {
                            throw new UserInputError('Invalid credentials');
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        isMatch = _c.sent();
                        if (!isMatch) {
                            throw new UserInputError('Invalid credentials');
                        }
                        token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                        return [2 /*return*/, { token: token }];
                    case 3:
                        err_4 = _c.sent();
                        throw new Error('Failed to login user');
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    },
};
