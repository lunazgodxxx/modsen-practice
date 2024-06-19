import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
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
  async login(@Res() res, @Body(JoiPipe) authenticateDto: AuthenticationDto) {
    try {
      const response = await this.authService.authenticate(authenticateDto);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Roles('user')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: 'Test RBAC for "user" role',
  })
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
