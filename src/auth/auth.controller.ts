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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticationDto } from './dto';
import { Roles } from './decorators';
import { JwtAuthGuard, RoleGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Res() res, @Body() authenticateDto: AuthenticationDto) {
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
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}
