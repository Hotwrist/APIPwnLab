/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { User } from './users/entities/user.entity';
import { Lab } from './labs/labs/entities/lab.entity';
import { Voucher } from './vouchers/vouchers/entities/voucher.entity';
import { UserLabProgress } from './labs/labs/entities/user-lab-progress.entity';

async function seedLabs(dataSource: DataSource) {
  const labRepo = dataSource.getRepository(Lab);

  const count = await labRepo.count();
  if (count > 0) {
    console.log("Labs already seeded ✅");
    return;
  }

  // load labs from labs.json
  const filePath = path.join(__dirname, '..', 'labs_seed/labs.json');
  const labsData: any[] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  await labRepo.save(labsData);

  console.log("Labs seeded successfully 🚀");
}

async function seedUsers(dataSource: DataSource) {
  const repo = dataSource.getRepository(User);

  const users = [
    { name:'Alice', email:'alice@apipwnlab.com', password: 'alice234' },
    { name:'Bob', email:'bob@apipwnlab.com', password: 'bob234' },
    { name:'Charlie', email:'charlie@apipwnlab.com', password: 'charlie234' },
    { name:'Michael', email:'michael@apipwnlab.com', password: 'mike234' },
    { name:'Stephen', email:'stephen123@apipwnlab.com', password: 'steph234' },
    { name:'Austine', email:'austine456@apipwnlab.com', password: 'aust234' },
    { name:'Anthony', email:'tony786@apipwnlab.com', password: 'ant234' },
    { name:'John', email:'john221@apipwnlab.com', password: 'john234' },
    { name:'Patrick', email:'patty200@apipwnlab.com', password: 'patty234' },
    { name:'Frank', email:'franky67@apipwnlab.com', password: 'franky234' },
    { name:'Odey', email:'odey98@apipwnlab.com', password: 'odey234' },
    { name:'Christopher', email:'christy@apipwnlab.com', password: 'chris234' },
    { name:'Abel', email:'abel@apipwnlab.com', password: 'abel234' },
    { name:'Susan', email:'sussy44@apipwnlab.com', password: 'sussy234' },
    { name:'Angela', email:'angie56@apipwnlab.com', password: 'angie234' },
    { name:'Grace', email:'gracy@apipwnlab.com', password: 'gracy234' },
    { name:'Solomon', email:'solly734@apipwnlab.com', password: 'solo234' },
    { name:'Victoria', email:'vikky@apipwnlab.com', password: 'vickky234' },
    { name: "Admin", email: "admin@apipwnlab.com", password: 'admin234', role: 'admin', isVerified: true, isPremium: true },
    { name: "Support", email: "support@apipwnlab.com", password: 'support234', role: "support", isVerified: true },
    { name: "Guest", email: "guest@apipwnlab.com", password: 'guest234', role: "guest" },
  ];

  console.log("🔄 Resetting APIPwnLab users...");

  // Hash passwords
  for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
  }

  for (const u of users) {
    const exists = await repo.findOne({ where: { email: u.email } });
    if (!exists) {
      await repo.save(u);
      console.log(`✅ User ${u.email} added`);
    }
  }
  
  console.log("✅ Users reset and seeded successfully!");
}

async function seedProgress(dataSource: DataSource) {
  const progressRepo = dataSource.getRepository(UserLabProgress);
  const labRepo = dataSource.getRepository(Lab);
  const userRepo = dataSource.getRepository(User);

  const users = await userRepo.find();
  const labs = await labRepo.find();

  for (const user of users) {
    for (const lab of labs) {
      // Check if progress already exists
      const existing = await progressRepo.findOne({ where: { user: { id: user.id }, lab: { id: lab.id } } });
      if (!existing) {
        // Create initial progress (0 points for each lab)
        await progressRepo.save(progressRepo.create({
          user: user,
          userId: user.id,
          lab: lab,
          labId: lab.id,
          solvedTasks: [],
          totalPoints: 0,
          completedAt: null,
        }));
      }
    }
  }
  console.log("✅ User lab progress initialized!");
}

async function seedVouchers(dataSource: DataSource) {

  const voucherRepo = dataSource.getRepository(Voucher);

  const count = await voucherRepo.count();

  if(count > 0) {
    console.log("Vouchers already seeded");
    return;
  }

  await voucherRepo.save([
    {
      code:"PREM-8X21-AAA1",
      usedByUserId:2,
      usedAt:new Date("2023-10-10")
    },
    {
      code:"PREM-9L33-BBB2",
      usedByUserId:3,
      usedAt:new Date("2024-10-11")
    },
    {
      code:"PREM-8K90-CCC3",
      usedByUserId:5,
      usedAt:new Date("2025-10-12")
    },
    {
      code:"PREM-5L72-DDD3",
      usedByUserId:20,
      usedAt:new Date("2025-03-21")
    },
    {
      code:"PREM-4K83-EEE5",
      usedByUserId:18,
      usedAt:new Date("2024-09-12")
    },
  ]);

  console.log("Voucher history seeded");
}


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  try {
    const dataSource = app.get(DataSource);

    // 1. Seed labs
    await seedLabs(dataSource);

    // 2. Seed users
    await seedUsers(dataSource);

    // 3. Initialize user lab progress
    await seedProgress(dataSource);

    // 4. Initialize seed vouchers
    await seedVouchers(dataSource);

  } catch (err) {
    console.error("❌ Database seeding failed:", err);
  }

  // Helps in validation user's data e.g when changing profile data
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Helps in making sure some sensitive profile data are not returned.
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  await app.listen(process.env.PORT ?? 3000);
  console.log('APIPwnLab Playground running at http://localhost:3000');
}

bootstrap();