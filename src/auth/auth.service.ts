import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { UserLabProgress } from 'src/labs/labs/entities/user-lab-progress.entity'
import { Lab } from 'src/labs/labs/entities/lab.entity'

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        @InjectRepository(UserLabProgress)
        private progressRepo: Repository<UserLabProgress>,
        @InjectRepository(Lab)
        private labRepo: Repository<Lab>,
        private jwtService: JwtService
    ){}

    async register(name:string, email:string, password:string){
        const hash = await bcrypt.hash(password,10)
        const user = this.userRepo.create({
            name,
            email,
            password:hash
        }
        )

        //return await this.userRepo.save(user);
        const savedUser = await this.userRepo.save(user);

        // initialize lab progress table for new registered user
        const labs = await this.labRepo.find();

        /*for (const lab of labs) {
            const progress = this.progressRepo.create({
                userId: savedUser.id,
                labId: lab.id,
                solvedTasks: [],
                totalPoints: 0,
                completedAt: null,
            });

            await this.progressRepo.save(progress);
        }*/

        // For improved performance (much faster)
        const progressEntries = labs.map(lab =>
            this.progressRepo.create({
                userId: savedUser.id,
                labId: lab.id,
                solvedTasks: [],
                totalPoints: 0,
                completedAt: null,
            })
        );
        await this.progressRepo.save(progressEntries);
        return savedUser;
    }

    async login(email:string, password:string){

        const user = await this.userRepo.findOne({where:{email}})

        if(!user) throw new Error("User not found")

        const valid = await bcrypt.compare(password,user.password)

        if(!valid) throw new Error("Invalid password")

        const token = this.jwtService.sign({
            email: user.email, sub: user.id
        })

        return {
            token,
            userId:user.id
        }
    }
}