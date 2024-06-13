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
import { AuthenticationDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RoleGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Res() res, @Body() authenticateDto: AuthenticationDto) {
    try {
      const response = this.authService.authenticate(authenticateDto);
      return res.status(HttpStatus.OK).json({ response });
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Roles('customer')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  profile(@Req() req, @Res() res) {
    return res.status(HttpStatus.OK).json(req.user);
  }
}