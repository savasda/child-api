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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramEntity = void 0;
const typeorm_1 = require("typeorm");
const teacher_entity_1 = require("./teacher.entity");
let ProgramEntity = class ProgramEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ProgramEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProgramEntity.prototype, "caption", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProgramEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], ProgramEntity.prototype, "image", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], ProgramEntity.prototype, "created", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], ProgramEntity.prototype, "updated", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], ProgramEntity.prototype, "duration", void 0);
__decorate([
    typeorm_1.ManyToMany(type => teacher_entity_1.TeacherEntity, teacher => teacher.programs),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], ProgramEntity.prototype, "teachers", void 0);
ProgramEntity = __decorate([
    typeorm_1.Entity('program')
], ProgramEntity);
exports.ProgramEntity = ProgramEntity;
//# sourceMappingURL=program.entity.js.map