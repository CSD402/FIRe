import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable, from, of } from 'rxjs';
import { User } from 'src/user/interfaces/user.interface';
import { PoliceOfficer } from 'src/police-officer/interfaces/police-officer.interface';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateJWT_user(user: User): Promise<string> {
    return this.jwtService.signAsync({ user });
  }

  generateJWT_officer(officer: PoliceOfficer): Promise<string> {
    return this.jwtService.signAsync({ officer });
  }

  hashPassword(password: string): string {
    return bcrypt.hash(password, 12);
  }

  comparePasswords(newPassword: string, passwortHash: string): boolean {
    return bcrypt.compare(newPassword, passwortHash);
  }
}
