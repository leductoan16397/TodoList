import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { CognitoIdentityServiceProvider } from 'aws-sdk';

@Injectable()
export class AuthGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization || request.headers.bearer;
    if (!token) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      const cognitoIdentityServiceProvider =
        new CognitoIdentityServiceProvider();
      const user = await cognitoIdentityServiceProvider
        .getUser({
          AccessToken: token,
        })
        .promise();

      if (!user) {
        throw new UnauthorizedException();
      }
      request.user = { username: user.Username };
      return true;
    } catch (error) {
      if (error.name === 'NotAuthorizedException') {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
