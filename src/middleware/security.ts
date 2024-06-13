import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as argon2 from 'argon2';

export const encrypt = async (password: string): Promise<string> => {
  try {
    const hash = await argon2.hash(password);
    return hash;
  } catch (e) {
    throw new InternalServerErrorException();
  }
};

export const verifyPassword = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  try {
    if (await argon2.verify(hash, password)) {
      return true;
    }

    throw new BadRequestException('Invalid credentials');
  } catch (e) {
    throw new InternalServerErrorException(e);
  }
};
