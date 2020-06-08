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
exports.ProgramService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const program_entity_1 = require("../shared/entities/program.entity");
const typeorm_2 = require("typeorm");
const teacher_entity_1 = require("../shared/entities/teacher.entity");
let ProgramService = class ProgramService {
    constructor(programsReposetory, teacherRepository) {
        this.programsReposetory = programsReposetory;
        this.teacherRepository = teacherRepository;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.programsReposetory.find();
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const program = yield this.programsReposetory.findOne({
                    where: { id },
                    relations: ['teachers']
                });
                if (!program)
                    throw new common_1.HttpException("Program doesn't exist", common_1.HttpStatus.BAD_REQUEST);
                return program;
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    create(programData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let program = yield this.programsReposetory.findOne({ where: { caption: programData.caption } });
                if (program)
                    throw new common_1.HttpException('Program alredy exist', common_1.HttpStatus.BAD_REQUEST);
                program = yield this.programsReposetory.create(programData);
                yield this.programsReposetory.save(program);
                return program;
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.programsReposetory.update({ id }, data);
                return yield this.programsReposetory.findOne({ where: { id } });
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const program = yield this.programsReposetory.findOne({ where: { id } });
                yield this.programsReposetory.remove(program);
                return program;
            }
            catch (error) {
                throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
};
ProgramService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(program_entity_1.ProgramEntity)),
    __param(1, typeorm_1.InjectRepository(teacher_entity_1.TeacherEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProgramService);
exports.ProgramService = ProgramService;
//# sourceMappingURL=program.service.js.map