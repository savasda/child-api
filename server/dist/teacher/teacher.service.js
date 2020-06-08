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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const teacher_entity_1 = require("../shared/entities/teacher.entity");
const typeorm_2 = require("typeorm");
const program_entity_1 = require("../shared/entities/program.entity");
const utils_1 = require("../shared/utils");
let TeacherService = class TeacherService {
    constructor(programsReposetory, teacherRepository) {
        this.programsReposetory = programsReposetory;
        this.teacherRepository = teacherRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.teacherRepository.find({
                    relations: ['programs']
                });
            }
            catch (err) {
                throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.teacherRepository.findOne({
                    where: { id },
                    relations: ['programs']
                });
                if (!user)
                    throw new common_1.HttpException('User doesen`t exist', common_1.HttpStatus.BAD_REQUEST);
                return user;
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    create(teacherData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = this.teacherRepository.create(teacherData);
                return yield this.teacherRepository.save(teacher);
            }
            catch (err) {
                throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.teacherRepository.update({ id }, data);
                return yield this.teacherRepository.findOne({ where: { id } });
            }
            catch (err) {
                throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield this.teacherRepository.findOne({ where: { id } });
                common_1.Logger.log(teacher);
                yield this.teacherRepository.delete(teacher);
                return teacher;
            }
            catch (err) {
                throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    boundTeacherWithPrograms(programsIds, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield this.teacherRepository.findOne({
                where: { id },
                relations: ['programs']
            });
            const programs = yield this.programsReposetory.find({
                where: { id: typeorm_2.In(programsIds) }
            });
            if (!teacher)
                throw new common_1.HttpException(`Teacher with ${id} doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
            teacher.programs = utils_1.distinctByProperty([...teacher.programs, ...programs], 'id');
            return yield this.teacherRepository.save(teacher);
        });
    }
    unboundTeacherFromProgram(programsIds, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teacher = yield this.teacherRepository.findOne({
                    where: { id },
                    relations: ['programs']
                });
                programsIds.forEach(id => {
                    teacher.programs = teacher.programs.filter(program => program.id !== id);
                });
                return yield this.teacherRepository.save(teacher);
            }
            catch (err) {
                throw new common_1.HttpException(err, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
TeacherService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(program_entity_1.ProgramEntity)),
    __param(1, typeorm_1.InjectRepository(teacher_entity_1.TeacherEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TeacherService);
exports.TeacherService = TeacherService;
//# sourceMappingURL=teacher.service.js.map