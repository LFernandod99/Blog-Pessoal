import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsuarioModule } from "src/usuario/usuario.module";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstants } from "./constants/constatnts";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./service/auth-service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        UsuarioModule,
        PassportModule,
        JwtModule.register ({
        secret: jwtConstants.secret,
        signOptions: {expiresIn: '24h'}
    })],
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [Bcrypt]
})
export class AuthModule {}

// CRIANDO A SEGURANÇA DO SISTEMA

// Local auth guard -> cria a guard do local
// local strategy -> é o local onde o passport faz a autenticação local via db
// constants -> define a chave secreta
// authService -> métodos de autenticação do TOKEN JWT
// jwt auth guard - > cria um guard para o end point jwt
// jwt strategy -> implementa a validação do TOKEN
// auth controller -> cria o endpoint de autenticação


