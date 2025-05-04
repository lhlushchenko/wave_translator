import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Логування для перевірки деталей помилки
    console.error('Error caught in filter:', exception);

    const errorResponse = {
      statusCode: status,
      message: exception.message || 'Internal Server Error',
      path: request.url,
    };

    response.status(status).json(errorResponse);
  }
}
