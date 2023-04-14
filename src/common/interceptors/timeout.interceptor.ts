import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, timeout } from "rxjs";

export class TimeOutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>
        ): Observable<any> | Promise<Observable<any>> {
            
        // intersecta las peticiones que tomen más de 2 minutos y arroja un error de timeout
        return next.handle().pipe(timeout(120000));
    }

}