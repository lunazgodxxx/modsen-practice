import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticationDto } from './dto';
import { Roles } from './decorators';
import { JwtAuthGuard, RoleGuard } from './guards';
import { JoiPipe } from 'nestjs-joi';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({
    summary: 'Login user, get JWT access token',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body(JoiPipe) authenticateDto: AuthenticationDto) {
    const response = await this.authService.authenticate(authenticateDto);
    return response;
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Test RBAC for "user" role',
  })
  @HttpCode(HttpStatus.OK)
  profile(@Req() req) {
    return req.user;
  }
}
