/* Author/Creator: John Ebinyi Odey
 * Follow me on:
    * Twitter: @i_am_giannis
    * Youtube: @Stodachon
    * Linkedin: John Ebinyi Odey
    * Website: https://www.stodachon.com
*/

import { Module } from '@nestjs/common';
import { join } from 'path';
import { IdorModule } from './labs/lab1-idor/idor/idor.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users/users.module';
import { LabsModule } from './labs/labs/labs.module';
import { AuthModule } from './auth/auth.module';
import { MassAssignmentModule } from './labs/lab2-mass-assignment/mass-assignment/mass-assignment.module';
import { VouchersModule } from './vouchers/vouchers/vouchers.module';

@Module({
  imports: [     
    // Serve static files
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/',
      exclude: ['/labs', '/scoreboard'], // API routes
    }), 
    // Connect to PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USER || 'redhound',
      password: process.env.DATABASE_PASSWORD || 'redhound',
      database: process.env.DATABASE_NAME || 'api_pwn_lab',
      autoLoadEntities: true,
      synchronize: true,
    }),
    IdorModule, 
    UsersModule,
    LabsModule,
    AuthModule,
    VouchersModule,
    MassAssignmentModule,
  ],
})
export class AppModule {}
