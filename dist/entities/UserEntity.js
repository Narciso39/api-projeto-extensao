"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../config/data-source");
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ExpenseEntity_1 = require("./ExpenseEntity");
let User = User_1 = class User {
    hashPassword() {
        this.password = bcryptjs_1.default.hashSync(this.password, 8);
    }
    constructor(id, name, email, password, expenses) {
        if (id)
            this.id = id;
        if (name)
            this.name = name;
        if (email)
            this.email = email;
        if (password)
            this.password = password;
        if (expenses)
            this.expenses = expenses;
    }
    generateId() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
        }
    }
};
exports.User = User;
User.repository = data_source_1.AppDataSource.getRepository(User_1);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "hashPassword", null);
__decorate([
    (0, typeorm_1.OneToMany)(() => ExpenseEntity_1.Expense, (expense) => expense.user),
    __metadata("design:type", Array)
], User.prototype, "expenses", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "generateId", null);
exports.User = User = User_1 = __decorate([
    (0, typeorm_1.Entity)("users"),
    __metadata("design:paramtypes", [String, String, String, String, Array])
], User);
